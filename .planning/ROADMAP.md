# Roadmap — Site Oficial IBBE

## Milestones

- ✅ **v1.0 MVP** — Fases 1-7 (concluído em 2026-09-30)
- ✅ **v1.1 Configuração do Supabase e Pedidos de Oração** — Fase 8 (arquivado)
- 🟡 **v1.2 Tela de Exibição do Telão** — Fases 9-13 (em andamento)

---

## Milestone v1.2: Tela de Exibição do Telão

**Goal:** Criar uma página web em tela cheia para exibir pedidos de oração. Inclui a finalização do fluxo de ingestão, autenticação, moderação e criação da interface do telão.

### Phase 9: Autenticação e Proteção de Rotas

**Goal:** Implementar a camada de autenticação com Supabase Auth no Next.js 15 App Router, proteção de rotas e provisionamento de administrador.
**Mode:** standard
**Success Criteria:**
1. Middleware interceptando requisições e redirecionando acesso não autorizado a `/admin/*` para `/login`.
2. Página `/login` funcional redirecionando para `/admin/oracao`.
3. Usuário administrador pastoral provisionado.
4. Renovação de sessões automáticas.

**Requirements:** AUTH-01, AUTH-02, AUTH-03, AUTH-04

---

### Phase 10: Ingestão e Proteção de Pedidos

**Goal:** Conectar o formulário público ao Supabase com anonimização e proteção anti-spam.
**Mode:** standard
**Success Criteria:**
1. Formulário público salva registros no Supabase via Server Action.
2. Anti-spam via honeypot invisível bloqueando bots.
3. Rate limiting implementado via hash SHA-256 de IP.
4. Identidade anonimizada (nome null) quando usuário marcar opção anônimo.

**Requirements:** PRAY-01, PRAY-02, PRAY-03, PRAY-04

---

### Phase 11: Moderação Pastoral

**Goal:** Painel de administração para moderação (aprovar/rejeitar/desfazer) de pedidos de oração.
**Mode:** standard
**Success Criteria:**
1. Painel `/admin/oracao` renderizado no servidor exibindo fila pendente.
2. Ações de aprovação e rejeição ativas.
3. Ação "Desfazer" funcional.
4. Feedback visual e revalidação de rota imediata.

**Requirements:** MOD-01, MOD-02, MOD-03, MOD-04

---

### Phase 12: Integração de APIs do Telão

**Goal:** Implementar endpoints seguros para fornecer pedidos aprovados para projeção e marcá-os como exibidos.
**Mode:** standard
**Success Criteria:**
1. Client com service role key configurado.
2. `GET /api/prayer-requests/display` retornando pedidos aprovados não exibidos, protegido por Bearer token.
3. `POST /api/prayer-requests/[id]/displayed` atualizando flag para exibido, também protegido.

**Requirements:** DISP-01, DISP-02, DISP-03

---

### Phase 13: Exibição no Telão

**Goal:** Interface front-end estática e em tela cheia otimizada para projetar pedidos de oração na igreja.
**Mode:** standard
**Success Criteria:**
1. Rota `/telao` com layout de tela cheia, alto contraste, sem barra de rolagem.
2. Visualização de um número fixo de orações aprovadas em grade/lista.
3. Botões de ação para navegação e marcação das orações como exibidas.

**Requirements:** TELA-01, TELA-02, TELA-03

---

## Archived Milestones

<details>
<summary>✅ v1.0 MVP (Fases 1-7) — CONCLUÍDO 2026-09-30</summary>

- [x] Fase 1: Fundação do Projeto (2/2 planos)
- [x] Fase 2: Layout Base e Navegação (2/2 planos)
- [x] Fase 3: Seções de Conteúdo Estático (3/3 planos)
- [x] Fase 4: Integração YouTube (2/2 planos)
- [x] Fase 5: Pedidos de Oração (1/1 plano)
- [x] Fase 6: SEO, Acessibilidade, Performance e LGPD (2/2 planos)
- [x] Fase 7: Testes, README e Checklist Final (1/1 plano)

Consulte os detalhes em `.planning/milestones/v1.0-ROADMAP.md`.
</details>

<details>
<summary>✅ v1.1 Configuração do Supabase (Fase 8) — CONCLUÍDO 2026-10-01</summary>

- [x] Fase 8: Infraestrutura Supabase e Banco de Dados (1/1 plano)

Consulte os detalhes em `.planning/milestones/v1.1-ROADMAP.md`.
</details>
