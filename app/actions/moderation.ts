"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { moderationActionSchema, ModerationStatus } from "@/lib/validations/moderation";

export interface ModerationActionState {
  success: boolean;
  message: string;
  error?: string;
}

async function getAuthenticatedAdminClient() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Não autorizado. Faça login para realizar esta ação.");
  }

  return supabase;
}

async function updatePrayerStatus(id: string, status: ModerationStatus, successMessage: string): Promise<ModerationActionState> {
  const parseResult = moderationActionSchema.safeParse({ id });
  if (!parseResult.success) {
    const errorMsg = parseResult.error.issues[0]?.message || "ID de pedido inválido.";
    return {
      success: false,
      message: errorMsg,
      error: errorMsg,
    };
  }

  try {
    const supabase = await getAuthenticatedAdminClient();

    const { error: updateError } = await supabase
      .from("prayer_requests")
      .update({ status })
      .eq("id", parseResult.data.id);

    if (updateError) {
      return {
        success: false,
        message: "Falha ao atualizar o status do pedido.",
        error: updateError.message,
      };
    }

    revalidatePath("/admin/oracao");
    return {
      success: true,
      message: successMessage,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido ao processar ação.";
    return {
      success: false,
      message,
      error: message,
    };
  }
}

export async function approvePrayerRequest(id: string): Promise<ModerationActionState> {
  return updatePrayerStatus(id, "approved", "Pedido aprovado com sucesso!");
}

export async function rejectPrayerRequest(id: string): Promise<ModerationActionState> {
  return updatePrayerStatus(id, "rejected", "Pedido rejeitado com sucesso.");
}

export async function undoModeration(id: string): Promise<ModerationActionState> {
  return updatePrayerStatus(id, "pending", "Moderação desfeita. Pedido retornado à fila de pendentes.");
}
