# Requirements — Site IBBE

## v1 Requirements

### Estrutura e Navegação
- [ ] **NAV-01**: Menu fixo no topo com navegação por âncoras, rolagem suave e item ativo destacado
- [ ] **NAV-02**: Botão flutuante de WhatsApp visível em todas as páginas
- [ ] **NAV-03**: Menu mobile responsivo (hambúrguer → drawer/bottom sheet)

### Hero
- [ ] **HERO-01**: Seção hero tela cheia com título "Uma igreja feita de _pessoas._" (palavra em Caveat script), subtítulo, mosaico de fotos
- [ ] **HERO-02**: Botões CTA "Planeje sua visita" e "Assistir ao vivo" (ao vivo aponta para live se existir)
- [ ] **HERO-03**: Faixa inferior com próximo culto calculado automaticamente a partir de `services.ts`

### Nossa História
- [ ] **HIST-01**: Resumo na home com texto e link "Leia a história completa"
- [ ] **HIST-02**: Página dedicada `/nossa-historia` com texto completo, linha do tempo (2000 → 2003 → Hoje), versículo 2 Crônicas 16.9a, homenagem aos pastores

### Cultos e EBD
- [ ] **CULT-01**: Cards de cultos e EBD a partir de `services.ts` com ícone, dia, horário, nome e descrição
- [ ] **CULT-02**: Destaque automático (visual diferenciado) para o próximo encontro

### Próximos Eventos
- [ ] **EVEN-01**: Cards de eventos a partir de `events.ts`, carrossel no mobile, grade no desktop
- [ ] **EVEN-02**: Ordenados por data, eventos com data passada não são exibidos

### Lives do YouTube
- [ ] **LIVE-01**: 4 lives mais recentes via YouTube Data API v3 (playlistItems.list + videos.list com liveStreamingDetails)
- [ ] **LIVE-02**: Cache com revalidação a cada 30min (ISR/revalidate)
- [ ] **LIVE-03**: Fallback em cascata: API → RSS feed público → card amigável "Ver no YouTube"
- [ ] **LIVE-04**: Selo "AO VIVO" pulsante quando live em andamento, destaque do card, botão Hero ativo

### Pequenos Grupos (PGMs)
- [ ] **GRUP-01**: Lista de PGMs a partir de `groups.ts` com bairro, dia, horário e contato
- [ ] **GRUP-02**: Botão "Quero participar" abre WhatsApp com mensagem pré-preenchida ("Olá! Quero conhecer o grupo de [bairro]")

### Ministérios
- [ ] **MINI-01**: Cards de ministérios a partir de `ministries.ts` com ícone e descrição

### Ação Social
- [ ] **ACAO-01**: Seção de ação social com descrição das atividades da igreja na comunidade

### Pedidos de Oração
- [ ] **PRAY-01**: Formulário client-side: campo mensagem (10–1000 chars com contador), nome (opcional), interruptor anônimo
- [ ] **PRAY-02**: Se anônimo = true, nome NÃO enviado/armazenado mesmo se digitado
- [ ] **PRAY-03**: Validação Zod no cliente E no servidor, mensagens gentis, estados carregando/sucesso/erro
- [ ] **PRAY-04**: Campo honeypot oculto + rate limit por hash de IP (sal + hash, nunca IP bruto)
- [ ] **PRAY-05**: Tabela `prayer_requests` no Supabase: id, message, author_name, is_anonymous, status (enum), created_at, approved_at, displayed_at, ip_hash
- [ ] **PRAY-06**: RLS: anon só INSERT, leitura/moderação só com credencial de serviço
- [ ] **PRAY-07**: API `GET /api/prayer-requests/display` protegida por token para futuro telão
- [ ] **PRAY-08**: API `PATCH /api/prayer-requests/:id/displayed` (mesmo token) para marcar como displayed
- [ ] **PRAY-09**: Área de moderação `/admin/oracao` com auth Supabase (email admin), listar/aprovar/rejeitar/arquivar, mobile-friendly, noindex

### Planeje sua Visita
- [ ] **VISI-01**: 3 passos visuais para o visitante
- [ ] **VISI-02**: Acordeão de FAQ a partir de `content/faq.ts`
- [ ] **VISI-03**: Botão de WhatsApp para contato

### Localização e Contato
- [ ] **LOCA-01**: Google Maps iframe com `loading="lazy"`, endereço completo
- [ ] **LOCA-02**: Botões "Abrir no Google Maps" (link) e "Como chegar" (link de rota)
- [ ] **LOCA-03**: Telefone, WhatsApp, e-mail e redes sociais

