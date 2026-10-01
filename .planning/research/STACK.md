# Technology Stack

**Project:** Site Oficial IBBE  
**Researched:** 2026-10-01  
**Milestone:** v1.1 — Configuração do Supabase e Pedidos de Oração

---

## Recommended Stack

To implement the database, authentication, client utilities, and prayer request workflows for the Site Oficial IBBE on Next.js 15 (App Router, React 19), the recommended stack leverages Supabase's managed Postgres, Auth, and modern SSR client tooling.

### 1. Core Supabase Libraries

| Library | Version Installed / Target | Purpose & Runtime Boundary | Why It Fits |
| :--- | :--- | :--- | :--- |
| **`@supabase/supabase-js`** | `^2.117.2` (installed: `2.117.2`) | Isomorphic Supabase client core; base for query builder, authentication API, and service-role administrative operations (`createClient`). | Standard official SDK. Provides full typed query building, RPC, and Auth methods. Used directly for admin/service-role clients (`utils/supabase/admin.ts`). |
| **`@supabase/ssr`** | `^0.12.7` (installed: `0.12.7`) | Official Next.js App Router cookie adapter for Supabase. Replaces legacy `@supabase/auth-helpers-nextjs`. | Manages RFC-compliant cookie chunking, session refresh in middleware, and token synchronization across Next.js 15 Server Components, Server Actions, and Route Handlers without session desynchronization. |
| **`zod`** | `^4.6.5` (installed: `4.6.5`) | Schema validation for prayer request form submissions and authentication payloads. | Validates user input at runtime before database interactions, preventing malicious payloads or malformed records. |

---

### 2. Client Utilities & Architectural Setup

Next.js 15 requires strictly differentiated Supabase client instances based on runtime contexts:

#### A. Server Client (`utils/supabase/server.ts`)
- **Use Case:** Server Components (RSC) and Server Actions (`app/actions/prayer.ts`, `app/admin/oracao/page.tsx`).
- **Implementation Pattern:** Uses `createServerClient` from `@supabase/ssr` with async `cookies()` from `next/headers`.
- **Cookie Contract:** Must implement `getAll()` and `setAll(cookiesToSet)`. The legacy `get()`, `set()`, and `remove()` methods are deprecated in `@supabase/ssr` 0.5+ / 0.12.x and trigger warnings or session corruption.
- **Security:** Operates under `NEXT_PUBLIC_SUPABASE_ANON_KEY` or the authenticated user's JWT. Strictly respects PostgreSQL Row Level Security (RLS).

```typescript
// utils/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

export async function createClient() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
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
          // The `setAll` method was called from a Server Component.
          // This can be ignored if middleware is refreshing user sessions.
        }
      },
    },
  });
}
```

#### B. Admin / Service Role Client (`utils/supabase/admin.ts`)
- **Use Case:** Machine-to-machine Route Handlers (`app/api/prayer-requests/display/route.ts` and `app/api/prayer-requests/[id]/displayed/route.ts`).
- **Implementation Pattern:** Direct `createClient` from `@supabase/supabase-js` using `SUPABASE_SERVICE_ROLE_KEY`.
- **Security:** Completely bypasses RLS. Must **never** be used in client components or exposed to public callers. Protected at the HTTP layer by `Authorization: Bearer <TELAO_API_TOKEN>`.
- **Session Settings:** Configured with `auth: { persistSession: false, autoRefreshToken: false }` to avoid cookie leakage in serverless worker processes.

```typescript
// utils/supabase/admin.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase service role environment variables.");
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
```

#### C. Browser / Client Component Client (`utils/supabase/client.ts`)
- **Use Case:** Interactive client components if needed (e.g., client-side login forms, interactive state handlers, or future Supabase Realtime subscriptions).
- **Implementation Pattern:** `createBrowserClient` from `@supabase/ssr`.

