# Phase 8: Infraestrutura Supabase e Banco de Dados - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-10-01
**Phase:** 8-infraestrutura-supabase-e-banco-de-dados
**Areas discussed:** Schema e Migrações SQL, RLS e Segurança de Acesso, Validação e Tipagem de Ambiente, Modelagem e Anonimização (LGPD)

---

## Schema e Migrações SQL

| Option | Description | Selected |
|--------|-------------|----------|
| Migração Declarativa Idempotente | Script SQL idempotente versionado em `supabase/migrations/` compatível com Supabase SQL Editor e CLI | ✓ (auto) |
| Migração Dinâmica por Script Node | Script de automação programática via API do Supabase | |

**User's choice:** [auto] Migração Declarativa Idempotente (recomendado default)
**Notes:** O script SQL garante rastreabilidade no controle de versão e permite execução simplificada sem dependências externas.

---

## RLS e Segurança de Acesso

| Option | Description | Selected |
|--------|-------------|----------|
| RLS Estrito com Validação de Constraints | Inserção anônima restrita a `status = 'pending'`, `displayed = false` e limites de comprimento, com leitura/edição restrita a autenticados | ✓ (auto) |
| RLS Permissivo Básico | Apenas checagem de status sem constraints de integridade no banco | |

**User's choice:** [auto] RLS Estrito com Validação de Constraints (recomendado default)
**Notes:** Previne qualquer inserção maliciosa de pedidos pré-aprovados ou abuso de payload volumoso diretamente no Postgres.

---

## Validação e Tipagem de Ambiente

| Option | Description | Selected |
|--------|-------------|----------|
| Documentação e Validação Centralizada | `.env.example` documentado + validação de presença em runtime com mensagens claras | ✓ (auto) |
| Apenas Documentação Passiva | `.env.example` sem validação proativa no código | |

**User's choice:** [auto] Documentação e Validação Centralizada (recomendado default)
**Notes:** Falha rapidamente (fail-fast) ao inicializar caso credenciais fundamentais estejam ausentes.

---

## Modelagem e Anonimização (LGPD)

| Option | Description | Selected |
|--------|-------------|----------|
| Constraint de Integridade Condicional | `is_anonymous` booleano com constraint `CHECK ((is_anonymous = true AND name IS NULL) OR is_anonymous = false)` | ✓ (auto) |
| Validação Apenas na Aplicação | Permite qualquer combinação no banco e confia apenas na sanitização do Next.js | |

**User's choice:** [auto] Constraint de Integridade Condicional (recomendado default)
**Notes:** Garante conformidade com a LGPD diretamente na camada de persistência.

---

## the agent's Discretion

- Convenções de nomenclatura das constraints e políticas de segurança RLS no PostgreSQL.
- Formato do script de checagem ou verificação de conexão.

## Deferred Ideas

- Assinatura Realtime (WebSockets) para a moderação — Fase posterior / v2.
- Criação do `createAdminClient` com isolamento `server-only` — Fase 12.
- Rotas de autenticação e proteção de cookies via middleware — Fase 9.
