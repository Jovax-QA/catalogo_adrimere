# ADR-001: Migração do Tailwind CSS v4 para v3

## Identificação
- **Código**: ADR-001
- **Título**: Migração do Tailwind CSS v4 para v3
- **Data**: 2024-04-19
- **Autor**: Jovani Custodio
- **Status**: Aceito

---

## 1. Contexto

### 1.1 Problema
O projeto foi inicialmente configurado com Tailwind CSS v4 (versão beta/canal `next`), utilizando a nova sintaxe baseada em `@import "tailwindcss"` e plugins Vite. No entanto, ao tentar executar o projeto localmente com Node.js 16, encontramos incompatibilidades:

1. `@tailwindcss/vite` plugin requeria Vite 5.2+ (incompatível com Node 16)
2. Erro `TypeError: crypto$2.getRandomValues is not a function`
3. Syntax errors com `@theme` e `@custom-variant` (v4 features)

### 1.2 Forças em Jogo

**Restrições:**
- Node.js 16.14.0 no ambiente local (não podemos facilmente atualizar)
- Necessidade de estabilidade para desenvolvimento local
- Compatibilidade com Vite 4.x

**Requisitos:**
- Tailwind CSS funcional em ambiente local
- Build de produção estável
- DX (Developer Experience) mantida

**Premissas:**
- Tailwind v3 é estável e bem documentado
- A sintaxe v4 não é necessária para o escopo atual
- Migração v3 → v4 pode ser feita no futuro

---

## 2. Decisão

### 2.1 Opções Consideradas

| Opção | Descrição | Prós | Contras |
|-------|-----------|------|---------|
| **Opção A**: Manter v4 | Resolver incompatibilidades | Features modernas | Node upgrade necessário, instável |
| **Opção B**: Migrar para v3 | Tailwind v3 estável | Estável, compatível, bem documentado | Sem features v4 (não essenciais) |
| **Opção C**: Outro CSS | Styled-components, CSS Modules | Alternativa | Muda arquitetura, curva de aprendizado |

### 2.2 Decisão Escolhida
**Opção B**: Migrar para Tailwind CSS v3

**Justificativa**:
- Tailwind v3 é LTS (Long Term Support) e amplamente utilizado
- Compatível com Node 16 e Vite 4.x
- Sintaxe `@tailwind` é padrão da indústria
- shadcn/ui é otimizado para v3
- Menor risco de bugs em produção
- Migração v3 → v4 pode ser planejada futuramente

### 2.3 Consequências

#### Positivas
- Desenvolvimento local funciona imediatamente
- Build estável e previsível
- Comunidade maior para suporte
- shadcn/ui componentes 100% compatíveis

#### Negativas / Riscos
- Sem features v4 (like `@theme inline`, `text-sm/some-variant`)
- PostCSS config necessário (vs zero-config v4)
- Tailwind config file necessário

**Mitigações**:
- Features v4 não são essenciais para MVP
- Configuração PostCSS é padrão e simples
- `tailwind.config.js` é boilerplate comum

---

## 3. Implementação

### 3.1 Mudanças Necessárias

**Arquivos Modificados:**
- `package.json`: Remover `@tailwindcss/vite`, adicionar `tailwindcss@3`, `postcss`, `autoprefixer`
- `vite.config.ts`: Remover import e plugin do `@tailwindcss/vite`
- `src/index.css`: Substituir `@import "tailwindcss"` por `@tailwind` directives
- `tailwind.config.js`: Criar (não existia em v4)
- `postcss.config.js`: Criar

**Sintaxe CSS:**
```css
/* ❌ Antigo (v4) */
@import "tailwindcss";
@import "tw-animate-css";
@theme inline { ... }
@custom-variant dark (&:is(.dark *));

/* ✅ Novo (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3.2 Configuração

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

**postcss.config.js:**
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 3.3 Arquivos Afetados
| Arquivo | Mudança |
|---------|---------|
| `package.json` | ⬇️ `@tailwindcss/vite`, ⬆️ `tailwindcss@3` |
| `vite.config.ts` | 🗑️ Plugin tailwindcss removido |
| `src/index.css` | 📝 Sintaxe v4 → v3 |
| `tailwind.config.js` | ➕ Criado |
| `postcss.config.js` | ➕ Criado |

---

## 4. Alternativas Rejeitadas

### Opção A: Manter Tailwind v4
**Por que foi rejeitada**:
- Requer upgrade de Node.js para 18+ (não viável no momento)
- `@tailwindcss/vite` requer Vite 5.2+ (incompatível com setup atual)
- Features v4 são nice-to-have, não essenciais
- Tempo de resolução de issues imprevisível

### Opção C: Migrar para Styled-components
**Por que foi rejeitada**:
- Mudança radical de arquitetura
- shadcn/ui é baseado em Tailwind
- Curva de aprendizado para equipe
- Runtime overhead adicional

---

## 5. Referências

- [Tailwind CSS v3 Docs](https://v3.tailwindcss.com/)
- [Tailwind CSS v4 Beta](https://tailwindcss.com/docs/v4-beta)
- [shadcn/ui Installation](https://ui.shadcn.com/docs/installation)
- [Vite Plugin Compatibility](https://github.com/tailwindlabs/tailwindcss/issues/13648)

---

## 6. Relacionamentos

- **Impacta**: Todos os SDDs com design de UI
- **Relacionado a**: Setup inicial do projeto
- **Bloqueia**: Nenhum (desbloqueia desenvolvimento local)

---

## Histórico de Decisões

| Data | Evento | Responsável |
|------|--------|-------------|
| 2024-04-19 | Identificação do problema | Jovani Custodio |
| 2024-04-19 | Análise de alternativas | Jovani Custodio |
| 2024-04-19 | Implementação da migração | Jovani Custodio |
| 2024-04-19 | ADR criado e aceito | Jovani Custodio |

---

## Checklist de Aprovação

- [x] Revisão técnica por desenvolvedor
- [x] Testes locais passando
- [x] Build de produção verificado
- [x] Documentação atualizada

---

## Notas

> Esta decisão pode ser revisada quando:
> 1. Ambiente de desenvolvimento permite Node 18+
> 2. Tailwind v4 atingir stable release
> 3. shadcn/ui oficialmente suportar v4
> 
> Para migrar v3 → v4 no futuro, seguir: https://tailwindcss.com/docs/upgrade-guide
