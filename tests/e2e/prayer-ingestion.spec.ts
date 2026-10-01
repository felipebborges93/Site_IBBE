import { test, expect } from "@playwright/test";

test.describe("Ingestão e Proteção de Pedidos de Oração", () => {
  test("Renderização do formulário e honeypot invisível", async ({ page }) => {
    await page.goto("/oracao");

    // Verifica presença do título
    await expect(page.locator("h1, h2").first()).toContainText(/Orar/i);

    // Valida visibilidade dos campos principais
    const textarea = page.locator("textarea[name='request']");
    const submitButton = page.locator("button[type='submit']");
    await expect(textarea).toBeVisible();
    await expect(submitButton).toBeVisible();

    // Honeypot deve estar oculto no DOM para usuários legítimos (D-01)
    const honeypotInput = page.locator("input[name='honeypot']");
    await expect(honeypotInput).toBeHidden();
  });

  test("Alternância entre modo identificado e anônimo", async ({ page }) => {
    await page.goto("/oracao");

    const nameInput = page.locator("input[name='name']");
    const anonCheckbox = page.locator("input[name='is_anonymous']");

    // Por padrão (identificado), o campo de nome deve estar visível
    await expect(nameInput).toBeVisible();

    // Ao marcar como anônimo, o campo de nome deve desaparecer da interface (D-04)
    await anonCheckbox.check();
    await expect(nameInput).toBeHidden();

    // Ao desmarcar novamente, o campo de nome volta a ser visível
    await anonCheckbox.uncheck();
    await expect(nameInput).toBeVisible();
  });

  test("Simulação de bot e acionamento silencioso do honeypot", async ({ page }) => {
    await page.goto("/oracao");

    // Preenche campo de nome e pedido
    await page.locator("input[name='name']").fill("Robô de Teste");
    await page.locator("textarea[name='request']").fill("Tentativa de spam automático por bot");

    // Injeta valor no honeypot forçadamente simulando comportamento de crawler/bot
    await page.locator("input[name='honeypot']").evaluate((el: HTMLInputElement) => {
      el.value = "spam-bot-value";
    });

    // Submete o formulário
    await page.locator("button[type='submit']").click();

    // UI deve retornar sucesso sem alertar o bot de que foi bloqueado silenciosamente (D-01)
    const alertBox = page.locator("form [role='alert']");
    await expect(alertBox).toBeVisible();
    await expect(alertBox).toContainText(/sucesso/i);
  });

  test("Validação de preenchimento mínimo do pedido", async ({ page }) => {
    await page.goto("/oracao");

    // Tenta submeter em modo identificado sem preencher nome ou pedido
    // Desabilita required no client para testar validação da Server Action
    await page.locator("textarea[name='request']").evaluate((el: HTMLTextAreaElement) => {
      el.required = false;
    });

    await page.locator("button[type='submit']").click();

    // Deve exibir aviso de validação ou erro na UI
    const alertBox = page.locator("form [role='alert']");
    await expect(alertBox).toBeVisible();
    await expect(alertBox).toContainText(/Verifique os campos|mínimo/i);
  });
});
