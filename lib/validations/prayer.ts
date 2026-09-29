import { z } from "zod";

export const prayerFormSchema = z.object({
  name: z.string().optional(),
  request: z.string().min(5, { message: "O pedido deve ter pelo menos 5 caracteres." }),
  is_anonymous: z.boolean().default(false),
  honeypot: z.string().optional(),
}).refine(data => {
  if (!data.is_anonymous && (!data.name || data.name.trim() === "")) {
    return false;
  }
  return true;
}, {
  message: "O nome é obrigatório quando não é anônimo.",
  path: ["name"],
});

export type PrayerFormValues = z.infer<typeof prayerFormSchema>;
