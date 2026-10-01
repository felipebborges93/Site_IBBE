# Phase 13: Exibição no Telão - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-10-01
**Phase:** 13-Exibição no Telão
**Areas discussed:** Layout e Tema Visual, Quantidade de Itens por Tela, Fluxo de Controle e Marcação de Exibidos, Tratamento de Estado Vazio

---

## Layout e Tema Visual

| Option | Description | Selected |
|--------|-------------|----------|
| Dark Theme Alto Contraste | Fundo preto/escuro (`bg-slate-950`), texto branco/ouro, sem scrollbars | ✓ |
| Light Theme Clássico | Fundo claro com texto escuro | |

**User's choice:** Dark Theme Alto Contraste (auto selecionado por padrão para telões de projeção de igreja)
**Notes:** Eliminação de qualquer scrollbar, fonte ampliada para visualização a distância.

---

## Quantidade de Itens por Tela e Grade

| Option | Description | Selected |
|--------|-------------|----------|
| Grade fixa de 4 pedidos (2x2) | 4 cards grandes por tela, fontes `text-2xl`/`text-3xl`, máximo conforto visual | ✓ |
| Grade de 6 pedidos (3x2) | 6 cards por tela, mais denso | |
| 1 pedido por vez | Modo carrossel individual | |

**User's choice:** Grade fixa de 4 pedidos (2x2)
**Notes:** Otimizado para 1080p sem corte de texto ou aglomeração.

---

## Fluxo de Controle e Marcação de Exibidos

| Option | Description | Selected |
|--------|-------------|----------|
| Controle manual com marcação de lote | Operador clica em "Próximo Lote / Concluir", marca o lote exibido via API e busca novos | ✓ |
| Rotação temporizada automática | Troca de tela automática a cada N segundos | (Proibido pelo escopo) |

**User's choice:** Controle manual com marcação de lote
**Notes:** Respeita a diretriz de não haver troca automática desorientadora durante o momento de oração congregacional.

---

## Tratamento de Estado Vazio

| Option | Description | Selected |
|--------|-------------|----------|
| Slide institucional acolhedor | Exibe mensagem temática da IBBE ("Momento de Oração") com versículo bíblico | ✓ |
| Tela em branco | Mantém projetor preto sem informações | |

**User's choice:** Slide institucional acolhedor
**Notes:** Mantém a dignidade e a estética do culto mesmo quando todos os pedidos tiverem sido atendidos/exibidos.

---

## the agent's Discretion

- Animação suave e discreta na transição manual de lotes.
- Suporte a atalhos de teclado (Espaço/Enter/Setas) para o operador de mídia.

## Deferred Ideas

None — discussion stayed within phase scope.
