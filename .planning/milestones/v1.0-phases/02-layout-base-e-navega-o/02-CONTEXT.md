# Phase 2: Layout Base e Navegação - Context

**Gathered:** 2026-09-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Implementação completa da barra de navegação superior (Header) fixa com links de âncora, rolagem suave e indicador de item ativo (Scrollspy); menu mobile responsivo com drawer lateral animado e trava de scroll; seção Hero autoral com tipografia editorial (palavra em destaque com fonte Caveat), mosaico assimétrico de fotos com rotações sutis e sombras do Stitch, botões de ação (CTA) e faixa inferior translúcida com cálculo dinâmico do próximo culto baseado em `content/services.ts`; e botão flutuante de WhatsApp presente em todas as páginas com mensagem pré-configurada baseada em `content/site.ts`.

</domain>

<decisions>
## Implementation Decisions

### 1. Scrollspy & Navegação Suave (NAV-01)
- **D-01:** Utilizar `IntersectionObserver` em hook ou componente client-side (`useScrollspy`) para detectar a seção visível na viewport com offset balanceado para a altura do Header fixo (`rootMargin: "-20% 0px -70% 0px"`). Evita recálculos pesados de scroll listener e mantém alta performance. — **Reversibility:** reversible
- **D-02:** Rolagem suave ativada via CSS global `scroll-smooth` e `scroll-margin-top` nas seções com IDs correspondentes (`#inicio`, `#historia`, `#cultos`, `#eventos`, `#grupos`, `#visita`, etc.), garantindo alinhamento perfeito sem cobrir títulos pelo header fixo. — **Reversibility:** reversible
- **D-03:** Links de navegação desktop atualizados para cobrir todas as seções mapeadas no Stitch: Início, Nossa História, Cultos, Eventos, Lives, PGMs, Ministérios, Ação Social, Oração, Sou Novo / Visite-nos e Contato, com CTA proeminente "Planeje sua visita". — **Reversibility:** reversible

### 2. Menu Mobile Drawer (NAV-03)
- **D-04:** Implementar menu mobile como Drawer lateral em tela cheia com fundo `brand-navy` (`#122035`) ou overlay suave, acionado por botão de hambúrguer acessível (`aria-expanded`, `aria-label`, tecla `Escape`). — **Reversibility:** reversible
- **D-05:** Trava de rolagem (`document.body.style.overflow = 'hidden'`) enquanto o menu mobile estiver aberto, fechando automaticamente ao clicar em qualquer link de âncora ou no botão de fechar (X). — **Reversibility:** reversible
- **D-06:** No topo do mobile, manter Header compacto fixo com Logo da IBBE, botão de atalho direto "Visitar" e botão do menu hambúrguer, idêntico à especificação mobile do Stitch. — **Reversibility:** reversible

### 3. Hero Section & Mosaico de Imagens (HERO-01, HERO-02)
- **D-07:** Título principal: `"Uma igreja feita de "` com `pessoas.` estilizado em fonte `Caveat`, cor cobalto/itálica, exatamente conforme `stitch-desktop.html` e `stitch-mobile.html`. Subtítulo acolhedor: `"Aqui ninguém caminha só. Venha fazer parte da nossa família em Vila Isabel, Resende."`. — **Reversibility:** reversible
- **D-08:** Mosaico fotográfico assimétrico: 3 retratos reais com bordas brancas espessas (`border-4 border-white`), cantos arredondados (`rounded-2xl` / `rounded-3xl`), sombras suaves `shadow-lg` e rotações táteis sutis (`-rotate-1`, `-rotate-3`, `rotate-3` com transição `hover:rotate-0`). No mobile, simplificar a sobreposição para manter excelente legibilidade e performance sem quebras de layout. — **Reversibility:** reversible
- **D-09:** Botões CTA do Hero: botão principal em pílula azul cobalto `"Planeje sua visita"` (âncora `#visita`) com efeito hover suave, acompanhado de botão secundário/link `"Assistir ao vivo"` (quando houver transmissão ou link padrão para canal do YouTube). — **Reversibility:** reversible

