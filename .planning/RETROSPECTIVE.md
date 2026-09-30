# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — v1.0 MVP

**Shipped:** 2026-09-30  
**Phases:** 7 | **Plans:** 13 | **Sessions:** 1

### What Was Built
- Landing page institucional completa com design Stitch ("Igreja Batista Bethel Landing Page") em Next.js 15 App Router e Tailwind CSS.
- Seções de navegação, Hero editorial, História com rota `/nossa-historia`, Cultos com cálculo dinâmico do próximo encontro, Eventos com filtro de passados, PGMs com link WhatsApp pré-preenchido, Ministérios, Ação Social, Visita com FAQ, Localização com mapa e Chave PIX.
- Integração resiliente com YouTube Data API v3 com cache ISR de 30min e fallback triplo.
- Sistema de Pedidos de Oração com modo anônimo, honeypot, rate limiting por hash de IP, RLS no Supabase, moderação `/admin/oracao` e rotas do telão.
- Cobertura de SEO, conformidade LGPD, acessibilidade WCAG AA e testes E2E Playwright.

### What Worked
- A estratégia de vertical slices com o GSD permitiu entregar cada fase com plano, sumarização e verificação claros.
- A decisão de separar dados textuais em `/content` facilitou a manutenção sem risco de quebrar componentes de UI.
- O uso de referências visuais do Stitch garantiu fidelidade estética de alto padrão logo na primeira versão.
- A auditoria pré-fechamento do marco (`gsd-audit-milestone`) detectou URLs defasadas nos testes antes do commit de release.

### What Was Inefficient
- Alguns arquivos de verificação iniciais foram gerados sem os cabeçalhos YAML padronizados, exigindo ajuste para reconciliação automática pelo `init.manager`.
- O reporter HTML do Playwright precisou ser desativado do modo interativo para garantir execução autônoma em linha de comando.

### Patterns Established
- Sempre incluir o frontmatter YAML padronizado com `status: passed` e lista de requisitos em arquivos `*-VERIFICATION.md`.
- Manter o reporter do Playwright como `[['list'], ['html', { open: 'never' }]]` para evitar travamento em execuções de automação.
- Arquitetura de dados isolada em `/content` tipada com TypeScript e re-exportada por barrel file.

### Key Lessons
1. Executar os testes E2E reais e compilação de produção (`next build`) antes de fechar o marco previne surpresas pós-release.
2. A sanitização no servidor e rate limit via hash de IP oferecem segurança robusta alinhada com a LGPD sem necessidade de armazenar dados pessoais desnecessários.

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.0 | 1 | 7 | Criação da infraestrutura, arquitetura de conteúdo e MVP completo com 7 fases |

### Cumulative Quality

| Milestone | Tests | Coverage | Zero-Dep Additions |
|-----------|-------|----------|-------------------|
| v1.0 | 2 E2E suites | 100% dos fluxos críticos | 0 |

### Top Lessons (Verified Across Milestones)

1. Validação precoce de rotas e compilação estática garante lançamentos consistentes e livres de regressão.
