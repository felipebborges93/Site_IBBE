import { createAdminClient } from "@/utils/supabase/server";
import { validateServerSecrets } from "@/lib/env";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let secrets: { TELAO_API_TOKEN: string };
  try {
    secrets = validateServerSecrets();
  } catch (err) {
    console.error("Erro na validação das variáveis do telão:", err);
    return NextResponse.json({ error: "Configuração do servidor inválida." }, { status: 500 });
  }

  const authHeader = request.headers.get("Authorization");
  if (!authHeader || authHeader !== `Bearer ${secrets.TELAO_API_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("prayer_requests")
      .select("id, name, request, is_anonymous, created_at")
      .eq("status", "approved")
      .eq("displayed", false)
      .order("created_at", { ascending: true })
      .limit(50);

    if (error) {
      console.error("Erro ao buscar pedidos para exibição:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? [], { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("Erro inesperado no endpoint /api/prayer-requests/display:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
