# Phase 4: Integração YouTube - Context

**Gathered:** 2026-09-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Buscar e exibir as 4 últimas lives do YouTube com cache ISR, fallbacks robustos e indicador "AO VIVO". A integração deve ser resiliente a falhas de cota/API garantindo que a seção nunca quebre o site.

</domain>

<decisions>
## Implementation Decisions

### YouTube CTA Behavior
- **D-01:** O botão "Assistir ao vivo" no Hero abrirá a live diretamente em uma nova aba (`target="_blank"`), reduzindo atrito.
- **D-02:** O card de fallback "Ver no YouTube" usará o design system do site (Card, Button) com um link genérico para o canal.

### Arquitetura da Integração
- **D-03:** Toda a lógica de fetch, cache e fallback (API v3 -> RSS) ficará isolada em um serviço dedicado `lib/youtube.ts`.
- **D-04:** O parser do RSS usará `fetch` nativo e processamento leve de string/regex para evitar dependências pesadas, visto que precisamos apenas dos IDs e títulos dos vídeos.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requisitos e Arquitetura
- `.planning/ROADMAP.md` §Phase 4 — Escopo e critérios de sucesso da integração
- `.planning/REQUIREMENTS.md` — Requisitos LIVE-01 a LIVE-04
- `.planning/PROJECT.md` — Decisões de design tokens e layout aplicáveis aos cards de vídeo

### Decisões Anteriores Relevantes
- `.planning/phases/01-funda-o-do-projeto/01-CONTEXT.md` — Componentes base reutilizáveis (Card, Button) a serem utilizados na seção
- `.planning/phases/02-layout-base-e-navegacao/02-CONTEXT.md` — Referência do Hero e do Botão WhatsApp (padrões de CTA que o botão "Assistir ao vivo" deve seguir)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/ui/Card.tsx`: Usar para os vídeos do YouTube.
- `components/ui/Button.tsx`: Usar para o fallback "Ver no YouTube".
- `components/ui/Section.tsx` & `SectionTitle.tsx`: Usar para estruturar a seção na home.

### Established Patterns
- Fetching feito no lado do servidor em Server Components. Interatividade local movida para Client Components.

### Integration Points
- `app/page.tsx`: A seção YouTube deve ser integrada no arquivo principal, logo após ou próxima aos Eventos/Ministérios.
- `lib/youtube.ts`: Novo arquivo a ser criado para isolar integrações externas.

</code_context>

<specifics>
## Specific Ideas

- O selo "AO VIVO" deve ser um pequeno dot vermelho com animação de pulso (`animate-pulse`) do Tailwind.
- As imagens de thumbnail do YouTube devem usar a URL nativa do Google (`i.ytimg.com/vi/ID/maxresdefault.jpg`) para não onerar armazenamento local.

</specifics>

<deferred>
## Deferred Ideas

None — discussion auto-resolved within phase scope.

</deferred>
