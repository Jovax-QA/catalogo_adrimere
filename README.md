# Catálogo Beleza

Aplicação de catálogo digital de produtos de beleza com interface moderna, responsiva e performática.

---

## 🚀 Tecnologias

- **React 18** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool e dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **shadcn/ui** - Component library (Radix UI + Tailwind)
- **Wouter** - Lightweight router

---

## 📦 Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd catalogo-beleza

# Instale dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O servidor estará disponível em `http://localhost:5173`

---

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run serve` | Preview do build de produção |
| `npm run typecheck` | Verificação de tipos TypeScript |

---

## 📁 Estrutura do Projeto

```
├── docs/                    # Documentação técnica
│   ├── sdd/                # System Design Documents
│   ├── adr/                # Architecture Decision Records
│   ├── ARCHITECTURE.md     # Arquitetura do sistema
│   └── README.md           # Guia de documentação
├── src/
│   ├── components/
│   │   ├── ui/            # shadcn/ui components
│   │   └── *.tsx          # Componentes de negócio
│   ├── pages/             # Páginas da aplicação
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilitários
│   ├── data/              # Dados/mock
│   ├── App.tsx            # Root component
│   └── main.tsx           # Entry point
├── public/                # Assets estáticos
└── vite.config.ts         # Configuração Vite
```

---

## 📚 Documentação

### 📖 [docs/README.md](./docs/README.md)
Guia completo de documentação do projeto, incluindo:
- Como criar SDDs (System Design Documents)
- Como criar ADRs (Architecture Decision Records)
- Fluxo de trabalho de documentação

### 🏗️ [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
Documentação completa da arquitetura:
- Stack tecnológica detalhada
- Estrutura de componentes
- Padrões de código
- Decisões arquiteturais

### 🤖 [.windsurf/agents/frontend-senior.md](./.windsurf/agents/frontend-senior.md)
Agente especializado para desenvolvimento frontend:
- Padrões de código
- Checklist de code review
- Workflow de desenvolvimento

---

## 🎨 Design System

O projeto utiliza shadcn/ui como base, com customizações via CSS variables:

```css
:root {
  --primary: 340 80% 60%;
  --background: 340 30% 98%;
  --foreground: 340 15% 15%;
  --radius: .75rem;
  /* ... mais tokens */
}
```

### Componentes Disponíveis

Todos os componentes shadcn/ui estão disponíveis em `src/components/ui/`:
- Button, Card, Dialog, Dropdown Menu
- Form, Input, Select, Tabs
- E muitos outros (58+ componentes)

---

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
PORT=5173              # Porta do servidor dev
BASE_PATH=/            # Base path (para deploy em subdiretório)
```

### Tailwind CSS

Configuração em `tailwind.config.js`:
```javascript
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

---

## 🧪 Testes

> Testes serão implementados em fase futura.

Stack planejada:
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing

---

## 📋 Convenções

### Código
- Componentes: PascalCase (ex: `ProductCard.tsx`)
- Hooks: camelCase com prefixo `use` (ex: `useProducts.ts`)
- Utilitários: camelCase (ex: `formatPrice.ts`)
- Tipos: PascalCase com sufixo (ex: `ProductProps`)

### Commits
```
tipo(escopo): descrição

feat(catalog): adiciona filtro por preço
fix(ui): corrige z-index do modal
docs(readme): atualiza instruções de instalação
```

### Branches
```
feature/SDD-XXX-descricao
fix/bug-descricao
hotfix/critico-descricao
```

---

## 🎯 Roadmap

### Fase 1: Foundation ✅
- [x] Setup React + Vite + TypeScript
- [x] Configuração Tailwind CSS
- [x] Integração shadcn/ui
- [x] Documentação inicial

### Fase 2: Features Core
- [ ] Página de catálogo com filtros
- [ ] Busca de produtos
- [ ] Integração com API
- [ ] Sistema de autenticação

### Fase 3: Qualidade
- [ ] Setup testes (Vitest + RTL)
- [ ] CI/CD pipeline
- [ ] Monitoramento
- [ ] Analytics

### Fase 4: Escalabilidade
- [ ] PWA features
- [ ] Otimização de performance
- [ ] Internacionalização
- [ ] Feature flags

---

## 🤝 Contribuindo

1. Leia a [documentação](./docs/README.md)
2. Siga o agente [Frontend Senior](./.windsurf/agents/frontend-senior.md)
3. Crie SDDs para features significativas
4. Documente decisões técnicas em ADRs
5. Siga o checklist de code review

---

## 📄 Licença

[Adicionar licença do projeto]

---

## 📞 Suporte

- Documentação: [`docs/`](./docs/)
- Arquitetura: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- Issues: [GitHub Issues](link)

---

*Desenvolvido com ❤️ usando React, TypeScript e Tailwind CSS*
