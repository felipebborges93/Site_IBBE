import { test, expect } from "@playwright/test";

test.describe("APIs de Exibição do Telão (Phase 12: DISP-01, DISP-02, DISP-03)", () => {
  const TEST_TOKEN = process.env.TELAO_API_TOKEN || "test-telao-token";

  test.describe("GET /api/prayer-requests/display", () => {
    test("rejeita requisição sem cabeçalho Authorization com status 401", async ({ request }) => {
      const response = await request.get("/api/prayer-requests/display");
      expect(response.status()).toBe(401);
      const json = await response.json();
      expect(json.error).toBe("Unauthorized");
    });

    test("rejeita requisição com Bearer token incorreto com status 401", async ({ request }) => {
      const response = await request.get("/api/prayer-requests/display", {
        headers: {
          Authorization: "Bearer token-invalido-123",
        },
      });
      expect(response.status()).toBe(401);
      const json = await response.json();
      expect(json.error).toBe("Unauthorized");
    });

    test("aceita requisição com Bearer token correto", async ({ request }) => {
      const response = await request.get("/api/prayer-requests/display", {
        headers: {
          Authorization: `Bearer ${TEST_TOKEN}`,
        },
      });
      // Pode responder 200 (se Supabase configurado/mock) ou 500 caso sem banco real, mas NUNCA 401
      expect([200, 500]).toContain(response.status());
      if (response.status() === 200) {
        const json = await response.json();
        expect(Array.isArray(json)).toBe(true);
      }
    });
  });

  test.describe("POST /api/prayer-requests/[id]/displayed", () => {
    test("rejeita requisição sem token com status 401", async ({ request }) => {
      const response = await request.post("/api/prayer-requests/some-uuid/displayed");
      expect(response.status()).toBe(401);
      const json = await response.json();
      expect(json.error).toBe("Unauthorized");
    });

    test("rejeita requisição com token incorreto com status 401", async ({ request }) => {
      const response = await request.post("/api/prayer-requests/some-uuid/displayed", {
        headers: {
          Authorization: "Bearer token-errado",
        },
      });
      expect(response.status()).toBe(401);
      const json = await response.json();
      expect(json.error).toBe("Unauthorized");
    });

    test("aceita requisição com Bearer token correto", async ({ request }) => {
      const response = await request.post("/api/prayer-requests/non-existent-id/displayed", {
        headers: {
          Authorization: `Bearer ${TEST_TOKEN}`,
        },
      });
      // Com token correto, a autorização passou (200 ou 500 de banco), jamais 401
      expect([200, 500]).toContain(response.status());
    });
  });
});
