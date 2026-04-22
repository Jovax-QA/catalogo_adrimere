/**
 * Page Object do Catálogo de Beleza
 * @module pages/catalogo.page
 */

import { Page, Locator, expect } from '@playwright/test';
import { CatalogoElements } from '../elements/catalogo.elements';
import { Categoria, CATEGORIAS, URLS } from '../data/catalogo.data';

export class CatalogoPage {
  /** Página do Playwright */
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navega para a URL base do catálogo
   */
  async navegar(): Promise<void> {
    await this.page.goto(URLS.base);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Acessa uma categoria específica
   * @param nomeCategoria - Nome da categoria a ser clicada
   */
  async selecionarCategoria(nomeCategoria: string): Promise<void> {
    const botao = this.page.locator('[data-testid="category-button"]').filter({ hasText: nomeCategoria }).first();
    await botao.click();
    await this.page.waitForTimeout(300);
  }

  /**
   * Obtém o título da categoria ativa
   * @returns Texto do título
   */
  async obterTituloCategoria(): Promise<string> {
    const titulo = this.page.locator(CatalogoElements.conteudo.tituloCategoria);
    await expect(titulo).toBeVisible();
    return await titulo.textContent() || '';
  }

  /**
   * Obtém o número de produtos exibido no texto "X produtos"
   * @returns Número de produtos
   */
  async obterQuantidadeProdutosTexto(): Promise<number> {
    const contador = this.page.locator(CatalogoElements.conteudo.contadorProdutos);
    await expect(contador).toBeVisible();
    const texto = await contador.textContent() || '';
    const match = texto.match(/(\d+)\s+produtos/);
    return match ? parseInt(match[1], 10) : 0;
  }

  /**
   * Conta quantos cards de produto estão visíveis na tela
   * @returns Quantidade de cards
   */
  async contarProdutosVisiveis(): Promise<number> {
    const cards = this.page.locator(CatalogoElements.produtoCard.container);
    return await cards.count();
  }

  /**
   * Valida se a quantidade exibida corresponde aos produtos visíveis
   */
  async validarQuantidadeProdutos(): Promise<void> {
    const quantidadeTexto = await this.obterQuantidadeProdutosTexto();
    const quantidadeVisivel = await this.contarProdutosVisiveis();
    
    expect(quantidadeVisivel).toBe(quantidadeTexto);
  }

  /**
   * Verifica se a categoria está selecionada (destacada)
   * @param nomeCategoria - Nome da categoria
   */
  async verificarCategoriaSelecionada(nomeCategoria: string): Promise<boolean> {
    const botao = this.page.locator('[data-testid="category-button"]').filter({ hasText: nomeCategoria }).first();
    const classes = await botao.getAttribute('class') || '';
    return classes.includes('bg-rose-500') || classes.includes('text-white');
  }

  /**
   * Abre o modal de Formas de Pagamento
   */
  async abrirModalPagamento(): Promise<void> {
    const botao = this.page.locator(CatalogoElements.modalPagamento.trigger).first();
    await botao.click();
    await this.page.waitForTimeout(200);
  }

  /**
   * Fecha o modal de Formas de Pagamento
   */
  async fecharModalPagamento(): Promise<void> {
    const botaoFechar = this.page.locator(CatalogoElements.modalPagamento.botaoFechar);
    if (await botaoFechar.isVisible().catch(() => false)) {
      await botaoFechar.click();
    } else {
      await this.page.keyboard.press('Escape');
    }
  }

  /**
   * Verifica se o modal está visível
   */
  async verificarModalAberto(): Promise<boolean> {
    const modal = this.page.locator(CatalogoElements.modalPagamento.container);
    return await modal.isVisible().catch(() => false);
  }

  /**
   * Obtém as formas de pagamento listadas no modal
   */
  async obterFormasPagamento(): Promise<string[]> {
    const formas: string[] = [];
    
    if (await this.page.locator('text=PIX').isVisible().catch(() => false)) {
      formas.push('PIX');
    }
    if (await this.page.locator('text=Cartão de Crédito').isVisible().catch(() => false)) {
      formas.push('Cartão de Crédito');
    }
    if (await this.page.locator('text=Cartão de Débito').isVisible().catch(() => false)) {
      formas.push('Cartão de Débito');
    }
    if (await this.page.locator('text=Dinheiro').isVisible().catch(() => false)) {
      formas.push('Dinheiro');
    }
    
    return formas;
  }

  /**
   * Define o viewport para testes responsivos
   * @param width - Largura
   * @param height - Altura
   */
  async definirViewport(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
    await this.page.waitForTimeout(300);
  }

  /**
   * Verifica se a sidebar está visível (apenas desktop)
   */
  async verificarSidebarVisivel(): Promise<boolean> {
    const sidebar = this.page.locator(CatalogoElements.sidebar.container);
    return await sidebar.isVisible().catch(() => false);
  }

  /**
   * Verifica se o header mobile está visível
   */
  async verificarHeaderMobileVisivel(): Promise<boolean> {
    const header = this.page.locator(CatalogoElements.header.container);
    return await header.isVisible().catch(() => false);
  }

  /**
   * Verifica se produtos estão sendo exibidos
   */
  async verificarProdutosExibidos(): Promise<boolean> {
    const produtos = await this.contarProdutosVisiveis();
    return produtos > 0;
  }

  /**
   * Clica em um produto específico (simula interesse)
   * @param index - Índice do produto (0-based)
   */
  async clicarProduto(index: number = 0): Promise<void> {
    const cards = this.page.locator(CatalogoElements.produtoCard.container);
    const card = cards.nth(index);
    await card.click();
  }

  /**
   * Obtém informações de um produto
   * @param index - Índice do produto
   */
  async obterInfoProduto(index: number): Promise<{ nome: string; preco: string }> {
    const card = this.page.locator(CatalogoElements.produtoCard.container).nth(index);
    const nome = await card.locator(CatalogoElements.produtoCard.nome).textContent() || '';
    const preco = await card.locator(CatalogoElements.produtoCard.preco).textContent() || '';
    return { nome: nome.trim(), preco: preco.trim() };
  }
}
