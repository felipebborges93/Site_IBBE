import { z } from "zod";

export const prayerFormSchema = z
  .object({
    name: z
      .string()
      .max(100, { message: "O nome deve ter no máximo 100 caracteres." })
      .optional()
      .or(z.literal("")),
    request: z
      .string()
      .min(5, { message: "Por favor, detalhe seu pedido com pelo menos 5 caracteres." })
      .max(140, { message: "O pedido deve ter no máximo 140 caracteres para exibição perfeita no telão." }),
    is_anonymous: z.boolean().default(false),
    allow_public_display: z.boolean().default(false),
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
      message: "Por favor, informe seu nome ou marque a opção de envio anônimo.",
      path: ["name"],
    }
  );

export type PrayerFormValues = z.infer<typeof prayerFormSchema>;
