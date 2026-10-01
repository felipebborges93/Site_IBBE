import { z } from "zod";

export const moderationActionSchema = z.object({
  id: z.string().uuid({ message: "ID de pedido inválido." }),
});

export const moderationStatusSchema = z.enum(["pending", "approved", "rejected"]);

export type ModerationActionInput = z.infer<typeof moderationActionSchema>;
export type ModerationStatus = z.infer<typeof moderationStatusSchema>;
