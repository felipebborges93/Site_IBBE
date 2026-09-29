# Walking Skeleton — Site IBBE

**Phase:** 1
**Generated:** 2026-09-29

## Capability Proven End-to-End

Um visitante acessa a página inicial do site institucional da IBBE, renderizada via Next.js App Router com o design system Bethel Resende completo (Bricolage Grotesque, Caveat, Tailwind tokens marinho/cobalto/gelo), navegando com Header dinâmico (transparência com transição ao rolar), visualizando componentes base estilizados e Footer institucional de 4 colunas alimentado com dados reais da arquitetura `/content`.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15+ App Router | SSR/SSG nativo, suporte a Server Components para performance e SEO otimizado |
| Styling & Design Tokens | Tailwind CSS 3.4+ com tokens Bethel Resende | Zero runtime CSS overhead, classes utilitárias mapeadas diretamente do design Stitch |
| Typography | Google Fonts via `next/font/google` (Bricolage Grotesque + Caveat) | Carregamento otimizado sem CLS (Cumulative Layout Shift); Caveat carregada com variável CSS para realces tipográficos pontuais |
| Icons | Phosphor Icons (`@phosphor-icons/react`) | Biblioteca de ícones leve e coerente com a referência visual Stitch |
| Content Architecture | Typed TypeScript files em `/content` com barrel export | Edição simples e type-safe sem alterar JSX/componentes; placeholders `[PLACEHOLDER: ...]` explícitos para dados pendentes |
| Server vs Client Components | App layout, Header shell e Footer em Server Components; scroll watcher isolado em Client Component (`"use client"`) | Máxima performance SSR sem JavaScript no bundle raiz para elementos estáticos |
| Component Composition | Props simples (`title`, `subtitle`, `children`) sem CVA ou compound slots | Manutenção amigável para pessoas leigas em programação apoiadas por IA |
| Deployment target | Vercel | Otimização nativa para Next.js App Router e ISR |
| Directory layout | `app/`, `components/ui/`, `components/layout/`, `content/`, `lib/` | Estrutura modular, desacoplada e intuitiva |

## Stack Touched in Phase 1

- [x] Project scaffold (Next.js App Router, TypeScript, Tailwind CSS, PostCSS, ESLint)
- [x] Routing — App Router root page (`app/page.tsx`) e layout raiz (`app/layout.tsx`)
- [x] Content Data Layer — Tipagem e dados estáticos em `/content` (`site.ts`, `services.ts`, `events.ts`, `groups.ts`, `ministries.ts`, `history.ts`, `faq.ts`, `index.ts`)
- [x] UI — Componentes base reutilizáveis (`Button`, `Card`, `Section`, `SectionTitle`, `Container`, `SectionDivider`) e componentes de layout (`Header`, `HeaderScrollWatcher`, `Footer`, `Logo`)
- [x] Deployment / Run — Aplicação executando perfeitamente via `npm run dev` e validada por `npm run build`

## Out of Scope (Deferred to Later Slices)

- Hero section com cálculo dinâmico de próximo culto e mosaico de fotos (Phase 2)
- Menu de navegação mobile drawer/hambúrguer e rolagem por âncoras (Phase 2)
- Seções estáticas especializadas de conteúdo da home e página dedicada `/nossa-historia` (Phase 3)
- Integração de lives com YouTube Data API v3 e fallbacks (Phase 4)
- Formulário e backend Supabase para pedidos de oração (Phase 5)
- Otimizações avançadas de SEO, acessibilidade WCAG AA, LGPD e security headers (Phase 6)
- Testes automatizados com Vitest e checklist final de entrega (Phase 7)

## Subsequent Slice Plan

Each later phase adds one vertical slice on top of this skeleton without altering its architectural decisions:

- Phase 2: Menu fixo com âncoras, drawer mobile, hero section com cálculo de próximo culto e botão WhatsApp flutuante
- Phase 3: Seções estáticas da home (história, cultos, eventos, grupos, ministérios, ação social, visita, localização, PIX) e página `/nossa-historia`
- Phase 4: Integração com lives do YouTube (API + RSS fallback + badge AO VIVO)
- Phase 5: Formulário e moderação de pedidos de oração integrados ao Supabase com RLS
- Phase 6: Auditoria de SEO, A11y, Performance (Lighthouse >= 90) e conformidade LGPD
- Phase 7: Testes automatizados, documentação e checklist de lançamento
