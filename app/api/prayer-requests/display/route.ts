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
    // Calcula o início da semana corrente (Segunda-feira 00:00:00 horário de Brasília / America/Sao_Paulo)
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour12: false,
    });

    const parts = formatter.formatToParts(new Date());
    const partMap: Record<string, string> = {};
    parts.forEach((p) => (partMap[p.type] = p.value));

    const year = parseInt(partMap.year, 10);
    const month = parseInt(partMap.month, 10) - 1;
    const day = parseInt(partMap.day, 10);

    const localDate = new Date(Date.UTC(year, month, day));
    const dayOfWeek = localDate.getUTCDay(); // 0 = Domingo, 1 = Segunda, etc.
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    localDate.setUTCDate(localDate.getUTCDate() - diffToMonday);

    // Formata segunda-feira 00:00:00 com fuso do Brasil (UTC-3)
    const mondayBRT = `${localDate.toISOString().split("T")[0]}T00:00:00-03:00`;
    const startOfWeekISO = new Date(mondayBRT).toISOString();

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("prayer_requests")
      .select("id, name, request, is_anonymous, created_at")
      .eq("status", "approved")
      .eq("displayed", false)
      .gte("created_at", startOfWeekISO)
      .order("created_at", { ascending: true })
      .limit(100);

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
