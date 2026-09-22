-- WWL Whiskey Journal — premium taster personal catalog
-- Run this ONCE in Supabase → SQL Editor (it is safe to re-run; it uses IF NOT EXISTS
-- and idempotent policy drops). Requires no changes to the site.
--
-- Each row is one taster's evaluation of one sanctioned-event expression. Row-Level
-- Security ensures a taster can only read/write their OWN rows.

create extension if not exists pgcrypto;

create table if not exists public.tasting_history (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null default auth.uid() references auth.users(id) on delete cascade,
  event_name        text not null,
  event_date        date,
  expression        text not null,
  category          text,
  nose              text,
  palate            text,
  finish            text,
  rating            integer check (rating between 1 and 100),
  first_round_rank  integer check (first_round_rank between 1 and 4),
  final_round_rank  integer check (final_round_rank between 1 and 4),
  bbb               text check (bbb in ('Bottle','Bar','Bust')),
  personal_note     text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  unique (user_id, event_name, expression)
);

-- Keep updated_at fresh on edits.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists trg_tasting_history_updated on public.tasting_history;
create trigger trg_tasting_history_updated
  before update on public.tasting_history
  for each row execute function public.set_updated_at();

-- Row-Level Security: each taster sees and edits only their own entries.
alter table public.tasting_history enable row level security;

drop policy if exists "tasting_history_select_own" on public.tasting_history;
create policy "tasting_history_select_own" on public.tasting_history
  for select using (auth.uid() = user_id);

drop policy if exists "tasting_history_insert_own" on public.tasting_history;
create policy "tasting_history_insert_own" on public.tasting_history
  for insert with check (auth.uid() = user_id);

drop policy if exists "tasting_history_update_own" on public.tasting_history;
create policy "tasting_history_update_own" on public.tasting_history
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "tasting_history_delete_own" on public.tasting_history;
create policy "tasting_history_delete_own" on public.tasting_history
  for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- SAMPLE SEED for your test user. Replace the email below with your test
-- user's email, then run. Safe to re-run (ON CONFLICT DO NOTHING).
-- ---------------------------------------------------------------------------
insert into public.tasting_history
  (user_id, event_name, event_date, expression, category, nose, palate, finish, rating, first_round_rank, final_round_rank, bbb, personal_note)
select u.id, v.event_name, v.event_date::date, v.expression, v.category, v.nose, v.palate, v.finish, v.rating, v.fr, v.finr, v.bbb, v.note
from auth.users u
cross join (values
  ('Wheated Whispers','2026-10-18','Old Fitzgerald Bottled-in-Bond 7 Year Old Bourbon','Kentucky Straight Bourbon (wheated)',
   'Honey, baked pear, soft caramel','Butterscotch, wheat bread, gentle baking spice','Long, creamy, vanilla',88,2,1,'Bottle','My pick of the flight — classic soft wheater.'),
  ('Wheated Whispers','2026-10-18','Green River Full Proof Wheated Bourbon','Kentucky Straight Bourbon (wheated)',
   'Brown sugar, toasted oak, cherry','Rich caramel, cinnamon, a little heat','Warm, oaky, lingering',85,1,2,'Bottle','Loved the proof and body.'),
  ('Wheated Whispers','2026-10-18','Weller Special Reserve','Kentucky Straight Bourbon (wheated)',
   'Light honey, wheat, faint floral','Thin but pleasant, caramel','Short, gentle',80,3,3,'Bar','Fine, but overhyped for the price.'),
  ('Wheated Whispers','2026-10-18','Ben Holladay 6 Year Soft Red Wheat Rickhouse Proof Straight Bourbon Whiskey','Missouri Straight Bourbon (wheated)',
   'Oak, dark fruit, ethanol','Big, tannic, dry','Hot, drying',82,4,4,'Bar','Needs a drop of water; too hot neat for me.')
) as v(event_name,event_date,expression,category,nose,palate,finish,rating,fr,finr,bbb,note)
where u.email = 'REPLACE_WITH_YOUR_TEST_USER_EMAIL'
on conflict (user_id, event_name, expression) do nothing;
