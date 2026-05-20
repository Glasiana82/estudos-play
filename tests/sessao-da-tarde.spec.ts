  await page.locator('#diretor').fill('John Hughes');
  await page.locator('#btn-cadastrar').click();

  // --- VALIDAÇÃO ---
  // O Playwright aguarda automaticamente até 5s para que o texto apareça na tabela
  const primeiraLinha = page.locator('table tbody tr').first();
  await expect(primeiraLinha).toContainText('Curtindo a Vida Adoidado');
