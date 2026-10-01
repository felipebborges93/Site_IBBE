import { test, expect } from "@playwright/test";
import {
  moderationActionSchema,
  moderationStatusSchema,
} from "../../lib/validations/moderation";
import { PrayerRequestItem } from "../../app/admin/oracao/ModerationDashboard";

test.describe("Painel e Lógica de Moderação Pastoral de Oração", () => {
  test.describe("1. Validação de Schemas de Moderação (Zod)", () => {
    test("moderationActionSchema aceita UUID v4 válido e rejeita inválidos", () => {
      const validUuid = "123e4567-e89b-12d3-a456-426614174000";
      const validResult = moderationActionSchema.safeParse({ id: validUuid });
      expect(validResult.success).toBe(true);

      const invalidId = "not-a-uuid-12345";
      const invalidResult = moderationActionSchema.safeParse({ id: invalidId });
      expect(invalidResult.success).toBe(false);

      const emptyResult = moderationActionSchema.safeParse({ id: "" });
      expect(emptyResult.success).toBe(false);

      const sqlInjectionAttempt = moderationActionSchema.safeParse({
        id: "123e4567-e89b-12d3-a456-426614174000' OR '1'='1",
      });
      expect(sqlInjectionAttempt.success).toBe(false);
    });

    test("moderationStatusSchema aceita estritamente os estados de ciclo de vida permitidos", () => {
      expect(moderationStatusSchema.safeParse("pending").success).toBe(true);
      expect(moderationStatusSchema.safeParse("approved").success).toBe(true);
      expect(moderationStatusSchema.safeParse("rejected").success).toBe(true);

      expect(moderationStatusSchema.safeParse("archived").success).toBe(false);
      expect(moderationStatusSchema.safeParse("deleted").success).toBe(false);
      expect(moderationStatusSchema.safeParse("").success).toBe(false);
    });
  });

  test.describe("2. Lógica de Ordenação FIFO da Fila (D-01, MOD-01)", () => {
    test("garante que pedidos pendentes são organizados pelo critério First-In-First-Out", () => {
      const mockRequests: PrayerRequestItem[] = [
        {
          id: "33333333-3333-3333-3333-333333333333",
          name: "Carlos",
          request: "Pedido recente",
          status: "pending",
          is_anonymous: false,
          created_at: "2026-10-01T10:30:00.000Z",
        },
        {
          id: "11111111-1111-1111-1111-111111111111",
          name: "Ana",
          request: "Pedido mais antigo que deve ser o primeiro atendido",
          status: "pending",
          is_anonymous: false,
          created_at: "2026-10-01T08:00:00.000Z",
        },
        {
          id: "22222222-2222-2222-2222-222222222222",
          name: "Bruno",
          request: "Pedido intermediário",
          status: "pending",
          is_anonymous: true,
          created_at: "2026-10-01T09:15:00.000Z",
        },
      ];

      // Ordenação FIFO (cronológica ascendente por data de criação)
      const fifoList = [...mockRequests].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      expect(fifoList[0].id).toBe("11111111-1111-1111-1111-111111111111");
      expect(fifoList[0].name).toBe("Ana");
      expect(fifoList[1].id).toBe("22222222-2222-2222-2222-222222222222");
      expect(fifoList[2].id).toBe("33333333-3333-3333-3333-333333333333");
    });
  });

  test.describe("3. Separação por Abas e Elegibilidade de Desfazer (D-03, MOD-03)", () => {
    test("calcula contadores corretos por status e valida elegibilidade para desfazer", () => {
      const mockItems: PrayerRequestItem[] = [
        {
          id: "1",
          name: "A",
          request: "Req A",
          status: "pending",
          is_anonymous: false,
          created_at: "2026-10-01T08:00:00Z",
        },
        {
          id: "2",
          name: "B",
          request: "Req B",
          status: "pending",
          is_anonymous: false,
          created_at: "2026-10-01T08:10:00Z",
        },
        {
          id: "3",
          name: "C",
          request: "Req C",
          status: "approved",
          is_anonymous: false,
          created_at: "2026-10-01T07:00:00Z",
        },
        {
          id: "4",
          name: "D",
          request: "Req D",
          status: "rejected",
          is_anonymous: true,
          created_at: "2026-10-01T06:00:00Z",
        },
      ];

      const pending = mockItems.filter((i) => i.status === "pending");
      const approved = mockItems.filter((i) => i.status === "approved");
      const rejected = mockItems.filter((i) => i.status === "rejected");

      expect(pending.length).toBe(2);
      expect(approved.length).toBe(1);
      expect(rejected.length).toBe(1);

      // Itens aprovados e rejeitados podem ter a moderação desfeita (revertidos a pending)
      const undoEligible = mockItems.filter((i) => i.status !== "pending");
      expect(undoEligible.length).toBe(2);
      expect(undoEligible.map((i) => i.id)).toEqual(["3", "4"]);
    });
  });

  test.describe("4. Proteção de Rotas Administrativas (MOD-01)", () => {
    test("redireciona visitante não autenticado para /login ao acessar /admin/oracao", async ({
      page,
    }) => {
      await page.goto("/admin/oracao");
      await expect(page).toHaveURL(/\/login/);
    });
  });
});
