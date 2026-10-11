-- Run once in Supabase SQL Editor. Reports remain private.
create table if not exists public.bug_report_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.bug_report_admins enable row level security;
revoke all on public.bug_report_admins from authenticated;
grant select on public.bug_report_admins to authenticated;
revoke all on public.bug_report_admins from anon;
drop policy if exists "Bug admins read own" on public.bug_report_admins;
create policy "Bug admins read own" on public.bug_report_admins
for select to authenticated using (auth.uid() = user_id);
-- No client can grant itself administrator access.

create table if not exists public.bug_reports (
  id uuid primary key,
  user_id uuid references auth.users(id) on delete set null,
  reporter_name text not null check (char_length(reporter_name) between 1 and 100),
  message text not null check (char_length(trim(message)) between 5 and 4000),
  context jsonb not null check (jsonb_typeof(context) = 'object' and octet_length(context::text) <= 24000),
  status text not null default 'open' check (status in ('open','resolved')),
  created_at timestamptz not null default now()
);
create index if not exists bug_reports_created_idx on public.bug_reports(created_at desc);
alter table public.bug_reports enable row level security;
revoke all on public.bug_reports from anon;
revoke all on public.bug_reports from authenticated;
grant select, insert on public.bug_reports to authenticated;
grant update(status) on public.bug_reports to authenticated;
drop policy if exists "Bug reports submit own" on public.bug_reports;
create policy "Bug reports submit own" on public.bug_reports
for insert to authenticated with check (auth.uid() = user_id and status = 'open');
drop policy if exists "Bug reports read own or admin" on public.bug_reports;
create policy "Bug reports read own or admin" on public.bug_reports
for select to authenticated using (
  auth.uid() = user_id or exists (select 1 from public.bug_report_admins a where a.user_id = auth.uid())
);
drop policy if exists "Bug reports admin resolve" on public.bug_reports;
create policy "Bug reports admin resolve" on public.bug_reports
for update to authenticated using (
  exists (select 1 from public.bug_report_admins a where a.user_id = auth.uid())
) with check (exists (select 1 from public.bug_report_admins a where a.user_id = auth.uid()));

-- Grant the existing Phillip profile access to all reports.
-- If your profile uses another name, replace 'phillip' below before running.
do $$
declare admin_id uuid;
begin
  if (select count(*) from public.profiles where lower(username) = 'phillip') <> 1 then
    raise exception 'Expected exactly one Phillip profile. Replace phillip with your unique profile name.';
  end if;
  select id into admin_id from public.profiles where lower(username) = 'phillip';
  insert into public.bug_report_admins(user_id) values(admin_id) on conflict do nothing;
end $$;
