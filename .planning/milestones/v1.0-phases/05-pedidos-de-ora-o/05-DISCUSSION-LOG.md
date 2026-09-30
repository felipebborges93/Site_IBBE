# Phase 5: Pedidos de Oração - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-29
**Phase:** 5-Pedidos de Oração
**Areas discussed:** Estado do Formulário, Anti-Spam e Rate Limiting, Segurança de Banco de Dados, Proteção de Rota Admin, Autenticação da API do Telão

---

## Estado do Formulário

| Option | Description | Selected |
|--------|-------------|----------|
| Server Actions + React Hook Form | (Recommended default) Validate client side and submit to Server Action | ✓ |

**User's choice:** Server Actions + React Hook Form (Auto-selected via `--auto`)
**Notes:** Provides optimal user experience and server security.

---

## Anti-Spam e Rate Limiting

| Option | Description | Selected |
|--------|-------------|----------|
| Vercel KV / Supabase IP Hash | (Recommended default) Honeypot + IP hash rate limiting | ✓ |

**User's choice:** Vercel KV / Supabase IP Hash (Auto-selected via `--auto`)
**Notes:** Prevents spam without friction for real users.

---

## Segurança de Banco de Dados

| Option | Description | Selected |
|--------|-------------|----------|
| Supabase RLS (Anon = Insert Only) | (Recommended default) Only allow insert for unauthenticated users | ✓ |

**User's choice:** Supabase RLS (Anon = Insert Only) (Auto-selected via `--auto`)
**Notes:** Enforces security at the database level.

---

## Proteção de Rota Admin

| Option | Description | Selected |
|--------|-------------|----------|
| Next.js Middleware | (Recommended default) Protect `/admin/*` via Middleware with Supabase Auth | ✓ |

**User's choice:** Next.js Middleware (Auto-selected via `--auto`)
**Notes:** Ensures robust protection for moderator dashboard.

---

## Autenticação da API do Telão

| Option | Description | Selected |
|--------|-------------|----------|
| Static Auth Token | (Recommended default) Use `.env` bearer token for display API | ✓ |

**User's choice:** Static Auth Token (Auto-selected via `--auto`)
**Notes:** Simple and secure for internal TV displays.

---

## the agent's Discretion

- Estrutura visual e micro-interações do painel de moderação `/admin/oracao`.
- Organização exata dos utilitários de validação Zod no código.

## Deferred Ideas

- None
