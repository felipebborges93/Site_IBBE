# Phase 1: Fundação do Projeto - Context

**Gathered:** 2026-09-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Configurar projeto Next.js (App Router) com TypeScript, Tailwind CSS, design tokens extraídos do Stitch, fontes (Bricolage Grotesque + Caveat), componentes base reutilizáveis (Button, Card, Section, SectionTitle, SectionDivider, Container), layout com header fixo e footer, e pasta `/content` com arquivos TS tipados contendo dados do documento.

</domain>

<decisions>
## Implementation Decisions

### Componentes Base
- **D-01:** Button usa variantes via props (`variant="primary" | "secondary" | "ghost"`, `size="sm" | "md" | "lg"`) com classes Tailwind mapeadas internamente. Sem CVA ou lib externa.
- **D-02:** Card usa props configuráveis (`variant`, `shadow`, `rounded`) cobrindo os 3 níveis de elevation definidos no design system.
- **D-03:** Padrão de composição: props simples (`title`, `subtitle`, `children`). Amigável para manutentor leigo em programação. Sem pattern de slots/compound components.
- **D-04:** SectionTitle aceita prop `highlight` que aplica automaticamente a fonte Caveat na palavra indicada. Ex: `<SectionTitle highlight="pessoas">Uma igreja feita de</SectionTitle>`.

### Estrutura /content
- **D-05:** Interface (tipagem) definida no próprio arquivo de dados. Cada arquivo (`services.ts`, `events.ts`, etc.) exporta tipo + dados juntos. Quem edita abre só o arquivo relevante.
- **D-06:** Dados exportados como `export const` (named exports, tree-shakeable).
- **D-07:** Barrel file `content/index.ts` re-exporta tudo. Import: `import { services, events } from '@/content'`.
- **D-08:** Placeholders para dados não informados usam string literal `"[PLACEHOLDER: descrição]"`. Aparece no site se não substituído. Zero build overhead, visível para quem revisar.

### Layout Header/Footer
- **D-09:** Header começa transparente (texto branco) sobre hero, transiciona para sólido (fundo branco + sombra) ao rolar. Efeito premium coerente com design Stitch. — **Reversibility:** reversible
- **D-10:** Logotipo da igreja carregado como SVG inline no código. Escala perfeita, sem request extra, estilizável com Tailwind.
- **D-11:** Footer com 3-4 colunas: sobre, links úteis, contato, redes sociais. Visual completo.
- **D-12:** Arquitetura Server Components: layout em `app/layout.tsx` com header e footer como Server Components. Header usa Client Component separado (`"use client"`) apenas para scroll detection.

### Separadores Curvos
- **D-13:** Componente dedicado `<SectionDivider variant="wave" | "arc" | "diagonal" | "slant" />` com shapes SVG reutilizáveis.
- **D-14:** Cor dinâmica — separador herda automaticamente a cor de fundo da seção seguinte (branco ou gelo). Zero configuração manual.
- **D-15:** 3+ variantes de forma (wave, arc, diagonal, slant) para diversidade visual entre seções.

### Discretion do Agente
Nenhuma decisão delegada — todas escolhas feitas pelo usuário.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design Reference
- `stitch-desktop.html` — Layout desktop completo (1440px) gerado no Stitch com design system
- `stitch-mobile.html` — Layout mobile (390px) com adaptações responsivas
- `.planning/PROJECT.md` §Design Tokens — Cores (marinho, cobalto, céu, gelo, branco, floresta), tipografia, elevation levels, layout grid

### Projeto
- `.planning/PROJECT.md` — Documento master com stack, design tokens, requirements e key decisions
- `.planning/REQUIREMENTS.md` — Requirements detalhados; fase 1 cobre CONT-01 e CONT-02
- `.planning/ROADMAP.md` — Roadmap com 7 fases e success criteria

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Nenhum — projeto greenfield. Só existem os HTMLs de referência Stitch.

### Established Patterns
- Nenhum padrão estabelecido. Fase 1 define os padrões que fases seguintes seguirão.

### Integration Points
- Design tokens do Stitch (HTMLs) precisam ser extraídos para `tailwind.config.ts`
- Fontes do Google Fonts via `next/font` (Bricolage Grotesque, Caveat)
- Ícones via Phosphor Icons (instalação como dependência)

</code_context>

<specifics>
## Specific Ideas

- Palavra em Caveat script aplica apenas EM UMA palavra por título (ex: "pessoas" em "Uma igreja feita de _pessoas._")
- Seções alternam fundo branco ↔ gelo com separadores curvos entre elas
- Cantos arredondados grandes: botões pill `rounded-full`, cards `rounded-2xl`/`rounded-3xl`
- Sombras com tint de navy, não preto puro

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 1-Fundação do Projeto*
*Context gathered: 2026-09-29*
