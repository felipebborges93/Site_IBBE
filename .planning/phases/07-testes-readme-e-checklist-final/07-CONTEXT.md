# Phase 7: Testes, README e Checklist Final - Context

**Gathered:** 2026-09-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Validar o projeto com testes automatizados focados nos fluxos críticos, documentar o repositório com README completo em português e `.env.example`, e preparar checklist final de configuração externa (Supabase, Vercel, YouTube).

</domain>

<decisions>
## Implementation Decisions

### Escopo dos Testes Automatizados
- **D-01:** Testes End-to-End (E2E) focados nos fluxos críticos (formulário e integração externa) para garantir cobertura prática sem overengineering. — **Reversibility:** reversible

### Formato do Checklist Final
- **D-02:** Um arquivo Markdown dedicado (`DEPLOY-CHECKLIST.md`) na raiz do repositório para fácil acompanhamento. — **Reversibility:** reversible

### Abordagem da Documentação do Projeto
- **D-03:** README focado em Developer Experience (DX) — setup rápido, como rodar, dependências e links para checklists e specs técnicos. — **Reversibility:** reversible

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requisitos e Arquitetura
- `.planning/ROADMAP.md` §Phase 7 — Escopo e critérios de sucesso da fase.
- `.planning/REQUIREMENTS.md` — Requisitos gerais aplicáveis de documentação e teste.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/layout.tsx` e `next.config.mjs`: Entender integrações globais e de segurança configuradas.
- Estrutura de banco e API do Supabase em `lib/supabase`: Necessários para entender os testes de E2E da API de pedidos de oração.

### Established Patterns
- Utilização de framework de E2E (ex: Playwright) para fluxos críticos no Next.js App Router (o planner decidirá, mas focando em testes práticos).

### Integration Points
- Raiz do projeto para `README.md`, `.env.example` e `DEPLOY-CHECKLIST.md`.
- Diretório de testes `__tests__` ou `tests/` a ser criado/configurado.

</code_context>

<specifics>
## Specific Ideas

- O arquivo `.env.example` deve refletir as variáveis reais usadas no projeto (como Supabase URL/Anon Key, YouTube API Key, Hash Salt, Admin Token).
- O `DEPLOY-CHECKLIST.md` deve conter um passo a passo prático para configurar o Supabase (SQL de RLS, tabelas, auth), a chave da API do YouTube (v3) no Google Cloud Console, o domínio personalizado e variáveis na Vercel.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 07-Testes, README e Checklist Final*
*Context gathered: 2026-09-29*
