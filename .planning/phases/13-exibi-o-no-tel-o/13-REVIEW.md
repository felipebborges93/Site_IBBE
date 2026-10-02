---
status: reviewed
findings:
  critical: 2
  warning: 1
  info: 1
---

# Code Review: Exibição no Telão (Fase 13)

## 🔴 Critical
**1. Authentication Bypass para o Telão**
- **Arquivos afetados:** `app/telao/[token]/page.tsx`, `app/telao/page.tsx`, `app/api/prayer-requests/display/route.ts`, `app/api/prayer-requests/[id]/displayed/route.ts`
- **Descrição:** O sistema implementa uma backdoor para acesso sem o token secreto. A validação do token permite explicitamente o valor `"live"`. Para piorar, a rota padrão (`app/telao/page.tsx`) redireciona o usuário para `/telao/live`. O resultado é que qualquer visitante consegue acessar a URL pública, ler a fila de orações e marcar os pedidos como exibidos usando o token de fallback `"live"`, anulando toda a segurança proposta.
- **Sugestão de Correção:** Remova completamente a verificação `token === "live"` e `authHeader === "Bearer live"`. O arquivo `app/telao/page.tsx` deve renderizar uma página de "Não Autorizado" ou redirecionar para a home, não para uma rota de bypass.

**2. Falta de Persistência do Consentimento de Exibição Pública (Risco de Privacidade)**
- **Arquivos afetados:** `app/(public)/oracao/PrayerForm.tsx`, `supabase/migrations/01_prayer_requests_schema.sql`
- **Descrição:** O formulário recolhe o consentimento do usuário para exibição pública através do campo `allow_public_display`. No entanto, este campo não foi adicionado à tabela `prayer_requests` na migração do banco de dados (nem está sendo selecionado nas queries da API).
- **Risco:** Sem salvar essa opção, a moderação não tem como saber se o usuário autorizou a exibição. Isso pode resultar em pedidos confidenciais sendo expostos no telão indevidamente.
- **Sugestão de Correção:** Adicione a coluna `allow_public_display boolean default false not null` na tabela `prayer_requests` e atualize as tipagens/API para salvar e exibir essa informação no painel administrativo.

## 🟡 Warning
**1. Constraint de Banco de Dados Incompleta para Nomes**
- **Arquivo afetado:** `supabase/migrations/01_prayer_requests_schema.sql`
- **Descrição:** A constraint `check_anonymous_name` é validada como `((is_anonymous = true and name is null) or is_anonymous = false)`. Isso significa que se `is_anonymous = false`, a regra aprova qualquer coisa (incluindo `name is null`). Embora o formulário em tela exija o nome via Zod, não há defesa no banco.
- **Sugestão de Correção:** Altere a constraint para `((is_anonymous = true and name is null) or (is_anonymous = false and name is not null and char_length(trim(name)) > 0))`.

## 🔵 Info
**1. Inconsistência do Limite de Caracteres**
- **Arquivos afetados:** `lib/validations/prayer.ts`, `supabase/migrations/01_prayer_requests_schema.sql`
- **Descrição:** O `prayerFormSchema` foi corretamente atualizado para limitar o texto do pedido a 140 caracteres, focado na exibição legível no telão. Entretanto, a constraint `check_request_length` do banco de dados continua permitindo até 1000 caracteres.
- **Sugestão de Correção:** Avaliar se a constraint no banco deve ser atualizada para `<= 140` para refletir estritamente a nova regra de negócio e evitar erros de exibição se registros manuais ocorrerem.
