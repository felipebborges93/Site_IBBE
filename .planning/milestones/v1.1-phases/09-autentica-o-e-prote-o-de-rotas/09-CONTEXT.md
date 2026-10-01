# Phase 9: Autenticação e Proteção de Rotas - Context

**Gathered:** 2026-10-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Esta fase entrega a implementação da autenticação e gestão de sessão de usuários administradores pastorais no site IBBE. O escopo abrange:
- Middleware de validação de token Supabase (`/utils/supabase/middleware.ts` raiz ou em `app/` conforme o Next.js App Router).
- Página de Login (`/login`) integrando com a API do Supabase Auth.
- Proteção de acesso às rotas do painel administrativo (`/admin/*`), bloqueando e redirecionando visitantes não autenticados.
- Provisionamento de conta inicial de administrador e desabilitação do registro público.
</domain>

<decisions>
## Implementation Decisions

### Redirecionamento Pós-Login
- **D-01:** Redirecionamento automático do administrador para o painel de orações (`/admin/oracao`) após login bem-sucedido. — **Reversibility:** reversible — Ajuste no roteamento padrão do Next.js Auth.

### Gestão do Usuário Admin
- **D-02:** Provisionamento da primeira conta de administrador realizado inserindo as credenciais diretamente via Supabase Dashboard e documentando-as em local seguro, dado que o registro público deve estar desabilitado para evitar acessos indesejados à moderação. — **Reversibility:** reversible — Fluxo de criação de conta não precisa ser implementado via código.

### Experiência do Login
- **D-03:** Inclusão de um indicador visual com desabilitação do botão de submissão do formulário durante o processo de login ou redirecionamento para evitar múltiplos submits ou confusão do usuário. — **Reversibility:** reversible — Apenas ajuste de UX na tela.

### the agent's Discretion
- Detalhes de estilo do indicador de carregamento, desde que alinhado com o Design System (Tailwind) e o layout geral.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requisitos e Roadmap
- `.planning/ROADMAP.md` § Phase 9 — Autenticação e Proteção de Rotas.
- `.planning/REQUIREMENTS.md` § AUTH-01, AUTH-02, AUTH-03, AUTH-04 — Requisitos de infraestrutura de sessão, login, proteção de rotas e criação de usuário.
- `.planning/STATE.md` § Milestone v1.1 — Decisões arquiteturais de autenticação e divisão de fases.

### Auth e Middlewares
- `utils/supabase/server.ts` — Utilitário de criação do cliente servidor do Supabase.
- `utils/supabase/middleware.ts` — Middleware existente de gestão de sessão do Supabase, usado para validar e renovar tokens (deve ser importado e integrado no raiz do projeto `middleware.ts`).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `utils/supabase/middleware.ts`: Implementa `updateSession` que já contém lógica para checar auth e redirecionar não-autorizados que tentam acessar `/admin` para `/login`.
- `utils/supabase/server.ts`: Fábrica para gerar cliente autenticado do lado do servidor usando os cookies.

### Established Patterns
- Roteamento Next.js 15 App Router.
- Cliente e Server Components separados. Formulário em cliente (`page.tsx` interativo ou com ações do servidor).

### Integration Points
- `middleware.ts` na raiz do projeto (ou `src/` se houver) vai importar e chamar o método de `utils/supabase/middleware.ts`.
- `app/login/page.tsx` será construído para o formulário visual interagindo com Supabase Auth.
- Rotas sob `app/admin/` serão automaticamente interceptadas.

</code_context>

<specifics>
## Specific Ideas

- O design do login (`/login`) deve usar as classes do Tailwind consistentes com a paleta do Stitch (provável uso de cores e bordas arredondadas do projeto já existente).

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 09-Autenticação e Proteção de Rotas*
*Context gathered: 2026-10-01*