### 4. Faixa Inferior & Próximo Culto (HERO-03)
- **D-10:** Função utilitária pura `calculateNextService(services: ServiceItem[], now = new Date())` em `lib/utils/services.ts` (ou similar) que itera pelos cultos de `content/services.ts`, calcula o próximo encontro cronológico na semana (Domingo 09h/19h, Quinta 19h30, etc.) e formata para exibição humanizada. — **Reversibility:** reversible
- **D-11:** Faixa translúcida na base do Hero com `bg-white/70 backdrop-blur-md` e borda superior fina, contendo indicador verde pulsante (`animate-pulse`), nome e horário do próximo encontro, endereço resumido de Vila Isabel e link direto `"Ver todos os horários"` (`#cultos`). — **Reversibility:** reversible

### 5. Botão Flutuante de WhatsApp (NAV-02)
- **D-12:** Componente `FloatingWhatsApp` fixo no canto inferior direito (`fixed bottom-6 right-6 z-40`), botão circular (`w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all`). — **Reversibility:** reversible
- **D-13:** Link formatado com `https://wa.me/${phone}?text=${encodedMessage}`, puxando número de telefone oficial de `content/site.ts` com mensagem amigável de recepção ("Olá! Visitei o site da Igreja Batista Bethel em Resende e gostaria de mais informações."). — **Reversibility:** reversible

### the agent's Discretion
- Animações e micro-interações finas de transição do drawer mobile e rotação dos retratos no hover.
- Ajustes finos de breakpoint responsivo para adaptação limpa entre telas mobile, tablet e desktop widescreen.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System & Layouts Stitch
- `stitch-desktop.html` — Layout desktop completo: Header (linhas 45-98), Hero autoral e Mosaico (linhas 99-151), Botão WhatsApp (linhas 896-900)
- `stitch-mobile.html` — Layout mobile completo: Header mobile (linhas 66-85), Fullscreen Drawer (linhas 86-116), Hero mobile (linhas 117-150), Botão WhatsApp mobile (linhas 770-776)
- `.planning/PROJECT.md` §Design Tokens — Cores oficiais (`marinho: #122035`, `cobalto: #1D70B8`, `céu: #DCEAF4`, `gelo: #F4F9FD`, `verde: #2ECC71`), fontes (`Bricolage Grotesque`, `Caveat`)

### Requisitos e Arquitetura
- `.planning/REQUIREMENTS.md` — Requisitos NAV-01, NAV-02, NAV-03, HERO-01, HERO-02, HERO-03
- `.planning/ROADMAP.md` §Phase 2 — Escopo e critérios de sucesso da Fase 2
- `.planning/phases/01-funda-o-do-projeto/01-CONTEXT.md` — Decisões de fundação (D-01 a D-15), arquitetura de Server/Client Components e convenções de `/content`

### Conteúdo Base
- `content/services.ts` — Dados tipados de cultos e encontros semanais para o cálculo automático do próximo encontro
- `content/site.ts` — Informações da igreja, telefones, endereço e link do WhatsApp

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/ui/Button.tsx`: Botão com variantes `primary`, `secondary`, `ghost` e suporte a link via prop `href`
- `components/ui/Container.tsx`: Contêiner com larguras padronizadas (`sm`, `md`, `lg`, `xl`, `full`)
- `components/layout/HeaderScrollWatcher.tsx`: Componente client-side que monitora `window.scrollY > 20` para alternar entre cabeçalho transparente e sólido com backdrop blur
- `components/layout/Logo.tsx`: Logotipo oficial da IBBE em SVG inline
- `content/services.ts` & `content/site.ts`: Arquivos tipados preenchidos na Fase 1

### Established Patterns
- Client Components (`"use client"`) isolados apenas onde necessária interatividade (scroll, drawer state, observers), mantendo layouts e páginas como Server Components sempre que possível
- Tailwind utilities configuradas com os tokens do Stitch (`bg-marinho`, `text-cobalto`, `bg-gelo`, `font-script`, etc.)

### Integration Points
- `app/layout.tsx`: Onde `Header`, `FloatingWhatsApp` e `Footer` residem como casca da aplicação
- `app/page.tsx`: Onde a nova seção `Hero` será montada como primeira seção visível do site (`id="inicio"`)

</code_context>

<specifics>
## Specific Ideas

- Palavra "pessoas." no Hero tem destaque com classe `font-script text-cobalto italic font-extrabold` usando a fonte Caveat
- O mosaico assimétrico do Hero transmite calor humano e pertencimento comunitário imediato para visitantes novos
- Cálculo de "Próximo Encontro" considera o dia e a hora atuais para apontar dinamicamente para o próximo culto da grade semanal

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 2-Layout Base e Navegação*
*Context gathered: 2026-09-29*
