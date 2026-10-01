-- supabase/migrations/02_prayer_requests_display_consent.sql
-- Adiciona autorização explícita para exibição em telão/projeção pública conforme LGPD

alter table public.prayer_requests 
  add column if not exists allow_public_display boolean default false not null;

-- Comentário explicativo na coluna
comment on column public.prayer_requests.allow_public_display is 
  'Consentimento explícito (LGPD Art. 7 e 11) do usuário para exibição do nome e pedido no telão da igreja durante os cultos';
