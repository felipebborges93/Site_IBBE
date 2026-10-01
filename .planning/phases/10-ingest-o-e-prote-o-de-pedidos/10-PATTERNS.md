# Phase 10: Ingestão e Proteção de Pedidos - Pattern Map

**Mapped:** 2026-10-01  
**Files analyzed:** 6  
**Analogs found:** 6 / 6  

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `lib/rate-limit.ts` | Utility / Security | Headers/IP → SHA-256(IP + salt) → In-Memory Store (LRU/TTL) → Rate Limit Status | `app/actions/prayer.ts` (inline rate limiter) & `lib/utils/services.ts` | Exact |
| `lib/sanitize.ts` | Utility / Sanitization | Raw input string → Strip HTML tags / escape entities → Clean sanitized string | `app/actions/prayer.ts` (inline `sanitizeText`) | Exact |
| `lib/validations/prayer.ts` | Validation Schema | Parsed input payload → Zod schema refinement → Typed Validated Object | `lib/validations/prayer.ts` & `lib/env.ts` | Exact |
| `app/actions/prayer.ts` | Server Action | `FormData` → Honeypot check → Rate limit check → Sanitize → Zod parse → Redact name → Supabase insert → Result | `app/actions/prayer.ts` & `app/login/actions.ts` | Exact |
| `app/(public)/oracao/PrayerForm.tsx` | Client UI Component | User interaction → Form submission via `useActionState` → Status/Toast feedback + Form reset | `app/(public)/oracao/PrayerForm.tsx` & `app/login/page.tsx` | Exact |
| `tests/e2e/prayer-ingestion.spec.ts` | E2E Test Suite | Playwright browser → Fill form variations (normal, anonymous, honeypot, repeated) → Assert UI & DB response | `tests/e2e/critical-flows.spec.ts` | Exact |

---

## Pattern Assignments

### 1. `lib/rate-limit.ts` (New Utility)
- **Role:** Centralized in-memory rate limiting with cryptographic hashing for LGPD compliance.
- **Closest Analog:** `app/actions/prayer.ts` (lines 9–29) and `lib/utils/services.ts`.
- **Imports Pattern:**
```typescript
import crypto from "crypto";
```
- **Core Pattern (SHA-256 IP Hash + 1 Hour Window + 3 Req Limit):**
```typescript
interface RateLimitRecord {
  count: number;
  lastReset: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hora
const MAX_REQUESTS = 3;

/**
 * Gera um hash SHA-256 do IP com salt para conformidade com a LGPD (sem armazenar IP bruto).
 */
export function hashIp(ip: string, salt: string = process.env.RATE_LIMIT_SALT || "ibbe-prayer-salt"): string {
  return crypto
    .createHash("sha256")
    .update(`${ip}:${salt}`)
    .digest("hex");
}

/**
 * Verifica e incrementa a taxa de requisições baseada no hash do IP.
 */
export function checkRateLimit(ipHash: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ipHash);

  // Limpeza de registros expirados se o intervalo passou
  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ipHash, { count: 1, lastReset: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}
```
- **Error Handling:** Fallback seguro quando cabeçalho `x-forwarded-for` estiver ausente ("unknown" ou hash de IP anônimo).

---

### 2. `lib/sanitize.ts` (New Utility)
- **Role:** Sanitização estrita de conteúdo HTML no servidor para proteção anti-XSS antes da persistência.
- **Closest Analog:** `app/actions/prayer.ts` (lines 34–49).
- **Core Pattern:**
```typescript
/**
 * Remove todas as tags HTML e caracteres maliciosos preservando texto puro.
 * Conforme Decisão D-03: extrai apenas o texto sem estourar exceção para o usuário.
 */
export function sanitizeHtml(input: string): string {
  if (!input) return "";
  
  return input
    // Remove tags completas <...>
    .replace(/<[^>]*>/g, "")
    // Remove entidades ou caracteres de controle perigosos
    .replace(/[<>'"&]/g, (char) => {
      switch (char) {
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "'": return "&#39;";
        case '"': return "&quot;";
        case "&": return "&amp;";
        default: return char;
      }
    })
    .trim();
}
```

---

