Preciso que você crie os testes Playwright E2E para a página http://192.168.101.28:5173/
ETAPA 1 — MAPEAMENTO via Playwright MCP (NÃO altere nenhum dado):

Acesse: http://192.168.101.28:5173/
Tire screenshot + snapshot (verbose) da tela principal
Interaja com cada dropdown/filtro e capture as opções disponíveis
Se tiver botão "Nuevo" ou "Configurar", clique e capture o formulário/drawer
Se tiver modal de exclusão/confirmação, abra e capture, depois CANCELE
Feche tudo SEM salvar
Liste todos os elementos encontrados: data-testids, IDs de inputs, aria-labels, colunas da tabela, botões, checkboxes, validações visíveis

ETAPA 2 — CENÁRIOS (me apresente para aprovação ANTES de codificar):

Organize por categoria:

Carga da Tela
Dropdowns/Filtros
Incluir
Editar
Excluir/Desativar
Busca e Filtros
Validações de Campo
Paginação
Navegação


Para cada cenário: nome ("Deve ..."), passos AAA, resultado esperado
Marque quais são seguros (leitura) e quais alteram dados


⚠️ Como o catálogo/blog foi criado para ser visualizado também em dispositivos móveis, inclua cenários de responsividade, simulando viewports de celular (ex: iPhone 12, Galaxy S21). Verifique se menus, imagens, cards e formulários se adaptam corretamente em telas pequenas.

ETAPA 3 — CRIAR ARQUIVOS (só após minha aprovação dos cenários):
Seguindo o padrão do projeto qa-automation/:

elements/[nome].elements.ts — seletores data-testid
data/[nome].data.ts — interface TypeScript + massa de dados + gerador de nomes únicos (só letras)
pages/[nome].page.ts — Page Object com ações e validações (JSDoc, português)
tests/[nome].spec.ts — testes AAA com fixture authenticatedPage, incluindo testes com viewport mobile
Adicionar URL em config/urls.ts

ETAPA 4 — CODIFCAÇÃO

⚠️ script padrão de exemplo:

import { test, expect } from '@playwright/test';

test.describe('Dado que o usuário acessa a página de login', () => {

  test('Então deve conseguir logar com credenciais válidas', async ({ page }) => {
    // Arrange (Preparação)
    const email = 'usuario@teste.com';
    const senha = '123456';

    await page.goto('https://exemplo.com/login');

    // Act (Ação)
    await page.fill('#email', email);
    await page.fill('#password', senha);
    await page.click('button[type="submit"]');

    // Assert (Validação)
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('h1')).toHaveText('Dashboard');
  });

});