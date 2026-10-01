"use server";

import { headers } from "next/headers";
import { prayerFormSchema } from "@/lib/validations/prayer";
import { createClient } from "@/utils/supabase/server";
import { hashIp, checkRateLimit } from "@/lib/rate-limit";
import { sanitizeHtml } from "@/lib/sanitize";

export interface PrayerActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function submitPrayerRequest(
  prevState: PrayerActionState | null,
  formData: FormData
): Promise<PrayerActionState> {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const isAnonymous = rawData.is_anonymous === "on" || rawData.is_anonymous === "true";

    // 1. Honeypot check (D-01, PRAY-02): Se preenchido por bot, aborta silenciosamente simulando sucesso
    const honeypot = typeof rawData.honeypot === "string" ? rawData.honeypot.trim() : "";
    if (honeypot) {
      console.warn("Honeypot acionado: bot detectado. Abortando silenciosamente.");
      return { success: true, message: "Pedido enviado com sucesso!" };
    }

    // 2. Rate Limiting por Hash SHA-256 de IP (D-02, PRAY-03)
    const headerList = await headers();
    const forwardedFor = headerList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const ipHashed = hashIp(ip);

    const { allowed } = checkRateLimit(ipHashed);
    if (!allowed) {
      return {
        success: false,
        message: "Limite de pedidos atingido (máximo de 3 pedidos por hora). Por favor, tente novamente mais tarde.",
      };
    }

    // 3. Sanitização de HTML no servidor (D-03, PRAY-02)
    const sanitizedName = typeof rawData.name === "string" ? sanitizeHtml(rawData.name) : "";
    const sanitizedRequest = typeof rawData.request === "string" ? sanitizeHtml(rawData.request) : "";

    const payloadToValidate = {
      name: sanitizedName,
      request: sanitizedRequest,
      is_anonymous: isAnonymous,
      honeypot,
    };

    // 4. Validação Zod
    const validated = prayerFormSchema.safeParse(payloadToValidate);
    if (!validated.success) {
      return {
        success: false,
        message: "Verifique os campos do formulário.",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    // 5. Redação de nome para anônimos (D-04, PRAY-04)
    const finalName = validated.data.is_anonymous ? null : validated.data.name;

    // 6. Persistência via Supabase SSR anônimo (PRAY-01)
    const supabase = await createClient();
    const { error } = await supabase.from("prayer_requests").insert({
      name: finalName,
      request: validated.data.request,
      is_anonymous: validated.data.is_anonymous,
      status: "pending",
      displayed: false,
    });

    if (error) {
      console.error("Erro ao inserir pedido de oração no Supabase:", error);
      return {
        success: false,
        message: "Não foi possível enviar seu pedido agora. Tente novamente em instantes.",
      };
    }

    return {
      success: true,
      message: "Seu pedido de oração foi recebido com carinho e nossa equipe estará orando por você!",
    };
  } catch (error) {
    console.error("Erro inesperado na Server Action submitPrayerRequest:", error);
    return {
      success: false,
      message: "Ocorreu um erro inesperado no servidor. Tente novamente mais tarde.",
    };
  }
}
