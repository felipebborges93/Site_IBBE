# Roadmap — Site Oficial IBBE

## Milestones

- ✅ **v1.0 MVP** — Fases 1-7 (concluído em 2026-09-30)
- 🟡 **v1.1 Configuração do Supabase e Pedidos de Oração** — Fases 8-12 (em andamento)

---

## Milestone v1.1: Configuração do Supabase e Pedidos de Oração

**Goal:** Configurar o projeto Supabase, aplicar o schema com RLS estrito, implementar autenticação para moderação pastoral, conectar o formulário de pedidos de oração com proteções anti-spam e LGPD, e disponibilizar APIs seguras para projeção no telão.

### Phase 8: Infraestrutura Supabase e Banco de Dados

**Goal:** Configurar o ambiente do Supabase, definir as variáveis de ambiente necessárias e aplicar o schema SQL com constraints, índices compostos e políticas restritivas de RLS para a tabela `prayer_requests`.
**Mode:** standard
**Success Criteria:**
1. Variáveis de ambiente (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `TELAO_API_TOKEN`) documentadas em `.env.example` e configuradas no `.env.local`.
2. Tabela `prayer_requests` provisionada no PostgreSQL com colunas, tipos, constraints e índice composto (`status, displayed, created_at`).
3. Políticas RLS ativas e testadas: inserções anônimas permitidas exclusivamente com `status = 'pending'` e `displayed = false`, enquanto leituras e atualizações são proibidas para clientes anônimos (`anon`).

**Requirements:** SUPA-01, SUPA-02, SUPA-03

**Plans:** 1/1 plans executed
**Wave 1**

- [x] 08-01-PLAN.md: Infraestrutura Supabase e Banco de Dados (Wave 1)

---

### Phase 9: Autenticação e Proteção de Rotas

**Goal:** Implementar a camada de autenticação com Supabase Auth no Next.js 15 App Router, incluindo middleware para sincronização/renovação de cookies de sessão, página `/login`, proteção de rotas `/admin/*` e provisionamento de conta administradora.
**Mode:** standard
**Success Criteria:**
1. Middleware raiz (`middleware.ts`) interceptando requisições, atualizando cookies de sessão via `@supabase/ssr` e bloqueando acesso a `/admin/*` para usuários não autenticados com redirecionamento para `/login`.
2. Página de login `/login` funcional com formulário de email/senha, tratamento de erros e redirecionamento pós-autenticação para `/admin/oracao`.
3. Usuário administrador pastoral provisionado com credenciais válidas e auto-cadastro público desabilitado no Supabase Auth.
4. Sessões renovadas automaticamente sem deslogar o usuário após expiração de token de 1 hora.

**Requirements:** AUTH-01, AUTH-02, AUTH-03, AUTH-04

---

### Phase 10: Ingestão e Proteção de Pedidos

**Goal:** Conectar o formulário público da landing page ao Supabase via Server Action com cliente anônimo, aplicando salvaguardas de segurança (honeypot, sanitização, limitação de taxa por hash de IP) e anonimização de identidade conforme LGPD.
**Mode:** standard
**Success Criteria:**
1. Submissão do formulário de pedidos de oração salvando registros no Supabase com `status = 'pending'` e `displayed = false` via Server Action.
2. Tentativas de spam por bots bloqueadas silenciosamente quando o campo honeypot for preenchido, e texto sanitizado sem permitir injeção de HTML/scripts.
3. Limitação de taxa (rate limiting) bloqueando envios em excesso por IP utilizando exclusivamente hash SHA-256 (sem persistir IPs brutos, em conformidade com LGPD).
4. Quando o interruptor de oração anônima (`is_anonymous: true`) for acionado, o campo `name` é persistido explicitamente como `null` no banco de dados.

**Requirements:** PRAY-01, PRAY-02, PRAY-03, PRAY-04

---

### Phase 11: Moderação Pastoral

**Goal:** Conectar a área administrativa `/admin/oracao` ao Supabase utilizando cliente autenticado, permitindo que a liderança pastoral liste pedidos pendentes, execute aprovação ou rejeição com revalidação instantânea de cache e reverta decisões acidentais.
**Mode:** standard
**Success Criteria:**
1. Painel `/admin/oracao` renderizado no servidor com dados em tempo real da tabela `prayer_requests` sob autenticação pastoral.
2. Moderação de pedidos via Server Actions permitindo aprovar (`status = 'approved'`) ou rejeitar (`status = 'rejected'`) pedidos individualmente.
3. Ação "Desfazer" permitindo reverter pedidos previamente aprovados ou rejeitados de volta ao estado `pending`.
4. Interface exibindo feedback imediato via toasts acolhedores e revalidando a rota (`revalidatePath`) instantaneamente sem necessidade de recarregar a página.

**Requirements:** MOD-01, MOD-02, MOD-03, MOD-04

---

### Phase 12: Integração e APIs do Telão

**Goal:** Implementar endpoints de integração máquina-a-máquina seguros protegidos por Bearer token e cliente administrativo com service role key, fornecendo pedidos aprovados para projeção e marcando-os como exibidos.
**Mode:** standard
**Success Criteria:**
1. Módulo `createAdminClient` criado com proteção `import 'server-only'` e `SUPABASE_SERVICE_ROLE_KEY`, garantindo isolamento total do cliente.
2. Endpoint `GET /api/prayer-requests/display` respondendo com lista de pedidos aprovados e não exibidos (`status = 'approved' AND displayed = false`) apenas quando autenticado com `Authorization: Bearer <TELAO_API_TOKEN>`, retornando 401 para requisições não autorizadas.
3. Endpoint `POST /api/prayer-requests/[id]/displayed` autenticado por Bearer token atualizando atomicamente `displayed = true` para o pedido especificado.

**Requirements:** DISP-01, DISP-02, DISP-03

---

## Archived Milestones

<details>
<summary>✅ v1.0 MVP (Fases 1-7) — CONCLUÍDO 2026-09-30</summary>

- [x] Fase 1: Fundação do Projeto (2/2 planos) — concluída em 2026-09-29
- [x] Fase 2: Layout Base e Navegação (2/2 planos) — concluída em 2026-09-29
- [x] Fase 3: Seções de Conteúdo Estático (3/3 planos) — concluída em 2026-09-29
- [x] Fase 4: Integração YouTube (2/2 planos) — concluída em 2026-09-29
- [x] Fase 5: Pedidos de Oração (1/1 plano) — concluída em 2026-09-29
- [x] Fase 6: SEO, Acessibilidade, Performance e LGPD (2/2 planos) — concluída em 2026-09-29
- [x] Fase 7: Testes, README e Checklist Final (1/1 plano) — concluída em 2026-09-29

Consulte os detalhes completos arquivados em [.planning/milestones/v1.0-ROADMAP.md](milestones/v1.0-ROADMAP.md).

</details>
