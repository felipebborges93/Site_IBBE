# Phase 6: SEO, Acessibilidade, Performance e LGPD - Context

**Gathered:** 2026-09-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Implementar melhorias não-funcionais críticas: metadados SEO (JSON-LD, Open Graph), otimizações de performance (Lighthouse ≥ 90, imagens WebP, fontes locais), conformidade com acessibilidade (WCAG AA, HTML semântico, ARIA) e adequação à LGPD (página de privacidade, avisos em formulários e ausência de cookies de rastreamento). A fase visa adequar o site aos melhores padrões da web sem adicionar novas features funcionais (exceto a página de privacidade).

</domain>

<decisions>
## Implementation Decisions

### Analytics & Privacidade
- **D-01:** Utilizar analytics sem cookies (como Vercel Analytics básico) ou não utilizar nenhum script externo no momento, eliminando a necessidade de banners de consentimento de cookies da LGPD na interface principal. — **Reversibility:** reversible

### Contraste e Acessibilidade Visual
- **D-02:** Ajustar ligeiramente o tom das cores da marca (cobalto, marinho) por padrão no CSS caso alguma não alcance o contraste mínimo WCAG AA em botões e textos, garantindo conformidade sem precisar adicionar um "botão de alto contraste" que poluiria o visual limpo exigido no design. — **Reversibility:** reversible

### Segurança e Headers
- **D-03:** Implementar as políticas de segurança (CSP) via allowlist de domínios diretamente no `next.config.mjs`, o que atende os requisitos de segurança básicos para SSG/ISR no Next.js sem a complexidade de gerenciar nonces dinâmicos. — **Reversibility:** reversible

### the agent's Discretion
- Ferramenta exata de geração de sitemap (nativa do Next.js ou plugin).
- Escolha da redação exata do documento da Política de Privacidade baseando-se no escopo do uso dos pedidos de oração anônimos e sem cadastro de contas.
- Micro-ajustes de performance (como fetch priority e configurações finas do next/image).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requisitos e Arquitetura
- `.planning/REQUIREMENTS.md` — Requisitos SEO-01..03, PERF-01..02, A11Y-01..03, LGPD-01..03, SEC-01..03
- `.planning/ROADMAP.md` §Phase 6 — Escopo da Fase 6

### Projetos Anteriores (Contexto)
- `.planning/phases/05-pedidos-de-ora-o/05-CONTEXT.md` — Para compreender a natureza dos dados que precisam ser descritos na política de privacidade (pedidos de oração anônimos).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/layout.tsx`: Onde a API de Metadata do Next.js deve ser expandida, e fontes globais estão configuradas.
- `next.config.mjs`: Local para injeção de security headers.
- `components/ui/*`: Componentes já existentes que deverão receber auditoria de aria-labels e foco.

### Established Patterns
- Utilização estrita do Next.js App Router (metadata exports, sitemap.ts, robots.ts).
- Estilização responsiva via Tailwind CSS (o ajuste de contraste deverá refletir apenas classes tailwind ou root vars).

### Integration Points
- Criação da nova rota estática `/privacidade` (app/privacidade/page.tsx).
- Modificação dos formulários da Fase 5 (Pedidos de Oração) para exibir o link de consentimento da LGPD de forma discreta.

</code_context>

<specifics>
## Specific Ideas

- A página de privacidade deve ter uma linguagem muito simples e humana ("Linguagem Clara"), explicando que os pedidos de oração não requerem cadastro, os IPs são hasheados sem reversibilidade apenas para evitar spam, e nomes de pessoas que optarem pelo anonimato não são salvos nem no banco de dados.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 6-seo-acessibilidade-performance-e-lgpd*
*Context gathered: 2026-09-29*