### 3. `lib/validations/prayer.ts` (Modified Validation Schema)
- **Role:** Schema Zod com regras estritas de banco de dados e LGPD.
- **Closest Analog:** `lib/validations/prayer.ts` (existente).
- **Imports Pattern:**
```typescript
import { z } from "zod";
```
- **Core Pattern (Alinhado com migration `01_prayer_requests_schema.sql`):**
```typescript
export const prayerFormSchema = z
  .object({
    name: z
      .string()
      .max(100, { message: "O nome não pode exceder 100 caracteres." })
      .optional()
      .or(z.literal("")),
    request: z
      .string()
      .min(5, { message: "O pedido deve ter pelo menos 5 caracteres." })
      .max(1000, { message: "O pedido não pode exceder 1000 caracteres." }),
    is_anonymous: z.boolean().default(false),
    honeypot: z.string().optional(),
  })
  .refine(
    (data) => {
      // Se não for anônimo, o nome é obrigatório
      if (!data.is_anonymous && (!data.name || data.name.trim() === "")) {
        return false;
      }
      return true;
    },
    {
      message: "Por favor, informe seu nome ou marque a opção de pedido anônimo.",
      path: ["name"],
    }
  );

export type PrayerFormValues = z.infer<typeof prayerFormSchema>;
```

---

### 4. `app/actions/prayer.ts` (Modified Server Action)
- **Role:** Server Action para ingestão segura no Supabase (`@supabase/ssr`).
- **Closest Analog:** `app/actions/prayer.ts` & `app/login/actions.ts`.
- **Imports Pattern:**
```typescript
"use server";

import { headers } from "next/headers";
import { prayerFormSchema } from "@/lib/validations/prayer";
import { createClient } from "@/utils/supabase/server";
import { hashIp, checkRateLimit } from "@/lib/rate-limit";
import { sanitizeHtml } from "@/lib/sanitize";
```
- **Core Pattern & Lifecycle (D-01, D-02, D-03, D-04, PRAY-01 a PRAY-04):**
```typescript
export interface PrayerActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function submitPrayerRequest(
  prevState: PrayerActionState | null,
  formData: FormData
): Promise<PrayerActionState> {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const isAnonymous = rawData.is_anonymous === "on" || rawData.is_anonymous === "true";

    // 1. Honeypot check (D-01): Se preenchido por bot, aborta silenciosamente simulando sucesso
    const honeypot = typeof rawData.honeypot === "string" ? rawData.honeypot.trim() : "";
    if (honeypot) {
      console.warn("Honeypot acionado: bot detectado. Abortando silenciosamente.");
      return { success: true, message: "Pedido enviado com sucesso!" };
    }

    // 2. Rate Limiting por Hash SHA-256 de IP (D-02, PRAY-03)
    const headerList = await headers();
    const forwardedFor = headerList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const ipHashed = hashIp(ip);

    const { allowed } = checkRateLimit(ipHashed);
    if (!allowed) {
      return {
        success: false,
        message: "Limite de pedidos atingido (máximo de 3 pedidos por hora). Por favor, tente novamente mais tarde.",
      };
    }

    // 3. Sanitização de HTML no servidor (D-03, PRAY-02)
    const sanitizedName = typeof rawData.name === "string" ? sanitizeHtml(rawData.name) : "";
    const sanitizedRequest = typeof rawData.request === "string" ? sanitizeHtml(rawData.request) : "";

    const payloadToValidate = {
      name: sanitizedName,
      request: sanitizedRequest,
      is_anonymous: isAnonymous,
      honeypot,
    };

    // 4. Validação Zod
    const validated = prayerFormSchema.safeParse(payloadToValidate);
    if (!validated.success) {
      return {
        success: false,
        message: "Verifique os campos do formulário.",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    // 5. Redação de nome para anônimos (D-04, PRAY-04)
    const finalName = validated.data.is_anonymous ? null : validated.data.name;

    // 6. Persistência via Supabase SSR anônimo (PRAY-01)
    const supabase = await createClient();
    const { error } = await supabase.from("prayer_requests").insert({
      name: finalName,
      request: validated.data.request,
      is_anonymous: validated.data.is_anonymous,
      status: "pending",
      displayed: false,
    });

    if (error) {
      console.error("Erro ao inserir pedido de oração no Supabase:", error);
      return {
        success: false,
        message: "Não foi possível enviar seu pedido agora. Tente novamente em instantes.",
      };
    }

    return {
      success: true,
      message: "Seu pedido de oração foi recebido com carinho e nossa equipe estará orando por você!",
    };
  } catch (error) {
    console.error("Erro inesperado na Server Action submitPrayerRequest:", error);
    return {
      success: false,
      message: "Ocorreu um erro inesperado no servidor. Tente novamente mais tarde.",
    };
  }
}
```

---

