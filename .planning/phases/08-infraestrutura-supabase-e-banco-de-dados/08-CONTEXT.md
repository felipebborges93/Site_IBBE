# Phase 8: Infraestrutura Supabase e Banco de Dados - Context

**Gathered:** 2026-10-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Esta fase estabelece toda a fundação de infraestrutura do Supabase e do banco de dados relacional (PostgreSQL) para o Milestone v1.1. Seu escopo cobre:
- Especificação, documentação e padronização das variáveis de ambiente (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `TELAO_API_TOKEN`) no `.env.example` e verificação no `.env.local`.
- Script de migração SQL idempotente e estruturado para a tabela `prayer_requests`, contendo tipos estritos, valores padrão, constraints de validação e índice composto `(status, displayed, created_at)`.
- Políticas de Row Level Security (RLS) restritivas: inserção pública anônima permitida unicamente quando `status = 'pending'` e `displayed = false`; leitura, atualização e deleção bloqueadas para a role `anon`, e liberadas para `authenticated` e `service_role`.
- Utilitário ou rotina de verificação/teste de integridade do schema e das regras de RLS.

Fora de escopo desta fase: telas de interface de moderação (`/admin/oracao`), middleware de autenticação Next.js, formulário visual do usuário na landing page, endpoints de API do telão e integração WebSockets em tempo real (pertencem às Fases 9, 10, 11 e 12).
</domain>

<decisions>
## Implementation Decisions

### Schema e Migrações SQL
- **D-01:** Migração SQL declarativa, idempotente e versionada em `supabase/migrations/01_prayer_requests_schema.sql` (ou atualização de `00_prayer_requests.sql`), pronta para execução direta via Supabase Dashboard SQL Editor ou Supabase CLI (`supabase db push` / `supabase migration up`). — **Reversibility:** costly — Alterações estruturais posteriores em colunas ou constraints exigem novas migrações de dados em produção.
- **D-02:** Criação explícita de índice composto no PostgreSQL: `CREATE INDEX IF NOT EXISTS idx_prayer_requests_status_displayed_created ON public.prayer_requests (status, displayed, created_at DESC);` para otimizar as consultas do painel de moderação e as requisições em lote da API do telão. — **Reversibility:** reversible — Índices podem ser criados, alterados ou removidos sem perda de dados.

### RLS e Segurança de Acesso
- **D-03:** Política RLS de inserção anônima rigorosa com `WITH CHECK (status = 'pending' AND displayed = false AND length(request) >= 5 AND length(request) <= 1000)`. Qualquer tentativa de cliente anônimo injetar `status = 'approved'` ou `displayed = true` é rejeitada na camada de banco. — **Reversibility:** costly — Alterações nas políticas RLS impactam diretamente a autorização de todas as chamadas de API do cliente anon.
- **D-04:** Leitura (`SELECT`), atualização (`UPDATE`) e deleção (`DELETE`) totalmente negadas para a role `anon`. Somente a role `authenticated` (moderadores logados) e `service_role` (bypass RLS para rotas internas seguras como projeção do telão) têm permissão de consulta e mutação. — **Reversibility:** reversible — Políticas de permissão podem ser ajustadas conforme regras de negócio evoluam.

### Validação e Tipagem de Ambiente
- **D-05:** Criação de arquivo de especificação `.env.example` completo documentando todas as variáveis obrigatórias do projeto, acompanhado de validação de presença em tempo de execução (`lib/env.ts` ou checagem defensiva nos utilitários Supabase) com mensagens de erro autoexplicativas caso faltem chaves no ambiente de desenvolvimento ou produção. — **Reversibility:** reversible — Módulos de validação podem ser enriquecidos sem quebrar compatibilidade.

### Modelagem e Anonimização (LGPD)
- **D-06:** Modelagem do campo `name` como `TEXT NULL`, acompanhado de `is_anonymous BOOLEAN DEFAULT false NOT NULL`. Para garantir cumprimento estrutural da LGPD no próprio banco, adicionar constraint `CHECK ((is_anonymous = true AND name IS NULL) OR is_anonymous = false)`. — **Reversibility:** costly — Alterar regras de integridade de colunas pode requerer saneamento retroativo de linhas.

### the agent's Discretion
- Formatação dos nomes das policies RLS em inglês ou português seguindo padrão idiomático do Supabase.
- Configuração de script auxiliar em Node/TS para validar a conexão e integridade das tabelas via `service_role` quando as credenciais estiverem preenchidas.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requisitos e Roadmap
- `.planning/ROADMAP.md` § Phase 8 — Meta e critérios de aceitação da infraestrutura do Supabase.
- `.planning/REQUIREMENTS.md` § SUPA-01, SUPA-02, SUPA-03 — Requisitos funcionais e de conformidade do banco e variáveis de ambiente.
- `.planning/STATE.md` § Milestone v1.1 — Decisões arquiteturais fundamentais sobre isolamento de clientes e RLS.

### Migrações e Clientes Existentes
- `supabase/migrations/00_prayer_requests.sql` — Schema inicial existente a ser revisado e corrigido com índice composto e RLS restritivo.
- `utils/supabase/server.ts` — Factory existente do `@supabase/ssr` para acesso de servidor no Next.js App Router.
- `lib/validations/prayer.ts` — Schema Zod com limites de caracteres (`name` max 100, `request` min 5 max 1000).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `utils/supabase/server.ts`: Estrutura base de cliente Supabase com gerenciamento de cookies em Server Components / Server Actions.
- `lib/validations/prayer.ts`: Schema de validação Zod que dita os limites de validação de campos (`request`, `name`, `is_anonymous`).
- `app/actions/prayer.ts`: Server Action legado onde o formulário submetia anteriormente, servirá de referência para como os dados chegam à camada de banco.

### Established Patterns
- Next.js 15 App Router com TypeScript estrito.
- Separação entre rotas públicas e rotas administrativas (`/admin/*`).
- Variáveis públicas prefixadas com `NEXT_PUBLIC_` e chaves privadas (`SUPABASE_SERVICE_ROLE_KEY`, `TELAO_API_TOKEN`) restritas ao ambiente do servidor.

### Integration Points
- `.env.local` e `.env.example`: Ponto de entrada de credenciais para todos os ambientes.
- `supabase/migrations/`: Diretório canônico de scripts SQL executáveis no Supabase.

</code_context>

<specifics>
## Specific Ideas

- O arquivo de migração deve ser claro, bem comentado e incluir tanto a criação da tabela quanto a habilitação do RLS, políticas de acesso e criação de índices, permitindo que qualquer desenvolvedor ou agente aplique em um projeto Supabase novo com uma única execução.
- As mensagens de erro em caso de variáveis não configuradas devem indicar exatamente onde obter as chaves no painel do Supabase (Project Settings -> API).

</specifics>

<deferred>
## Deferred Ideas

- Inscrição em WebSockets via Supabase Realtime para atualização da moderação sem recarregar tela (reservado para v2 / Fase posterior).
- Criação do cliente com `server-only` para service role (`createAdminClient`) — pertence à Fase 12.
- Implementação de middleware de autenticação e proteção de sessão — pertence à Fase 9.

</deferred>

---

*Phase: 8-infraestrutura-supabase-e-banco-de-dados*
*Context gathered: 2026-10-01*
