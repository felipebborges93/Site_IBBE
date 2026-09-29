# Site Oficial — Igreja Batista Bethel em Resende (IBBE)

## What This Is

Site institucional de página única (landing page) para a Igreja Batista Bethel em Resende, uma igreja de bairro em Vila Isabel, Resende/RJ, fundada em 28/10/2000. O site serve como presença digital da igreja: informar horários, mostrar história, receber pedidos de oração, transmitir lives e facilitar o primeiro contato de visitantes.

## Core Value

**Acolhimento acessível**: uma pessoa com celular modesto e internet limitada consegue, em segundos, saber quando é o próximo culto, pedir oração e planejar sua primeira visita. Tudo mobile-first, leve, rápido e simples.

## Context

- **Organização**: Igreja Batista Bethel em Resende — "Igrejinha do cantão"
- **Localização**: Rua das Acácias, 120 – Vila Isabel, Resende/RJ
- **Fundação**: 28/10/2000, por 28 irmãos
- **Pastor atual**: Alexandre Moura
- **Público-alvo**: Famílias trabalhadoras do bairro, muitas acessando pelo celular com internet limitada
- **Slogan**: "Uma igreja feita de pessoas." / "Aqui ninguém caminha só."
- **Tom de voz**: Acolhedor, próximo, simples, esperançoso. Português do Brasil, sem jargão religioso excessivo.
- **Quem mantém o site**: Leigo em programação, com apoio de IA. Código deve ser limpo, comentado e com conteúdo editável sem mexer em componentes.

## Design Reference

Visual de referência gerado no Google Stitch: **"Igreja Batista Bethel Landing Page"** (projeto `projects/1914640869962780045`). Inclui telas Desktop (1440px) e Mobile (390px) com design system completo (designMd "Bethel Resende Community Warmth").

**Regra de conflito**: se houver divergência entre este documento e o design Stitch, o design vence no visual, e este documento vence no comportamento e nos dados.

### Design Tokens (Tailwind theme)
- marinho: `#122035` (neutral primário, substitui preto puro)
- cobalto: `#1D75DD` (primária, CTAs)
- céu: `#48A4FF` (secundária, gradientes, destaques)
- gelo: `#D7E9F4` (superfície alternada, backgrounds suaves)
- branco: `#FFFFFF` (canvas principal)
- floresta/verde: `#00A818` (acento raro — sucesso, "ao vivo")
- Cantos arredondados grandes (botões pill `rounded-full`, cards `rounded-2xl`/`rounded-3xl`)
- Sombras suaves com tint de navy, contraste WCAG AA

### Typography
- **Títulos e corpo**: Bricolage Grotesque (Google Fonts via `next/font`)
- **Acento script**: Caveat (padrão) ou Dongra Script (se fornecido em `/public/fonts`) — usada APENAS para realçar UMA palavra em títulos (ex: "pessoas" em "Uma igreja feita de _pessoas._")
- Body text com line-height 1.55–1.6 para conforto de leitura

### Layout
- Grid responsivo, max-width 1280px
- Mobile (<768px): padding 1.25rem, gap 1rem
- Desktop (>1024px): margin 3rem, gap 1.5rem
- Seções alternando fundo branco ↔ gelo com separadores curvos

### Elevation
- Level 0: flat backgrounds
- Level 1 (card): `0 4px 20px -2px rgba(18,32,53,0.05), 0 2px 6px -1px rgba(18,32,53,0.03)`
- Level 2 (hover): `0 12px 32px -4px rgba(29,117,221,0.12), 0 4px 12px -2px rgba(18,32,53,0.06)`
- Level 3 (modal): `0 24px 48px -12px rgba(18,32,53,0.18)` + backdrop-blur

## Stack

