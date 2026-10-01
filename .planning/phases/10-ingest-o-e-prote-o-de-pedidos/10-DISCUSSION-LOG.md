# Phase 10: Ingestão e Proteção de Pedidos - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-10-01
**Phase:** 10-Ingestão e Proteção de Pedidos
**Areas discussed:** Honeypot (Proteção Anti-Spam), Rate Limiting (Limitação de Taxa), Sanitização de HTML, Redação de Anônimos

---

## Honeypot (Proteção Anti-Spam)

| Option | Description | Selected |
|--------|-------------|----------|
| Implementar um campo de texto no formulário oculto via CSS. Se preenchido, abortar silenciosamente. | Previne bots simples retornando sucesso falso. Recomendado. | ✓ |
| Retornar erro explicito ao preencher o honeypot. | Pode dar dicas ao bot para se adaptar. | |

**User's choice:** [auto] Implementar um campo de texto no formulário oculto via CSS. Se preenchido, abortar silenciosamente.
**Notes:** Decisão via --auto mode, priorizando defesa contra spammer sem dar feedback visual da proteção.

---

## Rate Limiting (Limitação de Taxa)

| Option | Description | Selected |
|--------|-------------|----------|
| Limitar a 3 requisições por hora por IP hash (na memória). | Permite múltiplas orações legitimas bloqueando spam agressivo. Recomendado. | ✓ |
| Limitar rigorosamente a 1 requisição por dia. | Pode bloquear orações genuínas múltiplas da mesma pessoa. | |

**User's choice:** [auto] Limitar a 3 requisições por hora por IP hash (na memória).
**Notes:** Decisão via --auto mode mantendo compatibilidade com a diretiva de hash de IP do REQUIREMENT.

---

## Sanitização de HTML

| Option | Description | Selected |
|--------|-------------|----------|
| Sanitizar texto no backend removendo/escapando tags HTML silenciosamente antes de salvar. | Previne ataque XSS mantendo a experiência do usuário fluida. Recomendado. | ✓ |
| Rejeitar o pedido caso contenha HTML. | Pode causar atrito caso o texto original possua `<` acidentalmente. | |

**User's choice:** [auto] Sanitizar texto no backend removendo/escapando tags HTML silenciosamente antes de salvar.
**Notes:** Decisão via --auto mode.

---

## Redação de Anônimos

| Option | Description | Selected |
|--------|-------------|----------|
| Forçar no backend `name = null` quando `is_anonymous = true`, ignorando o campo texto. | Garante 100% de privacidade impedindo bypass pelo cliente. Recomendado. | ✓ |
| Confiar no front-end para não enviar o nome se for anônimo. | Menos seguro se a API for chamada diretamente. | |

**User's choice:** [auto] Forçar no backend `name = null` quando `is_anonymous = true`, ignorando o campo texto.
**Notes:** Decisão via --auto mode, atendendo estritamente ao PRAY-04.

---

## the agent's Discretion

Implementação técnica de rate limiting e biblioteca de hash/cache para mitigar abusos.

## Deferred Ideas

None
