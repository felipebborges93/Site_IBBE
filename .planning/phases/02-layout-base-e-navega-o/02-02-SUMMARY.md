---
phase: 02-layout-base-e-navega-o
plan: 02
status: completed
executed_at: 2026-09-29T22:24:00Z
requirements:
  - HERO-01
  - HERO-02
  - HERO-03
---

# Plan 02-02 Summary: Seção Hero, Tipografia Editorial, Mosaico Fotográfico Assimétrico e Faixa Dinâmica do Próximo Culto

## Implementação Realizada

1. **Cálculo Determinístico de Próximo Culto:**
   - Criado `lib/utils/services.ts` com a função `calculateNextService(serviceList, now)`.
   - Mapeamento e cálculo de proximidade de tempo para cultos semanais (Domingo 09h00, Domingo 19h00, Quinta-feira 19h30).
   - Formatação humanizada em português ("Hoje às 19:00", "Amanhã às 19:00", "Domingo às 19:00") e fallback resiliente defensivo em caso de dados vazios ou erro de fuso.

2. **Faixa de Próximo Encontro (`NextServiceBar`):**
   - Criado `components/home/NextServiceBar.tsx` na base da Hero com fundo translúcido `bg-white/70 backdrop-blur-md` e borda sutil.
   - Ponto indicador verde pulsante (`bg-verde animate-pulse`), título do culto e data/hora.
   - Endereço de Vila Isabel e link de âncora "Ver todos os horários" apontando para `#cultos`.

3. **Seção Hero Editorial e Mosaico Fotográfico:**
   - Criado `components/home/Hero.tsx` em estrita concordância visual com o Stitch (`stitch-desktop.html` e `stitch-mobile.html`).
   - Título editorial `H1` com destaque tipográfico cursivo na palavra "pessoas." (`font-script-accent text-cobalto italic font-extrabold -rotate-1`).
   - Mosaico assimétrico de 3 fotos reais comunitárias com molduras brancas espessas (`border-4 border-white`), sombras suaves (`shadow-elevation-2`) e rotações táteis (`-rotate-1`, `-rotate-3`, `rotate-3` com efeito hover `hover:rotate-0`).
   - Botões CTA em formato pílula: primário cobalto "Planeje sua visita" (`#visita`) e secundário "Assistir ao vivo" (`#cultos`).
   - Configurado `next.config.ts` com `images.remotePatterns` autorizando `lh3.googleusercontent.com` e `images.unsplash.com`.

4. **Sincronização de Âncoras na Home:**
   - Atualizado `app/page.tsx` integrando a nova `<Hero />` no topo.
   - Preservadas e sincronizadas todas as âncoras da página (`#inicio`, `#historia`, `#cultos`, `#lives`, `#grupos`, `#eventos`, `#ministerios`, `#acao-social`, `#oracao`, `#visita`, `#contato`), garantindo sincronismo perfeito com o Scrollspy do Header e do Mobile Drawer.
   - Tipagem e container atualizados sem regressões, com validação de build estático completa (`npm run build` bem-sucedido).
