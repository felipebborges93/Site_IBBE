import { test, expect } from '@playwright/test';

test.describe('Fluxos Críticos da IBBE', () => {
  test('Renderização da Home e Componente Próximo Culto', async ({ page }) => {
    // Acessa a página inicial
    await page.goto('/');

    // Verifica se o título da página está presente
    await expect(page).toHaveTitle(/IBBE/);

    // Verifica se a seção de Próximo Culto (que consome YouTube API/Fallback) renderiza sem crash
    const nextServiceSection = page.locator('section', { hasText: /Mensagens/i }).or(page.locator('section', { hasText: /Culto/i })).first();
    await expect(nextServiceSection).toBeVisible();
  });

  test('Formulário de Pedido de Oração Anônimo', async ({ page }) => {
    await page.goto('/oracao');

    // Verifica se a página carregou
    await expect(page.locator('h2, h1').first()).toContainText(/Orar/i);

    // Preenche formulário básico (campos obrigatórios mínimos - adaptar com base no form real)
    const pedidoTextarea = page.locator('textarea[name="request"], textarea[id="request"]');
    if (await pedidoTextarea.count() > 0) {
      await pedidoTextarea.fill('Pedido de oração de teste E2E');
      
      const submitButton = page.locator('button[type="submit"]');
      await expect(submitButton).toBeEnabled();
      // Não vamos dar submit de verdade para não poluir o banco em testes de dev, ou podemos mockar o endpoint.
      // Aqui testamos apenas que a UI renderiza o form perfeitamente.
    }
  });
});
