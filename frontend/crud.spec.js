// crud.spec.js
const { test, expect } = require('@playwright/test');

// --- CONFIGURAÇÃO IMPORTANTE ---
const FRONTEND_URL = 'http://localhost:64589/index.html'; // Sua URL do front-end

test.describe('Testes de CRUD da API via Front-end (UI Existente)', () => {

  // Teste 1: Criar um Usuário (Operação POST)
  test('deve criar um novo usuário via front-end (POST)', async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await page.fill('#nome', 'Playwright Create Test');
    // Usamos Date.now() para garantir um email único a cada execução do teste
    const uniqueEmail = `create-${Date.now()}@example.com`;
    await page.fill('#email', uniqueEmail);
    await page.click('#btnSubmit');

    // Verificação simplificada: apenas se o nome aparece na lista.
    // Se você tiver uma área de mensagem de sucesso (ex: <div id="messageArea">), pode adicionar:
    // await expect(page.locator('#messageArea')).toContainText('Usuário criado com sucesso');
    await expect(page.locator('#listaUsuarios')).toContainText('Playwright Create Test');
    await expect(page.locator('#listaUsuarios')).toContainText(uniqueEmail);

    // Limpa o formulário após a criação
    await expect(page.locator('#nome')).toBeEmpty();
    await expect(page.locator('#email')).toBeEmpty();
  });

  // Teste 2: Listar Todos os Usuários (Operação GET ALL)
  test('deve listar todos os usuários via front-end (GET ALL)', async ({ page }) => {
    await page.goto(FRONTEND_URL);
    await expect(page.locator('h2', { hasText: 'Lista de Usuários' })).toBeVisible();
    // Verifica se a lista de usuários é visível e tem algum conteúdo (mesmo que vazio).
    await expect(page.locator('#listaUsuarios')).toBeVisible();
  });

  // Teste 3: Atualizar um Usuário (Operação PUT)
  test('deve atualizar um usuário via front-end (PUT) usando o botão Editar', async ({ page }) => {
    await page.goto(FRONTEND_URL);

    // PASSO 1: Criar um usuário para ser atualizado
    const originalName = `Original-${Date.now()}`;
    const originalEmail = `original-${Date.now()}@example.com`;
    await page.fill('#nome', originalName);
    await page.fill('#email', originalEmail);
    await page.click('#btnSubmit');

    // Aguarda a lista ser atualizada e o usuário aparecer
    await expect(page.locator(`#listaUsuarios:has-text("${originalName}")`)).toBeVisible();

    // PASSO 2: Clicar no botão 'Editar' do usuário recém-criado
    const userListItem = page.locator(`#listaUsuarios li:has-text("${originalName}"):has-text("${originalEmail}")`);
    await userListItem.locator('button.editar').click();

    // PASSO 3: Verificar se o formulário foi preenchido corretamente
    await expect(page.locator('#nome')).toHaveValue(originalName);
    await expect(page.locator('#email')).toHaveValue(originalEmail);
    await expect(page.locator('#btnSubmit')).toHaveText('Atualizar'); // Verifica se o texto do botão mudou

    // PASSO 4: Alterar os dados no formulário
    const updatedName = `Updated-${Date.now()}`;
    const updatedEmail = `updated-${Date.now()}@example.com`;
    await page.fill('#nome', updatedName);
    await page.fill('#email', updatedEmail);
    await page.click('#btnSubmit'); // Clica no botão 'Atualizar'

    // PASSO 5: Verificar se a lista foi atualizada com os novos dados
    await expect(page.locator(`#listaUsuarios`)).not.toContainText(originalName); // Nome antigo não deve mais estar na lista
    await expect(page.locator(`#listaUsuarios`)).toContainText(updatedName); // Nome novo deve estar na lista
    await expect(page.locator(`#listaUsuarios`)).toContainText(updatedEmail); // Email novo deve estar na lista

    // Opcional: Verifique a mensagem de sucesso se tiver (ex: await expect(page.locator('#messageArea')).toContainText('Usuário atualizado com sucesso');)
  });

  // Teste 4: Deletar um Usuário (Operação DELETE)
  test('deve deletar um usuário via front-end (DELETE) usando o botão Excluir', async ({ page }) => {
    await page.goto(FRONTEND_URL);

    // PASSO 1: Criar um usuário para ser deletado
    const nameToDelete = `DeleteMe-${Date.now()}`;
    const emailToDelete = `deleteme-${Date.now()}@example.com`;
    await page.fill('#nome', nameToDelete);
    await page.fill('#email', emailToDelete);
    await page.click('#btnSubmit');

    // Aguarda a lista ser atualizada e o usuário aparecer
    const userListItem = page.locator(`#listaUsuarios li:has-text("${nameToDelete}"):has-text("${emailToDelete}")`);
    await expect(userListItem).toBeVisible();

    // PASSO 2: Clicar no botão 'Excluir' do usuário e esperar pela resposta da API
    // O Playwright lida com o 'confirm' automaticamente, clicando em OK por padrão.
    // Usamos Promise.all para esperar tanto o clique quanto a resposta da rede.
    const [deleteResponse] = await Promise.all([
        page.waitForResponse(response =>
            response.url().includes('http://localhost:4000/usuarios/') && // Verifique se é a URL da sua API de usuários
            response.request().method() === 'DELETE' && // Verifique se é uma requisição DELETE
            (response.status() === 200 || response.status() === 204) // Aceita 200 OK ou 204 No Content
        ),
        userListItem.locator('button.excluir').click(),
    ]);

    // Opcional: Verificar se a requisição DELETE para a API foi bem-sucedida (status 2xx)
    expect(deleteResponse.ok()).toBeTruthy();

    // PASSO 3: Verificar se o usuário foi removido da lista
    // Agora esperamos que o elemento não esteja mais visível, dando mais tempo se precisar.
    await expect(userListItem).not.toBeVisible({ timeout: 10000 }); // Aumentamos o timeout para 10 segundos
    await expect(page.locator(`#listaUsuarios`)).not.toContainText(nameToDelete); // Verifica que o texto sumiu da lista inteira
  });

  // Teste 5: Obter Usuário por ID (implicitamente via Edição)
  // Este teste verifica que clicar em "Editar" de um usuário busca seus dados e preenche o formulário.
  test('deve preencher o formulário ao editar um usuário (GET BY ID implícito)', async ({ page }) => {
    await page.goto(FRONTEND_URL);

    // PASSO 1: Criar um usuário para ser editado/obtido
    const userName = `EditThis-${Date.now()}`;
    const userEmail = `editthis-${Date.now()}@example.com`;
    await page.fill('#nome', userName);
    await page.fill('#email', userEmail);
    await page.click('#btnSubmit');

    // Aguarda a lista ser atualizada e o usuário aparecer
    const userListItem = page.locator(`#listaUsuarios li:has-text("${userName}"):has-text("${userEmail}")`);
    await expect(userListItem).toBeVisible();

    // PASSO 2: Clicar no botão 'Editar' do usuário
    await userListItem.locator('button.editar').click();

    // PASSO 3: Verificar se os campos do formulário foram preenchidos com os dados do usuário correto
    // Isso simula a operação de GET by ID, pois os dados são obtidos e exibidos.
    await expect(page.locator('#nome')).toHaveValue(userName);
    await expect(page.locator('#email')).toHaveValue(userEmail);
    await expect(page.locator('#btnSubmit')).toHaveText('Atualizar');
    await expect(page.locator('#cancelarEdicao')).toBeVisible();
  });

});
