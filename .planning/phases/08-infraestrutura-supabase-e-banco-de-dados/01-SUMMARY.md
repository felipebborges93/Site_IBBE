---
phase: "08"
plan_id: "08-01"
title: "Infraestrutura Supabase e Banco de Dados"
status: "completed"
completed_at: "2026-10-01"
requirements: ["SUPA-01", "SUPA-02", "SUPA-03"]
---

# Summary 08-01: Infraestrutura Supabase e Banco de Dados

## Entregas Realizadas

1. **Especificação e Validação de Ambiente (SUPA-01, SUPA-02)**:
   - Criado [.env.example](file:///home/felipe/Projetos%20IA/Site_IBBE/.env.example) documentando claramente as variáveis obrigatórias e opcionais (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `TELAO_API_TOKEN`).
   - Criado [lib/env.ts](file:///home/felipe/Projetos%20IA/Site_IBBE/lib/env.ts) com validação estrita em tempo de execução via Zod (`safeParse`), com mensagens de erro autoexplicativas e fail-fast em caso de chave ausente ou formato inválido.
   - Atualizado [utils/supabase/server.ts](file:///home/felipe/Projetos%20IA/Site_IBBE/utils/supabase/server.ts) para consumir as variáveis validadas de `lib/env.ts` eliminando fallbacks silenciosos.

2. **Modelagem de Dados e Conformidade com a LGPD (SUPA-01, SUPA-03)**:
   - Criado script de migração versionado e idempotente [supabase/migrations/01_prayer_requests_schema.sql](file:///home/felipe/Projetos%20IA/Site_IBBE/supabase/migrations/01_prayer_requests_schema.sql).
   - Implementada a constraint `check_anonymous_name` para garantir que pedidos marcados como `is_anonymous = true` possuam `name is null`, reforçando a LGPD diretamente na camada de banco de dados.
   - Adicionadas constraints de tamanho `check_request_length` (5 a 1000 caracteres) e `check_name_length` (máximo 100 caracteres) para defesa em profundidade.
   - Criado índice composto `idx_prayer_requests_status_displayed_created` em `(status, displayed, created_at desc)` focado em otimizar consultas da moderação e polling do telão.

3. **Políticas de Row Level Security (RLS) Restritivas (SUPA-03)**:
   - Habilitação explícita de RLS na tabela `public.prayer_requests`.
   - Política `Anon insert only pending and not displayed` garantindo que clientes anônimos só consigam inserir pedidos com `status = 'pending'`, `displayed = false` e dentro dos limites de caracteres.
   - Bloqueio completo de `SELECT`, `UPDATE` e `DELETE` para a role `anon`, impedindo vazamento de dados de pedidos de oração não moderados ou privados.
   - Permissões concedidas exclusivamente à role `authenticated` para leitura, atualização e deleção na moderação.

## Verificação e Qualidade

- `npx tsc --noEmit`: Aprovado sem erros de tipagem.
- `npm run build`: Build de produção do Next.js 15 gerado com sucesso (11 páginas estáticas e rotas dinâmicas compiladas).
- Arquivos verificados: `.env.example`, `lib/env.ts`, `supabase/migrations/01_prayer_requests_schema.sql`, `utils/supabase/server.ts`.
