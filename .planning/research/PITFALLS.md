# Domain Pitfalls

**Domain:** Supabase + Next.js App Router  
**Researched:** 2026-10-01  
**Milestone:** v1.1 — Configuração do Supabase e Pedidos de Oração  

---

## Critical Pitfalls

### 1. Leaking the Service Role Key (`SUPABASE_SERVICE_ROLE_KEY`)
- **What goes wrong:** Developers frequently prefix `SUPABASE_SERVICE_ROLE_KEY` with `NEXT_PUBLIC_`, import it into client components, or use it indiscriminately across Server Components.
- **Why it happens:** Attempting to solve Row Level Security (RLS) permission errors quickly during development leads developers to bypass RLS everywhere using the service role key.
- **Consequences:** The `service_role` key grants administrative superuser access to the database, completely bypassing RLS. Exposing this key in client-side bundles allows anyone inspecting browser network requests or JavaScript bundles to drop tables, extract sensitive member information, or read all private/anonymous prayer requests.
- **How to avoid:**
  - Never add `NEXT_PUBLIC_` to the service role key. Keep it strictly as `SUPABASE_SERVICE_ROLE_KEY`.
  - Add `import 'server-only'` to any utility file that instantiates the admin client (e.g., `utils/supabase/admin.ts`).
  - Restrict the use of `createAdminClient()` exclusively to machine-to-machine route handlers protected by their own authentication headers (e.g., `app/api/prayer-requests/display/route.ts` protected by `TELAO_API_TOKEN`). All user-facing components, Server Actions, and Route Handlers must use `createServerClient` with the public anonymous key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) and rely on RLS.

---

### 2. Flawed RLS Policy Allowing Privilege Escalation on INSERT
- **What goes wrong:** The RLS insert policy allows clients to set arbitrary column values:
  ```sql
  -- VULNERABLE:
  create policy "Anon can insert prayer requests" on public.prayer_requests
      for insert
      to anon
      with check (true);
  ```
- **Why it happens:** Developers assume that because their Next.js Server Action (`submitPrayerRequest`) sets `status: 'pending'` and `displayed: false`, the database is safe. However, Supabase exposes a public REST API (`POST /rest/v1/prayer_requests`) authenticated with the anonymous key.
- **Consequences:** Anyone with the public anon key can bypass the Next.js form and send direct HTTP requests to Supabase containing `{ "request": "spam/offensive text", "status": "approved", "displayed": false }`. The unmoderated request is immediately queried by the church projection system (telão) during live worship.
- **How to avoid:**
  - Enforce database-level `WITH CHECK` constraints in the RLS policy:
    ```sql
    create policy "Anon can insert prayer requests" on public.prayer_requests
        for insert
        to anon
        with check (
            status = 'pending' 
            and displayed = false 
            and (is_anonymous is false or name is null)
        );
    ```
  - Alternatively, revoke column-level insert permissions from the `anon` role on columns `status` and `displayed`:
    ```sql
    revoke update on public.prayer_requests from anon;
    ```

---

### 3. Exposing Anonymous Prayers & Personal Identifiers (LGPD Breach)
- **What goes wrong:** The application either saves the person's name when they checked `is_anonymous: true`, or leaks the name through projection API endpoints or administrative payloads.
- **Why it happens:** The frontend form toggles the UI input, but the database schema allows `is_anonymous = true` while retaining a non-null `name` column, or the API route `GET /api/prayer-requests/display` queries `.select("id, name, request, is_anonymous")` without redacting `name` when `is_anonymous` is true.
- **Consequences:** Congregants submit deeply personal, confidential requests (health diagnoses, family struggles, financial crises) trusting the church's anonymous pledge. If the projection system inadvertently renders the name or network inspectors intercept the raw JSON containing the real name, it causes severe embarrassment and violates Brazilian Data Protection Law (LGPD - Art. 7 & Art. 11 for sensitive data).
- **How to avoid:**
  - Enforce schema constraints in SQL:
    ```sql
    alter table public.prayer_requests
      add constraint check_anonymous_name
      check (is_anonymous is false or name is null);
    ```
  - Force `name = null` in the Server Action whenever `is_anonymous` is true:
    ```typescript
    name: validated.data.is_anonymous ? null : validated.data.name
    ```
  - In the projection endpoint (`/api/prayer-requests/display`), guarantee redaction:
    ```typescript
    const sanitizedRequests = data.map(req => ({
      ...req,
      name: req.is_anonymous ? null : req.name,
    }));
    ```

