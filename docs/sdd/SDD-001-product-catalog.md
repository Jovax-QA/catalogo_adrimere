# SDD-001: Catálogo de Produtos

## Identificação
- **Código**: SDD-001
- **Título**: Catálogo de Produtos com Filtros e Busca
- **Data**: 2024-04-19
- **Autor**: Jovani Custodio
- **Status**: Rascunho
- **Stakeholders**: Time de Produto, UX

---

## 1. Visão Geral

### 1.1 Propósito
Desenvolver uma página de catálogo de produtos que permita aos usuários:
- Visualizar produtos organizados por categoria
- Buscar produtos por nome/descrição
- Filtrar por faixa de preço, marca, avaliação
- Ordenar por relevância, preço, avaliação

### 1.2 Contexto
O catálogo é o core do sistema. Usuários precisam encontrar produtos facilmente antes de qualquer outra ação (adicionar ao carrinho, favoritar, etc).

### 1.3 Escopo
- **Incluído**: Listagem, filtros, busca, ordenação, paginação
- **Excluído**: Carrinho de compras, checkout, sistema de favoritos

---

## 2. Requisitos

### 2.1 Requisitos Funcionais
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-001 | Exibir grid de produtos com imagem, nome, preço, avaliação | Alta |
| RF-002 | Filtrar produtos por categoria via tabs | Alta |
| RF-003 | Busca em tempo real por texto | Alta |
| RF-004 | Filtro por faixa de preço (min/max) | Média |
| RF-005 | Ordenar por: Relevância, Menor Preço, Maior Preço, Avaliação | Média |
| RF-006 | Paginação ou infinite scroll | Média |
| RF-007 | Visualização em grid vs lista | Baixa |

### 2.2 Requisitos Não-Funcionais
| ID | Descrição | Métrica |
|----|-----------|---------|
| RNF-001 | Tempo de carregamento inicial | < 2 segundos |
| RNF-002 | Busca em tempo real | Debounce 300ms |
| RNF-003 | Responsividade | Mobile-first |
| RNF-004 | Acessibilidade | WCAG 2.1 AA |
| RNF-005 | SEO | Meta tags dinâmicas por categoria |

---

## 3. Design de Interface

### 3.1 Wireframes
```
┌─────────────────────────────────────────────────────────┐
│  [Logo]  [Busca: _______________]  [Carrinho] [Menu]   │
├─────────────────────────────────────────────────────────┤
│  [Todas] [Skincare] [Maquiagem] [Cabelo] [Corpo]       │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │          │  │          │  │          │             │
│  │  Imagem  │  │  Imagem  │  │  Imagem  │   ...       │
│  │          │  │          │  │          │             │
│  │ Nome     │  │ Nome     │  │ Nome     │             │
│  │ ★★★★☆    │  │ ★★★★★    │  │ ★★★☆☆    │             │
│  │ R$ 99,00 │  │ R$ 89,00 │  │ R$ 79,00 │             │
│  └──────────┘  └──────────┘  └──────────┘             │
├─────────────────────────────────────────────────────────┤
│  [Filtros ▼]  [Ordenar: Relevância ▼]    [< 1 2 3 ... >]│
└─────────────────────────────────────────────────────────┘
```

### 3.2 Fluxo de Usuário
```
Entrada → [Ver Categorias] → [Selecionar Categoria] → [Ver Produtos]
                                    ↓
                            [Aplicar Filtros] → [Atualizar Lista]
                                    ↓
                            [Buscar Texto] → [Filtrar em Tempo Real]
                                    ↓
                            [Ordenar] → [Reordenar Lista]
```

### 3.3 Estados da UI
| Estado | Descrição | Tratamento |
|--------|-----------|------------|
| Loading | Primeiro carregamento | Skeleton cards grid |
| Loading More | Paginação/infinite scroll | Spinner no final |
| Error | Falha na API | Mensagem + botão retry |
| Empty Search | Busca sem resultados | Ilustração + sugestões |
| Empty Category | Categoria vazia | Mensagem informativa |
| Filtered | Filtros aplicados | Badge de filtros ativos |

---

## 4. Arquitetura Técnica

### 4.1 Componentes
```
CatalogPage
├── CategoryTabs          // Navegação por categoria
├── SearchBar             // Input de busca
├── FilterPanel           // Filtros laterais/mobile drawer
│   ├── PriceRangeFilter
│   ├── BrandFilter
│   └── RatingFilter
├── SortDropdown          // Ordenação
├── ProductGrid           // Grid de produtos
│   └── ProductCard       // Card individual
│       ├── ProductImage
│       ├── ProductInfo
│       └── AddToCartButton
├── Pagination            // Paginação ou load more
└── EmptyState            // Estados vazios
```

### 4.2 Props e Interfaces
```typescript
// types/product.ts
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  brand: string;
  tags: string[];
  inStock: boolean;
}

interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  minRating?: number;
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'rating';
  page?: number;
  limit?: number;
}

// ProductCard
interface ProductCardProps {
  product: Product;
  view?: 'grid' | 'list';
  onAddToCart?: (productId: string) => void;
}

// ProductGrid
interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  view?: 'grid' | 'list';
}
```

