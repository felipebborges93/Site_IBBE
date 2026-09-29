# Phase 2: Layout Base e Navegação - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-29
**Phase:** 2-Layout Base e Navegação
**Areas discussed:** Scrollspy & Navegação Suave, Menu Mobile Drawer, Hero Section & Mosaico de Imagens, Faixa Inferior & Próximo Culto, Botão Flutuante de WhatsApp

---

## Scrollspy & Navegação Suave

| Option | Description | Selected |
|--------|-------------|----------|
| IntersectionObserver moderno | Hook/componente client-side com rootMargin balanceada (-20% 0px -70% 0px) para detecção de seção ativa | ✓ |
| Scroll listener manual | Listener de window.scroll com getBoundingClientRect em cada ciclo | |
| Âncora pura sem destaque | Navegação sem estado ativo dinâmico no menu | |

**User's choice:** IntersectionObserver moderno (auto-selecionado via `--auto`)
**Notes:** Garante rolagem suave nativa com performance de 60fps sem engasgos na thread principal.

---

## Menu Mobile Drawer

| Option | Description | Selected |
|--------|-------------|----------|
| Drawer lateral tela cheia | Painel deslizante com fundo brand-navy (#122035), trava de scroll no body e fechamento no clique/Escape | ✓ |
| Dropdown empurrando conteúdo | Menu sanfona inline sob o header que empurra o topo do hero | |
| Bottom sheet inferior | Modal inferior cobrindo meia tela | |

**User's choice:** Drawer lateral tela cheia (auto-selecionado via `--auto`)
**Notes:** Segue estritamente a especificação visual e comportamental definida no `stitch-mobile.html`.

---

## Hero Section & Mosaico de Imagens

| Option | Description | Selected |
|--------|-------------|----------|
| Mosaico assimétrico autoral | 3 fotos com rotações (-rotate-1, -rotate-3, rotate-3), bordas brancas e sombras Stitch; simplificado no mobile | ✓ |
| Banner único estático | Imagem única retangular sem sobreposições | |
| Carrossel rotativo | Slider automático de imagens | |

**User's choice:** Mosaico assimétrico autoral (auto-selecionado via `--auto`)
**Notes:** Preserva a proposta visual humana e acolhedora com a palavra "pessoas." em destaque na fonte Caveat.

---

## Faixa Inferior & Próximo Culto

| Option | Description | Selected |
|--------|-------------|----------|
| Cálculo dinâmico cronológico | Função utilitária que calcula o próximo culto da semana a partir de content/services.ts com badge pulsante | ✓ |
| Texto estático fixo | Texto fixo do culto principal de domingo | |
| Countdown regressivo | Contador em segundos e minutos | |

**User's choice:** Cálculo dinâmico cronológico (auto-selecionado via `--auto`)
**Notes:** Totalmente desacoplado e alimentado por `services.ts`, com fallback amigável.

---

## Botão Flutuante de WhatsApp

| Option | Description | Selected |
|--------|-------------|----------|
| Botão circular flutuante padrão | Botão fixo no canto inferior direito (#25D366) com hover scale e link wa.me pré-preenchido | ✓ |
| Barra fixa expansível | Barra com texto "Fale Conosco" visível | |
| Modal de chat simulado | Widget de chat antes de ir ao WhatsApp | |

**User's choice:** Botão circular flutuante padrão (auto-selecionado via `--auto`)
**Notes:** Presente em todas as páginas, integrado ao telefone de `content/site.ts`.

---

## the agent's Discretion

- Animações e micro-interações finas de transição do drawer mobile e rotação dos retratos no hover.
- Ajustes finos de breakpoint responsivo entre mobile, tablet e desktop.

## Deferred Ideas

None — discussion stayed within phase scope
