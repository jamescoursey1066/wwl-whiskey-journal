-- WWL Whiskey Journal — premium taster "My Equivalency Units (EUs)"
-- Run this ONCE in Supabase → SQL Editor, after tasting_history.sql. It is safe to
-- re-run (IF NOT EXISTS + idempotent policy drops).
--
-- 1. equivalency_units: one row per taster holding their personal exponential
--    value model, built the same way as xRBEU but from their own anchors:
--      reference anchor = (rating, msrp) of their preferred "good value" whiskey
--      top anchor       = rating 100 -> max_price
--      k                = ln(max_price / msrp) / (100 - rating)
--      fair_price(r)    = msrp * exp(k * (r - rating))
--      EU(r, price)     = fair_price(r) / price
--    k and fair prices are computed in the browser; only the inputs are stored.
-- 2. tasting_history.price: the bottle price a taster records for each tasting, so
--    the portal can show that tasting's EU score.

create table if not exists public.equivalency_units (
  user_id       uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  expression    text not null,
  catalog_name  text,
  distillery    text,
  proof         numeric check (proof is null or (proof > 0 and proof <= 200)),
  msrp          numeric not null check (msrp > 0),
  rating        numeric not null check (rating >= 1 and rating < 100),
  max_price     numeric not null check (max_price > msrp),
  song_pairing  text,
  abbrev        text not null check (abbrev ~ '^x[A-Z0-9]{1,6}EU$'),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- set_updated_at() is created by tasting_history.sql; recreate defensively.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists trg_equivalency_units_updated on public.equivalency_units;
create trigger trg_equivalency_units_updated
  before update on public.equivalency_units
  for each row execute function public.set_updated_at();

-- Row-Level Security: each taster sees and edits only their own EU.
alter table public.equivalency_units enable row level security;

drop policy if exists "equivalency_units_select_own" on public.equivalency_units;
create policy "equivalency_units_select_own" on public.equivalency_units
  for select using (auth.uid() = user_id);

drop policy if exists "equivalency_units_insert_own" on public.equivalency_units;
create policy "equivalency_units_insert_own" on public.equivalency_units
  for insert with check (auth.uid() = user_id);

drop policy if exists "equivalency_units_update_own" on public.equivalency_units;
create policy "equivalency_units_update_own" on public.equivalency_units
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "equivalency_units_delete_own" on public.equivalency_units;
create policy "equivalency_units_delete_own" on public.equivalency_units
  for delete using (auth.uid() = user_id);

-- Price per tasting, used to score each tasting in the taster's EU.
alter table public.tasting_history
  add column if not exists price numeric check (price is null or price > 0);
