# Phase 3: Seções de Conteúdo Estático - Context

**Gathered:** 2026-09-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Implementação de todas as seções de conteúdo estático do site lidas de `/content` — história (resumo na home e página completa `/nossa-historia` com linha do tempo), cultos e EBD com destaque visual automático do próximo culto, eventos com filtro de passados e carrossel mobile, pequenos grupos (PGMs) com botão direto de WhatsApp, ministérios com ícones e descrições, ação social com iniciativas comunitárias, planeje sua visita com 3 passos e FAQ acordeão, localização com Google Maps/Waze e seção de dízimos/ofertas com chave PIX e feedback de cópia.

</domain>

<decisions>
## Implementation Decisions

### 1. Seção "Nossa História" & Página `/nossa-historia` (HIST-01, HIST-02)
- **D-01:** Na Home (`#historia`), apresentar resumo editorial conciso com citação bíblica de Jeremias 29:11 destacada, cards da Fundação (2000) e da Capela dos 5 Dias (2003), e botão CTA "Conheça nossa história completa" apontando para a rota `/nossa-historia`. — **Reversibility:** reversible
- **D-02:** Na página `/nossa-historia`, implementar linha do tempo vertical rica e responsiva com marcos cronológicos (Fundação em 2000, A Capela dos 5 Dias em 2003, Expansão dos Ministérios, e Visão de Futuro), com citação pastoral e versículo tema destacados, fiel ao design editorial do Stitch. — **Reversibility:** reversible

### 2. Seção Cultos & Encontros com Destaque Dinâmico (CULT-01, CULT-02)
- **D-03:** Cards de cultos e EBD (`#cultos`) renderizados a partir de `content/services.ts`. O card do próximo culto da semana (calculado via `calculateNextService`) recebe destaque visual automático com badge pulsante `"Próximo Encontro"`, borda com realce sutil e selo de entrada livre. — **Reversibility:** reversible
- **D-04:** Informações em cada card: dia da semana, horário em badge pílula, título, descrição edificante e nota de acolhimento ("Entrada livre • Todos bem-vindos"). — **Reversibility:** reversible

### 3. Eventos com Filtro de Passados e Carrossel Mobile (EVEN-01, EVEN-02)
- **D-05:** Seção `#eventos` consome `content/events.ts`, filtrando eventos passados automaticamente (`new Date(event.date) >= startOfToday`). Caso não haja eventos futuros, exibir card de estado vazio acolhedor convidando para os cultos regulares. — **Reversibility:** reversible
- **D-06:** Layout responsivo: no mobile, carrossel touch horizontal com CSS Scroll-Snap nativo (`overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4 no-scrollbar`), e no desktop, grade de 3 colunas (`grid grid-cols-1 md:grid-cols-3 gap-6`), sem bibliotecas externas pesadas. — **Reversibility:** reversible

### 4. Pequenos Grupos nos Lares — PGMs (GRUP-01, GRUP-02)
- **D-07:** Seção `#grupos` renderiza cartões de PGM a partir de `content/groups.ts`, exibindo bairro, dia da semana, horário e faixa etária/perfil de cada grupo em Resende. — **Reversibility:** reversible
- **D-08:** Botão de WhatsApp em cada card com link pré-formatado (`https://wa.me/...`) e mensagem personalizada pré-preenchida para a liderança: *"Olá! Gostaria de participar do Pequeno Grupo no bairro [Bairro] da IBBE."*. — **Reversibility:** reversible

### 5. Ministérios e Ação Social (MINI-01, ACAO-01)
- **D-09:** Seção `#ministerios` com cartões em grade para os ministérios ativos em `content/ministries.ts` (Louvor, Infantil/Bethel Kids, Jovens/Conectados, Casais, Mulheres, Homens, etc.), exibindo ícone representativo e síntese de propósito. — **Reversibility:** reversible
- **D-10:** Seção `#acao-social` em bloco escuro com contraste (`bg-marinho text-white`), destacando as iniciativas comunitárias da IBBE (cestas de alimentos, amparo a famílias, parcerias locais) e botão de contato para doações ou voluntariado. — **Reversibility:** reversible

### 6. "Planeje sua Visita" & FAQ Interativo (VISI-01, VISI-02, VISI-03)
- **D-11:** Seção `#visita` estruturada com 3 passos práticos para o novo visitante (1. Como chegar, 2. O que esperar / Como se vestir, 3. Onde estacionar e recepção acolhedora) com numerais circulares elegantes. — **Reversibility:** reversible
- **D-12:** Acordeão FAQ interativo consumindo `content/faq.ts`, implementado como Client Component acessível (`aria-expanded`, controle limpo de expansão com transição de altura) com ícones + / -. Botão ao final direcionando ao WhatsApp para dúvidas adicionais. — **Reversibility:** reversible

