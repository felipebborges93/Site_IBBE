---
phase: "09"
plan: "02"
type: execute
wave: 2
depends_on: ["01"]
files_modified:
  - "app/login/page.tsx"
  - "app/login/actions.ts"
  - "docs/admin-provisioning.md"
  - "README.md"
autonomous: true
requirements:
  - AUTH-02
  - AUTH-04
must_haves:
  artifacts:
    - "app/login/page.tsx"
    - "app/login/actions.ts"
    - "docs/admin-provisioning.md"
  truths:
    - A página de login provê feedback visual (botão desabilitado) durante o processamento (per D-03)
    - O fluxo de login bem-sucedido redireciona para `/admin/oracao` (per D-01)
    - O processo de provisonamento manual do usuário admin via Supabase Dashboard e a desabilitação de registro público estão documentados (per D-02)
  key_links:
    - "app/login/page.tsx" consome "app/login/actions.ts"
---

<objective>
Criar a página de login com feedback visual e documentar o provisionamento da conta do pastor.

Purpose: Autenticar o usuário e documentar acesso inicial.
Output: Server actions, login page e documentação de provisionamento.
</objective>

<tasks>
<task type="tracer">
<name>Tracer: Criar Server Actions para login</name>
<files>app/login/actions.ts</files>
<action>
1. Criar arquivo `app/login/actions.ts`.
2. Implementar função `login(formData: FormData)` utilizando `use server`.
3. Na função, instanciar cliente com `createClient()` importado de `@/utils/supabase/server`.
4. Extrair `email` e `password` do `formData` e chamar `supabase.auth.signInWithPassword({ email, password })`.
5. Em caso de sucesso, usar `redirect('/admin/oracao')` do Next.js (per D-01).
6. Em caso de erro, retornar mensagem de erro clara para ser exibida no front-end.
</action>
<verify>
  <automated>npx tsc --noEmit</automated>
  <fails_when>O comando retornar código de saída não-zero, exibindo erros de compilação ou tipagem do TypeScript</fails_when>
</verify>
<done>
- `app/login/actions.ts` contém `"use server"` e a função `login`.
- A função chama `signInWithPassword` e faz `redirect('/admin/oracao')`.
</done>
</task>

<task type="auto">
<name>Task: Implementar a interface de login da Igreja</name>
<files>app/login/page.tsx</files>
<action>
1. Criar/atualizar `app/login/page.tsx` como um Client Component.
2. Criar um formulário limpo usando as classes Tailwind do projeto. Incluir campos de email e senha (`required`).
3. Conectar o formulário ao Server Action `login` de `app/login/actions.ts`.
4. Implementar feedback visual: quando o formulário estiver sendo submetido, desabilitar o botão de submit e alterar o texto para "Entrando..." (per D-03).
5. Mostrar mensagens de erro utilizando um componente de Toast se a autenticação falhar (recebidas da action), alinhado ao comportamento de feedback visual esperado (per D-03).
</action>
<verify>
  <automated>npx tsc --noEmit</automated>
  <fails_when>O comando retornar código de saída não-zero, exibindo erros de compilação ou tipagem do TypeScript</fails_when>
</verify>
<done>
- `app/login/page.tsx` renderiza um formulário (`<form>`) recebendo email e senha.
- O componente reage ao estado da submissão (loading) com feedback visual.
- Mensagens de erro em caso de falha são exibidas utilizando um componente Toast.
</done>
</task>

<task type="auto">
<name>Task: Documentar provisionamento e segurança de admin</name>
<files>docs/admin-provisioning.md, README.md</files>
<action>
1. Criar o arquivo `docs/admin-provisioning.md` descrevendo como o pastor ou administrador deve ter sua conta criada (via Supabase Dashboard: Authentication -> Users -> Add user) (per D-02).
2. Documentar no mesmo arquivo que o "Public Signup" deve ser desabilitado no painel do Supabase (Authentication -> Configuration -> Allow new users to sign up = false) (per D-02).
3. Atualizar o `README.md` adicionando um link para `docs/admin-provisioning.md` na seção apropriada de Autenticação/Admin.
</action>
<verify>
  <automated>test -f docs/admin-provisioning.md</automated>
  <fails_when>O comando falha (código de saída não-zero), indicando que o arquivo docs/admin-provisioning.md não foi criado</fails_when>
</verify>
<done>
- `docs/admin-provisioning.md` existe e descreve a adição de usuário e desabilitação de signups públicos.
- `README.md` contém o link para a nova documentação.
</done>
</task>
</tasks>
