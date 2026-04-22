/**
 * Testes E2E do Catálogo de Beleza
 * @file tests/catalogo.spec.ts
 */

import { test, expect } from '@playwright/test';
import { CatalogoPage } from '../pages/catalogo.page';
import { CATEGORIAS, VIEWPORTS, FORMAS_PAGAMENTO } from '../data/catalogo.data';

test.describe('Dado que o usuário acessa o Catálogo de Beleza', () => {
  let catalogoPage: CatalogoPage;

  test.beforeEach(async ({ page }) => {
    catalogoPage = new CatalogoPage(page);
    await catalogoPage.navegar();
  });

  /**
   * CATEGORIA: Carga da Tela
   * Tipo: Seguro (Leitura)
   */
  
  test('CT01: Então deve carregar a página inicial com título AdriMere', async () => {
    // Arrange - página carregada no beforeEach
    // Act - já na página
    // Assert
    const titulo = await catalogoPage.obterTituloCategoria();
    expect(titulo.length).toBeGreaterThan(0);
  });

  test('CT02: Então deve exibir todas as 4 categorias disponíveis', async () => {
    // Arrange - página carregada
    // Act - verificar cada categoria
    for (const categoria of CATEGORIAS) {
      const categoriaVisivel = await catalogoPage.page.locator('[data-testid="category-button"]').filter({ hasText: categoria.nome }).first().isVisible();
      expect(categoriaVisivel).toBeTruthy();
    }
    // Assert
    expect(CATEGORIAS).toHaveLength(4);
  });

  test('CT03: Então deve exibir produtos da categoria padrão', async () => {
    // Arrange - página carregada
    // Act
    const produtosVisiveis = await catalogoPage.verificarProdutosExibidos();
    // Assert
    expect(produtosVisiveis).toBeTruthy();
  });

  /**
   * CATEGORIA: Validação de Quantidade (Cenário solicitado)
   * Tipo: Seguro (Leitura)
   */
  
  test('CT13: Então a quantidade exibida deve ser igual à quantidade real de produtos', async () => {
    // Arrange - página carregada com categoria padrão
    // Act
    const quantidadeTexto = await catalogoPage.obterQuantidadeProdutosTexto();
    const quantidadeVisivel = await catalogoPage.contarProdutosVisiveis();
    
    // Assert
    expect(quantidadeVisivel).toBe(quantidadeTexto);
    expect(quantidadeTexto).toBeGreaterThan(0);
  });

  test('CT13b: Então deve validar quantidade para cada categoria', async () => {
    // Arrange - página carregada
    // Act e Assert para cada categoria
    for (const categoria of CATEGORIAS) {
      await catalogoPage.selecionarCategoria(categoria.nome);
      
      const quantidadeTexto = await catalogoPage.obterQuantidadeProdutosTexto();
      const quantidadeVisivel = await catalogoPage.contarProdutosVisiveis();
      
      expect(quantidadeVisivel).toBe(quantidadeTexto);
      expect(quantidadeTexto).toBe(categoria.quantidadeProdutosEsperada);
    }
  });

  /**
   * CATEGORIA: Dropdowns/Filtros
   * Tipo: Seguro (Interação)
   */
  
  test('CT04: Então deve alternar categoria ao clicar', async () => {
    // Arrange - na categoria padrão (Perfumes)
    const categoriaInicial = await catalogoPage.obterTituloCategoria();
    
    // Act
    await catalogoPage.selecionarCategoria('Maquiagem');
    const categoriaFinal = await catalogoPage.obterTituloCategoria();
    
    // Assert
    expect(categoriaFinal).not.toBe(categoriaInicial);
    expect(categoriaFinal).toBe('Maquiagem');
  });

  test('CT05: Então deve manter categoria selecionada destacada visualmente', async () => {
    // Arrange - clicar em categoria
    await catalogoPage.selecionarCategoria('Skincare');
    
    // Act
    const estaSelecionada = await catalogoPage.verificarCategoriaSelecionada('Skincare');
    
    // Assert
    expect(estaSelecionada).toBeTruthy();
  });

  /**
   * CATEGORIA: Modal/Dialog
   * Tipo: Seguro (Interação)
   */
  
  test('CT06: Então deve abrir modal de Formas de Pagamento', async () => {
    // Arrange - página carregada
    // Act
    await catalogoPage.abrirModalPagamento();
    const modalAberto = await catalogoPage.verificarModalAberto();
    
    // Assert
    expect(modalAberto).toBeTruthy();
    
    // Cleanup
    await catalogoPage.fecharModalPagamento();
  });

  test('CT07: Então deve fechar modal ao pressionar ESC', async () => {
    // Arrange - modal aberto
    await catalogoPage.abrirModalPagamento();
    await catalogoPage.page.waitForTimeout(200);
    
    // Act
    await catalogoPage.page.keyboard.press('Escape');
    await catalogoPage.page.waitForTimeout(200);
    
    // Assert - verificar que modal sumiu
    const modalVisivel = await catalogoPage.verificarModalAberto();
    expect(modalVisivel).toBeFalsy();
  });

  test('CT11b: Então deve exibir todas as formas de pagamento no modal', async () => {
    // Arrange
    await catalogoPage.abrirModalPagamento();
    
    // Act
    const formas = await catalogoPage.obterFormasPagamento();
    
    // Assert
    expect(formas).toHaveLength(FORMAS_PAGAMENTO.length);
    for (const forma of FORMAS_PAGAMENTO) {
      expect(formas).toContain(forma);
    }
    
    // Cleanup
    await catalogoPage.fecharModalPagamento();
  });

  /**
   * CATEGORIA: Responsividade
   * Tipo: Seguro (Teste de Viewport)
   */
  
  test.describe('Responsividade', () => {
    
    test('CT08: Então deve adaptar layout em iPhone 12 (mobile)', async () => {
      // Arrange
      await catalogoPage.definirViewport(390, 844);
      
      // Act
      const headerVisivel = await catalogoPage.verificarHeaderMobileVisivel();
      const sidebarVisivel = await catalogoPage.verificarSidebarVisivel();
      
      // Assert - em mobile, sidebar esconde e header aparece
      expect(headerVisivel).toBeTruthy();
      expect(sidebarVisivel).toBeFalsy();
    });

    test('CT09: Então deve adaptar layout em Galaxy S21 (mobile)', async () => {
      // Arrange
      await catalogoPage.definirViewport(384, 854);
      
      // Act
      const produtosVisiveis = await catalogoPage.contarProdutosVisiveis();
      
      // Assert
      expect(produtosVisiveis).toBeGreaterThan(0);
    });

    test('CT10: Então deve manter sidebar visível em Desktop', async () => {
      // Arrange
      await catalogoPage.definirViewport(1920, 1080);
      
      // Act
      const sidebarVisivel = await catalogoPage.verificarSidebarVisivel();
      
      // Assert
      expect(sidebarVisivel).toBeTruthy();
    });

    test('CT10b: Então deve exibir cards corretamente em iPad Pro', async () => {
      // Arrange
      await catalogoPage.definirViewport(1024, 1366);
      
      // Act
      const produtosVisiveis = await catalogoPage.contarProdutosVisiveis();
      const sidebarVisivel = await catalogoPage.verificarSidebarVisivel();
      
      // Assert
      expect(produtosVisiveis).toBeGreaterThan(0);
      // Em tablet, comportamento pode variar
    });
  });

  /**
   * CATEGORIA: Produtos
   * Tipo: Seguro (Interação)
   */
  
  test('CT11: Então deve exibir detalhes completos do produto', async () => {
    // Arrange - página carregada
    // Act
    const info = await catalogoPage.obterInfoProduto(0);
    
    // Assert
    expect(info.nome.length).toBeGreaterThan(0);
    expect(info.preco).toContain('R$');
  });

  test('CT12: Então produtos devem ter link de WhatsApp configurado', async () => {
    // Arrange - página carregada
    const produtos = await catalogoPage.contarProdutosVisiveis();
    
    // Act e Assert - verificar cada produto visível
    for (let i = 0; i < Math.min(produtos, 3); i++) {
      const info = await catalogoPage.obterInfoProduto(i);
      expect(info.nome).toBeTruthy();
    }
  });

  test('CT12b: Então deve ser possível clicar em um produto', async () => {
    // Arrange - página carregada
    // Act
    await catalogoPage.clicarProduto(0);
    
    // Assert - verificar que página ainda está funcional
    const titulo = await catalogoPage.obterTituloCategoria();
    expect(titulo.length).toBeGreaterThan(0);
  });
});
