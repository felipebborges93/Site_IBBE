---
status: all_fixed
findings_in_scope: 4
fixed: 4
skipped: 0
iteration: 1
---

## Fix Report

- **[Fixed] Authentication Bypass:** Removed fallback `"live"` token from `app/telao/page.tsx`, `app/telao/[token]/page.tsx`, and the API routes `display/route.ts` and `displayed/route.ts`.
- **[Fixed] Missing Database Column:** Added `allow_public_display` to the `prayer_requests` schema.
- **[Fixed] Constraint Logic:** Updated `check_anonymous_name` to ensure `name is not null and char_length(trim(name)) > 0` when `is_anonymous` is false.
- **[Fixed] Length Limits Mismatch:** Updated `check_request_length` database constraint to enforce max 140 characters, aligning with the Zod schema.
