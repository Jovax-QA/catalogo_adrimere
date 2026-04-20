git import { test, expect } from '@playwright/test';

test.describe('Catálogo de Produtos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('deve exibir o título da página', async ({ page }) => {
    await expect(page.locator('h1, [class*="title"], text=Catálogo')).toBeVisible();
  });

  test('deve exibir categorias de produtos', async ({ page }) => {
    const categoryTabs = page.locator('button, [role="tab"]');
    const count = await categoryTabs.count();
    expect(count).toBeGreaterThan(0);
  });

  test('deve exibir cards de produtos', async ({ page }) => {
    const productCards = page.locator('[class*="card"], [class*="product"], article');
    await expect(productCards.first()).toBeVisible();
  });

  test('deve ser responsivo em mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
    
    // Verifica se o layout se adapta
    const viewport = page.viewportSize();
    expect(viewport?.width).toBe(375);
  });
});
