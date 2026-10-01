# Architecture Patterns

**Domain:** Next.js 15 + Supabase (Auth, RLS, Server Actions, Route Handlers)  
**Researched:** 2026-10-01  
**Project:** Site Oficial — Igreja Batista Bethel em Resende (IBBE) — Milestone v1.1

---

## Recommended Architecture

The architecture connects Next.js 15 (App Router, React 19) with Supabase to provide secure, resilient prayer request ingestion, administrative moderation, and projection (telão) consumption.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              NEXT.JS 15 (APP ROUTER)                        │
│                                                                             │
│  [Public Visitor]                [Pastor / Admin]           [Telão System]  │
│         │                               │                          │        │
│         ▼                               ▼                          ▼        │
│  Landing / /oracao              /admin/oracao               /api/prayer-    │
│  (Client Form)                 (Server Component)           requests/*      │
│         │                               │                   (Route Handler) │
│         ▼                               │                          │        │
│  submitPrayerRequest                    │                          │        │
│  (Server Action)                        │                          │        │
│   • Honeypot & Rate Limit               │                          │        │
│   • Zod & Sanitization                  │                          │        │
│         │                               │                          │        │
│         ▼                               ▼                          │        │
│  createServerClient()            createServerClient()              │        │
│  (Anon Key + Cookie Store)       (Auth JWT Cookie Store)           │        │
│         │                               │                          │        │
│         │                               │             Bearer TELAO_API_TOKEN│
│         │                               │                          │        │
│         │                               │                          ▼        │
│         │                               │                 createAdminClient()
│         │                               │                 (service_role key)│
└─────────┼───────────────────────────────┼──────────────────────────┼────────┘
          │                               │                          │
          ▼                               ▼                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SUPABASE (POSTGRES ENGINE)                         │
│                                                                             │
│  RLS: "Anon can insert"          RLS: "Authenticated can    RLS: BYPASSED   │
│  (with check status='pending')   select & update"           (Service Role)  │
│                                                                             │
│                        TABLE: public.prayer_requests                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Component Boundaries

| Boundary Layer | Component / Location | Responsibility | Supabase Client Instance | Access Level & Key |
| :--- | :--- | :--- | :--- | :--- |
| **Public UI** | `components/home/PrayerSection.tsx` & `app/(public)/oracao` | Renders prayer submission form, captures input, displays validation errors & confirmation. | None (delegates to Server Action) | N/A |
| **Ingestion Action** | `app/actions/prayer.ts` | Server-side validation (Zod), honeypot verification, LGPD-compliant IP rate limiting, input sanitization, and DB insert. | `createServerClient` (`utils/supabase/server.ts`) | `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Subject to RLS) |
| **Edge / Session** | `middleware.ts` & `utils/supabase/middleware.ts` | Refreshes auth tokens on every request via cookies, protects `/admin/*` routes from unauthorized access. | `createServerClient` (`utils/supabase/middleware.ts`) | `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Syncs cookies via `request.cookies` & `response.cookies`) |
| **Auth UI & Flow** | `app/login/page.tsx` & `app/actions/auth.ts` | Admin authentication login interface, signs in with email/password, sets secure HTTP-only cookies. | `createServerClient` (`utils/supabase/server.ts`) | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| **Admin Dashboard** | `app/admin/oracao/page.tsx` | Moderation table (Server Component). Lists pending/approved/rejected requests and executes approval server actions. | `createServerClient` (`utils/supabase/server.ts`) | Authenticated session (Subject to RLS `authenticated`) |
| **Telão API** | `app/api/prayer-requests/display/route.ts` & `[id]/displayed/route.ts` | Machine-to-machine HTTP endpoints for the projection system. Validates static Bearer token (`TELAO_API_TOKEN`). | `createAdminClient` (`utils/supabase/admin.ts`) | `SUPABASE_SERVICE_ROLE_KEY` (Bypasses RLS safely after token validation) |
| **Database** | `supabase/migrations/00_prayer_requests.sql` | Postgres table `prayer_requests`, indexes, enum checks, and strict RLS policies. | Supabase Engine | Enforces Row Level Security |

---

### Data Flow

#### 1. Public Submission Flow
1. User fills the prayer request form and submits (`PrayerSection.tsx`).
2. Server Action `submitPrayerRequest` executes in Next.js runtime:
   - **Honeypot Check**: Verifies that the hidden honeypot input is empty.
   - **Rate Limiting**: Checks IP request frequency (in-memory or DB-backed, with hashed IP).
   - **Sanitization & Zod Validation**: Strips HTML tags, enforces minimum length and required name when `is_anonymous` is false.
   - **Database Insertion**: Invokes `createServerClient()`, issuing an `INSERT` to `public.prayer_requests`.
3. Supabase evaluates RLS:
   - Evaluates `"Anon can insert prayer requests"`.
   - Passes because role is `anon` and fields meet validation checks (`status = 'pending'`, `displayed = false`).
4. Server action returns `{ success: true }`, UI resets and displays feedback.

#### 2. Authentication & Admin Moderation Flow
1. Admin navigates to `/admin/oracao`.
2. `middleware.ts` intercepts request:
   - Calls `updateSession(request)`.
   - Verifies JWT with `supabase.auth.getUser()`. If missing or invalid, redirects to `/login`.
3. If valid, `AdminOracaoPage` (Server Component) executes:
   - Fetches requests via `createServerClient()`.
   - Supabase evaluates RLS policy `"Authenticated can select prayer requests"` (passes because auth cookie is present and validated).
   - Renders HTML table directly on server.
4. When pastor clicks "Aprovar" or "Rejeitar":
   - Server Action triggers `supabase.from("prayer_requests").update({ status }).eq("id", id)`.
   - Supabase checks RLS policy `"Authenticated can update prayer requests"` (passes).
   - `revalidatePath("/admin/oracao")` immediately updates the server-rendered view.

#### 3. Telão Projection API Flow
1. Projection machine sends `GET /api/prayer-requests/display` with header `Authorization: Bearer <TELAO_API_TOKEN>`.
2. Next.js Route Handler checks `process.env.TELAO_API_TOKEN`.
   - If invalid or missing, immediately responds with `401 Unauthorized`.
3. If authorized, handler uses `createAdminClient()` (configured with `SUPABASE_SERVICE_ROLE_KEY`).
   - Query: selects up to 10 rows with `status = 'approved'` and `displayed = false`.
   - Service role client bypasses RLS safely because route-level token authentication has already succeeded.
4. When projected, machine sends `POST /api/prayer-requests/[id]/displayed` with Bearer token.
5. Handler marks row with `displayed = true` using `createAdminClient()`.

---

## Patterns to Follow

### Pattern 1: Separate Supabase Clients by Execution Context
Next.js 15 App Router requires distinct client initializations depending on where code executes:
1. **Server Client (`utils/supabase/server.ts`)**:
   ```typescript
   import { createServerClient } from "@supabase/ssr";
   import { cookies } from "next/headers";

   export async function createClient() {
     const cookieStore = await cookies();
     return createServerClient(
       process.env.NEXT_PUBLIC_SUPABASE_URL!,
       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
       {
         cookies: {
           getAll() {
             return cookieStore.getAll();
           },
           setAll(cookiesToSet) {
             try {
               cookiesToSet.forEach(({ name, value, options }) =>
                 cookieStore.set(name, value, options)
               );
             } catch {
               // Called from Server Component; cookie writing handled by middleware/actions
             }
           },
         },
       }
     );
   }
   ```
2. **Admin/Service Role Client (`utils/supabase/admin.ts`)**:
   ```typescript
   import { createClient } from "@supabase/supabase-js";

   export function createAdminClient() {
     const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
     const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

     if (!supabaseUrl || !serviceRoleKey) {
       throw new Error("Missing Supabase service role credentials.");
     }

     return createClient(supabaseUrl, serviceRoleKey, {
       auth: { persistSession: false, autoRefreshToken: false },
     });
   }
   ```

### Pattern 2: Next.js 15 Root Middleware Integration
Next.js 15 requires an explicit `middleware.ts` in the project root to activate session refreshing and cookie synchronization.

```typescript
// middleware.ts (root)
import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

### Pattern 3: Defense-in-Depth RLS Hardening
Do not rely solely on application-level form validations. The Postgres RLS policy must prohibit `anon` from inserting arbitrary statuses:

```sql
-- Secure anon insert: forces status to 'pending' and displayed to false
create policy "Anon can insert prayer requests" on public.prayer_requests
    for insert
    to anon
    with check (
        status = 'pending'
        and displayed = false
    );
```

### Pattern 4: Always Authenticate with `getUser()`, Never `getSession()`
In server components, server actions, and middleware, always call `supabase.auth.getUser()`.
- `getSession()` only checks the unverified JWT in cookies and can be spoofed.
- `getUser()` validates the authenticity and expiration against the Supabase Auth server.

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why It Fails | Correct Solution |
| :--- | :--- | :--- |
| **Using Anon Client in Telão Route Handlers** | `anon` has no `SELECT` or `UPDATE` privileges in RLS. Calling `createClient()` inside `/api/prayer-requests/display` returns empty data or permission errors. | Use `createAdminClient()` with `SUPABASE_SERVICE_ROLE_KEY` inside token-guarded API route handlers. |
| **Missing Root `middleware.ts`** | Having `utils/supabase/middleware.ts` without exporting root `middleware.ts` causes Next.js to ignore it. Auth cookies never refresh, leading to random session timeouts. | Add root `middleware.ts` delegating to `updateSession(request)`. |
| **Exposing `SUPABASE_SERVICE_ROLE_KEY` in Client** | Prefixing the secret key with `NEXT_PUBLIC_` exposes database root access in client-side JS bundles. | Keep `SUPABASE_SERVICE_ROLE_KEY` private (server-only, no `NEXT_PUBLIC_` prefix). |
| **`with check (true)` on Anon Insert** | Allows any script with the anon public key to insert rows with `status = 'approved'`, bypassing admin moderation. | Constrain check to `with check (status = 'pending' and displayed = false)`. |
| **Setting Cookies in Server Components** | Calling `cookieStore.set()` during RSC rendering triggers runtime exceptions in Next.js 15. | Write cookies only in Server Actions, Route Handlers, or Middleware. |
| **Missing `/login` Route** | Redirecting unauthorized users from `/admin/oracao` to `/login` causes a 404 when `app/login/page.tsx` does not exist. | Provide `app/login/page.tsx` with email/password authentication. |

---

## Scalability Considerations

1. **Database Indexes**:
   - As prayer requests accumulate over months, moderation and telão polling queries (`status = 'approved' AND displayed = false`) slow down if unindexed.
   - Recommended composite index:
     ```sql
     create index if not exists idx_prayer_requests_status_displayed_created
     on public.prayer_requests (status, displayed, created_at asc);
     ```
2. **Rate Limiting Resilience**:
   - The vertical MVP uses an in-memory `Map` in `app/actions/prayer.ts`. In serverless environments (Vercel), lambdas scale across multiple isolates, making in-memory maps per-instance rather than global.
   - For production scale, move rate limiting to Upstash Redis or a Postgres rate-limiting function with IP hashing (`sha256(ip + salt)` for LGPD compliance).
3. **Connection Pooling**:
   - Next.js serverless functions can exhaust Postgres connections if traffic spikes. Supabase provides Supavisor (port 6543/5432 transaction pooler). Ensure connection pooling is enabled in production Supabase project settings.
4. **Telão Polling Frequency**:
   - Ensure the projection system client polls `/api/prayer-requests/display` at reasonable intervals (e.g., every 15–30 seconds) or adopts Supabase Realtime in future milestones.

---

## Sources

- [Supabase SSR Next.js Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabase Row Level Security Policies](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Next.js 15 Server Actions and Cookies Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Project Specification (PROJECT.md)](file:///home/felipe/Projetos%20IA/Site_IBBE/.planning/PROJECT.md)
- [Prayer Requests Initial Schema](file:///home/felipe/Projetos%20IA/Site_IBBE/supabase/migrations/00_prayer_requests.sql)