### Contribuição (PIX)
- [ ] **PIX-01**: Chave PIX exibida com botão "Copiar chave" e feedback visual

### Conteúdo Editável
- [ ] **CONT-01**: Pasta `/content` com arquivos TS tipados: site.ts, services.ts, events.ts, groups.ts, ministries.ts, history.ts, faq.ts
- [ ] **CONT-02**: Placeholders `[PLACEHOLDER]` claramente marcados onde dados não foram informados

### SEO e Performance
- [ ] **SEO-01**: Metadata completa por página, Open Graph com imagem, lang pt-BR
- [ ] **SEO-02**: sitemap.xml e robots.txt gerados
- [ ] **SEO-03**: JSON-LD tipo Church (nome, endereço, horários, redes)
- [ ] **PERF-01**: Lighthouse ≥ 90 em todas categorias mobile
- [ ] **PERF-02**: Imagens WebP/AVIF via next/image, fontes display:swap, sem JS desnecessário

### Acessibilidade
- [ ] **A11Y-01**: HTML semântico, contraste WCAG AA, navegação por teclado
- [ ] **A11Y-02**: `alt` em todas as imagens, respeito a `prefers-reduced-motion`
- [ ] **A11Y-03**: Labels reais no formulário, foco visível, `aria-live` nas mensagens de status

### Privacidade (LGPD)
- [ ] **LGPD-01**: Página `/privacidade` em linguagem clara sobre dados dos pedidos de oração
- [ ] **LGPD-02**: Aviso de privacidade no formulário de oração
- [ ] **LGPD-03**: Sem cookies de rastreamento; analytics leve sem cookies se necessário

### Segurança
- [ ] **SEC-01**: Nenhuma chave/segredo no repositório, `.env.example` documentado
- [ ] **SEC-02**: Cabeçalhos de segurança (CSP, X-Frame-Options, etc.)
- [ ] **SEC-03**: Validação/sanitização de entrada no servidor, nunca renderizar HTML do usuário

### Testes
- [ ] **TEST-01**: Teste do cálculo "próximo culto"
- [ ] **TEST-02**: Teste da validação do formulário (incluindo caso anônimo)
- [ ] **TEST-03**: Teste do fallback do YouTube

### Documentação
- [ ] **DOC-01**: README em português (como rodar, editar conteúdo, configurar env, publicar)
- [ ] **DOC-02**: `docs/telao-api.md` — contrato das rotas do telão + Supabase Realtime
- [ ] **DOC-03**: Lista final de placeholders a preencher
- [ ] **DOC-04**: Checklist de configuração externa (Supabase, YouTube API, domínio)

## v2 Requirements (Deferred)

- Webapp do telão para projetar pedidos de oração aprovados em tempo real
- Blog / devocional online
- Cadastro de membros com área logada
- Transmissão ao vivo embutida (player inline) em vez de link externo
- Notificações push para eventos e lives
- Dark mode

## Out of Scope

- App mobile nativo — site responsivo é suficiente para o público-alvo
- Multi-idioma — apenas pt-BR
- E-commerce / loja — não aplicável
- Sistema de dizimação com gateway de pagamento — apenas exibição de chave PIX
- Agenda pastoral / gerenciamento interno — seria outro sistema

## Traceability

| REQ-ID | Phase |
|--------|-------|
| NAV-01, NAV-02, NAV-03 | Phase 2 |
| HERO-01, HERO-02, HERO-03 | Phase 2 |
| CONT-01, CONT-02 | Phase 2 |
| HIST-01, HIST-02 | Phase 3 |
| CULT-01, CULT-02 | Phase 3 |
| EVEN-01, EVEN-02 | Phase 3 |
| GRUP-01, GRUP-02 | Phase 3 |
| MINI-01 | Phase 3 |
| ACAO-01 | Phase 3 |
| LOCA-01, LOCA-02, LOCA-03 | Phase 3 |
| PIX-01 | Phase 3 |
| VISI-01, VISI-02, VISI-03 | Phase 3 |
| LIVE-01, LIVE-02, LIVE-03, LIVE-04 | Phase 4 |
| PRAY-01..PRAY-09 | Phase 5 |
| SEO-01..SEO-03, PERF-01, PERF-02 | Phase 6 |
| A11Y-01..A11Y-03 | Phase 6 |
| LGPD-01..LGPD-03 | Phase 6 |
| SEC-01..SEC-03 | Phase 6 |
| TEST-01..TEST-03 | Phase 7 |
| DOC-01..DOC-04 | Phase 7 |
