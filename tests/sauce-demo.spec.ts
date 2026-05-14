import { test, expect } from '@playwright/test';

test('deve realizar login e validar a lista de produtos no Sauce Demo', async ({ page }) => {
  // 1. Acessar o site
  await page.goto('https://www.saucedemo.com/');

  // 2. Fazer login com o usuário 'standard_user' e a senha 'secret_sauce'
  // Usamos data-test por ser uma boa prática de automação
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // 3. Verificar se o título da página de produtos é 'Products'
  const headerTitle = page.locator('.title');
  await expect(headerTitle).toHaveText('Products');

  // 4. Validar se existe pelo menos um item na lista de produtos
  const inventoryItems = page.locator('.inventory_item');
  const count = await inventoryItems.count();
  expect(count).toBeGreaterThan(0);
});
