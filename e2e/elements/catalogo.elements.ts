/**
 * Seletores do Catálogo de Beleza
 * @module elements/catalogo.elements
 */

export const CatalogoElements = {
  /** Header mobile com navegação */
  header: {
    container: 'header',
    categoriaBotoes: 'header button',
  },

  /** Sidebar desktop */
  sidebar: {
    container: 'aside',
    logo: 'img[alt="AdriMere"]',
    categoriaBotoes: 'aside nav button',
    botaoPagamento: 'aside button:has-text("Formas de Pagamento")',
    infoCardWhatsApp: 'aside .bg-green-50',
  },

  /** Conteúdo principal */
  conteudo: {
    container: 'main',
    tituloCategoria: 'main h2',
    contadorProdutos: '[data-testid="product-count"]',
    productCarousel: '[class*="ProductCarousel"]',
  },

  /** Cards de produtos */
  produtoCard: {
    container: '[data-testid="product-card"]',
    imagem: '[data-testid="product-image"]',
    nome: '[data-testid="product-name"]',
    preco: '[data-testid="product-price"]',
    botaoWhatsApp: 'a[href*="wa.me"]',
  },

  /** Modal de pagamento */
  modalPagamento: {
    trigger: 'button:has-text("Formas de Pagamento")',
    container: '[role="dialog"], [class*="DialogContent"]',
    titulo: 'h2:has-text("Formas de Pagamento")',
    opcaoPIX: 'text=PIX',
    opcaoCredito: 'text=Cartão de Crédito',
    opcaoDebito: 'text=Cartão de Débito',
    opcaoDinheiro: 'text=Dinheiro',
    botaoFechar: 'button[aria-label="Close"], button:has([class*="X"])',
  },

  /** Categorias */
  categorias: {
    perfumes: 'button:has-text("Perfumes")',
    maquiagem: 'button:has-text("Maquiagem")',
    skincare: 'button:has-text("Skincare")',
    cabelos: 'button:has-text("Cabelos")',
  },
} as const;
