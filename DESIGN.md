---
name: Bethel Resende Community Warmth
description: Sistema visual acolhedor, humano e acessível da Igreja Batista Bethel em Resende
colors:
  primary: "#1D75DD"
  secondary: "#48A4FF"
  tertiary: "#00A818"
  neutral-dark: "#122035"
  neutral-soft: "#D7E9F4"
  neutral-light: "#F4F9FD"
  neutral-white: "#FFFFFF"
  heroComposition:
    desktop: "side-by-side"
    mobile: "carousel-grid"
  pillBadge: "Próximo Encontro"
typography:
  display:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
  micro:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.03em"
  hero-display:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(3rem, 8vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 1.03
    letterSpacing: "-0.02em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-white}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#1560b7"
  button-secondary:
    backgroundColor: "{colors.neutral-soft}"
    textColor: "{colors.neutral-dark}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-dark}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  card-primary:
    backgroundColor: "{colors.neutral-white}"
    textColor: "{colors.neutral-dark}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  card-accent:
    backgroundColor: "{colors.neutral-soft}"
    textColor: "{colors.neutral-dark}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  chip-badge:
    backgroundColor: "{colors.neutral-soft}"
    textColor: "{colors.neutral-dark}"
    rounded: "{rounded.full}"
    padding: "6px 16px"
---

# Design System: Bethel Resende Community Warmth

## Overview

**Creative North Star: "Bethel Community Warmth"**

O sistema visual expressa a alma da Igreja Batista Bethel em Resende ("Igrejinha do cantão"): uma comunidade cristã calorosa, simples, autêntica e profundamente acolhedora. Toda a atmosfera visual é pensada para desarmar o receio de visitantes e comunicar que *aqui ninguém caminha só*. A claridade e o calor humano sobrepõem-se à frieza tecnológica ou ao espetáculo performático.

A paleta e a espacialidade alternam superfícies predominantemente luminosas em Branco Puro (`#FFFFFF`) e Gelo Suave (`#D7E9F4`), intercaladas por divisores curvos em ondas e diagonais suaves. O Azul Noite (`#122035`) substitui o preto com sobriedade digna, enquanto o Cobalto (`#1D75DD`) conduz ações e convites de forma amigável e segura.

**Anti-referências visuais confirmadas:** Rejeita-se categoricamente a estética de mega-igreja escura com luzes de palco, fumaça, neon ou iluminação volumétrica de concerto de rock, bem como layouts corporativos burocráticos, frios ou estéreis.

**Key Characteristics:**
- Acolhimento luminoso em primeiro plano com superfícies limpas e respiráveis.
- Formas táteis orgânicas com botões pílula (`rounded-full`) e cartões de cantos generosos (`rounded-3xl` / 24px).
- Tipografia humanista robusta com destaque manuscrito pontual (Caveat em palavra única).
- Elevação sutil com sombras pigmentadas em Azul Noite, transmitindo suavidade sem artificialismo.

## Colors

Paleta luminosa e confortante inspirada no céu, nas montanhas e na serenidade comunitária do Vale do Paraíba fluminense.

### Primary
- **Azul Real** (`#1D75DD`): O tom mestre de ação e identidade. Usado em botões de ação prioritários (CTAs como "Planeje sua Visita"), links interativos, estados focados e destaques estruturais.

### Secondary
- **Azul Celeste** (`#48A4FF`): Símbolo de esperança e luminosidade. Utilizado no detalhe superior do símbolo da cruz, em gradientes sutis e sublinhados decorativos.

### Tertiary
- **Verde Esperança** (`#00A818`): Acento de vida e dinamismo. Utilizado com extrema raridade e propósito exclusivo para o badge pulsante "AO VIVO" das transmissões no YouTube e mensagens de sucesso confirmado.

### Neutral
- **Azul Noite** (`#122035`): Neutral escuro mestre. Substitui o preto absoluto em todos os títulos, textos corridos, ícones e no rodapé escuro imersivo, proporcionando contraste legível sob sol intenso sem rigidez fria.
- **Gelo Suave** (`#D7E9F4`): Superfície neutra suave. Utilizado como fundo de seções alternadas, botões secundários e pílulas informativas.
- **Gelo Claro** (`#F4F9FD`): Variação de máxima suavidade para fundos de cards contrastantes e bordas delicadas.
- **Branco Puro** (`#FFFFFF`): O canvas principal de clareza, honestidade e pureza onde os conteúdos respiram.

### Named Rules
**The Living Accent Rule.** O Verde Esperança (`#00A818`) é restrito exclusivamente a status vivos (badge "AO VIVO" da live) e confirmações de envio de oração. É terminantemente proibido usá-lo em botões de navegação comum, títulos ou ícones decorativos.

**The Warm Neutral Rule.** O preto puro (`#000000`) é proibido. Textos escuros, ícones e fundos profundos devem utilizar sempre o Azul Noite (`#122035`) para preservar a temperatura acolhedora da interface.

## Typography

**Display Font:** Bricolage Grotesque (Google Fonts, com fallback `sans-serif`)
**Body Font:** Bricolage Grotesque (Google Fonts, com fallback `sans-serif`)
**Accent Script Font:** Caveat (Google Fonts, com fallback `cursive`)

**Character:** O Bricolage Grotesque entrega vigor contemporâneo, curvas amigáveis e clareza de leitura excepcional para públicos de todas as idades em telas modestas. A fonte manuscrita Caveat entra como uma assinatura humana e calorosa, destacando uma palavra-chave emocional nos títulos.

### Hierarchy
- **Display** (800 Extrabold, `clamp(2.25rem, 5vw, 3.75rem)`, line-height 1.1, tracking-tight): Título de boas-vindas do Hero.
- **Headline** (800 Extrabold, `clamp(1.75rem, 4vw, 2.5rem)`, line-height 1.2, tracking-tight): Cabeçalhos das seções institucionais (`h2`).
- **Title** (700 Bold, `1.25rem` / 20px, line-height 1.3): Nomes de cultos, pequenos grupos, ministérios e marcos históricos (`h3`).
- **Body** (400 Normal, `1rem` / 16px, line-height 1.6, max line length 65–75ch): Textos informativos, história e parágrafos explicativos.
- **Label** (600 Semibold, `0.75rem` / 12px, tracking-wider, uppercase): Horários em chips, mini-etiquetas de aviso e metadados.

### Named Rules
**The Single Script Word Rule.** A fonte manuscrita Caveat deve destacar rigorosamente no máximo UMA única palavra por título (ex: "Uma igreja feita de *pessoas.*" ou "Nossa *história*"). Usar múltiplas palavras ou frases inteiras em cursiva é proibido para não comprometer a dignidade e a legibilidade.

## Layout

O layout segue uma arquitetura fluida mobile-first com container central de largura máxima de `1280px` (`max-w-7xl`), respeitando margens confortáveis no celular (padding `1.25rem`) e amplas no desktop (padding horizontal `3rem`).

As seções fluem verticalmente alternando entre fundo Branco Puro (`#FFFFFF`) e Gelo Suave (`#D7E9F4`), conectadas por divisores SVG decorativos (`SectionDivider`) em formatos ondulados (`variant="wave"`) ou diagonais suaves (`variant="diagonal"`), eliminando divisões rígidas e conferindo um caminhar contínuo ao visitante.

## Elevation & Depth

O sistema prioriza a clareza planar, utilizando elevação tátil e sombras suaves para separar planos de conteúdo e convidar ao toque. Todas as sombras são enriquecidas com o tom Azul Noite (`rgba(18, 32, 53, ...)`), evitando o aspecto acinzentado das sombras comuns.

### Shadow Vocabulary
- **Resting Surface (Level 1)** (`box-shadow: 0 4px 20px -2px rgba(18, 32, 53, 0.05), 0 2px 6px -1px rgba(18, 32, 53, 0.03)`): Estado de repouso dos cards de cultos, grupos e caixas de conteúdo.
- **Tactile Lift (Level 2)** (`box-shadow: 0 12px 32px -4px rgba(29, 117, 221, 0.12), 0 4px 12px -2px rgba(18, 32, 53, 0.06)`): Elevação ao passar o mouse (hover) ou tocar em cards interativos e botões primários, com leve halo de Cobalto.
- **Modal Overlay (Level 3)** (`box-shadow: 0 24px 48px -12px rgba(18, 32, 53, 0.18)`): Camadas flutuantes, modais de oração e menu fixo com `backdrop-blur-md`.

### Named Rules
**The Organic Shadow Rule.** Nenhuma sombra é puramente preta ou cinza desaturada. Todas incorporam partículas do Azul Noite para fundirem-se harmoniosamente com o fundo gelo e branco.

## Shapes

A linguagem formal é totalmente arredondada, sem cantos afiados ou cantos vivos agressivos.

- **Botões e Badges:** Curvatura total em formato de pílula (`rounded-full`, raio `9999px`), transmitindo suavidade imediata ao clique.
- **Cards e Contêineres:** Cantos amplos e acolhedores de `24px` (`rounded-3xl` / `1.5rem`), criando silhuetas amigáveis que convidam à leitura.
- **Divisores de Seção:** Transições orgânicas em arco e ondas curvas que guiam suavemente o olhar entre blocos de conteúdo.

## Components

### Buttons
- **Shape:** Pílula (`rounded-full`, 9999px).
- **Primary:** Fundo Azul Real (`#1D75DD`), texto Branco (`#FFFFFF`), padding vertical 12px horizontal 24px (Hero: 16px/32px), peso semibold.
- **Hover / Focus:** Transição de 200ms para `bg-cobalto/90` com sombra elevada (`shadow-elevation-2`) e anel de acessibilidade `focus:ring-2 focus:ring-cobalto focus:ring-offset-2`.
- **Secondary:** Fundo Gelo Suave (`#D7E9F4`), texto Azul Noite (`#122035`), padding 12px 24px.
- **Ghost:** Fundo transparente com texto Azul Noite e hover sutil `bg-marinho/5`.

### Chips e Badges
- **Style:** Fundo Gelo Suave (`#D7E9F4`), texto Azul Real (`#1D75DD`) ou Azul Noite (`#122035`), raio total (`rounded-full`), padding 6px 14px, tipografia semibold tamanho 12px (`text-xs`).
- **Live Badge:** Fundo Verde Esperança (`#00A818`), texto Branco Puro, com ponto de pulso luminoso sincronizado para lives ativas.

### Cards
- **Corner Style:** Cantos arredondados generosos de `24px` (`rounded-3xl`).
- **Background:** Branco Puro (`#FFFFFF`) quando em seções gelo; Gelo Suave (`#D7E9F4`) quando em seções brancas.
- **Shadow Strategy:** Nível 1 em repouso com transição suave para Nível 2 ao passar o cursor.
- **Border:** Contorno ultraleve de 1px (`border-marinho/5`) para manter definição em qualquer calibragem de tela.
- **Internal Padding:** 24px (`p-6`) no mobile e 32px (`p-8`) em telas maiores.

### Inputs e Formulários
- **Style:** Fundo Branco ou Gelo Claro (`#F4F9FD`), contorno suave de 1px em Azul Noite com 15% de opacidade (`border-marinho/15`), raio de 16px (`rounded-2xl`), padding 14px 18px.
- **Focus:** Destaque nítido com borda Cobalto e anel de foco sem contraste agressivo.

### Navigation
- Barra superior fixa no topo (`sticky` / `fixed`), fundo translúcido `bg-white/95` com desfoque de fundo (`backdrop-blur-md`), borda inferior imperceptível `border-marinho/10`, logotipo à esquerda, links de navegação fluidos e botão de chamada em pílula à direita.

## Do's and Don'ts

### Do:
- **Do** manter a alternância de seções claras (Branco ↔ Gelo) com divisores curvos para assegurar uma navegação leve e agradável.
- **Do** limitar o uso da fonte Caveat a rigorosamente uma única palavra por cabeçalho.
- **Do** manter todos os botões e badges informativos com formato pill (`rounded-full`).
- **Do** garantir contraste visual em conformidade com WCAG AA em todas as seções, especialmente sob luz ambiente forte.
- **Do** utilizar sempre o Azul Noite (`#122035`) para qualquer superfície ou texto escuro.

### Don't:
- **Don't** utilizar preto puro (`#000000`) em qualquer componente, texto, sombra ou elemento de interface.
- **Don't** adotar cantos pontiagudos de 0px ou 4px em cartões e botões; a identidade do sistema requer cantos arredondados generosos.
- **Don't** aplicar o Verde Esperança (`#00A818`) em botões normais, ícones de redes sociais ou cartões genéricos.
- **Don't** recorrer a fundos escuros volumosos com estética soturna ou iluminação de show; a interface deve permanecer luminosa e calorosa.
- **Don't** usar mais de uma fonte decorativa cursiva no projeto.
