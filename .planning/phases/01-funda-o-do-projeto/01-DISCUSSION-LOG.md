# Phase 1: Fundação do Projeto - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-29
**Phase:** 1-Fundação do Projeto
**Areas discussed:** Estilo dos componentes base, Estrutura /content, Layout header/footer, Separadores curvos

---

## Estilo dos Componentes Base

### Variantes do Button

| Option | Description | Selected |
|--------|-------------|----------|
| Variantes via props | `variant="primary\|secondary\|ghost"`, `size="sm\|md\|lg"`. Tailwind classes mapeadas. Sem lib extra. | ✓ |
| CVA (class-variance-authority) | Lib leve ~2kb, type-safe, composable. | |
| Agente decide | | |

**User's choice:** Variantes via props, sem lib extra
**Notes:** Preferência por simplicidade, sem dependência adicional.

### Card configurável ou fixo

| Option | Description | Selected |
|--------|-------------|----------|
| Props configuráveis | `variant`, `shadow`, `rounded` como props. Cobre 3 níveis elevation. | ✓ |
| Fixo com estilo único | Sempre igual, varia só por conteúdo. | |
| Agente decide | | |

**User's choice:** Props configuráveis
**Notes:** —

### Padrão de composição

| Option | Description | Selected |
|--------|-------------|----------|
| Props simples | `title`, `subtitle`, `children`. Fácil para leigo. | ✓ |
| Composição (slots) | `<Card.Header>`, `<Card.Body>`. Mais flexível mas complexo. | |
| Agente decide | | |

**User's choice:** Props simples
**Notes:** Manutentor é leigo em programação — simplicidade prioritária.

### SectionTitle highlight

| Option | Description | Selected |
|--------|-------------|----------|
| Prop `highlight` | `<SectionTitle highlight="pessoas">` aplica Caveat automaticamente. | ✓ |
| Markup manual | `<span className="font-caveat">` manual em cada uso. | |
| Agente decide | | |

**User's choice:** Prop `highlight` automática
**Notes:** —

---

## Estrutura /content

### Tipagem dos arquivos

| Option | Description | Selected |
|--------|-------------|----------|
| Interface por arquivo | Cada arquivo exporta tipo + dados. Edição isolada. | ✓ |
| Schema central | Um `types.ts` central, arquivos só importam e exportam. | |
| Agente decide | | |

**User's choice:** Interface por arquivo
**Notes:** —

### Placeholders

| Option | Description | Selected |
|--------|-------------|----------|
| String `[PLACEHOLDER]` | `"[PLACEHOLDER: endereço]"`. Aparece no site. Zero overhead. | ✓ |
| Console warning em dev | Helper valida em runtime, loga warning. | |
| Agente decide | | |

**User's choice:** String `[PLACEHOLDER]`
**Notes:** —

### Formato de exportação

| Option | Description | Selected |
|--------|-------------|----------|
| `export const` | Named exports, tree-shakeable. | ✓ |
| `export default` | Um import por arquivo. | |
| Agente decide | | |

**User's choice:** `export const`
**Notes:** —

### Barrel file

| Option | Description | Selected |
|--------|-------------|----------|
| Sim, `content/index.ts` | Re-exporta tudo. `import { services } from '@/content'`. | ✓ |
| Não, imports diretos | `import { services } from '@/content/services'`. | |
| Agente decide | | |

**User's choice:** Barrel file
**Notes:** —

---

## Layout Header/Footer

### Comportamento do Header

| Option | Description | Selected |
|--------|-------------|----------|
| Transparente sobre hero | Começa transparente, sólido ao scroll. Efeito premium. | ✓ |
| Sólido desde início | Sempre branco/sólido. Mais simples. | |
| Agente decide | | |

**User's choice:** Transparente sobre hero, sólido ao scroll
**Notes:** Coerente com design Stitch.

### Logotipo

| Option | Description | Selected |
|--------|-------------|----------|
| SVG inline | Escala perfeita, sem request, estilizável. | ✓ |
| next/image | Arquivo em /public. Fácil trocar. | |
| Agente decide | | |

**User's choice:** SVG inline
**Notes:** —

### Formato do Footer

| Option | Description | Selected |
|--------|-------------|----------|
| Colunas (3-4) | Sobre, links, contato, redes. Visual completo. | ✓ |
| Bloco simples | Centralizado, minimalista. | |
| Agente decide | | |

**User's choice:** Footer com colunas
**Notes:** —

### Server Components

| Option | Description | Selected |
|--------|-------------|----------|
| Server Components | Layout SSR, Client só pra scroll detection. | ✓ |
| Tudo Client | Mais simples mas perde SSR. | |
| Agente decide | | |

**User's choice:** Server Components com Client separado pro scroll
**Notes:** —

---

## Separadores Curvos

### Implementação

| Option | Description | Selected |
|--------|-------------|----------|
| Componente SVG dedicado | `<SectionDivider variant="wave" />` com shapes reutilizáveis. | ✓ |
| CSS clip-path | Sem SVG, só CSS. Formas limitadas. | |
| SVG inline no JSX | Sem componente, SVG colado em cada seção. | |
| Agente decide | | |

**User's choice:** Componente SVG dedicado
**Notes:** —

### Cor

| Option | Description | Selected |
|--------|-------------|----------|
| Dinâmica | Herda automático da seção seguinte. | ✓ |
| Semi-dinâmica | Prop `color` manual. | |
| Agente decide | | |

**User's choice:** Cor dinâmica
**Notes:** —

### Variantes

| Option | Description | Selected |
|--------|-------------|----------|
| 3+ variantes | Wave, arc, diagonal, slant. Mais diversidade. | ✓ |
| 2 variantes | Wave + arc. Visual variado sem exagero. | |
| 1 variante | Mesmo shape. Consistente. | |
| Agente decide | | |

**User's choice:** 3+ variantes
**Notes:** —

---

## Discretion do Agente

Nenhuma — todas decisões feitas pelo usuário.

## Deferred Ideas

Nenhuma — discussão manteve-se no escopo da fase.
