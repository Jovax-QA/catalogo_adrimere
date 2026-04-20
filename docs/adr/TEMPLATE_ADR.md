# Template: Architecture Decision Record (ADR)

## Identificação
- **Código**: ADR-XXX
- **Título**: [Decisão a ser documentada]
- **Data**: YYYY-MM-DD
- **Autor**: [Nome]
- **Status**: Proposto | Aceito | Rejeitado | Depreciado | Substituído

---

## 1. Contexto

### 1.1 Problema
[Qual é o problema ou desafio técnico que precisamos resolver?]

### 1.2 Forças em Jogo
- **Restrições**: [Técnicas, de negócio, de tempo]
- **Requisitos**: [Funcionais e não-funcionais]
- **Premissas**: [O que estamos assumindo]

---

## 2. Decisão

### 2.1 Opções Consideradas

| Opção | Descrição | Prós | Contras |
|-------|-----------|------|---------|
| **Opção A** | [Descrição] | [Lista] | [Lista] |
| **Opção B** | [Descrição] | [Lista] | [Lista] |
| **Opção C** | [Descrição] | [Lista] | [Lista] |

### 2.2 Decisão Escolhida
**Opção**: [A/B/C/Nome da solução]

**Justificativa**:
[Explique por que esta opção foi escolhida considerando:
- Alinhamento com arquitetura existente
- Custo de implementação
- Manutenibilidade
- Escalabilidade
- Experiência da equipe
]

### 2.3 Consequências

#### Positivas
- [Benefício 1]
- [Benefício 2]

#### Negativas / Riscos
- [Risco 1] → [Mitigação]
- [Risco 2] → [Mitigação]

---

## 3. Implementação

### 3.1 Mudanças Necessárias
```
[Arquivos/Configurações que serão modificados]
```

### 3.2 Migração (se aplicável)
```
[Passos para migração de código existente]
```

### 3.3 Exemplo de Código
```typescript
// Exemplo de como a decisão se reflete no código
```

---

## 4. Alternativas Rejeitadas

### [Opção Rejeitada]
**Por que foi rejeitada**:
[Explicação detalhada]

---

## 5. Referências
- [Links para documentações, artigos, RFCs]
- [Discussões que levaram à decisão]

---

## 6. Relacionamentos

- **Substitui**: [ADR-XXX anterior, se aplicável]
- **Relacionado a**: [Outros ADRs relacionados]
- **Impacta**: [SDDs/Sistemas afetados]

---

## Histórico de Decisões

| Data | Evento | Responsável |
|------|--------|-------------|
| YYYY-MM-DD | Proposta criada | [Nome] |
| YYYY-MM-DD | Discussão em [fórum/reunião] | [Participantes] |
| YYYY-MM-DD | Decisão aceita/rejeitada | [Aprovador] |

---

## Checklist de Aprovação

- [ ] Revisão técnica por senior developer
- [ ] Alinhamento com arquitetura de referência
- [ ] Avaliação de impacto em outros sistemas
- [ ] Documentação de trade-offs aceitáveis
- [ ] Aprovação do tech lead
