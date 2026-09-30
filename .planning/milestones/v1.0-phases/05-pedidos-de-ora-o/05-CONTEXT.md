# Phase 5: Pedidos de Oração - Context

**Gathered:** 2026-09-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Implementar sistema completo de pedidos de oração: formulário público com proteção anti-spam, armazenamento seguro no Supabase, área de moderação autenticada, e endpoints de API para consumo pelo telão da igreja.
</domain>

<decisions>
## Implementation Decisions

### 1. Estado do Formulário e Validação (PRAY-01)
- **D-01:** Utilizar Server Actions em conjunto com React Hook Form e Zod para validação híbrida (client-side imediata + server-side segura), garantindo robustez e UX responsiva. — **Reversibility:** reversible

### 2. Anti-Spam e Rate Limiting (PRAY-02)
- **D-02:** Implementar campo "honeypot" invisível no formulário para capturar bots.
- **D-03:** Aplicar rate limiting baseado no hash do IP, armazenado via Supabase ou Vercel KV, para prevenir submissões em massa. — **Reversibility:** reversible

### 3. Segurança de Banco de Dados (PRAY-04)
- **D-04:** Configurar Row Level Security (RLS) rigoroso na tabela `prayer_requests` no Supabase: permissão apenas de `INSERT` para o role `anon` (usuários públicos), sem permissão de leitura. — **Reversibility:** reversible

### 4. Proteção de Rota Admin (PRAY-06)
- **D-05:** Implementar um Middleware do Next.js para proteger as rotas `/admin/*`, verificando a sessão do Supabase Auth antes de renderizar a interface de moderação. — **Reversibility:** costly — Exigiria refatoração significativa de rotas se alterado para verificação client-side ou por página.

### 5. Autenticação da API do Telão (PRAY-08)
- **D-06:** Utilizar um token estático (bearer token) configurado via variáveis de ambiente (`.env`) e checado no cabeçalho `Authorization` dos endpoints `/api/prayer-requests/display` e `/api/prayer-requests/:id/displayed`. — **Reversibility:** reversible

### the agent's Discretion
- Estrutura visual e micro-interações do painel de moderação `/admin/oracao`.
- Organização exata dos utilitários de validação Zod no código (pasta `lib/validations` ou junto aos componentes).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requisitos Base
- `.planning/REQUIREMENTS.md` — Requisitos PRAY-01 a PRAY-09 para formulário, moderação e APIs.
- `.planning/ROADMAP.md` §Phase 5 — Critérios de sucesso e escopo para pedidos de oração.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/ui/Button.tsx`: Botões primários e secundários para o formulário.
- `components/ui/Container.tsx` e `components/ui/Card.tsx`: Estruturação da página de pedidos de oração.

### Established Patterns
- Client e Server Components separados conforme estabelecido nas fases anteriores para melhor performance e hidratação.
- Estilização seguindo os design tokens (Tailwind classes) já documentados e presentes no projeto.

### Integration Points
- `app/(public)/oracao/page.tsx` (ou similar) será integrado na estrutura de layout atual (com header e footer).
- Supabase SDK será integrado em `lib/supabase` (caso ainda não exista).

</code_context>

<specifics>
## Specific Ideas

- O formulário deve possuir o interruptor "anônimo", que deve funcionar visualmente (desabilitando/escondendo o campo nome) e garantir que o nome não seja enviado ao banco.
- O rate limiting e o honeypot devem retornar mensagens de erro neutras e seguras.

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 5-Pedidos de Oração*
*Context gathered: 2026-09-29*
