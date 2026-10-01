import { z } from "zod";

export const prayerFormSchema = z
  .object({
    name: z
      .string()
      .max(100, { message: "O nome não pode exceder 100 caracteres." })
      .optional()
      .or(z.literal("")),
    request: z
      .string()
      .min(5, { message: "O pedido deve ter pelo menos 5 caracteres." })
      .max(1000, { message: "O pedido não pode exceder 1000 caracteres." }),
    is_anonymous: z.boolean().default(false),
    honeypot: z.string().optional(),
  })
  .refine(
    (data) => {
      // Se não for anônimo, o nome é obrigatório
      if (!data.is_anonymous && (!data.name || data.name.trim() === "")) {
        return false;
      }
      return true;
    },
    {
      message: "Por favor, informe seu nome ou marque a opção de pedido anônimo.",
      path: ["name"],
    }
  );

export type PrayerFormValues = z.infer<typeof prayerFormSchema>;
