# Phase 6: SEO, Acessibilidade, Performance e LGPD - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-29
**Phase:** 06-seo-acessibilidade-performance-e-lgpd
**Areas discussed:** Analytics & Privacidade, Contraste e Acessibilidade Visual, Segurança e Headers

---

## Analytics & Privacidade

| Option | Description | Selected |
|--------|-------------|----------|
| Analytics sem cookies | Utilizar ferramenta cookie-free para evitar LGPD banners | ✓ |
| Com cookies (G.A.) | Requer implementação de banner de consentimento complexo | |

**User's choice:** Analytics sem cookies (auto-selected default)
**Notes:** Decisão automática visando simplificar a interface e garantir conformidade com a LGPD sem criar atrito (Phase 6 scope).

---

## Contraste e Acessibilidade Visual

| Option | Description | Selected |
|--------|-------------|----------|
| Ajuste automático | Tweak leve nos hex-codes da marca se falharem WCAG AA | ✓ |
| Toggle de acessibilidade | Adicionar botão flutuante para modo de alto contraste | |

**User's choice:** Ajuste automático (auto-selected default)
**Notes:** Mantém a interface limpa (Stitch design system) enquanto assegura a acessibilidade das cores.

---

## Segurança e Headers

| Option | Description | Selected |
|--------|-------------|----------|
| Next.js domain-allowlist | CSP simples gerenciado via next.config.mjs | ✓ |
| Nonces estritos | Maior segurança, porém maior complexidade de configuração ISR | |

**User's choice:** Next.js domain-allowlist (auto-selected default)
**Notes:** O Next.js recomenda headers mais simplificados em `next.config.mjs` para sites predominantemente estáticos ou ISR.

---

## the agent's Discretion

- Ferramenta exata de geração de sitemap (nativa do Next.js ou plugin).
- Escolha da redação exata do documento da Política de Privacidade.
- Micro-ajustes de performance (fetch priority, next/image config).

## Deferred Ideas

- None
