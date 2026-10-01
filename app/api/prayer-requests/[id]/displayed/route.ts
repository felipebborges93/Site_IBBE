import { createAdminClient } from "@/utils/supabase/server";
import { validateServerSecrets } from "@/lib/env";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("prayer_requests")
      .update({ displayed: true })
      .eq("id", id);

    if (error) {
      console.error("Erro ao marcar pedido como exibido:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("Erro inesperado no endpoint /api/prayer-requests/[id]/displayed:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
