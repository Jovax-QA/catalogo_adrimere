/**
 * Dados e interfaces do Catálogo de Beleza
 * @module data/catalogo.data
 */

/** Interface de uma categoria */
export interface Categoria {
  id: string;
  nome: string;
  icone: string;
  quantidadeProdutosEsperada: number;
}

/** Interface de um produto */
export interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  imagemUrl: string;
}

/** Interface de viewport para testes responsivos */
export interface Viewport {
  nome: string;
  width: number;
  height: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

/** Categorias disponíveis */
export const CATEGORIAS: Categoria[] = [
  { id: 'perfumes', nome: 'Perfumes', icone: 'droplets', quantidadeProdutosEsperada: 3 },
  { id: 'maquiagem', nome: 'Maquiagem', icone: 'brush', quantidadeProdutosEsperada: 3 },
  { id: 'skincare', nome: 'Skincare', icone: 'heart', quantidadeProdutosEsperada: 3 },
  { id: 'cabelos', nome: 'Cabelos', icone: 'sparkles', quantidadeProdutosEsperada: 3 },
];

/** Viewports para testes responsivos */
export const VIEWPORTS: Viewport[] = [
  { nome: 'iPhone 12', width: 390, height: 844, deviceType: 'mobile' },
  { nome: 'Galaxy S21', width: 384, height: 854, deviceType: 'mobile' },
  { nome: 'iPad Pro', width: 1024, height: 1366, deviceType: 'tablet' },
  { nome: 'Desktop Full HD', width: 1920, height: 1080, deviceType: 'desktop' },
];

/** Formas de pagamento esperadas */
export const FORMAS_PAGAMENTO = [
  'PIX',
  'Cartão de Crédito',
  'Cartão de Débito',
  'Dinheiro',
];

/** Gera nome único para testes (apenas letras) */
export function gerarNomeUnico(prefixo: string = 'Teste'): string {
  const timestamp = Date.now().toString(36);
  return `${prefixo}${timestamp}`.replace(/[^a-zA-Z]/g, '');
}

/** Formata preço para comparação */
export function formatarPreco(preco: number): string {
  return `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

/** URLs do projeto */
export const URLS = {
  base: 'http://192.168.101.28:5174/',
  catalogo: 'http://192.168.101.28:5174/',
} as const;