---

### 4. Next.js 15 Cookie Handling & Session Desynchronization
- **What goes wrong:** 
  1. Next.js 15 made `cookies()` an asynchronous function (`await cookies()`), while older `@supabase/ssr` guides use synchronous helpers.
  2. Deprecated `cookies: { get, set, remove }` handlers are used instead of `cookies: { getAll, setAll }`.
  3. No root `middleware.ts` is configured to run `updateSession(request)`.
- **Why it happens:** Upgrades from Next.js 14 to 15, or copying older code snippets from outdated tutorials. `@supabase/ssr` chunks large authentication JWT cookies into `sb-<project-ref>-auth-token.0`, `sb-<project-ref>-auth-token.1`. The old `get/set/remove` handlers do not handle cookie chunking correctly.
- **Consequences:** 
  - Sessions silently desynchronize.
  - When the 1-hour access token expires, the background token refresh never occurs because middleware was omitted.
  - Pastors moderating prayers are abruptly logged out or encounter random 401 errors when submitting approvals via Server Actions.
  - Calling `cookies().set()` inside a Server Component throws runtime errors in Next.js.
- **How to avoid:**
  - Always implement `getAll()` and `setAll()` in `utils/supabase/server.ts` wrapped with a try/catch:
    ```typescript
    export async function createClient() {
      const cookieStore = await cookies();
      return createServerClient(supabaseUrl, supabaseAnonKey, {
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
              // Ignored when invoked from Server Component (RSC)
            }
          },
        },
      });
    }
    ```
  - Ensure a root `middleware.ts` exists in the repository root and intercepts `/admin/:path*` to refresh user tokens via `supabase.auth.getUser()`.

---

### 5. Using `supabase.auth.getSession()` on the Server Instead of `getUser()`
- **What goes wrong:** Using `supabase.auth.getSession()` inside Server Components, Route Handlers, or Middleware to authenticate requests.
- **Why it happens:** `getSession()` is shorter and appears to return session data faster because it reads directly from the cookie without an outbound network trip.
- **Consequences:** `getSession()` **does not validate the authenticity or revocation status of the JWT** with the Supabase Auth server. A modified, spoofed, or revoked token stored in the cookie will be accepted as valid by `getSession()`, allowing unauthorized users into `/admin/oracao`.
- **How to avoid:**
  - Always use `await supabase.auth.getUser()` in server-side contexts. This actively re-authenticates the token with Supabase Auth.

---

