# Project Research Summary

**Project:** Site Oficial — Igreja Batista Bethel em Resende (IBBE)  
**Domain:** Church Web Portal & Prayer Request Ingestion System (Next.js 15 App Router / Supabase Postgres / Auth / RLS)  
**Researched:** 2026-10-01  
**Confidence:** HIGH  

## Executive Summary

The Site Oficial IBBE requires a robust, secure, and privacy-conscious backend integration for Milestone v1.1 ("Configuração do Supabase e Pedidos de Oração"). The platform serves a neighborhood church community in Resende/RJ, providing a public portal where visitors and congregants submit confidential or anonymous prayer requests, an administrative dashboard where pastoral leadership moderates petitions, and machine-to-machine API endpoints that feed church projection screens (*telão*) during Sunday worship services.

Modern best practices for Next.js 15 (App Router, React 19) and Supabase dictate a clear runtime and authorization boundary. Public submissions must enter via Server Actions utilizing the anonymous Supabase client (`@supabase/ssr`) bounded by strict Row Level Security (RLS) policies in PostgreSQL. Admin operations require authenticated sessions managed through Next.js 15 async cookies with root middleware session refreshment. Projection endpoints operate machine-to-machine via static Bearer token authentication (`TELAO_API_TOKEN`) and must leverage a dedicated, server-isolated administrative client (`SUPABASE_SERVICE_ROLE_KEY`) to safely bypass RLS without compromising public tables.

The research identified several critical technical pitfalls that must be actively mitigated: improper RLS insertion checks that allow unmoderated text injection, session drops and hydration errors caused by outdated cookie APIs or missing root middleware in Next.js 15, silent empty-data projection failures caused by querying via the unauthenticated `anon` role, and Brazilian LGPD compliance issues regarding sensitive personal/spiritual data and anonymous identity leakage.

---

## Key Findings

### Recommended Stack

The application's runtime already includes core dependencies (`@supabase/supabase-js` v2.117.2, `@supabase/ssr` v0.12.7, and `zod` v4.6.5). No extra runtime packages are required. The stack focuses on standardizing client utilities according to Next.js 15 App Router contracts and Supabase SSR patterns.

**Core technologies:**
- **`@supabase/supabase-js` (v2.117.2):** Isomorphic Supabase client. Used directly for administrative queries (`createAdminClient`) in server-only route handlers that bypass RLS upon verifying machine API keys.
- **`@supabase/ssr` (v0.12.7):** App Router cookie adapter. Manages RFC-compliant cookie chunking and session token synchronization across Server Components, Server Actions, and Middleware using modern `getAll()` and `setAll()` methods.
- **`zod` (v4.6.5):** Runtime schema validation. Validates prayer submission inputs, enforces length bounds, and checks data types before payloads touch PostgreSQL.
- **PostgreSQL + Row Level Security (Supabase Managed):** Database storage engine. Enforces data integrity, state transitions (`pending`, `approved`, `rejected`), and authorization rules directly at the database engine level.

---

### Expected Features

Church prayer systems demand extreme sensitivity to human vulnerability, privacy, and liturgical workflow timing.

**Must have (table stakes):**
- **Frictionless Anonymous Submission:** Public form without mandatory account creation; toggle for anonymous requests that redacts names from public view.
- **Strict Moderation Gatekeeping:** All submissions default to `status = 'pending'`. Only authenticated pastoral leaders can view or transition items to `approved` or `rejected`.
- **Spam & Abuse Defense:** Multi-layered defense including off-screen accessible honeypot fields, rate limiting, and HTML tag stripping.
- **Admin Moderation Panel (`/admin/oracao`):** Clean, mobile-friendly interface for pastors to triage requests with one-click actions ("Aprovar", "Rejeitar", "Desfazer").
- **Admin Authentication Flow (`/login`):** Dedicated login interface powered by Supabase Auth with closed/invite-only account registration.
- **Secure Projection Integration (`GET /api/prayer-requests/display`):** Machine-to-machine endpoint authenticated via `TELAO_API_TOKEN` returning approved, un-displayed requests.
- **Display Playback Tracking (`POST /api/prayer-requests/[id]/displayed`):** Flags projected records (`displayed = true`) to prevent repetitive slides during services.

**Should have (competitive differentiators):**
- **"Desfazer" Action:** Ability to revert an approved or rejected request back to `pending` in case of accidental clicks during rushed pre-service preparation.
- **Dual-Identity Privacy Shield:** Explicit redaction of names (`name: null`) in public/projection APIs whenever `is_anonymous` is true, protecting congregants under LGPD.
- **Acolhedor Toast Feedback:** Reassuring, warm Portuguese feedback confirming receipt without religious jargon.
- **Mock/Offline Resilience:** Graceful fallbacks for local development when Supabase credentials are not populated.

**Defer (v2+):**
- **Supabase Realtime WebSockets:** Live streaming updates to the admin dashboard during active service.
- **Push / WhatsApp Notifications:** Instant alerts to intercessors upon submission.
- **Standalone Telão Web Carousel:** Dedicated full-screen slide projector webapp.
- **Prayer Categories & Tags:** Classifying requests by topic (Saúde, Família, Gratidão).

