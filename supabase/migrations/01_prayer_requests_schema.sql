-- supabase/migrations/01_prayer_requests_schema.sql
-- Phase 8: Infraestrutura Supabase e Banco de Dados (SUPA-01, SUPA-02, SUPA-03)

-- 1. Criação/Garantia da Tabela prayer_requests com Constraints
create table if not exists public.prayer_requests (
    id uuid default gen_random_uuid() primary key,
    name text,
    request text not null,
    is_anonymous boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    status text default 'pending' not null check (status in ('pending', 'approved', 'rejected')),
    displayed boolean default false not null
);

-- 2. Constraints de Validação e LGPD
-- Garante conformidade com a LGPD: se for anônimo, name DEVE ser null. Se não for anônimo, name pode ser fornecido.
alter table public.prayer_requests drop constraint if exists check_anonymous_name;
alter table public.prayer_requests add constraint check_anonymous_name 
    check ((is_anonymous = true and name is null) or is_anonymous = false);

-- Limite de caracteres do pedido e nome (defesa em profundidade no banco de dados)
alter table public.prayer_requests drop constraint if exists check_request_length;
alter table public.prayer_requests add constraint check_request_length 
    check (char_length(request) >= 5 and char_length(request) <= 1000);

alter table public.prayer_requests drop constraint if exists check_name_length;
alter table public.prayer_requests add constraint check_name_length 
    check (name is null or char_length(name) <= 100);

-- 3. Índices Otimizados
-- Índice composto focado em otimizar consultas da moderação e do telão
create index if not exists idx_prayer_requests_status_displayed_created 
    on public.prayer_requests (status, displayed, created_at desc);

-- 4. Habilitar Row Level Security (RLS)
alter table public.prayer_requests enable row level security;

-- 5. Revogação de Políticas Antigas
drop policy if exists "Anon can insert prayer requests" on public.prayer_requests;
drop policy if exists "Authenticated can select prayer requests" on public.prayer_requests;
drop policy if exists "Authenticated can update prayer requests" on public.prayer_requests;
drop policy if exists "Anon insert only pending and not displayed" on public.prayer_requests;

-- 6. Políticas de RLS Restritivas

-- [INSERT - Role anon / public]
-- Clientes anônimos só podem inserir pedidos com status = 'pending' e displayed = false
create policy "Anon insert only pending and not displayed" on public.prayer_requests
    for insert
    to anon
    with check (
        status = 'pending' 
        and displayed = false 
        and char_length(request) >= 5 
        and char_length(request) <= 1000
    );

-- [SELECT - Role authenticated]
-- Apenas usuários autenticados (painel de moderação /admin/oracao) podem visualizar os pedidos
create policy "Authenticated can select prayer requests" on public.prayer_requests
    for select
    to authenticated
    using (true);

-- [UPDATE - Role authenticated]
-- Apenas moderadores autenticados podem atualizar status/displayed
create policy "Authenticated can update prayer requests" on public.prayer_requests
    for update
    to authenticated
    using (true)
    with check (true);

-- [DELETE - Role authenticated]
-- Apenas moderadores autenticados podem excluir pedidos se necessário
create policy "Authenticated can delete prayer requests" on public.prayer_requests
    for delete
    to authenticated
    using (true);

-- 7. Permissões de Roles (Princípio do Menor Privilégio)
-- anon tem permissão ESTRITAMENTE de inserção (sem select, update ou delete)
revoke all on public.prayer_requests from anon;
grant insert on public.prayer_requests to anon;

-- authenticated tem controle para moderação
grant select, insert, update, delete on public.prayer_requests to authenticated;

-- Garante uso do schema public
grant usage on schema public to anon, authenticated;