### 6. Telão API RLS Blindspot (Silent Empty Data Returns)
- **What goes wrong:** The Route Handler `app/api/prayer-requests/display/route.ts` uses `createClient()` (the default server client configured with `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- **Why it happens:** The developer tests the endpoint in a browser where they are already logged in to `/admin/oracao`. The browser sends their admin session cookie, so RLS allows reading rows. But when the projection telão (an automated Raspberry Pi, browser window, or separate machine) queries the endpoint with `Authorization: Bearer <TELAO_API_TOKEN>`, it has no Supabase session cookie!
- **Consequences:** Supabase evaluates the request under the `anon` role. Since the RLS policy only allows `anon` to `INSERT`, the `SELECT` query returns `data: []` (empty array) without throwing a fatal server error. The church projection screen remains completely blank during service.
- **How to avoid:**
  - Route Handlers protected by custom API tokens (`TELAO_API_TOKEN`) must use `createAdminClient()` from `utils/supabase/admin.ts` which uses `SUPABASE_SERVICE_ROLE_KEY` and bypasses RLS safely after validating the bearer token:
    ```typescript
    if (authHeader !== `Bearer ${process.env.TELAO_API_TOKEN}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const supabase = createAdminClient();
    const { data } = await supabase.from("prayer_requests").select(...);
    ```

---

## Moderate Pitfalls

### 1. In-Memory Rate Limiting Failure on Serverless / Vercel
- **What goes wrong:** Using `const rateLimit = new Map<string, { count: number; lastReset: number }>()` inside `app/actions/prayer.ts` to prevent spam.
- **Why it happens:** In local development (`next dev`), Node.js runs as a single persistent process, so the `Map` successfully retains rate limit counts.
- **Consequences:** In production on Vercel, Server Actions run in ephemeral, isolated serverless functions. Each concurrent request or cold start gets a fresh memory instance. An automated bot can blast hundreds of submissions across concurrent serverless instances without triggering the in-memory rate limit.
- **How to avoid:**
  - For simple MVP deployments, combine:
    1. Invisible honeypot field (`honeypot` text input hidden from human users).
    2. Minimum submission duration check (reject submissions sent within 2 seconds of page load).
    3. Hashed IP tracking stored in a lightweight Supabase table with automatic cleanup, or an external key-value store (e.g. Upstash Redis / Vercel KV).

---

### 2. LGPD Non-Compliance: Storing Raw IP Addresses
- **What goes wrong:** Storing `x-forwarded-for` raw IPv4/IPv6 addresses directly in rate limit tables or logs alongside prayer requests.
- **Why it happens:** Standard boilerplate code logs `const ip = req.headers.get('x-forwarded-for')`.
- **Consequences:** Under Brazilian LGPD (Lei Geral de Proteção de Dados), IP addresses are considered personal identifying data. Storing raw IPs linked to personal prayer requests constitutes handling sensitive data without documented legal basis or consent.
- **How to avoid:**
  - Never store raw IP addresses. Hash the IP with a secret salt:
    ```typescript
    import crypto from "crypto";
    const ipHash = crypto
      .createHash("sha256")
      .update(rawIp + (process.env.IP_SALT || "ibbe-salt"))
      .digest("hex");
    ```

---

### 3. Open Supabase Auth Registration
- **What goes wrong:** Supabase projects by default allow public email/password registration (`signUp`).
- **Why it happens:** Developers create the login page and test with `supabase.auth.signUp()`.
- **Consequences:** Any malicious actor can call `supabase.auth.signUp()` with their personal email, receive a valid authenticated user JWT, navigate to `/admin/oracao`, and gain full read/update access to private congregational prayer requests because the RLS policy checks `to authenticated using (true)`.
- **How to avoid:**
  - In the Supabase Dashboard: Go to **Authentication -> Providers -> Email** and **uncheck "Enable Sign Up"** (disables open registration).
  - Admin accounts must be created manually via the Supabase Dashboard or via a seed script using the Supabase Service Role API.
  - Or add an admin check in RLS policies verifying that the user ID exists in an `admin_users` table or possesses an admin role claim.

---

### 4. Missing Database Indexes on Filter Columns
- **What goes wrong:** Creating `prayer_requests` without secondary indexes on `status`, `displayed`, and `created_at`.
- **Why it happens:** Small development databases with 10 rows perform table scans in < 1ms, masking the absence of indexes.
- **Consequences:** As prayer requests accumulate over months and years, queries such as `WHERE status = 'approved' AND displayed = false ORDER BY created_at ASC` cause full table sequential scans, adding latency to the projection screen and exhausting free-tier database resources.
- **How to avoid:**
  - Add explicit composite indexes in the initial migration:
    ```sql
    create index idx_prayer_requests_display 
        on public.prayer_requests (status, displayed, created_at asc);
    create index idx_prayer_requests_admin_list 
        on public.prayer_requests (created_at desc);
    ```

---

### 5. Double-Escaping HTML Entities in React
- **What goes wrong:** In `app/actions/prayer.ts`, manual sanitization converts characters:
  ```typescript
  // PROBLEMATIC:
  replace(/[<>'"&]/g, (char) => {
    switch (char) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "'": return "&#39;";
      case '"': return "&quot;";
      case "&": return "&amp;";
    }
  })
  ```
- **Why it happens:** Developers fear XSS attacks and manually encode HTML entities before saving to the database.
- **Consequences:** React already escapes all strings rendered inside JSX expressions (`{req.request}`). Pre-encoding entities causes ugly double-escaped strings to display to moderators and on the telão (e.g., `Oração pela família d&#39;água &amp; saúde`).
- **How to avoid:**
  - Do not escape HTML entities before database storage.
  - Strip dangerous HTML tags using a regex or parser (e.g., `.replace(/<[^>]*>/g, "")`) and trim whitespace. React's default JSX rendering handles entity escaping safely.

---

## Minor Pitfalls

### 1. Hydration Mismatches from Timezone Drift
- **What goes wrong:** Rendering timestamps with `new Date(req.created_at).toLocaleDateString('pt-BR')` without specifying the timezone.
- **Why it happens:** The Next.js server runs in UTC (default in Docker/Vercel), while the browser client runs in `America/Sao_Paulo` (GMT-3).
- **Consequences:** A prayer submitted at 22:30 on October 1st renders as "02/10/2026" on the server and "01/10/2026" on the client, triggering a Next.js hydration mismatch warning in the browser console.
- **How to avoid:**
  - Specify `timeZone: 'America/Sao_Paulo'` in date formatting calls:
    ```typescript
    new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(req.created_at))
    ```

---

### 2. Honeypot Inaccessibility for Screen Readers
- **What goes wrong:** Inserting a honeypot field `<input name="honeypot" className="hidden" />` or `style={{ display: 'none' }}` without proper accessibility attributes.
- **Why it happens:** Quick styling without considering screen reader semantics.
- **Consequences:** Visually impaired congregants using screen readers may have the honeypot field announced to them. When they fill in the field, their genuine prayer request is silently rejected as spam.
- **How to avoid:**
  - Style the honeypot container with absolute positioning off-screen, add `aria-hidden="true"`, `tabIndex={-1}`, and autocomplete off:
    ```tsx
    <div className="absolute -left-[9999px]" aria-hidden="true">
      <label htmlFor="website_hp">Não preencha este campo</label>
      <input
        id="website_hp"
        type="text"
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
    ```

---

### 3. Missing `/login` Route Page
- **What goes wrong:** `AdminOracaoPage` redirects unauthenticated visitors to `/login`, and `utils/supabase/middleware.ts` redirects `/admin` to `/login`, but the folder `app/login/` contains no `page.tsx`.
- **Why it happens:** The admin dashboard was created before the login UI was finalized.
- **Consequences:** Accessing `/admin/oracao` redirects to `/login`, which returns a Next.js 404 page, preventing the pastor from logging in.
- **How to avoid:**
  - Implement `app/login/page.tsx` with a clean email/password form invoking a Supabase `signInWithPassword` Server Action.

---

### 4. Revalidation Lag in Admin Moderation
- **What goes wrong:** The pastor clicks "Aprovar" or "Rejeitar", but the table row does not immediately reflect the new status or requires a manual browser refresh.
- **Why it happens:** Server Actions mutate the database without notifying the Next.js router cache.
- **Consequences:** The pastor clicks "Aprovar" multiple times assuming the action failed.
- **How to avoid:**
  - Call `revalidatePath('/admin/oracao')` at the end of every update Server Action.

---

## Phase-Specific Warnings (Milestone v1.1)

| Area | Current State in Repo | Required Action for v1.1 |
| :--- | :--- | :--- |
| **Root Middleware** | Missing. `utils/supabase/middleware.ts` exists, but there is no `middleware.ts` at the root of the project. | Create root `middleware.ts` exporting an invocation of `updateSession(request)` to refresh tokens on `/admin/*`. |
| **Server Client Cookie API** | `utils/supabase/server.ts` uses deprecated `get/set/remove`. | Upgrade to `getAll()` and `setAll()` to prevent chunked cookie session drops in Next.js 15. |
| **Telão API Authentication** | `app/api/prayer-requests/display/route.ts` and `[id]/displayed/route.ts` use `createClient()` with anon key. | Create `utils/supabase/admin.ts` with `SUPABASE_SERVICE_ROLE_KEY` and use it exclusively in these two token-protected endpoints. |
| **RLS Insert Policy** | `00_prayer_requests.sql` has `with check (true)` for anon inserts. | Update SQL migration to `with check (status = 'pending' and displayed = false and (is_anonymous is false or name is null))`. |
| **Admin Route Protection** | `app/login/page.tsx` is completely missing (`app/login` folder is empty). | Create `app/login/page.tsx` with form action handling authentication. |
| **Rate Limiter LGPD** | `app/actions/prayer.ts` uses raw IP in in-memory map. | Hash IP with SHA-256 before tracking; document rate limiting approach. |

---

## Sources

- Supabase Official Documentation — *Server-Side Auth in Next.js App Router (`@supabase/ssr`)*
- Supabase Security Guidelines — *Row Level Security (RLS) Best Practices & Service Role Key Safety*
- Next.js 15 Documentation — *Async Request APIs (`cookies()`, `headers()`) & Server Actions Security*
- Brazilian General Data Protection Law (LGPD — Lei nº 13.709/2018) — *Personal Data & Sensitive Data Requirements*
- Site IBBE Architecture & Stack Specifications (`.planning/research/ARCHITECTURE.md`, `.planning/research/STACK.md`)
