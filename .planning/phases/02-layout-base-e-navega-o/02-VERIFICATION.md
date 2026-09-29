---
phase: 02-layout-base-e-navega-o
verified_at: 2026-09-29T22:25:00Z
status: passed
score: 100%
requirements:
  - NAV-01
  - NAV-02
  - NAV-03
  - HERO-01
  - HERO-02
  - HERO-03
---

# Phase 02: Layout Base e Navegação — Relatório de Verificação

## Resumo Executivo
Todos os planos da Fase 02 (`02-01` e `02-02`) foram implementados com rigor técnico e fidelidade estética aos protótipos Stitch (`stitch-desktop.html` e `stitch-mobile.html`). A suíte de compilação estática (`npm run build`) e checagem de tipos TypeScript (`npx tsc --noEmit`) foram executadas com sucesso sem erros ou advertências impeditivas.

---

## Verificação dos Requisitos

| Requisito | Descrição | Status | Evidência de Verificação |
|-----------|-----------|--------|--------------------------|
| **NAV-01** | Header fixo no topo com rolagem e navegação por âncoras | **PASS** | `Header.tsx` e `HeaderScrollWatcher.tsx` mantêm o cabeçalho fixo no topo (`fixed top-0 z-50`), alternando para fundo translúcido com `backdrop-blur-md` ao rolar mais de 20px. Compensação de altura aplicada em `app/globals.css` (`scroll-margin-top: 5rem`). |
| **NAV-02** | Menu de navegação responsivo (Desktop & Mobile Drawer) | **PASS** | Abaixo do breakpoint `xl`, o menu expandido é substituído pelo botão de menu hambúrguer com área de toque de 48px e `aria-expanded`/`aria-controls`. O componente `MobileDrawer.tsx` renderiza tela cheia com fundo `#122035`, trava de scroll (`document.body.style.overflow = "hidden"`), fechamento por tecla `Escape` e fechamento automático ao clicar nos links. |
| **NAV-03** | Botão Flutuante de WhatsApp | **PASS** | `FloatingWhatsApp.tsx` inserido globalmente em `app/layout.tsx`. Botão fixo no canto inferior direito (`fixed bottom-6 right-6 z-40`), círculo verde `#25D366`, ícone preenchido e URL dinâmica `wa.me` com sanitização numérica e mensagem padrão codificada. |
| **HERO-01** | Seção Hero editorial com tipografia cursiva ("pessoas.") | **PASS** | `Hero.tsx` renderiza H1 editorial de grande porte com a palavra "pessoas." estilizada com a fonte `Caveat` (`font-script-accent`), cor cobalto, itálica, peso extrabold e rotação sutil `-rotate-1`. |
| **HERO-02** | Mosaico de fotos comunitário com molduras e rotações | **PASS** | Mosaico composto por 3 fotos reais do Stitch: imagem principal com `-rotate-1` e duas sobrepostas com `-rotate-3` e `rotate-3`, molduras brancas espessas (`border-4 border-white`) e transição suave no hover (`hover:rotate-0`). Domínios remotos autorizados em `next.config.ts`. |
| **HERO-03** | Faixa de Próximo Encontro com cálculo dinâmico | **PASS** | `NextServiceBar.tsx` integrado à base da Hero. Algoritmo em `lib/utils/services.ts` calcula o próximo culto da semana com indicador pulsante verde (`bg-verde animate-pulse`), endereço resumido e link de ancoragem direta para `#cultos`. |

---

## Verificação de Gates e Anti-Patterns
- **Type Safety:** `npx tsc --noEmit` passou sem erros.
- **Next.js Production Build:** `npm run build` gerou artefatos estáticos otimizados (4/4 páginas estáticas geradas com sucesso).
- **Acessibilidade:** Touch targets mínimos de 48px respeitados em todos os botões e links de navegação; atributos ARIA corretos em controles dinâmicos.
- **Limpeza de Event Listeners:** Todos os hooks e componentes client-side (`useScrollspy`, `MobileDrawer`, `HeaderScrollWatcher`) possuem callbacks de limpeza adequados para evitar vazamentos de memória.
