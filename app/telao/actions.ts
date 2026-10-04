"use server";

import { createAdminClient } from "@/utils/supabase/server";

export interface TelaoPrayerRequest {
  id: string;
  name: string | null;
  request: string;
  is_anonymous: boolean;
  created_at?: string;
}

/**
 * Busca pedidos de oração aprovados e autorizados para exibição pública na semana corrente
 */
export async function getTelaoPrayerRequests(): Promise<TelaoPrayerRequest[]> {
  try {
    // Início da semana corrente (Segunda-feira 00:00:00 no fuso de Brasília)
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
    const dayOfWeek = localDate.getUTCDay();
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    localDate.setUTCDate(localDate.getUTCDate() - diffToMonday);

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
      .limit(9);

    if (error) {
      console.error("Erro ao buscar pedidos para o telão:", error);
      return [];
    }

    return (data as TelaoPrayerRequest[]) || [];
  } catch (err) {
    console.error("Erro inesperado em getTelaoPrayerRequests:", err);
    return [];
  }
}

/**
 * Marca uma lista de pedidos de oração como já exibidos no telão
 */
export async function markPrayerRequestsAsDisplayed(ids: string[]): Promise<boolean> {
  if (!ids || ids.length === 0) return true;

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("prayer_requests")
      .update({ displayed: true })
      .in("id", ids);

    if (error) {
      console.error("Erro ao marcar pedidos como exibidos:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Erro inesperado em markPrayerRequestsAsDisplayed:", err);
    return false;
  }
}
