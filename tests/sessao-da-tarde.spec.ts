import { test, expect } from '@playwright/test';

test('deve fazer login e cadastrar um filme com sucesso', async ({ page }) => {
  // CAMINHO CORRIGIDO ABAIXO:
  await page.goto('file:///C:/Users/glasi/Documents/estudos-play/index.html'); 

  // --- LOGIN ---
  await page.locator('#email').fill('admin@sessao.com');
  await page.locator('#senha').fill('1234');
  await page.locator('#btn-login').click();

  // --- CADASTRO ---
  await page.locator('#titulo').fill('Curtindo a Vida Adoidado');
  await page.locator('#ano').fill('1986');
  await page.locator('#genero').fill('Comédia');
  await page.locator('#diretor').fill('John Hughes');
  await page.locator('#btn-cadastrar').click();
  
  // --- VALIDAÇÃO ---
  // 7. Verifica se o filme apareceu na tabela
  const primeiraLinha = page.locator('table tbody tr').first();
  await expect(primeiraLinha).toContainText('Curtindo a Vida Adoidado');
  await expect(primeiraLinha).toContainText('John Hughes');
});

