# Catálogo Beleza - Arquitetura do Projeto

## Visão Geral
Catálogo digital de produtos de beleza com interface moderna, responsiva e performática.

---

## Stack Tecnológica

| Camada | Tecnologia | Versão | Propósito |
|--------|-----------|--------|-----------|
| Runtime | Node.js | 16.x | Execução local |
| Framework | React | 18.2.x | UI Library |
| Language | TypeScript | 5.x | Type safety |
| Build | Vite | 4.5.x | Bundler + Dev server |
| Styling | Tailwind CSS | 3.x | Utility-first CSS |
| UI Components | shadcn/ui | - | Base component library |
| Router | Wouter | 3.x | Routing leve |
| Icons | Lucide React | 0.400.x | Ícones consistentes |
| Forms | React Hook Form | 7.x | Gerenciamento de formulários |
| Validation | Zod | 3.x | Schema validation |
| Animation | Framer Motion | 11.x | Animações declarativas |
| Charts | Recharts | 2.x | Visualização de dados |

---

## Estrutura de Pastas

```
catalogo-beleza/
├── docs/                      # Documentação
│   ├── sdd/                   # System Design Documents
│   ├── adr/                   # Architecture Decision Records
│   └── ARCHITECTURE.md        # Este arquivo
├── public/                    # Assets estáticos
├── src/
│   ├── components/
│   │   ├── ui/               # shadcn/ui components (58+)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── CategoryTabs.tsx   # Navegação por categoria
│   │   ├── ProductCarousel.tsx # Carrossel de produtos
│   │   └── ...               # Outros componentes de negócio
│   ├── pages/
│   │   ├── Home.tsx          # Página inicial
│   │   └── Catalog.tsx       # Catálogo de produtos
│   ├── hooks/
│   │   ├── use-mobile.tsx    # Detect mobile viewport
│   │   └── use-toast.tsx     # Toast notifications
│   ├── lib/
│   │   └── utils.ts          # Utilitários (cn, etc)
│   ├── data/
│   │   └── products.ts       # Dados mock de produtos
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Entry point
│   └── index.css             # Estilos globais + Tailwind
├── index.html                # HTML template
├── vite.config.ts            # Config Vite
├── tsconfig.json            # Config TypeScript
├── tailwind.config.js       # Config Tailwind v3
├── postcss.config.js        # Config PostCSS
└── package.json             # Dependências
```

---

## Arquitetura de Componentes

### 1. Componentes UI (shadcn/ui)
Baseados em Radix UI primitives. Totalmente acessíveis, customizáveis.

**Princípios:**
- Composição over configuration
- Props forwards para elementos subjacentes
- Variantes via `class-variance-authority` (cva)

**Exemplo:**
```tsx
// Button com variantes
<Button variant="default" size="lg">
  Clique aqui
</Button>
```

### 2. Componentes de Negócio
Componentes específicos do domínio de catálogo de beleza.

**Existentes:**
- `CategoryTabs` - Tabs de navegação por categoria
- `ProductCarousel` - Carrossel de produtos em destaque
- `Catalog` - Página de listagem de produtos

### 3. Padrão de Composição
```tsx
// ❌ Evitar: Props excessivas
<ProductCard 
  title="..." 
  price="..." 
  image="..."
  onAddToCart="..."
/>

// ✅ Preferir: Composição
<ProductCard>
  <ProductImage src="..." />
  <ProductInfo>
    <Title>...</Title>
    <Price>...</Price>
  </ProductInfo>
  <AddToCartButton />
</ProductCard>
```

---

## Estado e Data Flow

### Estado Local
- `useState` para estado simples de componentes
- `useReducer` para estado complexo

### Estado Global
- **Ainda não implementado**: Context API ou Zustand para estado global
- **Server State**: React Query (a implementar) para cache de API

### Data Flow
```
[Página] → [Componente Container] → [Componentes UI]
              ↓
         [Hooks/Data]
              ↓
         [Mock Data / API]
```

