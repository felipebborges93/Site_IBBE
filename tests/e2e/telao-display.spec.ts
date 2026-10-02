import { test, expect } from "@playwright/test";

test.describe("Exibição no Telão (Fase 13 - TELA-01, TELA-02, TELA-03)", () => {
  const validToken =
    process.env.TELAO_API_TOKEN || "seu-token-secreto-para-autorizacao-do-telao";

  test("1. Rota secreta bloqueia acesso quando o token é inválido (TELA-01)", async ({
    page,
  }) => {
    // Acessa com token inexistente ou incorreto
    const response = await page.goto("/telao/token-invalido-12345");
    expect(response?.status()).toBe(200);

    // Deve exibir o aviso de acesso restrito
    await expect(page.locator("h1")).toContainText("Acesso Restrito ao Telão");
    await expect(page.locator("text=Acesso restrito ao telão da igreja")).toBeVisible();
    await expect(page.locator("text=Token de autorização inválido ou ausente")).toBeVisible();
  });

  test("2. Rota secreta com token válido renderiza layout fullscreen sem scrollbars (TELA-01, D-01)", async ({
    page,
  }) => {
    await page.goto(`/telao/${validToken}`);

    // Container principal deve ter classes de tela cheia e ausência de scrollbar
    const mainContainer = page.locator("main");
    await expect(mainContainer).toBeVisible();
    await expect(mainContainer).toHaveClass(/overflow-hidden/);
    await expect(mainContainer).toHaveClass(/bg-slate-950/);

    // Cabeçalho da igreja deve estar visível
    await expect(page.locator("header")).toContainText("Igreja Batista Bethel");
    await expect(page.locator("header")).toContainText("Momento de Oração Congregacional");
  });

  test("3. Exibição de estado acolhedor na ausência de pedidos (D-06)", async ({
    page,
  }) => {
    // Intercepta a rota de display para simular fila vazia
    await page.route("/api/prayer-requests/display", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });

    await page.goto(`/telao/${validToken}`);

    // Deve renderizar o slide acolhedor com versículo
    await expect(page.locator("h2")).toContainText("Momento de Oração Congregacional");
    await expect(page.locator("text=Filipenses 4:6")).toBeVisible();
    await expect(page.locator("p:has-text('Igreja Batista Bethel em Resende')")).toBeVisible();
    await expect(page.locator("button:has-text('Verificar Novos Pedidos')")).toBeVisible();
  });

  test("4. Exibição em grade 2x2 com alta legibilidade e dados do pedido (TELA-02, D-02)", async ({
    page,
  }) => {
    const mockPrayers = [
      {
        id: "11111111-1111-1111-1111-111111111111",
        name: "Maria Silva",
        request: "Pela saúde da minha família e livramento de enfermidades.",
        is_anonymous: false,
      },
      {
        id: "22222222-2222-2222-2222-222222222222",
        name: null,
        request: "Agradecimento por uma grande vitória no trabalho.",
        is_anonymous: true,
      },
      {
        id: "33333333-3333-3333-3333-333333333333",
        name: "João Pereira",
        request: "Por discernimento e sabedoria na nova etapa dos estudos.",
        is_anonymous: false,
      },
      {
        id: "44444444-4444-4444-4444-444444444444",
        name: "Clara Mendes",
        request: "Por restauração e paz no lar.",
        is_anonymous: false,
      },
    ];

    await page.route("/api/prayer-requests/display", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockPrayers),
      });
    });

    await page.goto(`/telao/${validToken}`);

    // Deve exibir 4 cartões de oração
    const cards = page.locator("article");
    await expect(cards).toHaveCount(4);

    // Deve exibir Maria Silva
    await expect(page.locator("text=Maria Silva")).toBeVisible();
    await expect(page.locator("text=Pela saúde da minha família")).toBeVisible();

    // Pedido anônimo deve exibir "Anônimo"
    await expect(page.locator("text=Anônimo")).toBeVisible();
    await expect(page.locator("text=Agradecimento por uma grande vitória")).toBeVisible();

    // Botão de avanço manual e instruções de teclado devem estar visíveis (TELA-03, D-04, D-05)
    await expect(page.locator("button:has-text('Marcar como Exibidos e Avançar')")).toBeVisible();
    await expect(page.locator("text=para avançar lote")).toBeVisible();
  });

  test("5. Avanço de lote dispara requisições de marcação como exibido (TELA-03, D-04)", async ({
    page,
  }) => {
    const mockPrayers = [
      {
        id: "11111111-1111-1111-1111-111111111111",
        name: "Maria Silva",
        request: "Pela saúde da família.",
        is_anonymous: false,
      },
    ];

    const displayedCalledIds: string[] = [];

    await page.route("/api/prayer-requests/display", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockPrayers),
      });
    });

    await page.route(/\/api\/prayer-requests\/.*\/displayed/, async (route) => {
      const url = route.request().url();
      const match = url.match(/\/api\/prayer-requests\/(.*)\/displayed/);
      if (match) {
        displayedCalledIds.push(match[1]);
      }
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto(`/telao/${validToken}`);
    await expect(page.locator("text=Maria Silva")).toBeVisible();

    // Clica no botão de avançar lote
    await page.click("button:has-text('Marcar como Exibidos e Avançar')");

    // Verifica que o ID foi enviado para a rota /displayed
    expect(displayedCalledIds).toContain("11111111-1111-1111-1111-111111111111");
  });
});
