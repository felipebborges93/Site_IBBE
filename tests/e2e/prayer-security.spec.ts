import { test, expect } from "@playwright/test";
import { hashIp, checkRateLimit, clearRateLimitStore, RATE_LIMIT_WINDOW_MS, MAX_REQUESTS } from "../../lib/rate-limit";
import { sanitizeHtml } from "../../lib/sanitize";
import { prayerFormSchema } from "../../lib/validations/prayer";

test.describe("Segurança e Ingestão de Pedidos de Oração", () => {
  test.beforeEach(() => {
    clearRateLimitStore();
  });

  test.describe("1. Hash de IP e Rate Limiting (LGPD & Proteção contra abuso)", () => {
    test("hashIp gera SHA-256 consistente e esconde o IP real", () => {
      const ip = "192.168.1.100";
      const hash1 = hashIp(ip, "salt-test");
      const hash2 = hashIp(ip, "salt-test");
      const hashDiffIp = hashIp("192.168.1.101", "salt-test");
      const hashDiffSalt = hashIp(ip, "salt-diff");

      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(64); // SHA-256 hex string
      expect(hash1).not.toBe(ip);
      expect(hash1).not.toBe(hashDiffIp);
      expect(hash1).not.toBe(hashDiffSalt);
    });

    test("checkRateLimit permite exatamente 3 requisições consecutivas e bloqueia a 4ª", () => {
      const ipHash = hashIp("10.0.0.1", "test-salt");

      const r1 = checkRateLimit(ipHash);
      expect(r1.allowed).toBe(true);
      expect(r1.remaining).toBe(2);

      const r2 = checkRateLimit(ipHash);
      expect(r2.allowed).toBe(true);
      expect(r2.remaining).toBe(1);

      const r3 = checkRateLimit(ipHash);
      expect(r3.allowed).toBe(true);
      expect(r3.remaining).toBe(0);

      // 4ª requisição deve ser bloqueada
      const r4 = checkRateLimit(ipHash);
      expect(r4.allowed).toBe(false);
      expect(r4.remaining).toBe(0);
    });

    test("checkRateLimit reinicia contagem após expiração da janela de 1 hora", () => {
      const ipHash = hashIp("10.0.0.2", "test-salt");
      const startTime = 1000000;

      expect(checkRateLimit(ipHash, startTime).allowed).toBe(true);
      expect(checkRateLimit(ipHash, startTime + 100).allowed).toBe(true);
      expect(checkRateLimit(ipHash, startTime + 200).allowed).toBe(true);
      expect(checkRateLimit(ipHash, startTime + 300).allowed).toBe(false);

      // Após a janela de 1 hora (> 3600000 ms)
      const afterWindow = startTime + RATE_LIMIT_WINDOW_MS + 1000;
      const resetReq = checkRateLimit(ipHash, afterWindow);
      expect(resetReq.allowed).toBe(true);
      expect(resetReq.remaining).toBe(MAX_REQUESTS - 1);
    });
  });

  test.describe("2. Sanitização estrita de HTML (Anti-XSS)", () => {
    test("remove tags <script> e tags HTML perigosas preservando texto puro", () => {
      const dangerousInput = "<script>alert('xss')</script>Por favor orem por minha família";
      const sanitized = sanitizeHtml(dangerousInput);
      expect(sanitized).not.toContain("<script>");
      expect(sanitized).not.toContain("</script>");
      expect(sanitized).toContain("Por favor orem por minha família");
    });

    test("remove tags de imagem e handlers de evento onerror", () => {
      const imgPayload = '<img src="x" onerror="alert(1)">Orar pela saúde';
      const sanitized = sanitizeHtml(imgPayload);
      expect(sanitized).not.toContain("<img");
      expect(sanitized).not.toContain("onerror");
      expect(sanitized).toContain("Orar pela saúde");
    });

    test("escapa entidades especiais de HTML sem estourar exceção", () => {
      const input = "Deus > Homem & Paz < 'Vida' \"Amor\"";
      const sanitized = sanitizeHtml(input);
      expect(sanitized).toBe("Deus &gt; Homem &amp; Paz &lt; &#39;Vida&#39; &quot;Amor&quot;");
    });

    test("retorna string vazia para inputs nulos ou vazios", () => {
      expect(sanitizeHtml("")).toBe("");
      expect(sanitizeHtml(null as unknown as string)).toBe("");
      expect(sanitizeHtml(undefined as unknown as string)).toBe("");
    });
  });

  test.describe("3. Validação do Schema Zod (prayerFormSchema)", () => {
    test("aceita pedido identificado válido", () => {
      const result = prayerFormSchema.safeParse({
        name: "Maria Silva",
        request: "Oração pela restauração da saúde e da família.",
        is_anonymous: false,
      });
      expect(result.success).toBe(true);
    });

    test("aceita pedido anônimo sem nome", () => {
      const result = prayerFormSchema.safeParse({
        name: "",
        request: "Oração por um propósito espiritual urgente.",
        is_anonymous: true,
      });
      expect(result.success).toBe(true);
    });

    test("rejeita pedido identificado sem nome ou com espaços vazios", () => {
      const emptyName = prayerFormSchema.safeParse({
        name: "",
        request: "Pedido sem informar o nome.",
        is_anonymous: false,
      });
      expect(emptyName.success).toBe(false);
      if (!emptyName.success) {
        expect(emptyName.error.flatten().fieldErrors.name).toBeDefined();
      }

      const spacesName = prayerFormSchema.safeParse({
        name: "   ",
        request: "Pedido com espaços no nome.",
        is_anonymous: false,
      });
      expect(spacesName.success).toBe(false);
    });

    test("rejeita pedidos com menos de 5 caracteres", () => {
      const shortRequest = prayerFormSchema.safeParse({
        name: "João",
        request: "Oi",
        is_anonymous: false,
      });
      expect(shortRequest.success).toBe(false);
      if (!shortRequest.success) {
        expect(shortRequest.error.flatten().fieldErrors.request).toBeDefined();
      }
    });

    test("rejeita pedidos com mais de 1000 caracteres", () => {
      const longText = "A".repeat(1001);
      const longRequest = prayerFormSchema.safeParse({
        name: "João",
        request: longText,
        is_anonymous: false,
      });
      expect(longRequest.success).toBe(false);
    });

    test("rejeita nome com mais de 100 caracteres", () => {
      const longName = "A".repeat(101);
      const invalid = prayerFormSchema.safeParse({
        name: longName,
        request: "Pedido com nome muito longo.",
        is_anonymous: false,
      });
      expect(invalid.success).toBe(false);
    });
  });
});
