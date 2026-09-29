# Phase 3: Seções de Conteúdo Estático - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-29
**Phase:** 3-Seções de Conteúdo Estático
**Areas discussed:** Seção e Página de História, Cultos com Destaque Dinâmico, Eventos e Carrossel Mobile, PGMs nos Lares, Ministérios e Ação Social, Planeje sua Visita e FAQ, Localização e Mapa, Dízimos e PIX

---

## 1. Seção "Nossa História" & Página Dedicada `/nossa-historia`

| Option | Description | Selected |
|--------|-------------|----------|
| Resumo editorial na Home + Linha do tempo vertical em `/nossa-historia` | Resumo visual com cards da Fundação e Capela dos 5 Dias na Home + linha do tempo completa e citação de Jr 29:11 em rota própria | ✓ |
| Apenas seção na Home | Conteúdo resumido sem página dedicada | |
| Modal popup com a história | Abrir a história completa em janela flutuante modal | |

**User's choice:** Resumo editorial na Home + Linha do tempo vertical em `/nossa-historia` (recomendado)
**Notes:** Decisão [auto]. Mantém a Home leve e proporciona profundidade histórica e valor institucional na página `/nossa-historia`.

---

## 2. Cultos & Encontros com Destaque Dinâmico

| Option | Description | Selected |
|--------|-------------|----------|
| Destaque automático no próximo culto via algoritmo | Identificar o próximo culto na semana com badge pulsante e realce de borda nos cards | ✓ |
| Cards estáticos idênticos | Apenas listar os cultos sem destacar o próximo | |

**User's choice:** Destaque automático no próximo culto via algoritmo (recomendado)
**Notes:** Decisão [auto]. Reutiliza `calculateNextService` e orienta imediatamente o visitante.

---

## 3. Eventos e Carrossel Mobile

| Option | Description | Selected |
|--------|-------------|----------|
| CSS Scroll-Snap nativo no mobile + Grade 3 colunas no desktop com filtro de datas passadas | Sem dependências externas pesadas, filtragem automática por data no Server Component | ✓ |
| Biblioteca externa de carrossel (Swiper/Embla) | Adiciona dependência JS no bundle do cliente | |

**User's choice:** CSS Scroll-Snap nativo no mobile + Grade 3 colunas no desktop com filtro de datas passadas (recomendado)
**Notes:** Decisão [auto]. Mais leve, rápido e zero dependências de terceiros.

---

## 4. Pequenos Grupos (PGMs)

| Option | Description | Selected |
|--------|-------------|----------|
| Cards por bairro com botão direto de WhatsApp pré-formatado | Facilita contato imediato com mensagem personalizada por PGM | ✓ |
| Apenas texto descritivo dos bairros sem ação | Menor conversão de engajamento comunitário | |

**User's choice:** Cards por bairro com botão direto de WhatsApp pré-formatado (recomendado)
**Notes:** Decisão [auto]. Reduz atrito de entrada nos grupos caseiros.

---

## 5. "Planeje sua Visita", FAQ e Localização

| Option | Description | Selected |
|--------|-------------|----------|
| 3 Passos editoriais + FAQ Acordeão nativo acessível + Mapa Lazy com atalhos Waze/Google Maps | Estrutura completa inspirada no Stitch com máximo acolhimento | ✓ |
| Formulário de agendamento de visita | Cria fricção desnecessária para novos visitantes | |

**User's choice:** 3 Passos editoriais + FAQ Acordeão nativo acessível + Mapa Lazy com atalhos Waze/Google Maps (recomendado)
**Notes:** Decisão [auto]. Informa com clareza e tira dúvidas comuns antes do primeiro culto.

---

## 6. Dízimos, Ofertas e PIX

| Option | Description | Selected |
|--------|-------------|----------|
| Bloco discreto ao final da página com chave visível e botão "Copiar chave PIX" com micro-feedback | Solene, respeitoso e prático conforme design Stitch | ✓ |
| Banner chamativo no topo ou popup de doação | Inadequado e excessivamente comercial | |

**User's choice:** Bloco discreto ao final da página com chave visível e botão "Copiar chave PIX" com micro-feedback (recomendado)
**Notes:** Decisão [auto]. Total harmonia com a estética Stitch e a visão pastoral da igreja.

---

## the agent's Discretion

- Seleção de ícones para ministérios e passos do visitante.
- Animações refinadas de transição no acordeão FAQ e badges.
- Tratamento de estados vazios (quando não houver eventos futuros cadastrados).

## Deferred Ideas

None — discussion stayed within phase scope
