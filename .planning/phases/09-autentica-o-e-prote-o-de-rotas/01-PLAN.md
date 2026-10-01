---
phase: "09"
plan: "01"
type: execute
wave: 1
depends_on: []
files_modified:
  - "middleware.ts"
  - "utils/supabase/middleware.ts"
autonomous: true
requirements:
  - AUTH-01
  - AUTH-03
must_haves:
  artifacts:
    - "middleware.ts"
  truths:
    - O middleware de autenticação valida sessões antes do acesso a `/admin/*`
  key_links:
    - "middleware.ts" requires "utils/supabase/middleware.ts"
---

<objective>
Implementar a camada de autenticação com Supabase Auth no Next.js 15, garantindo que as rotas `/admin/*` estejam protegidas pelo middleware.

Purpose: Assegurar que rotas administrativas sejam acessadas apenas por usuários autenticados.
Output: Arquivos de middleware configurados e proteção de rotas ativada.
</objective>

<tasks>
<task type="tracer">
<name>Tracer: Criar middleware raiz e refatorar utils/supabase/middleware.ts</name>
<files>middleware.ts, utils/supabase/middleware.ts</files>
<action>
1. Refatorar `utils/supabase/middleware.ts` para consumir as variáveis validadas do Supabase (`env.NEXT_PUBLIC_SUPABASE_URL` e `env.NEXT_PUBLIC_SUPABASE_ANON_KEY`) a partir de `@/lib/env`, em vez de `process.env`.
2. Criar `middleware.ts` na raiz do projeto (mesmo nível de `package.json`).
3. No novo `middleware.ts` raiz, importar `updateSession` de `@/utils/supabase/middleware` e exportar a função `middleware` padrão que chama `updateSession(request)`.
4. Adicionar o `config` com o `matcher` adequado no `middleware.ts` raiz (excluindo arquivos estáticos, rotas `/api`, e `_next/static`) garantindo a interceptação das rotas `/admin`.
</action>
<verify>
  <automated>npx tsc --noEmit</automated>
  <fails_when>O comando retornar código de saída não-zero, exibindo erros de compilação ou tipagem do TypeScript</fails_when>
</verify>
<done>
- `middleware.ts` (raiz) exporta `middleware` e contém o `matcher` para rotas protegidas.
- `utils/supabase/middleware.ts` importa o `env` de `@/lib/env` sem usar `process.env`.
</done>
</task>
</tasks>