### 7. Localização & Como Chegar (LOCA-01, LOCA-02, LOCA-03)
- **D-13:** Seção `#contato` exibindo endereço completo da capela em Vila Isabel, Resende, acompanhado de botões diretos de ação: *"Abrir no Google Maps"*, *"Abrir no Waze"* e *"Copiar endereço"* com feedback visual. — **Reversibility:** reversible
- **D-14:** Embed interativo do Google Maps com `loading="lazy"` e `referrerpolicy="no-referrer-when-downgrade"`, estilizado com cantos arredondados e sombra suave, além dos horários de atendimento da secretaria. — **Reversibility:** reversible

### 8. Dízimos, Ofertas e Chave PIX (PIX-01)
- **D-15:** Seção `#contribuir` discreta e elegante ao final da página (conforme Stitch), com chave PIX (CNPJ) institucional visível e botão funcional *"Copiar chave PIX"* com feedback visual temporário (*"Chave copiada!"* por 2 segundos via Clipboard API). — **Reversibility:** reversible

### the agent's Discretion
- Seleção dos ícones Lucide/Phosphor para ministérios e passos do visitante.
- Animações e micro-interações de accordion FAQ e scroll-snap dos cards de eventos.
- Ajustes finos de padding e alinhamento responsivo para visual idêntico ao Stitch.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System & Layouts Stitch
- `stitch-desktop.html` — Layout desktop: Seção História (linhas 153-208), Cultos e EBD (linhas 209-293), Eventos (linhas 294-429), PGMs (linhas 430-491), Ministérios (linhas 492-574), Ação Social (linhas 575-687), Planeje sua Visita e FAQ (linhas 688-757), Localização (linhas 758-812), PIX/Contribuir (linhas 813-840)
- `stitch-mobile.html` — Layout mobile correspondente para adaptações de carrossel, acordeão e cards
- `.planning/PROJECT.md` §Design Tokens — Cores oficiais (`marinho: #122035`, `cobalto: #1D70B8`, `gelo: #F4F9FD`, `céu: #DCEAF4`), fontes e espaçamentos

### Requisitos e Arquitetura
- `.planning/REQUIREMENTS.md` — Requisitos HIST-01, HIST-02, CULT-01, CULT-02, EVEN-01, EVEN-02, GRUP-01, GRUP-02, MINI-01, ACAO-01, VISI-01, VISI-02, VISI-03, LOCA-01, LOCA-02, LOCA-03, PIX-01
- `.planning/ROADMAP.md` §Phase 3 — Escopo da Fase 3
- `.planning/phases/01-funda-o-do-projeto/01-CONTEXT.md` & `02-CONTEXT.md` — Padrões e convenções estabelecidos

### Conteúdo Base Tipado
- `content/history.ts` — Textos da fundação, Capela dos 5 Dias, linha do tempo e versículo tema
- `content/services.ts` — Cultos regulares e horários da EBD
- `content/events.ts` — Eventos programados, datas e locais
- `content/groups.ts` — Pequenos Grupos multiplicadores (PGMs), bairros e horários
- `content/ministries.ts` — Ministérios, propósitos e públicos
- `content/faq.ts` — Perguntas frequentes e respostas dos visitantes
- `content/site.ts` — Informações institucionais, endereço, chave PIX, telefone e redes

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/ui/Button.tsx`: Botões estilizados com variantes e suporte nativo a `href`
- `components/ui/Card.tsx`: Cards com variantes `white`, `gelo`, `marinho`, elevações e bordas arredondadas
- `components/ui/Container.tsx`: Contêiner com larguras responsivas padronizadas
- `components/ui/Section.tsx`: Seções com background e padding consistentes
- `components/ui/SectionTitle.tsx`: Títulos de seção com palavra manuscrita estilizada (`highlight` em Caveat)
- `components/ui/SectionDivider.tsx`: Divisores geométricos com curvas (`wave`, `arc`, `diagonal`, etc.)
- `components/home/Hero.tsx` & `NextServiceBar.tsx`: Hero e cálculo automático de cultos

### Established Patterns
- Server Components por padrão; Client Components (`"use client"`) isolados onde há interatividade (FAQ accordion, copy to clipboard do PIX, botões de ação com feedback)
- Estilização pura com Tailwind CSS e tokens do tema IBBE (`marinho`, `cobalto`, `gelo`, `céu`)
- Tipagem estrita TypeScript de todos os dados consumidos de `/content`

### Integration Points
- `app/page.tsx`: Substituição dos placeholders de teste pelas seções completas de conteúdo da home
- `app/nossa-historia/page.tsx`: Nova rota dedicada com a história e linha do tempo completa da IBBE

</code_context>

<specifics>
## Specific Ideas

- A página `/nossa-historia` retrata o histórico inspirador da igreja em Resende (Fundação no ano 2000 e a construção da capela em 5 dias em 2003)
- O botão de copiar chave PIX fornece retorno tátil imediato com tooltip ou texto "Chave copiada!"
- O acordeão de dúvidas frequentes diminui o atrito para quem nunca visitou a comunidade

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 3-Seções de Conteúdo Estático*
*Context gathered: 2026-09-29*
