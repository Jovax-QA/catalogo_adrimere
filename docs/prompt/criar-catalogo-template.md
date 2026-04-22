# Prompt Template: Criar Catálogo de Produtos com WhatsApp (Baseado no Catálogo de Beleza)

Use este prompt para criar projetos de catálogo de produtos semelhantes ao Catálogo de Beleza AdriMere, incluindo todas as boas práticas de arquitetura, documentação, testes e deploy.

---

## INSTRUÇÕES GERAIS

Crie um projeto React + Vite + TypeScript + TailwindCSS de catálogo de produtos com as seguintes características:

### 1. ESTRUTURA DO PROJETO

```
projeto-catalogo/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions para build, test e deploy
├── docs/
│   ├── README.md               # Documentação geral do projeto
│   ├── SETUP.md                # Como configurar e rodar o projeto
│   ├── ARCHITECTURE.md         # Arquitetura modular e padrões
│   ├── adr/                    # Architecture Decision Records
│   │   ├── TEMPLATE_ADR.md     # Template para ADRs
│   │   └── ADR-001-*.md       # ADRs das decisões arquiteturais
│   ├── sdd/                    # Software Design Documents
│   │   ├── TEMPLATE_SDD.md     # Template para SDDs
│   │   └── SDD-001-*.md       # SDDs dos componentes principais
│   └── prompt/
│       └── criar-catalogo-template.md  # Este arquivo
├── e2e/                        # Testes E2E com Playwright
│   ├── data/
│   │   └── [nome].data.ts      # Interfaces, massa de dados, utilitários
│   ├── elements/
│   │   └── [nome].elements.ts  # Seletores (data-testid)
│   ├── pages/
│   │   └── [nome].page.ts     # Page Objects
│   └── tests/
│       └── [nome].spec.ts     # Testes AAA
├── public/
│   ├── .nojekyll               # Desabilita Jekyll no GitHub Pages
│   ├── _redirects              # Redirecionamentos SPA (se necessário)
│   ├── favicon.svg
│   ├── logo.jpeg               # Logo da marca
│   └── [imagens-produtos]      # Imagens dos produtos
├── src/
│   ├── components/
│   │   ├── ui/                 # Componentes UI reutilizáveis (shadcn/ui)
│   │   ├── [NomeCard].tsx      # Card de produto
│   │   ├── [NomeCarousel].tsx  # Carrossel de produtos
│   │   └── [Outros].tsx        # Outros componentes específicos
│   ├── data/
│   │   └── products.ts         # Dados dos produtos e categorias
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utilitários
│   ├── pages/                  # Páginas principais
│   │   ├── Catalog.tsx        # Página do catálogo
│   │   └── not-found.tsx      # Página 404
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tests/                      # Testes unitários (se necessário)
├── .gitignore
├── components.json             # Config do shadcn/ui
├── package.json
├── playwright.config.ts        # Config do Playwright
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts              # Config do Vite (dev)
└── vite.github.config.ts       # Config do Vite (GitHub Pages)
```

### 2. ARQUITETURA MODULAR

- **Separation of Concerns**: Cada componente/feature em seu próprio módulo
- **Component-based**: Componentes reutilizáveis e composíveis
- **Type Safety**: TypeScript em todo o projeto
- **Single Source of Truth**: Dados centralizados em `src/data/`
- **Page Object Pattern**: Testes E2E com Page Objects
- **ADR**: Documentar decisões arquiteturais importantes
- **SDD**: Documentar design dos componentes principais

### 3. STACK TECNOLÓGICA

- **Framework**: React 18 com TypeScript
- **Build Tool**: Vite 4+
- **Styling**: TailwindCSS 3+
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Icons**: Lucide React
- **Testes E2E**: Playwright
- **CI/CD**: GitHub Actions
- **Deploy**: GitHub Pages
- **Fonte**: Inter (Google Fonts)

### 4. FUNCIONALIDADES PRINCIPAIS

#### 4.1 Catálogo de Produtos
- Listagem de produtos por categorias
- Filtro por categorias (abas/tabs)
- Carrossel de produtos
- Layout responsivo (mobile, tablet, desktop)
- Imagens dos produtos (locais ou externas)

#### 4.2 Integração WhatsApp
- Link direto para WhatsApp com mensagem pré-formatada
- Incluir todos os detalhes do produto:
  - Nome do produto
  - Preço formatado (R$ XX,XX)
  - URL da imagem
  - Descrição
  - Categoria
