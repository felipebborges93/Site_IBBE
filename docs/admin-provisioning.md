# Provisionamento de Administrador e Segurança de Autenticação

Este documento detalha o processo operacional de criação do usuário administrador (pastor/equipe pastoral) e as configurações de segurança mandatórias no Supabase para o site da **Igreja Batista Bethel em Resende (IBBE)**.

---

## 1. Cadastro Manual do Administrador (Pastor)

O site **não possui tela de cadastro público** (`sign-up`), por design de segurança. Qualquer usuário administrativo deve ser provisionado manualmente pelo painel do Supabase.

### Passo a Passo:
1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard).
2. Selecione o projeto da **IBBE**.
3. No menu lateral esquerdo, acesse **Authentication** -> **Users**.
4. Clique no botão **Add user** e selecione **Create user**.
5. Preencha os campos:
   - **Email:** Digite o e-mail do pastor/administrador (ex: `pastor@bethelresende.com.br`).
   - **Password:** Defina uma senha forte inicial (mínimo de 8 caracteres, com números e símbolos).
   - **Auto Confirm User:** Marque esta opção para confirmar imediatamente o e-mail sem necessidade de confirmação por link externo.
6. Clique em **Create user**.

---

## 2. Desabilitar Registro Público (Mandatório)

Para assegurar que nenhuma pessoa não autorizada tente registrar uma conta e contornar restrições:

1. No [Supabase Dashboard](https://supabase.com/dashboard), acesse o projeto da IBBE.
2. No menu lateral, acesse **Authentication** -> **Providers** -> **Email**.
3. Desmarque a opção **"Allow new users to sign up"** (Permitir que novos usuários se registrem).
4. Clique em **Save**.

Dessa forma, novas contas só poderão ser criadas via painel do Supabase por um administrador ou via service role.

---

## 3. Fluxo de Autenticação e Acesso ao Painel

- **URL de Login:** `/login`
- **Redirecionamento pós-login:** `/admin/oracao`
- **Rotas Protegidas:** Todas as rotas sob `/admin/*` são interceptadas pelo `middleware.ts`. Usuários não autenticados são redirecionados de volta para `/login`.
