---
phase: "09"
wave: 1
depends_on: ["08"]
files_modified:
  - "middleware.ts"
  - "utils/supabase/middleware.ts"
  - "app/login/page.tsx"
  - "app/login/actions.ts"
  - "docs/admin-provisioning.md"
  - "README.md"
autonomous: true
---

# Phase 09 Plan: Autenticação e Proteção de Rotas

## Objective
Implementar a camada de autenticação com Supabase Auth no Next.js 15, garantindo que as rotas `/admin/*` estejam protegidas pelo middleware, criar a página de login com feedback visual e documentar o provisionamento da conta do pastor.

## requirements
- AUTH-01
- AUTH-02
- AUTH-03
- AUTH-04

## Tasks

<task>
<id>09-01-middleware</id>
<description>Criar middleware raiz e refatorar utils/supabase/middleware.ts</description>
<read_first>
- utils/supabase/middleware.ts
- lib/env.ts
</read_first>
<action>
1. Refatorar `utils/supabase/middleware.ts` para consumir as variáveis validadas do Supabase (`env.NEXT_PUBLIC_SUPABASE_URL` e `env.NEXT_PUBLIC_SUPABASE_ANON_KEY`) a partir de `lib/env.ts`, em vez de `process.env`.
2. Criar `middleware.ts` na raiz do projeto (mesmo nível de `package.json`).
3. No novo `middleware.ts` raiz, importar `updateSession` de `@/utils/supabase/middleware` e exportar a função `middleware` padrão que chama `updateSession(request)`.
4. Adicionar o `config` com o `matcher` adequado no `middleware.ts` raiz (excluindo arquivos estáticos, rotas `/api`, e `_next/static`) garantindo a interceptação das rotas `/admin`.
</action>
<acceptance_criteria>
- `middleware.ts` (raiz) contains `export async function middleware` e `matcher`.
- `utils/supabase/middleware.ts` imports `env` from `@/lib/env` and does not use `process.env`.
- `middleware.ts` contains `await updateSession(request)`.
</acceptance_criteria>
</task>

<task>
<id>09-02-login-actions</id>
<description>Criar Server Actions para login</description>
<read_first>
- utils/supabase/server.ts
</read_first>
<action>
1. Criar arquivo `app/login/actions.ts`.
2. Implementar função `login(formData: FormData)` utilizando `use server`.
3. Na função, instanciar cliente com `createClient()` importado de `@/utils/supabase/server`.
4. Extrair `email` e `password` do `formData` e chamar `supabase.auth.signInWithPassword({ email, password })`.
5. Em caso de sucesso, usar `redirect('/admin/oracao')` do Next.js.
6. Em caso de erro, retornar mensagem de erro clara para ser exibida no front-end.
</action>
<acceptance_criteria>
- `app/login/actions.ts` contains `"use server"` and a `login` function.
- `app/login/actions.ts` contains `supabase.auth.signInWithPassword`.
- `app/login/actions.ts` contains `redirect('/admin/oracao')`.
</acceptance_criteria>
</task>

<task>
<id>09-03-login-page</id>
<description>Implementar a interface de login da Igreja</description>
<read_first>
- app/login/page.tsx
- app/login/actions.ts
</read_first>
<action>
1. Criar/atualizar `app/login/page.tsx` como um Client Component (para suportar interatividade e hooks como `useActionState` ou `useFormStatus`).
2. Criar um formulário limpo usando as classes Tailwind do projeto. Incluir campos de email e senha (`required`).
3. Conectar o formulário ao Server Action `login` de `app/login/actions.ts`.
4. Implementar feedback visual: quando o formulário estiver sendo submetido, desabilitar o botão de submit e alterar o texto para "Entrando..." (Decisão D-03).
5. Mostrar mensagens de erro se a autenticação falhar (recebidas da action).
</action>
<acceptance_criteria>
- `app/login/page.tsx` renders a `<form>` taking email and password.
- O componente de botão reage ao estado de `pending` ou `loading`, alterando o rótulo e ficando desabilitado.
- Exibe mensagens de erro em caso de retorno de falha da Server Action.
</acceptance_criteria>
</task>

<task>
<id>09-04-admin-provisioning</id>
<description>Documentar provisionamento e segurança de admin</description>
<read_first>
- README.md
</read_first>
<action>
1. Criar o arquivo `docs/admin-provisioning.md` descrevendo como o pastor ou administrador deve ter sua conta criada (via Supabase Dashboard: Authentication -> Users -> Add user).
2. Documentar no mesmo arquivo que o "Public Signup" deve ser desabilitado no painel do Supabase (Authentication -> Configuration -> Allow new users to sign up = false).
3. Atualizar o `README.md` adicionando um link para `docs/admin-provisioning.md` na seção apropriada de Autenticação/Admin.
</action>
<acceptance_criteria>
- `docs/admin-provisioning.md` describes Supabase dashboard steps to add user and disable public signups.
- `README.md` contains a markdown link to `docs/admin-provisioning.md`.
</acceptance_criteria>
</task>

## Verification

<verify>
  <automated>npx tsc --noEmit</automated>
  <fails_when>non-zero exit code due to TypeScript compilation errors</fails_when>
</verify>
<verify>
  <automated>test -f middleware.ts</automated>
  <fails_when>non-zero exit (file not found)</fails_when>
</verify>
<verify>
  <automated>test -f app/login/actions.ts</automated>
  <fails_when>non-zero exit (file not found)</fails_when>
</verify>
<verify>
  <automated>test -f docs/admin-provisioning.md</automated>
  <fails_when>non-zero exit (file not found)</fails_when>
</verify>

## Must Haves

```yaml
must_haves:
  artifacts:
    - middleware.ts
    - app/login/page.tsx
    - app/login/actions.ts
    - docs/admin-provisioning.md
  truths:
    - O middleware de autenticação valida sessões antes do acesso a `/admin/*`
    - A página de login provê feedback visual (botão desabilitado) durante o processamento (D-03)
    - O fluxo de login bem-sucedido redireciona para `/admin/oracao` (D-01)
    - O processo de provisonamento manual do usuário admin via Supabase Dashboard e a desabilitação de registro público estão documentados (D-02)
```

## Artifacts this phase produces
- `middleware.ts` (Next.js config file)
- `app/login/page.tsx` (Login visual page)
- `app/login/actions.ts` (Server actions for auth: `login`)
- `docs/admin-provisioning.md` (Documentation for admin setup)