- Número do WhatsApp configurável (variável constante)

#### 4.3 Modal de Informações
- Modal com formas de pagamento aceitas
- Ícones visuais para cada forma (PIX, Cartão, etc.)
- Descrição de cada forma de pagamento

#### 4.4 Responsividade
- **Mobile**: Header com navegação horizontal, foto de perfil
- **Tablet**: Layout adaptado
- **Desktop**: Sidebar fixa com categorias e logo grande

### 5. DADOS DOS PRODUTOS

Criar arquivo `src/data/products.ts` com:

```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;  // Nome do ícone Lucide
}

export const WHATSAPP_NUMBER = "55XXXXXXXXXXX";

export const categories: Category[] = [
  { id: "categoria1", name: "Nome Categoria 1", icon: "nome-icone-lucide" },
  // ...
];

export const products: Product[] = [
  {
    id: "1",
    name: "Nome do Produto",
    price: 99.90,
    imageUrl: "/caminho/imagem.jpg",
    category: "categoria1",
    description: "Descrição do produto",
  },
  // ...
];

export function buildWhatsAppLink(product: Product): string {
  const message = `Olá, tenho interesse neste produto:\n\nNome: ${product.name}\nPreço: R$ ${product.price.toFixed(2).replace(".", ",")}\nImagem: ${product.imageUrl}\nDescrição: ${product.description || ""}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(price: number): string {
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
}
```

### 6. CONFIGURAÇÃO DO VITE

#### 6.1 vite.config.ts (Desenvolvimento)
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT) || 5173;
const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(__dirname),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
```

#### 6.2 vite.github.config.ts (GitHub Pages)
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "/[nome-repo]/",  // Substituir pelo nome do repositório
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(__dirname),
  publicDir: path.resolve(__dirname, "public"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    copyPublicDir: true,  // Copia .nojekyll e _redirects para dist
  },
});
```

### 7. CONFIGURAÇÃO DO PLAYWRIGHT

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 8. GITHUB ACTIONS (.github/workflows/deploy.yml)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build -- --config vite.github.config.ts

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run E2E tests
        run: npx playwright test

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 9. TESTES E2E (PAGE OBJECT PATTERN)

#### 9.1 Estrutura dos arquivos

**e2e/data/[nome].data.ts**
```typescript
export interface [Tipo] {
  // Interface TypeScript
}

export const [CONSTANTE] = [valor];

export function [funcaoUtilitaria](): [retorno] {
  // Lógica
}
```

**e2e/elements/[nome].elements.ts**
```typescript
export const [Nome]Elements = {
  elemento: '[data-testid="nome-elemento"]',
  // Seletores usando data-testid
};
```

**e2e/pages/[nome].page.ts**
```typescript
import { Page, Locator, expect } from '@playwright/test';
import { [Nome]Elements } from '../elements/[nome].elements';

export class [Nome]Page {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async [acao](): Promise<void> {
    // Implementação com JSDoc em português
  }

  async [validacao](): Promise<[tipo]> {
    // Implementação
  }
}
```

**e2e/tests/[nome].spec.ts**
```typescript
import { test, expect } from '@playwright/test';
import { [Nome]Page } from '../pages/[nome].page';

test.describe('Dado que o usuário acessa [contexto]', () => {
  let [nome]Page: [Nome]Page;

  test.beforeEach(async ({ page }) => {
    [nome]Page = new [Nome]Page(page);
    await [nome]Page.navegar();
  });

  test('Então deve [resultado esperado]', async () => {
    // Arrange
    // Act
    // Assert
  });
});
```

#### 9.2 Cenários de teste obrigatórios

- **Carga da tela**: Título, categorias, produtos visíveis
- **Navegação por categorias**: Clicar em categoria e filtrar produtos
- **Modal de informações**: Abrir, verificar conteúdo, fechar
- **Link WhatsApp**: Verificar que link está correto com todos os dados
- **Responsividade**: Testar em mobile (iPhone 12, Galaxy S21), tablet, desktop
- **Validação de quantidade**: Número de produtos exibidos = número real

### 10. DOCUMENTAÇÃO (ADR e SDD)

#### 10.1 ADR (Architecture Decision Records)

Criar ADRs para decisões importantes como:
- Escolha do stack (React + Vite + Tailwind)
- Uso de GitHub Pages vs outras plataformas
- Estrutura de testes (Playwright + Page Objects)
- Padrão de componentes (shadcn/ui)
- Integração WhatsApp (deep link)

Template ADR:
```
# ADR-XXX: [Título]

