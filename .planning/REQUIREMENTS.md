# Requirements: Site Oficial IBBE

**Defined:** 2026-10-01  
**Core Value:** Acolhimento acessível: permitir que congregantes e visitantes enviem pedidos de oração confidenciais ou anônimos com segurança, garantir moderação pastoral em tempo hábil e disponibilizar os pedidos aprovados para projeção no telão durante os cultos.

## v1 Requirements

### Infraestrutura e Banco de Dados (SUPA)

- [ ] **SUPA-01**: Configurar variáveis de ambiente (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `TELAO_API_TOKEN`) no `.env.local` e documentar `.env.example`
- [ ] **SUPA-02**: Executar migração SQL no Supabase com tabela `prayer_requests`, índices compostos (`status, displayed, created_at`) e constraints
- [ ] **SUPA-03**: Aplicar políticas RLS restritivas em `prayer_requests` (inserção anônima estrita com `status = 'pending'` e `displayed = false`; select e update exclusivos para `authenticated`)

### Autenticação e Sessão (AUTH)

- [ ] **AUTH-01**: Criar `middleware.ts` raiz no Next.js 15 para sincronização e renovação de tokens de sessão Supabase
- [ ] **AUTH-02**: Implementar página de login `/login` com validação de credenciais Supabase Auth e redirecionamento pós-login
- [ ] **AUTH-03**: Proteger rotas `/admin/*` via middleware redirecionando visitantes não autenticados para `/login`
- [ ] **AUTH-04**: Provisionar usuário administrador no Supabase Auth com email/senha e registro público desabilitado

### Ingestão e Proteção de Pedidos (PRAY)

- [x] **PRAY-01**: Conectar o Server Action do formulário de oração (`submitPrayerRequest`) ao Supabase usando cliente `@supabase/ssr` anônimo
- [x] **PRAY-02**: Implementar proteção anti-spam com campo honeypot invisível e sanitização de tags HTML
- [x] **PRAY-03**: Implementar limitação de taxa (rate limiting) por hash SHA-256 de IP conforme diretrizes da LGPD
- [x] **PRAY-04**: Redigir o campo `name` para `null` no banco quando o usuário marcar a opção de oração anônima (`is_anonymous: true`)

### Moderação Pastoral (MOD)

- [x] **MOD-01**: Conectar o painel `/admin/oracao` ao Supabase com `createServerClient` autenticado exibindo lista de pedidos pendentes
- [x] **MOD-02**: Implementar ações de moderação com Server Actions para aprovar (`status = 'approved'`) ou rejeitar (`status = 'rejected'`) pedidos
- [x] **MOD-03**: Implementar ação de desfazer ("Desfazer") permitindo reverter pedidos aprovados ou rejeitados de volta para `pending`
- [x] **MOD-04**: Exibir feedback visual acolhedor (toasts) e revalidar o cache da rota (`revalidatePath`) imediatamente após cada ação

### Integração de APIs do Telão (DISP)

- [ ] **DISP-01**: Implementar `createAdminClient` isolado no servidor utilizando `SUPABASE_SERVICE_ROLE_KEY` com verificação `server-only`
- [ ] **DISP-02**: Conectar `GET /api/prayer-requests/display` com validação de Bearer token (`TELAO_API_TOKEN`) retornando pedidos aprovados e não exibidos
- [ ] **DISP-03**: Conectar `POST /api/prayer-requests/[id]/displayed` com validação de token atualizando `displayed = true` após exibição em projeção

### Exibição no Telão (TELA)

- [ ] **TELA-01**: Criar rota dinâmica secreta (`/telao/[token]`) otimizada para exibição em tela cheia (1080p/4K), sem barra de rolagem e com tipografia de alto contraste para leitura à distância. O token na URL deve validar a permissão.
- [ ] **TELA-02**: Exibir um número fixo de pedidos aprovados (ex: 4 a 6) de forma estática, distribuídos em grade ou lista para maximizar a legibilidade.
- [ ] **TELA-03**: Implementar interface para o operador marcar os pedidos na tela como exibidos (acionar API `displayed = true`) com um botão de avanço/conclusão, sem que o layout se desloque inesperadamente.

## v2 Requirements

### Tempo Real e Notificações (REAL)

- **REAL-01**: Inscrição Supabase Realtime (WebSocket) no `/admin/oracao` para atualizar novos pedidos ao vivo sem reload
- **NOTF-01**: Disparo de notificação WhatsApp/Push para equipe pastoral ou intercessores quando novo pedido urgente for recebido

## Out of Scope

| Feature | Reason |
|---------|--------|
| Inscrição pública de contas de usuário | O sistema de moderação é restrito à liderança pastoral; auto-cadastro aumentaria risco de segurança |
| Armazenamento de IP em formato bruto | Violação direta da LGPD; limitação de taxa opera apenas sobre hash criptográfico SHA-256 efêmero |
| Edição do texto da oração pelo administrador | Preservação da integridade da intenção do membro/visitante; pastor apenas aprova ou rejeita |
| Rotação/ciclo automático no telão | Pedido explícito do usuário: as orações devem ficar estáticas no telão durante o momento de oração para melhor leitura. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SUPA-01 | Phase 8 | Complete |
| SUPA-02 | Phase 8 | Complete |
| SUPA-03 | Phase 8 | Complete |
| AUTH-01 | Phase 9 | Pending |
| AUTH-02 | Phase 9 | Pending |
| AUTH-03 | Phase 9 | Pending |
| AUTH-04 | Phase 9 | Pending |
| PRAY-01 | Phase 10 | Complete |
| PRAY-02 | Phase 10 | Complete |
| PRAY-03 | Phase 10 | Complete |
| PRAY-04 | Phase 10 | Complete |
| MOD-01 | Phase 11 | Complete |
| MOD-02 | Phase 11 | Complete |
| MOD-03 | Phase 11 | Complete |
| MOD-04 | Phase 11 | Complete |
| DISP-01 | Phase 12 | Pending |
| DISP-02 | Phase 12 | Pending |
| DISP-03 | Phase 12 | Pending |
| TELA-01 | Phase 13 | Pending |
| TELA-02 | Phase 13 | Pending |
| TELA-03 | Phase 13 | Pending |

**Coverage:**

- v1 requirements: 24 total
- Mapped to phases: 24
- Unmapped: 0 ✓

---
*Requirements defined: 2026-10-01*  
*Last updated: 2026-10-01 for milestone v1.2*
