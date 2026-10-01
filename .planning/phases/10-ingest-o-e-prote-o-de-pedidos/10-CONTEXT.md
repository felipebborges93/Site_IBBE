# Phase 10: Ingestão e Proteção de Pedidos - Context

**Gathered:** 2026-10-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Processamento de envios de pedidos de oração do formulário público (Server Action) para o banco de dados Supabase via cliente anônimo (`@supabase/ssr`), incluindo proteção contra bots via honeypot, sanitização de HTML e limitação de taxa por hash de IP (LGPD), além da redação de nomes para pedidos marcados como anônimos.

</domain>

<decisions>
## Implementation Decisions

### Honeypot (Proteção Anti-Spam)
- **D-01:** Implementar um campo de texto no formulário oculto via CSS (`display: none` ou similar, mantendo acessibilidade e `tabindex="-1"`). Se preenchido, abortar o envio silenciosamente (falso positivo de sucesso) — **Reversibility:** reversible

### Rate Limiting (Limitação de Taxa)
- **D-02:** Utilizar cache em memória (ex: `lru-cache` ou estrutura global, dada a arquitetura Next.js) usando um hash SHA-256 do IP + salt. O limite será de 3 requisições por hora por IP para mitigar spam intenso preservando a conformidade com a LGPD (IP bruto não armazenado) — **Reversibility:** reversible

### Sanitização de HTML
- **D-03:** Aplicar sanitização no servidor para remover todas as tags HTML (usar biblioteca dedicada ou expressão regular conservadora para extrair apenas o texto) antes de enviar ao banco, protegendo contra XSS, em vez de retornar erro — **Reversibility:** reversible

### Redação de Anônimos
- **D-04:** Quando a flag `is_anonymous` for `true`, o campo de nome no backend será forçado a `null` independentemente do que vier no form — **Reversibility:** reversible

### the agent's Discretion
A abordagem exata para a geração do hash e armazenamento temporário para rate limit será definida pelo planner/executor.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Planejamento
- `.planning/REQUIREMENTS.md` — Requisitos do sistema PRAY-01 a PRAY-04
- `.planning/ROADMAP.md` — Escopo e limites da fase 10

No external specs — requirements fully captured in decisions above
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `@supabase/ssr` config: Pode reaproveitar a função `createClient` existente adaptando-a para inserção anônima (com anon key) para este caso de uso.
- Formulário existente: O componente atual de envio pode ser estendido com o campo honeypot.

### Established Patterns
- Server Actions: Padrão estabelecido no Next.js App Router para processamento do envio do formulário no backend.
- Segurança de dados: Manter IPs apenas como hashes obedece à regra estrita de não salvar IPs brutos no banco.

### Integration Points
- `src/app/actions/...` (Server Action para inserção de pedidos de oração)
- Tabela `prayer_requests` no Supabase (já deve ter RLS adequado que force `status='pending'` - Phase 8).

</code_context>

<specifics>
## Specific Ideas

Limitação baseada em Hash: Ao extrair o IP a partir do header `x-forwarded-for`, concatenar com um "salt" estático da `.env` e aplicar SHA-256 para manter a rastreabilidade efêmera sem gravar IP real.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 10-Ingestão e Proteção de Pedidos*
*Context gathered: 2026-10-01*