## Status
Proposed / Accepted / Deprecated / Superseded

## Context
[Contexto do problema]

## Decision
[Decisão tomada]

## Consequences
[Consequências positivas e negativas]
```

#### 10.2 SDD (Software Design Documents)

Criar SDDs para componentes principais como:
- Catálogo (listagem, filtros, carrossel)
- Card de Produto
- Modal de Informações
- Integração WhatsApp

Template SDD:
```
# SDD-XXX: [Nome do Componente]

## Propósito
[Objetivo do componente]

## Funcionalidades
[Lista de funcionalidades]

## Interface
[Props, eventos, etc]

## Comportamento
[Como o componente se comporta]

## Dependências
[Outros componentes, serviços]

## Considerações de Design
[Padrões, performance, acessibilidade]
```

### 11. GITHUB PAGES CONFIGURAÇÃO

#### 11.1 Arquivos obrigatórios no public/

- **.nojekyll**: Arquivo vazio para desabilitar Jekyll
- **_redirects**: Se necessário para SPA routing:
  ```
  /* /[nome-repo]/index.html 200
  ```

#### 11.2 Configuração no GitHub

- Settings → Pages
- Source: **GitHub Actions**
- Branch: (automático via workflow)

### 12. SCRIPTS DO PACKAGE.JSON

```json
{
  "scripts": {
    "dev": "vite --config vite.config.ts --host 0.0.0.0",
    "build": "vite build --config vite.config.ts",
    "serve": "vite preview --config vite.config.ts --host 0.0.0.0",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:report": "playwright show-report"
  }
}
```

### 13. CHECKLIST DE IMPLEMENTAÇÃO

- [ ] Criar estrutura de pastas (docs, e2e, src, public)
- [ ] Configurar Vite (vite.config.ts e vite.github.config.ts)
- [ ] Configurar TailwindCSS
- [ ] Instalar shadcn/ui
- [ ] Criar componentes UI base
- [ ] Implementar dados de produtos (src/data/products.ts)
- [ ] Criar componente de catálogo (src/pages/Catalog.tsx)
- [ ] Criar componentes específicos (Card, Carousel, Modal)
- [ ] Implementar integração WhatsApp
- [ ] Configurar Playwright
- [ ] Criar Page Objects (e2e/pages/)
- [ ] Criar testes E2E (e2e/tests/)
- [ ] Criar ADRs (docs/adr/)
- [ ] Criar SDDs (docs/sdd/)
- [ ] Criar documentação (docs/README.md, SETUP.md, ARCHITECTURE.md)
- [ ] Configurar GitHub Actions (.github/workflows/deploy.yml)
- [ ] Adicionar .nojekyll e _redirects no public/
- [ ] Testar build local
- [ ] Testar deploy no GitHub Pages
- [ ] Validar testes E2E no CI
- [ ] Validar responsividade

### 14. DICA DE IMPLEMENTAÇÃO

Comece com o MVP:
1. Estrutura base + Vite + Tailwind
2. Dados de produtos simples
3. Catálogo básico (listagem)
4. Integração WhatsApp
5. Deploy no GitHub Pages

Depois adicione:
6. Componentes avançados (carrossel, modal)
7. Testes E2E
8. Documentação (ADR, SDD)
9. Refinamento de UI/UX

---

## EXEMPLO DE USO DO PROMPT

"Quero criar um catálogo de produtos para [NOME DO NEGÓCIO] com [NÚMERO] categorias. Os produtos são [DESCREVER PRODUTOS]. O número do WhatsApp é [NÚMERO]. O nome do repositório será [NOME-REPO]. Use o template de catálogo de produtos com todas as boas práticas: arquitetura modular, ADR, SDD, testes Playwright com Page Objects, GitHub Actions e deploy no GitHub Pages."

---

## NOTAS IMPORTANTES

- Sempre usar data-testid para seletores nos testes
- URLs dos testes devem ser relativas (/) para funcionar no CI
- Imagens podem ser locais (public/) ou externas (Unsplash, etc)
- Número do WhatsApp deve ser uma constante configurável
- Base path do Vite deve ser configurado corretamente para GitHub Pages
- Testes devem rodar antes do deploy no CI
- Documentar decisões importantes em ADRs
- Documentar design de componentes em SDDs
