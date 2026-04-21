import { test, expect } from '@playwright/test';

test('página inicial carrega corretamente', async ({ page }) => {
  await page.goto('/');
  
  // Verifica se o título está presente
  await expect(page.locator('text=Catálogo Beleza')).toBeVisible();
});

test('navegação entre categorias funciona', async ({ page }) => {
  await page.goto('/');
  
  // Aguarda carregamento inicial
  await page.waitForLoadState('networkidle');
  
  // Verifica se as abas de categoria estão presentes
  const tabs = page.locator('[role="tablist"] button');
  await expect(tabs.first()).toBeVisible();
});