---

### Architecture Approach

The architecture enforces a strict separation of concerns across four layers:
1. **Public Ingestion Layer:** `PrayerSection.tsx` submits via `submitPrayerRequest` (Server Action) using `createServerClient` (`NEXT_PUBLIC_SUPABASE_ANON_KEY`). Protected by RLS check constraints and LGPD-safe rate limiting.
2. **Session & Routing Layer:** Root `middleware.ts` runs `updateSession` on every non-static request, refreshing Supabase JWTs and redirecting unauthenticated traffic from `/admin/*` to `/login`.
3. **Pastoral Moderation Layer:** Server Component at `app/admin/oracao/page.tsx` renders server-side under authenticated user context (`supabase.auth.getUser()`). Mutations revalidate paths via `revalidatePath('/admin/oracao')`.
4. **Machine-to-Machine Projection Layer:** Route Handlers at `/api/prayer-requests/*` validate `Authorization: Bearer <TELAO_API_TOKEN>`, then utilize `createAdminClient` (`SUPABASE_SERVICE_ROLE_KEY`) to safely query and mark items as displayed.

```
[Public Visitor]                [Pastor / Admin]           [Projection Machine]
       │                               │                          │
       ▼                               ▼                          ▼
 Landing Form                   /admin/oracao             GET /api/prayer-requests/display
       │                        (Server Component)        (Bearer TELAO_API_TOKEN)
       ▼                               │                          │
Server Action: submit()                │                          ▼
(Anon Client + RLS)             (Auth JWT Client)         createAdminClient() (Service Role)
       │                               │                          │
       ▼                               ▼                          ▼
  RLS: INSERT                     RLS: SELECT/UPDATE             RLS: BYPASS
 (status='pending')             (auth.uid() is valid)         (Machine Token Verified)
       └───────────────────────────────┼──────────────────────────┘
                                       ▼
                       Supabase PostgreSQL (prayer_requests)
```

---

### Critical Pitfalls

1. **Service Role Key Leakage in Client Bundles:** `SUPABASE_SERVICE_ROLE_KEY` grants full administrative superuser database privileges. It must never use the `NEXT_PUBLIC_` prefix and must be guarded with `import 'server-only'` in `utils/supabase/admin.ts`.
2. **Flawed RLS Allowing Privilege Escalation on INSERT:** Using `with check (true)` on anon inserts allows bad actors to post pre-approved requests directly via Supabase's public REST endpoint. The RLS check must strictly enforce `status = 'pending' and displayed = false`.
3. **LGPD Breach via Anonymous Prayer Exposure:** Saving real names when `is_anonymous: true` or transmitting names in the display API violates LGPD sensitive data rules (Lei 13.709/2018). Names must be set to `null` on anonymous submissions and explicitly sanitized in API responses.
4. **Next.js 15 Session Drops & Missing Root Middleware:** Omitting a root `middleware.ts` prevents token refreshes, causing admin users to be logged out randomly after 1 hour. Using deprecated synchronous `cookies()` or `get/set/remove` breaks chunked cookies in Next.js 15.
5. **Telão API Silent Empty Returns:** Calling `createClient()` (anon key) in `/api/prayer-requests/display` fails because the projection machine lacks a Supabase user session cookie, resulting in RLS returning an empty array (`[]`) and a blank projection screen. Route Handlers must use `createAdminClient()` after validating `TELAO_API_TOKEN`.

---

## Implications for Roadmap

Based on the dependency tree and security boundaries, the implementation of Milestone v1.1 should be structured into four sequential phases:

### Phase 1: Database Schema & RLS Hardening (Supabase Setup)
- **Rationale:** The database is the foundation of the entire data pipeline. RLS policies and constraints must be active before client connections are wired.
- **Delivers:** Applied migration on Supabase with `prayer_requests` table, performance composite indexes (`status`, `displayed`, `created_at`), hardened `anon` insert check policy, authenticated select/update policies, and generated TypeScript types (`types/database.types.ts`).
- **Addresses:** Frictionless Anonymous Submission, Strict Gatekeeping, Privacy & LGPD Compliance.
- **Avoids:** Flawed RLS policy escalation; table scan query slowdowns.

### Phase 2: Client Utilities & Auth Session Infrastructure
- **Rationale:** Next.js 15 requires unified cookie adapters and session refresh middleware before admin authentication or server actions can operate reliably.
- **Delivers:** Modernized `utils/supabase/server.ts` with `getAll()`/`setAll()`, server-only `utils/supabase/admin.ts`, root `middleware.ts` for route protection and cookie refresh, and complete `app/login/page.tsx` with email/password authentication.
- **Uses:** `@supabase/ssr`, Next.js 15 async cookies, Supabase Auth.
- **Implements:** Session management, Edge token refresh, `/admin` route guard.
- **Avoids:** Cookie desynchronization, 1-hour session timeout, missing `/login` 404 error.