```typescript
// utils/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

#### D. Edge Middleware (`middleware.ts` & `utils/supabase/middleware.ts`)
- **Use Case:** Session token refreshment and route protection for `/admin/*`.
- **Requirement:** Next.js 15 App Router requires an explicit root `middleware.ts` file that invokes `updateSession(request)`. Without this file, auth cookies expire after 1 hour and cause unexpected logouts for admin users.

---

### 3. Database Schema & RLS Hardening

The database engine is PostgreSQL hosted on Supabase.

#### Table Definition: `public.prayer_requests`
```sql
create table if not exists public.prayer_requests (
    id uuid default gen_random_uuid() primary key,
    name text,
    request text not null,
    is_anonymous boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    status text default 'pending' not null check (status in ('pending', 'approved', 'rejected')),
    displayed boolean default false not null
);

-- Enable RLS
alter table public.prayer_requests enable row level security;
```

#### Hardened Row Level Security (RLS) Policies
- **Anonymous Insert:** Restricts public inserts so callers cannot submit requests that bypass moderation (forcing `status = 'pending'` and `displayed = false`).
  ```sql
  create policy "Anon can insert pending prayer requests" on public.prayer_requests
      for insert
      to anon
      with check (
          status = 'pending'
          and displayed = false
      );
  ```
- **Authenticated Access (Pastor / Admin):** Authenticated users (via Supabase Auth) can select and update all requests.
  ```sql
  create policy "Authenticated can select prayer requests" on public.prayer_requests
      for select
      to authenticated
      using (true);

  create policy "Authenticated can update prayer requests" on public.prayer_requests
      for update
      to authenticated
      using (true);
  ```
- **Query Optimization Index:**
  ```sql
  create index if not exists idx_prayer_requests_status_displayed_created
      on public.prayer_requests (status, displayed, created_at asc);
  ```

---

### 4. Authentication Architecture

- **Provider:** Supabase Auth (Native Email & Password).
- **Registration Strategy:** Closed system / Invite-only. Public signup must be disabled in the Supabase Dashboard (`Authentication -> Providers -> Email -> Enable Signups: OFF`). Only administrators (pastor and moderators) have accounts created either through the Supabase Dashboard or Supabase Admin API.
- **Verification Rule:** Always call `supabase.auth.getUser()` in server components and middleware. `supabase.auth.getSession()` only reads local cookies without cryptographic server validation and can be spoofed.
- **Route Guard:** `/admin/oracao` redirects to `/login` if `!user`.

---

### 5. Environment Variables Specification

The stack requires the following environment variables configured in `.env.local` (local) and Vercel Project Settings (production):

```bash
# Public Supabase API credentials
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Secret Service Role Key (NEVER expose to browser / client bundles)
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Machine-to-Machine Projection API Secret
TELAO_API_TOKEN="custom-generated-high-entropy-secret-token"
```

---

## Alternatives Considered

| Category | Decision | Rejected Alternative | Rationale for Decision |
| :--- | :--- | :--- | :--- |
| **Database Access Layer** | Supabase JS Client (`@supabase/supabase-js` + `@supabase/ssr`) | Prisma / Drizzle ORM | Prisma and Drizzle introduce schema duplication, require local CLI migrations, and add cold-start overhead to Vercel Serverless Functions. Supabase JS integrates natively with Postgres RLS, automatic JWT passing, and cookie syncing via `@supabase/ssr`. |
| **Authentication System** | Supabase Auth (Native Email/Password) | NextAuth.js / Auth.js | Supabase Auth directly sets Postgres JWT claims (`auth.uid()`, `role = 'authenticated'`), allowing Row Level Security to work out of the box without maintaining a separate database adapter or sync logic. |
| **SSR Cookie Handling** | `@supabase/ssr` with `getAll()` & `setAll()` | Deprecated `@supabase/auth-helpers-nextjs` or legacy `get`/`set`/`remove` methods | `@supabase/auth-helpers-nextjs` is deprecated by Supabase. In modern `@supabase/ssr`, `get`/`set`/`remove` fail to handle cookie chunking and trigger runtime warnings. `getAll`/`setAll` provides reliable cookie synchronization in Next.js 15. |
| **Projection API Security** | `createAdminClient` (`SUPABASE_SERVICE_ROLE_KEY`) with Bearer token | Public Anon Client in Route Handlers | The `anon` role is blocked by RLS from `SELECT` and `UPDATE` on `prayer_requests`. Attempting to read or update from `/api/prayer-requests/display` using the `anon` client results in silent failures (`[]`) or 403 errors. The service-role client safely bypasses RLS after validating the `TELAO_API_TOKEN`. |
| **TypeScript Type Generation** | Generated Supabase Types (`types/database.types.ts`) | Manual TypeScript interfaces | Generating types from the live Postgres schema via Supabase CLI prevents type drift between database columns, enums, and frontend form schemas. |

---

## Installation

The project already has the runtime packages installed in `package.json`:
- `@supabase/supabase-js: ^2.117.2`
- `@supabase/ssr: ^0.12.7`
- `zod: ^4.6.5`

### 1. Dev Dependencies (Supabase CLI)
To manage migrations and generate TypeScript types locally without global CLI dependencies:

```bash
npm install -D supabase@latest
```

### 2. Type Generation Script
Add a convenience script to `package.json`:

```json
"scripts": {
  "types:supabase": "supabase gen types typescript --project-id <project-ref> > types/database.types.ts"
}
```

### 3. File Additions Required

To complete the stack configuration, the following new or updated files must be present:

1. **`utils/supabase/admin.ts`**: Helper to instantiate the Supabase admin client using `SUPABASE_SERVICE_ROLE_KEY` for server-to-server API endpoints.
2. **`utils/supabase/client.ts`**: Helper to instantiate `createBrowserClient` for client components.
3. **`utils/supabase/server.ts`**: Refactored to use the modern `getAll()` / `setAll()` cookie methods.
4. **`middleware.ts`**: Root Next.js middleware file exporting the matcher and executing `updateSession(request)`.
5. **`app/login/page.tsx`**: Login page interface for moderators to authenticate via Supabase Auth.
6. **`types/database.types.ts`**: TypeScript definitions for tables, enums, and views.

---

## Sources

- [Supabase SSR Documentation for Next.js App Router](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabase JavaScript Client Reference (v2)](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Row Level Security Guide](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Next.js 15 Server Actions & Cookie Mutation Best Practices](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [IBBE Project Blueprint (`.planning/PROJECT.md`)](file:///home/felipe/Projetos%20IA/Site_IBBE/.planning/PROJECT.md)
- [IBBE Prayer Requests Schema (`supabase/migrations/00_prayer_requests.sql`)](file:///home/felipe/Projetos%20IA/Site_IBBE/supabase/migrations/00_prayer_requests.sql)