---

## Roteamento

Usando **Wouter** (alternativa leve ao React Router):

```tsx
// App.tsx
import { Route, Switch } from "wouter";

<Switch>
  <Route path="/" component={Home} />
  <Route path="/catalogo" component={Catalog} />
</Switch>
```

**Features:**
- Hooks: `useRoute`, `useLocation`, `useParams`
- Tamanho: ~2KB vs ~40KB do React Router

---

## Estilos (Tailwind v3)

### Configuração
```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Customizações
    }
  }
}
```

### Variáveis CSS (Design Tokens)
Definidas em `src/index.css`:

```css
:root {
  --primary: 340 80% 60%;        /* HSL format */
  --background: 340 30% 98%;
  --foreground: 340 15% 15%;
  --radius: .75rem;
  
  /* ...mais tokens */
}
```

### Utilitário de Classes
```tsx
import { cn } from "@/lib/utils";

// Merge condicional de classes
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className // allow override
)}>
```

---

## Performance Considerações

### Atuais
- ✅ Vite para HMR rápido e builds otimizados
- ✅ Componentes UI com tree-shaking
- ✅ Lazy loading de páginas (a implementar)

### Melhorias Futuras
- [ ] Code splitting por rota
- [ ] Lazy loading de imagens
- [ ] Service Worker para cache
- [ ] Preload de recursos críticos
- [ ] Virtualização para listas longas

---

## Acessibilidade

### Implementado
- ✅ shadcn/ui baseado em Radix (acessível por padrão)
- ✅ Semântica HTML nos componentes
- ✅ Focus management em modais/dropdowns

### A Melhorar
- [ ] ARIA labels em todos os ícones
- [ ] Skip navigation link
- [ ] Color contrast audit
- [ ] Keyboard navigation testes

---

## Testes (A Implementar)

### Planejado
```
__tests__/
├── unit/
│   └── components/
├── integration/
│   └── pages/
└── e2e/
    └── flows/
```

### Stack de Testes
- **Unit**: Vitest + React Testing Library
- **E2E**: Playwright
- **Visual**: Storybook (opcional)

---

## Build e Deploy

### Scripts
```bash
npm run dev      # Desenvolvimento (porta 5173)
npm run build    # Produção (dist/)
npm run serve    # Preview produção
npm run typecheck # Validação TypeScript
```

### Variáveis de Ambiente
```bash
PORT=5173        # Porta do servidor
BASE_PATH=/      # Base path da aplicação
```

### Output
- **Dev**: Vite dev server com HMR
- **Build**: Static files em `dist/`

---

## Decisões Arquiteturais (ADRs)

| ADR | Título | Status | Data |
|-----|--------|--------|------|
| ADR-001 | [Exemplo] Escolha do Wouter over React Router | Proposto | 2024-XX-XX |

---

## Roadmap Técnico

### Fase 1: Foundation (Atual)
- [x] Setup projeto com Vite + React + TS
- [x] Configuração Tailwind v3
- [x] Setup shadcn/ui
- [x] Documentação inicial

### Fase 2: Features Core
- [ ] Integração com API real
- [ ] Implementar React Query
- [ ] Sistema de autenticação
- [ ] Carrinho de compras

### Fase 3: Qualidade
- [ ] Setup testes (Vitest + RTL)
- [ ] CI/CD pipeline
- [ ] Monitoramento (Sentry)
- [ ] Analytics

### Fase 4: Escalabilidade
- [ ] PWA features
- [ ] Otimização de performance
- [ ] i18n (internacionalização)
- [ ] Feature flags

---

## Referências

- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Wouter](https://github.com/molefrog/wouter)
- [Radix UI](https://www.radix-ui.com/)

---

## Contribuindo

1. Leia o SDD relacionado (se existir)
2. Siga os padrões do agente Frontend Senior
3. Crie/Atualize ADRs para decisões arquiteturais
4. Mantenha documentação atualizada

---

*Última atualização: 2024-XX-XX*
