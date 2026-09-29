# Roadmap — Site IBBE

## Overview

**7 phases** | **50+ requirements** | Vertical MVP approach — cada fase entrega valor incremental.

## Phases

### Phase 1: Fundação do Projeto

**Goal:** Configurar o projeto Next.js com TypeScript, Tailwind CSS, design tokens, fontes, layout base e componentes reutilizáveis.
**Mode:** mvp
**Success Criteria:**

1. Projeto rodando com `npm run dev` sem erros
2. Tailwind configurado com todos os design tokens (cores, fontes, espaçamentos do Stitch)
3. Componentes base criados: Button, Card, Section, SectionTitle (com palavra em script), Container
4. Layout com header fixo e footer implementados
5. Pasta `/content` criada com arquivos TS tipados e dados do documento preenchidos

**Requirements:** CONT-01, CONT-02

**Plans:** 2/2 plans executed
**Wave 1**

- [x] 01-01-PLAN.md: Setup do Projeto Next.js, Design Tokens e Componentes Base (Wave 1)

**Wave 2**

- [x] 01-02-PLAN.md: Arquitetura de Conteúdo (/content) e Layout Base (Header/Footer) (Wave 2)

---

### Phase 2: Layout Base e Navegação

**Goal:** Implementar o menu fixo com âncoras, hero section, e navegação completa (desktop + mobile) fiel ao design Stitch.
**Mode:** mvp
**Success Criteria:**

1. Menu fixo funcional com todos os links de âncora e rolagem suave
2. Item ativo destacado no menu conforme scroll
3. Menu mobile com drawer/hambúrguer funcional
4. Hero section completa: título com Caveat, mosaico de fotos, CTAs, faixa do próximo culto
5. Botão flutuante de WhatsApp visível e funcional
6. Footer com informações de contato e redes

**Requirements:** NAV-01, NAV-02, NAV-03, HERO-01, HERO-02, HERO-03

**Plans:** 2/2 plans executed
**Wave 1**

- [x] 02-01-PLAN.md: Navegação Base, Header Fixo com Scrollspy, Menu Mobile Drawer e Botão Flutuante de WhatsApp (Wave 1)

**Wave 2**

- [x] 02-02-PLAN.md: Seção Hero, Tipografia Editorial, Mosaico Fotográfico Assimétrico e Faixa Dinâmica do Próximo Culto (Wave 2)


---

### Phase 3: Seções de Conteúdo Estático

**Goal:** Implementar todas as seções de conteúdo lidas de `/content` — história, cultos, eventos, grupos, ministérios, ação social, visita, localização, PIX.
**Mode:** mvp
**Success Criteria:**

1. Seção "Nossa história" com resumo + link, e página `/nossa-historia` completa com linha do tempo
2. Cards de cultos/EBD com destaque automático do próximo
3. Cards de eventos com filtro de passados, carrossel mobile e grade desktop
4. PGMs com botão WhatsApp pré-preenchido
5. Ministérios com ícones e descrições
6. Ação social com conteúdo descritivo
7. "Planeje sua visita" com 3 passos e acordeão FAQ
8. Mapa Google Maps lazy + botões de localização
9. PIX com botão "Copiar chave" funcional

**Requirements:** HIST-01, HIST-02, CULT-01, CULT-02, EVEN-01, EVEN-02, GRUP-01, GRUP-02, MINI-01, ACAO-01, VISI-01, VISI-02, VISI-03, LOCA-01, LOCA-02, LOCA-03, PIX-01

**Plans:** 3/3 plans executed
**Wave 1**

- [x] 03-01-PLAN.md: História (Home e Página Dedicada), Cultos com Destaque Dinâmico e Calendário de Eventos (Wave 1)
- [x] 03-02-PLAN.md: Pequenos Grupos (PGMs), Ministérios Ativos e Bloco de Ação Social (Wave 1)

**Wave 2**

- [x] 03-03-PLAN.md: Planeje sua Visita com FAQ, Localização com GPS, Chave PIX e Integração Completa da Home (Wave 2)

---

### Phase 4: Integração YouTube

**Goal:** Buscar e exibir as 4 últimas lives do YouTube com cache ISR, fallbacks robustos e indicador "AO VIVO".
**Mode:** mvp
**Success Criteria:**

1. Server Component busca lives via YouTube Data API v3 (playlistItems + videos com liveStreamingDetails)
2. Cache ISR de 30 minutos funcionando
3. Fallback para RSS quando API falha/cota esgotada
4. Card amigável "Ver no YouTube" quando tudo falha — site nunca quebra
5. Selo "AO VIVO" pulsante quando live em andamento
6. Botão "Assistir ao vivo" no Hero aponta para a live corrente

**Requirements:** LIVE-01, LIVE-02, LIVE-03, LIVE-04

**Plans:** 2/2 plans executed
**Wave 1**

- [x] 04-01-PLAN.md: Integração YouTube (Tracer) (Wave 1)
- [x] 04-02-PLAN.md: Integração YouTube (Fallbacks & Indicador Ao Vivo) (Wave 1)

---

### Phase 5: Pedidos de Oração

**Goal:** Implementar formulário, banco de dados, proteção anti-spam, moderação e APIs para o futuro telão.
**Mode:** mvp
**Success Criteria:**

1. Formulário funcional com validação Zod client+server, campo honeypot, rate limit por hash de IP
2. Interruptor anônimo funcional — nome não armazenado quando ativo
3. Tabela `prayer_requests` no Supabase com RLS (anon=INSERT only)
4. SQL de migração em `/supabase/migrations`
5. Área de moderação `/admin/oracao` com autenticação Supabase Auth funcional
6. APIs do telão (`/api/prayer-requests/display` e `/api/prayer-requests/:id/displayed`) com proteção por token
7. Documentação `docs/telao-api.md`

**Requirements:** PRAY-01, PRAY-02, PRAY-03, PRAY-04, PRAY-05, PRAY-06, PRAY-07, PRAY-08, PRAY-09

---

### Phase 6: SEO, Acessibilidade, Performance e LGPD

**Goal:** Garantir qualidade técnica: SEO completo, acessibilidade AA, performance Lighthouse ≥ 90, conformidade LGPD e segurança.
**Mode:** mvp
**Success Criteria:**

1. Metadata + Open Graph configurados em todas as páginas
2. sitemap.xml e robots.txt gerados
3. JSON-LD Church no layout
4. Lighthouse ≥ 90 em Performance, Accessibility, Best Practices, SEO (mobile)
5. HTML semântico, contraste AA, navegação por teclado, alt em imagens
6. Página `/privacidade` publicada
7. Cabeçalhos de segurança configurados
8. Validação/sanitização no servidor

**Requirements:** SEO-01, SEO-02, SEO-03, PERF-01, PERF-02, A11Y-01, A11Y-02, A11Y-03, LGPD-01, LGPD-02, LGPD-03, SEC-01, SEC-02, SEC-03

---

### Phase 7: Testes, README e Checklist Final

**Goal:** Validar com testes automatizados, documentar tudo e preparar a lista de placeholders e configuração externa.
**Mode:** mvp
**Success Criteria:**

1. Testes passando: cálculo próximo culto, validação formulário (anônimo), fallback YouTube
2. README completo em português
3. `.env.example` documentado
4. Lista de placeholders gerada
5. Checklist de configuração externa (Supabase, YouTube API, domínio, Vercel)
6. Até 5 sugestões de melhorias futuras

**Requirements:** TEST-01, TEST-02, TEST-03, DOC-01, DOC-02, DOC-03, DOC-04