### 5. `app/(public)/oracao/PrayerForm.tsx` (Modified Client Form)
- **Role:** Interface interativa acessível com feedback acolhedor e suporte a honeypot.
- **Closest Analog:** `app/(public)/oracao/PrayerForm.tsx` & `app/login/page.tsx`.
- **Imports Pattern:**
```typescript
"use client";

import React, { useState, useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle, WarningCircle, CircleNotch, HeartHandshake } from "@phosphor-icons/react";
import { submitPrayerRequest, type PrayerActionState } from "@/app/actions/prayer";
import { Button } from "@/components/ui/Button";
```
- **Honeypot Markup Pattern (D-01):**
```tsx
{/* Honeypot field - invisível para usuários legítimos, armadilha para bots */}
<div className="hidden" aria-hidden="true" style={{ display: "none" }}>
  <label htmlFor="honeypot">Deixe este campo em branco</label>
  <input
    type="text"
    name="honeypot"
    id="honeypot"
    tabIndex={-1}
    autoComplete="off"
  />
</div>
```
- **Form Reset & State Handling Pattern:**
```tsx
const [state, formAction] = useActionState<PrayerActionState | null, FormData>(
  submitPrayerRequest,
  null
);
const formRef = useRef<HTMLFormElement>(null);
const [isAnonymous, setIsAnonymous] = useState(false);
const [requestText, setRequestText] = useState("");

useEffect(() => {
  if (state?.success) {
    formRef.current?.reset();
    setRequestText("");
    setIsAnonymous(false);
  }
}, [state?.success]);
```
- **Accessible Toast Feedback Pattern (Copy from `app/login/page.tsx`):**
```tsx
{state?.message && (
  <div
    role="alert"
    aria-live="assertive"
    className={`p-4 rounded-xl text-sm font-medium flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-200 ${
      state.success
        ? "bg-verde-50 border border-verde-200 text-verde-800"
        : "bg-red-50 border border-red-200 text-red-700"
    }`}
  >
    {state.success ? (
      <CheckCircle size={20} className="shrink-0 mt-0.5 text-verde-600" weight="fill" />
    ) : (
      <WarningCircle size={20} className="shrink-0 mt-0.5 text-red-600" weight="fill" />
    )}
    <div className="flex-1">{state.message}</div>
  </div>
)}
```

---

### 6. `tests/e2e/prayer-ingestion.spec.ts` (New E2E Test)
- **Role:** Validação automatizada de integridade dos requisitos da Fase 10.
- **Closest Analog:** `tests/e2e/critical-flows.spec.ts`.
- **Imports Pattern:**
```typescript
import { test, expect } from "@playwright/test";
```
- **Core Test Cases Pattern:**
```typescript
test.describe("Ingestão e Proteção de Pedidos de Oração", () => {
  test("Exibe formulário com campos obrigatórios e acessibilidade", async ({ page }) => {
    await page.goto("/oracao");
    await expect(page.locator("textarea[name='request']")).toBeVisible();
    await expect(page.locator("input[name='honeypot']")).toBeHidden();
  });

  test("Permite alternar entre modo identificado e anônimo", async ({ page }) => {
    await page.goto("/oracao");
    const anonCheckbox = page.locator("input[name='is_anonymous']");
    const nameInput = page.locator("input[name='name']");

    await expect(nameInput).toBeVisible();
    await anonCheckbox.check();
    await expect(nameInput).toBeHidden();
  });
});
```

---

## Shared Patterns

### 1. Supabase SSR Server Client Invocations
- **File:** `utils/supabase/server.ts`
- **Pattern:** `const supabase = await createClient()` utilizando `@supabase/ssr` e cookies do Next.js.
- **Permission Role:** Chamada originada sem sessão autenticada atua sob a role `anon`, aplicando automaticamente as restrições da política RLS:
  - `status = 'pending'`
  - `displayed = false`
  - Inserções permitidas, leituras e atualizações negadas para `anon`.

### 2. LGPD e Anonimização Criptográfica
- **Princípio:** Nenhum endereço IP bruto pode ser persistido em banco de dados ou retido além da janela da requisição.
- **Implementação:** Hashing unidirecional com SHA-256 (`crypto.createHash("sha256")`) concatenando com salt fixo de ambiente.

### 3. Server Actions Response Format
- **Standard Signature:**
```typescript
export interface ActionResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}
```

---

## No Analog Found
*Nenhum arquivo sem análogo identificado.* Todos os módulos e funcionalidades possuem precedentes diretos na base de código (`app/actions/prayer.ts`, `lib/validations/prayer.ts`, `app/login/actions.ts`, `utils/supabase/server.ts`).
