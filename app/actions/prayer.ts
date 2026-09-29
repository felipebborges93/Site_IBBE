"use server";

import { prayerFormSchema } from "@/lib/validations/prayer";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

// In-memory rate limiting for simplicity (since it's a vertical MVP).
// In production, use Redis (Vercel KV) or a Supabase table.
const rateLimit = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function submitPrayerRequest(prevState: any, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const isAnonymous = data.is_anonymous === "on" || data.is_anonymous === "true";

    const parsedData = {
      name: data.name as string,
      request: data.request as string,
      is_anonymous: isAnonymous,
      honeypot: data.honeypot as string,
    };

    // Honeypot check
    if (parsedData.honeypot) {
      console.warn("Honeypot triggered");
      return { success: false, message: "Spam detectado." };
    }

    // IP Rate Limiting
    const forwardedFor = headers().get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown";
    
    if (!checkRateLimit(ip)) {
      return { success: false, message: "Muitos pedidos em pouco tempo. Tente novamente mais tarde." };
    }

    // Zod validation
    const validated = prayerFormSchema.safeParse(parsedData);
    if (!validated.success) {
      return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    const supabase = createClient();
    
    const { error } = await supabase.from("prayer_requests").insert({
      name: validated.data.is_anonymous ? null : validated.data.name,
      request: validated.data.request,
      is_anonymous: validated.data.is_anonymous,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, message: "Erro ao enviar pedido de oração." };
    }

    return { success: true, message: "Pedido enviado com sucesso!" };
  } catch (error) {
    console.error("Submit error:", error);
    return { success: false, message: "Erro interno no servidor." };
  }
}
