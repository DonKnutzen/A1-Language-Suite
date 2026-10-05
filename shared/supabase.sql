-- A1 Language Suite – current Supabase schema
-- Supports: cloud profiles, per-course progress and the public authenticated leaderboard.
-- Safe to re-run: tables/indexes are created if missing and the named policies/triggers are replaced.

-- 1) Public profile names used by the leaderboard.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null default '—'
);

alter table public.profiles add column if not exists username text not null default '—';
alter table public.profiles enable row level security;

-- 2) Full private progress payload for each course.
create table if not exists public.course_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course text not null,
  progress_data jsonb not null default '{}'::jsonb,
  percent int2 not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, course)
);

alter table public.course_progress add column if not exists progress_data jsonb not null default '{}'::jsonb;
alter table public.course_progress add column if not exists percent int2 not null default 0;
alter table public.course_progress add column if not exists updated_at timestamptz not null default now();
create unique index if not exists course_progress_user_course_uidx
  on public.course_progress(user_id, course);
alter table public.course_progress enable row level security;

-- 3) Small leaderboard table, intentionally readable by signed-in users.
create table if not exists public.leaderboard_entries (
  user_id uuid not null references auth.users(id) on delete cascade,
  course text not null,
  percent int2 not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, course)
);

alter table public.leaderboard_entries add column if not exists percent int2 not null default 0;
alter table public.leaderboard_entries add column if not exists updated_at timestamptz not null default now();
create unique index if not exists leaderboard_entries_user_course_uidx
  on public.leaderboard_entries(user_id, course);
alter table public.leaderboard_entries enable row level security;

-- RLS: public profile names are readable by authenticated users.
drop policy if exists "A1 profiles read" on public.profiles;
create policy "A1 profiles read"
on public.profiles for select
to authenticated
using (true);

-- Each user owns only their private course_progress rows.
drop policy if exists "A1 course progress read own" on public.course_progress;
drop policy if exists "A1 course progress insert own" on public.course_progress;
drop policy if exists "A1 course progress update own" on public.course_progress;
create policy "A1 course progress read own"
on public.course_progress for select
to authenticated
using (auth.uid() = user_id);
create policy "A1 course progress insert own"
on public.course_progress for insert
to authenticated
with check (auth.uid() = user_id);
create policy "A1 course progress update own"
on public.course_progress for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Everyone signed in can read the leaderboard, but may only write their own row.
drop policy if exists "A1 leaderboard read" on public.leaderboard_entries;
drop policy if exists "A1 leaderboard insert own" on public.leaderboard_entries;
drop policy if exists "A1 leaderboard update own" on public.leaderboard_entries;
create policy "A1 leaderboard read"
on public.leaderboard_entries for select
to authenticated
using (true);
create policy "A1 leaderboard insert own"
on public.leaderboard_entries for insert
to authenticated
with check (auth.uid() = user_id);
create policy "A1 leaderboard update own"
on public.leaderboard_entries for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Keep public.profiles in sync with the username stored in Auth metadata.
create or replace function public.a1_sync_profile_from_auth()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles(id, username)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'username',''), '—')
  )
  on conflict (id) do update
  set username = excluded.username;
  return new;
end;
$$;

drop trigger if exists a1_auth_profile_sync on auth.users;
create trigger a1_auth_profile_sync
after insert or update of raw_user_meta_data on auth.users
for each row execute function public.a1_sync_profile_from_auth();

-- Backfill existing Auth users so older accounts also have leaderboard names.
insert into public.profiles(id, username)
select
  id,
  coalesce(nullif(raw_user_meta_data->>'username',''), '—')
from auth.users
on conflict (id) do update
set username = excluded.username;
