---
phase: "08"
plan_id: "08-01"
title: "Infraestrutura Supabase e Banco de Dados"
requirements: ["SUPA-01", "SUPA-02", "SUPA-03"]
---

## Must Haves

- Documentação das variáveis de ambiente em `.env.example` e validação restrita em tempo de execução via `lib/env.ts`.
- Tabela `prayer_requests` com constraints de validação para tamanho do pedido e integridade de anonimato para adequação à LGPD.
- Índice composto `(status, displayed, created_at)` focado em otimizar consultas da moderação e do telão.
- Políticas estritas de Row Level Security (RLS) bloqueando manipulações indevidas por clientes anônimos, forçando `status = 'pending'` em novas inserções.

## Tarefas

### 1. Especificar e Validar Variáveis de Ambiente
<read_first>
- `.planning/phases/08-infraestrutura-supabase-e-banco-de-dados/08-CONTEXT.md` (Decisão D-05)
- `utils/supabase/server.ts`
</read_first>
<action>
1. Criar o arquivo `.env.example` na raiz contendo chaves descritivas e vazias:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TELAO_API_TOKEN`
2. Criar `lib/env.ts` exportando a validação em tempo de execução das variáveis usando Zod ou verificações de tipo nativas, de modo a falhar rápido (throw error) com mensagens informativas se estiverem ausentes.
3. Certificar-se de substituir os *placeholders* no atual `utils/supabase/server.ts` para garantir o uso estrito dessas variáveis.
</action>
<acceptance_criteria>
- `.env.example` criado.
- `lib/env.ts` lançando erros caso variáveis obrigatórias não existam no processo.
</acceptance_criteria>

### 2. Atualizar Migração de Banco de Dados e Constraints
<read_first>
- `supabase/migrations/00_prayer_requests.sql`
- `.planning/phases/08-infraestrutura-supabase-e-banco-de-dados/08-CONTEXT.md` (Decisões D-01, D-02, D-06)
</read_first>
<action>
1. Criar um novo arquivo de migração `supabase/migrations/01_prayer_requests_schema.sql` (ou modificar o `00` se não tiver sido aplicado).
2. Aplicar as seguintes alterações na estrutura:
   - Adicionar constraint: `ALTER TABLE public.prayer_requests ADD CONSTRAINT check_anonymous_name CHECK ((is_anonymous = true AND name IS NULL) OR is_anonymous = false);`
3. Criar o índice composto:
   - `CREATE INDEX IF NOT EXISTS idx_prayer_requests_status_displayed_created ON public.prayer_requests (status, displayed, created_at DESC);`
</action>
<acceptance_criteria>
- Migração SQL sintaticamente correta e idempotente.
- Índice composto presente no banco para otimização de leitura condicional.
- Validação garantindo ausência de nome sempre que a flag de anônimo for marcada.
</acceptance_criteria>

### 3. Aplicar Políticas Restritivas de RLS
<read_first>
- `supabase/migrations/00_prayer_requests.sql`
- `.planning/phases/08-infraestrutura-supabase-e-banco-de-dados/08-CONTEXT.md` (Decisões D-03, D-04)
</read_first>
<action>
1. Dentro de `01_prayer_requests_schema.sql`, revogar (DROP) as antigas políticas liberais ("Anon can insert...", "Authenticated can select...", etc).
2. Recriar a política de inserção (INSERT) para a role `anon`, implementando o check estrito para evitar manipulação client-side:
   - `WITH CHECK (status = 'pending' AND displayed = false AND length(request) >= 5 AND length(request) <= 1000)`
3. Recriar políticas de leitura e atualização para `authenticated`:
   - `SELECT` com `USING (true)`
   - `UPDATE` com `USING (true)`
4. Garantir que a role `anon` **NÃO** tenha permissão explícita ou por omissão de fazer `SELECT`, `UPDATE` ou `DELETE`.
</action>
<acceptance_criteria>
- Impossível injetar via cliente anônimo pedidos já aprovados ou marcados como exibidos.
- Impossível ler listagem de pedidos publicamente através da URL ou client do Supabase (protegido contra vazamento de dados).
- Arquivo de migração consolidado e pronto para submissão no Supabase (`supabase db push` ou execução via SQL Editor).
</acceptance_criteria>

## Verification

<automated>
- npx tsc --noEmit
- test -f .env.example
- test -f lib/env.ts
</automated>
