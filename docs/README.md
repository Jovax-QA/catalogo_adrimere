# Documentação do Projeto - Catálogo Beleza

Bem-vindo à documentação técnica do projeto Catálogo Beleza.

---

## 📚 Estrutura de Documentação

```
docs/
├── README.md                    # Este arquivo
├── ARCHITECTURE.md              # Arquitetura completa do sistema
├── sdd/                         # System Design Documents
│   ├── TEMPLATE_SDD.md         # Template para novos SDDs
│   └── SDD-001-product-catalog.md # Exemplo: Catálogo de Produtos
└── adr/                         # Architecture Decision Records
    ├── TEMPLATE_ADR.md         # Template para novos ADRs
    └── ADR-001-tailwind-v3-migration.md # Exemplo: Migração Tailwind
```

---

## 🎯 Tipos de Documentos

### SDD - System Design Document
Documentos de design de sistemas/features. Usados para planejar e comunicar requisitos técnicos antes da implementação.

**Quando criar:**
- Nova feature significativa
- Mudanças grandes em UX/UI
- Integrações com APIs externas
- Fluxos complexos de usuário

**Template:** [`docs/sdd/TEMPLATE_SDD.md`](./sdd/TEMPLATE_SDD.md)

### ADR - Architecture Decision Record
Registro de decisões arquiteturais. Documentam POR QUE uma decisão técnica foi tomada.

**Quando criar:**
- Escolha de bibliotecas/frameworks
- Mudanças de arquitetura
- Trade-offs técnicos significativos
- Decisões que impactam múltiplas partes do sistema

**Template:** [`docs/adr/TEMPLATE_ADR.md`](./adr/TEMPLATE_ADR.md)

---

## 🚀 Como Usar

### Iniciando uma Nova Feature

1. **Leia a arquitetura**: Entenda o stack e padrões em [`ARCHITECTURE.md`](./ARCHITECTURE.md)

2. **Crie um SDD**:
   ```bash
   # Copie o template
   cp docs/sdd/TEMPLATE_SDD.md docs/sdd/SDD-XXX-nome-feature.md
   
   # Preencha todas as seções
   # Consulte exemplos em docs/sdd/
   ```

3. **Consulte o agente Frontend Senior**:
   - Siga as convenções definidas em `.windsurf/agents/frontend-senior.md`
   - Aplique o checklist de code review

4. **Implemente**:
   ```bash
   git checkout -b feature/SDD-XXX-descricao
   # ... desenvolvimento seguindo SDD ...
   ```

5. **Crie ADR se necessário**:
   - Decisões técnicas durante implementação
   - Mudanças do plano original

### Fluxo de Decisão Técnica

```
Problema Identificado
        ↓
   Análise de Opções
        ↓
   ┌─────────┐
   │ Simples? │ → Implementar direto
   └────┬────┘
        │ Não
        ↓
   ┌─────────────┐
   │ Impacto Alto? │ → Criar ADR
   └──────┬──────┘
          │ Sim
          ↓
   Discutir com Time
          ↓
   Documentar em ADR
          ↓
   Implementar
```

---

## 📋 Convenções de Nomenclatura

### SDDs
- **Código**: `SDD-XXX` (sequencial)
- **Arquivo**: `SDD-XXX-kebab-case-description.md`
- **Exemplo**: `SDD-001-product-catalog.md`

### ADRs
- **Código**: `ADR-XXX` (sequencial)
- **Arquivo**: `ADR-XXX-kebab-case-description.md`
- **Exemplo**: `ADR-001-tailwind-v3-migration.md`

---

## 🎓 Recursos do Agente

O projeto inclui um agente especializado para desenvolvimento frontend:

**Arquivo**: [`.windsurf/agents/frontend-senior.md`](../.windsurf/agents/frontend-senior.md)

**Capacidades**:
- Revisar código seguindo padrões do projeto
- Sugerir melhorias de arquitetura
- Garantir qualidade e performance
- Aplicar best practices React/TypeScript

---

## 📊 Documentos Atuais

### SDDs
| Código | Título | Status | Data |
|--------|--------|--------|------|
| SDD-001 | Catálogo de Produtos | Rascunho | 2024-04-19 |

### ADRs
| Código | Título | Status | Data |
|--------|--------|--------|------|
| ADR-001 | Migração Tailwind v4 → v3 | Aceito | 2024-04-19 |

---

## 🔄 Workflow de Documentação

### Criando Novo SDD
1. Copiar template
2. Preencher todas as seções obrigatórias
3. Revisar com stakeholders
4. Ajustar conforme feedback
5. Marcar como "Aprovado"
6. Implementar
7. Atualizar com lições aprendidas

### Criando Novo ADR
1. Identificar necessidade de decisão
2. Analisar alternativas
3. Documentar trade-offs
4. Revisão técnica
5. Aprovação
6. Implementar
7. Atualizar documentação afetada

---

## 💡 Dicas

- **Mantenha atualizado**: Documentação desatualizada é pior que nenhuma
- **Seja específico**: Evite vaguidade em requisitos
- **Inclua contexto**: Explique o POR QUE, não apenas O QUE
- **Use exemplos**: Código e wireframes clarificam
- **Revisite**: Documentos vivos evoluem com o projeto

---

## 📞 Suporte

- Dúvidas sobre SDDs: Verificar exemplos existentes
- Dúvidas técnicas: Consultar `ARCHITECTURE.md` ou agente
- Decisões arquiteturais: Criar ADR para discussão

---

*Documentação viva - atualizada conforme o projeto evolui*