| Camada         | Tecnologia                                          |
|----------------|-----------------------------------------------------|
| Framework      | Next.js (App Router) + TypeScript                   |
| Estilo         | Tailwind CSS                                        |
| Animações      | CSS nativo ou Framer Motion pontual                 |
| Banco de dados | Supabase (Postgres) com Row Level Security          |
| Deploy         | Vercel (ou indicado pelo owner)                     |
| Fontes         | Bricolage Grotesque + Caveat (Google Fonts, next/font) |
| Ícones         | Phosphor Icons (lucide-react ou similar leve)       |

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **HERO-01**: Hero tela cheia com título "Uma igreja feita de _pessoas._" (palavra em script), subtítulo, botões "Planeje sua visita" e "Assistir ao vivo", faixa com próximo culto calculado
- [ ] **HIST-01**: Seção "Nossa história" com resumo + link para página `/nossa-historia` completa
- [ ] **HIST-02**: Página `/nossa-historia` com texto completo, linha do tempo 2000→2003→Hoje, versículo, homenagem aos pastores
- [ ] **CULT-01**: Cards de cultos/EBD a partir de `services.ts` com destaque automático do próximo encontro
- [ ] **EVEN-01**: Cards de eventos a partir de `events.ts`, carrossel mobile/grade desktop, ocultando passados
- [ ] **LIVE-01**: 4 últimas lives do YouTube via API, cache 30min, fallback RSS → card amigável
- [ ] **LIVE-02**: Selo "AO VIVO" pulsante quando live em andamento + botão Hero apontando para ela
- [ ] **GRUP-01**: Pequenos grupos (PGMs) a partir de `groups.ts` com botão "Quero participar" → WhatsApp pré-preenchido
- [ ] **MINI-01**: Ministérios a partir de `ministries.ts` com ícone e descrição
- [ ] **ACAO-01**: Seção de ação social
- [ ] **PRAY-01**: Formulário de pedidos de oração com nome opcional, interruptor anônimo, validação Zod client+server, honeypot, rate limit por hash de IP
- [ ] **PRAY-02**: Tabela `prayer_requests` no Supabase com RLS (anon só INSERT), status enum (pending→approved→displayed→archived→rejected)
- [ ] **PRAY-03**: API `GET /api/prayer-requests/display` + `PATCH /api/prayer-requests/:id/displayed` protegidas por token para futuro telão
- [ ] **PRAY-04**: Área de moderação `/admin/oracao` com autenticação Supabase Auth, listar/aprovar/rejeitar/arquivar, mobile-friendly, noindex
- [ ] **LOCA-01**: Google Maps iframe lazy, endereço, botões "Abrir no Google Maps" e "Como chegar"
- [ ] **PIX-01**: Seção contribuição PIX com botão "Copiar chave" e feedback visual
- [ ] **VISI-01**: "Planeje sua visita" com 3 passos + acordeão FAQ + botão WhatsApp
- [ ] **CONT-01**: Conteúdo editável via pasta `/content` com arquivos TS tipados (site, services, events, groups, ministries, history, faq)
- [ ] **NAV-01**: Menu fixo com âncoras, rolagem suave, item ativo destacado, botão WhatsApp flutuante
- [ ] **SEO-01**: Metadata completa, Open Graph, sitemap.xml, robots.txt, JSON-LD Church, lang pt-BR
- [ ] **PERF-01**: Lighthouse ≥ 90 mobile, imagens WebP/AVIF via next/image, fontes display:swap
- [ ] **A11Y-01**: HTML semântico, contraste AA, navegação por teclado, alt em imagens, prefers-reduced-motion
- [ ] **LGPD-01**: Página `/privacidade`, aviso no formulário, sem cookies de rastreamento, hash de IP
- [ ] **TEST-01**: Testes do cálculo "próximo culto", validação do formulário (caso anônimo), fallback YouTube
- [ ] **SEC-01**: Nenhuma chave no repo, cabeçalhos de segurança, validação de entrada no servidor
- [ ] **DOC-01**: README em português, .env.example, docs/telao-api.md, checklist de configuração

### Out of Scope

- Webapp do telão (apenas APIs preparatórias) — será projeto futuro
- Sistema de membros / área logada para congregantes — escopo futuro
- Blog / publicação de artigos — não solicitado
- E-commerce / loja online — não aplicável
- App mobile nativo — site responsivo é suficiente
- Multi-idioma — apenas português do Brasil

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router + TypeScript | Stack moderno, SSR/ISR nativo, boa DX | Confirmado pelo usuário |
| Supabase para pedidos de oração | Postgres + RLS + Auth + Realtime em um só lugar; camada de abstração em `lib/prayer-repository.ts` para facilitar troca futura | Confirmado |
| Conteúdo em arquivos TS tipados (`/content`) | Permite edição sem mexer em componentes; tipagem previne erros; JSON-like mas com IntelliSense | Confirmado |
| YouTube Data API v3 com fallback RSS | Cota econômica via playlistItems.list, resiliente a falhas | Confirmado |
| Caveat como fonte script padrão | Dongra Script apenas se arquivo fornecido em /public/fonts | Confirmado |
| Design Stitch como referência visual | Divergências: design vence no visual, documento vence no comportamento/dados | Confirmado |
| Phosphor Icons | Leve, já usado no design Stitch | Decidido |
| Hash de IP (nunca IP bruto) | Conformidade LGPD para rate limiting | Confirmado |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-09-29 after initialization*
