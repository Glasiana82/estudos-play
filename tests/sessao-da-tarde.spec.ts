import { test, expect } from '@playwright/test';

test('deve fazer login e cadastrar um filme com sucesso', async ({ page }) => {
    // ABRE O SITE USANDO O ENDEREÇO DO LIVE SERVER
    await page.goto('http://localhost:5500/index.html');

        // ESPERA 7 SEGUNDOS (7000 milissegundos)
    await page.waitForTimeout(7000);

});