### 4.3 Estados (React)
```typescript
// Catalog Page State
interface CatalogState {
  // Data
  products: Product[];
  totalCount: number;
  
  // Filters (URL-synced)
  filters: ProductFilters;
  
  // UI State
  isLoading: boolean;
  isLoadingMore: boolean;
  error: Error | null;
  view: 'grid' | 'list';
  showMobileFilters: boolean;
}

// Estado sincronizado com URL para shareable links
// /catalogo?categoria=skincare&busca=serum&ordenar=preco_asc
```

### 4.4 Integrações
| Serviço | Endpoint | Método | Descrição |
|---------|----------|--------|-----------|
| API | `/api/products` | GET | Listar produtos com filtros |
| API | `/api/products/search` | GET | Busca textual |
| API | `/api/categories` | GET | Lista de categorias |
| API | `/api/brands` | GET | Lista de marcas para filtros |

---

## 5. Implementação

### 5.1 Estrutura de Arquivos
```
src/
├── pages/
│   └── Catalog.tsx
├── components/
│   ├── catalog/
│   │   ├── CategoryTabs.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductCard.tsx
│   │   ├── SortDropdown.tsx
│   │   └── EmptyState.tsx
│   └── filters/
│       ├── PriceRangeFilter.tsx
│       ├── BrandFilter.tsx
│       └── RatingFilter.tsx
├── hooks/
│   ├── useProducts.ts          // React Query hook
│   ├── useFilters.ts           // Gerenciamento de filtros
│   └── useDebounce.ts          // Debounce para busca
├── types/
│   └── product.ts
└── utils/
    ├── filters.ts              // Lógica de filtro
    └── urlSync.ts              // Sincronização URL
```

### 5.2 Dependências
```json
{
  "@tanstack/react-query": "^5.0.0",
  "zustand": "^4.5.0"        // Opcional: estado global
}
```

### 5.3 Configurações

**URL Sync com wouter:**
```typescript
// hooks/useFilters.ts
import { useLocation } from 'wouter';

export function useFilters() {
  const [location, setLocation] = useLocation();
  
  // Parse filters from URL
  // Update URL when filters change
  // Enable browser back/forward
}
```

---

## 6. Testes

### 6.1 Casos de Teste
| Cenário | Entrada | Resultado Esperado |
|---------|---------|-------------------|
| Busca simples | "sérum" | Produtos com "sérum" no nome/desc |
| Filtro categoria | Tab "Skincare" | Apenas produtos skincare |
| Filtro preço | Min: 50, Max: 100 | Produtos entre R$50-100 |
| Ordenação preço | "Menor Preço" | Lista ordenada crescente |
| URL compartilhável | URL com query params | Mesmos filtros aplicados |
| Sem resultados | Busca "xyz123" | Estado empty com sugestões |

### 6.2 Testes de Acessibilidade
- [ ] Navegação tabs por teclado (Tab, Enter, Arrow keys)
- [ ] Labels em inputs de filtro
- [ ] Alt text em imagens de produtos
- [ ] Focus visible nos cards
- [ ] Leitor de tela anuncia resultados

---

## 7. Considerações

### 7.1 Performance
- [ ] Virtualização para listas grandes (react-window)
- [ ] Debounce 300ms na busca
- [ ] Prefetch próxima página
- [ ] Skeleton loaders durante fetch
- [ ] Otimização de imagens (lazy loading, WebP)

### 7.2 SEO
- [ ] Meta title/desc dinâmicos por categoria
- [ ] Structured data (Product schema)
- [ ] URLs amigáveis: `/catalogo/skincare`
- [ ] Sitemap dinâmico

### 7.3 Responsividade
| Breakpoint | Comportamento |
|------------|---------------|
| Mobile (<640px) | 2 colunas, filtros em drawer |
| Tablet (640-1024px) | 3 colunas, filtros sidebar |
| Desktop (>1024px) | 4 colunas, filtros sidebar fixo |

---

## 8. Critérios de Aceite

- [ ] RF-001 a RF-007 implementados
- [ ] Testes unitários passando (>80% coverage)
- [ ] Testes de integração passando
- [ ] Lighthouse score > 90 (Performance, A11y, SEO)
- [ ] Code review aprovado por Frontend Senior
- [ ] Testado em Chrome, Firefox, Safari, Edge
- [ ] Mobile tested (iOS Safari, Android Chrome)

---

## 9. Referências

- [Figma - Catálogo](link)
- [Product Schema.org](https://schema.org/Product)
- [React Query Pagination](https://tanstack.com/query/latest/docs/react/guides/pagination)
- [URL Search Params](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

---

## Histórico de Versões

| Versão | Data | Autor | Alterações |
|--------|------|-------|------------|
| 0.1 | 2024-04-19 | Jovani Custodio | Criação inicial |
