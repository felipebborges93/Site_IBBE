-- supabase/migrations/00_prayer_requests.sql

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

-- Policy: Anon can insert (insert only)
create policy "Anon can insert prayer requests" on public.prayer_requests
    for insert
    to anon
    with check (true);

-- Policy: Authenticated users can read/update all
create policy "Authenticated can select prayer requests" on public.prayer_requests
    for select
    to authenticated
    using (true);

create policy "Authenticated can update prayer requests" on public.prayer_requests
    for update
    to authenticated
    using (true);

-- Grant privileges
grant insert on public.prayer_requests to anon;
grant select, insert, update on public.prayer_requests to authenticated;
grant usage on schema public to anon, authenticated;