### Phase 3: Public Prayer Submission & Ingestion Pipeline
- **Rationale:** With database RLS and server client helpers ready, the public-facing submission flow can be activated, hardened, and verified end-to-end.
- **Delivers:** Integration of `app/actions/prayer.ts` with `createServerClient()`, screen-reader accessible honeypot field, LGPD-compliant IP hashing (`SHA-256 + salt`), clean string sanitization (without double-escaping HTML entities), and warm Portuguese feedback toasts.
- **Addresses:** Frictionless submission, spam/abuse protection, acolhedor feedback toast, offline mock fallback.
- **Avoids:** Raw IP logging (LGPD infraction), double HTML entity escaping in React, screen-reader blocking by poorly styled honeypot.

### Phase 4: Admin Moderation Dashboard & Telão Projection Integration
- **Rationale:** Depends on both the authenticated session infrastructure (Phase 2) and live incoming data (Phase 3) to test triage and projection workflows.
- **Delivers:** Live moderation dashboard in `app/admin/oracao/page.tsx` using `supabase.auth.getUser()`, status update actions ("Aprovar", "Rejeitar", "Desfazer") with `revalidatePath`, and projection endpoints (`/api/prayer-requests/display` and `[id]/displayed`) powered by `createAdminClient()` and guarded by `TELAO_API_TOKEN`.
- **Addresses:** Admin moderation panel, "Desfazer" action, projection API integration, display state tracking (`displayed = true`), dual-identity privacy redaction.
- **Avoids:** Insecure `getSession()` vulnerability, Telão API silent empty returns, projection state desynchronization.

---

### Phase Ordering Rationale

- **Database First:** Without the database table and hardened RLS policies in place, server actions and route handlers cannot be tested against real security barriers.
- **Session Layer Before Protected Views:** Attempting to build the admin dashboard before fixing Next.js 15 middleware and `/login` leads to broken redirection loops and unauthenticated testing.
- **Public Ingestion Before Moderation Testing:** Testing the moderation dashboard and projection screen requires realistic prayer data in the `pending` state, which the public submission pipeline produces.
- **Projection Last:** The machine-to-machine API is the final consumer in the lifecycle, consuming only requests that have traversed ingestion and human pastoral approval.

---

### Research Flags

- **Phases needing focused attention during planning:**
  - **Phase 2 (Auth & Middleware):** Must ensure Next.js 15 async `cookies()` patterns and `@supabase/ssr` `getAll`/`setAll` implementations strictly adhere to RFC cookie chunking specifications.
  - **Phase 4 (Telão Projection API):** Verify that `TELAO_API_TOKEN` validation handles bearer prefix stripping cleanly and that `createAdminClient` strictly bypasses RLS without leaking into client components.
- **Phases with standard patterns (fast execution):**
  - **Phase 1 (Database Migration):** Standard PostgreSQL DDL and RLS statements using the Supabase SQL editor or CLI.
  - **Phase 3 (Public Form & Server Action):** Standard Zod schema parsing and form status hooks in React 19.

---

## Confidence Assessment

| Area | Confidence | Notes |
| :--- | :---: | :--- |
| **Stack** | HIGH | Verified with installed `package.json` dependencies and official Supabase SSR Next.js 15 guides. |
| **Features** | HIGH | Clear scope bounded by church pastoral workflow and existing project specification (`PROJECT.md`). |
| **Architecture** | HIGH | Established Next.js 15 App Router patterns with clear separation between Anon Client, Auth Client, and Admin Service Role. |
| **Pitfalls** | HIGH | Common Next.js 15 / Supabase security, cookie, and RLS failure modes documented with concrete mitigation strategies. |

**Overall confidence:** HIGH

---

### Gaps to Address

- **Admin User Provisioning:** In production, open user registration must be disabled in the Supabase Dashboard (`Authentication -> Providers -> Email -> Enable Signups: OFF`). The initial pastoral account must be created directly via the dashboard or Supabase CLI.
- **Environment Variables Sync:** Local development `.env.local` and production Vercel project environment variables must both be populated with matching keys (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `TELAO_API_TOKEN`, and `IP_SALT`).

---

## Sources

### Primary (HIGH confidence)
- [Supabase SSR Documentation for Next.js App Router](https://supabase.com/docs/guides/auth/server-side/nextjs) — Cookie synchronization, client factory patterns, middleware session refresh.
- [Supabase Row Level Security (RLS) Guide](https://supabase.com/docs/guides/database/postgres/row-level-security) — Policy creation, role checks (`anon`, `authenticated`), and `with check` constraints.
- [Next.js 15 App Router & Server Actions Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) — Async cookies, route handlers, revalidation.

### Secondary (MEDIUM confidence)
- [Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) — Art. 5º and 11º on sensitive personal data handling and anonymization requirements.
- [Supabase Service Role Key Architecture](https://supabase.com/docs/guides/api/api-keys) — Machine-to-machine integration and server isolation practices.

### Tertiary (LOW / Project Specific)
- Site IBBE Project Specification (`.planning/PROJECT.md`)
- Existing migration files (`supabase/migrations/00_prayer_requests.sql`)
- Projection API reference (`docs/telao-api.md`)

---
*Research completed: 2026-10-01*  
*Ready for roadmap: yes*
