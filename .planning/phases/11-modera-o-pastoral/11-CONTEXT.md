# Phase 11: Moderação Pastoral - Context

**Gathered:** 2026-10-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Esta fase entrega o painel de moderação de orações para a equipe pastoral (`/admin/oracao`). O escopo abrange a exibição da fila de pedidos, aprovação/rejeição via Server Actions, funcionalidade de "Desfazer" para alterar status previamente definidos, feedback em tempo real na UI (toasts) e revalidação de cache. As ações devem ser restritas aos administradores logados (via cliente autenticado Supabase).

</domain>

<decisions>
## Implementation Decisions

### Ordenação da Fila de Aprovação
- **D-01:** First-in-first-out (mais antigos primeiro), garantindo que os pedidos de oração que chegaram antes sejam visualizados e moderados primeiro pela equipe pastoral. — **Reversibility:** reversible

### Feedback Visual das Ações
- **D-02:** Utilizar biblioteca de toasts (ex: sonner) para fornecer confirmações visuais imediatas de sucesso ao aprovar, rejeitar ou desfazer, garantindo uma UX responsiva antes mesmo da conclusão do carregamento da página. — **Reversibility:** reversible

### Visualização de Histórico/Status
- **D-03:** A tela deve focar primeiramente nos pedidos pendentes, mas também deve prover guias/tabs (Pendentes, Aprovados, Rejeitados) na mesma interface para permitir o acesso rápido ao botão "Desfazer" sem mudar de página. — **Reversibility:** reversible

### Revalidação Pós-Ação
- **D-04:** Utilizar `revalidatePath` ao fim de cada Server Action para garantir a imediata sincronização do cache da fila na mesma tela de moderação sem exigir que o usuário atualize a página manualmente. — **Reversibility:** reversible

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Planejamento
- `.planning/REQUIREMENTS.md` — Requisitos MOD-01, MOD-02, MOD-03, MOD-04.
- `.planning/ROADMAP.md` — Visão geral da fase e fronteiras de domínio.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `utils/supabase/server.ts`: Cliente de servidor que será utilizado com `createServerClient` autenticado, obtendo os cookies necessários para o painel.

### Established Patterns
- Server Actions já estão sendo usados no Next.js (Fase 10). Reutilizar este padrão de comunicação front-back.
- RLS do Supabase: Políticas de Update já estão restritas a usuários autenticados (ver Fase 8).

### Integration Points
- `app/admin/oracao/page.tsx`: Página principal do painel a ser conectada com Supabase.
- Ações centralizadas em arquivos de Server Actions sob `app/actions/moderation.ts` (ou similar) para facilitar importações e testes.

</code_context>

<specifics>
## Specific Ideas

Nenhuma ideia específica capturada nesta sessão. Decisões tomadas assumem os padrões gerais de UI já propostos.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 11-Moderação Pastoral*
*Context gathered: 2026-10-01*
