-- Run this replacement script once in Supabase SQL Editor.
-- It disables the old direct reset and requires an authenticated administrator.
begin;
create extension if not exists pgcrypto with schema extensions;
create or replace function public.a1_reset_profile_pin(p_email text,p_pin text)
returns boolean language plpgsql security definer set search_path=''
as $$ begin raise exception 'ADMIN_APPROVAL_REQUIRED'; end; $$;
revoke all on function public.a1_reset_profile_pin(text,text) from public,anon,authenticated;
create table if not exists public.pin_reset_requests(
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 pin_hash text not null, created_at timestamptz not null default now(),
 status text not null default 'pending' check(status in ('pending','approved','rejected'))
);
alter table public.pin_reset_requests enable row level security;
revoke all on public.pin_reset_requests from anon,authenticated;
create index if not exists pin_reset_user_created on public.pin_reset_requests(user_id,created_at desc);
create or replace function public.a1_pin_profile_exists(p_email text)
returns boolean language sql security definer set search_path=''
as $$ select p_email ~ '^u_[0-9a-f]{32}@profiles\.a1trainer\.app$' and exists(select 1 from auth.users where email=p_email); $$;
create or replace function public.a1_request_pin_reset(p_email text,p_pin text)
returns uuid language plpgsql security definer set search_path=''
as $$ declare target uuid; request_id uuid;
begin
 if p_email is null or p_email !~ '^u_[0-9a-f]{32}@profiles\.a1trainer\.app$' or p_pin is null or p_pin !~ '^[0-9]{4,6}$' then raise exception 'INVALID_PROFILE_OR_PIN'; end if;
 select id into target from auth.users where email=p_email for update;
 if target is null then raise exception 'PROFILE_NOT_FOUND'; end if;
 if exists(select 1 from public.pin_reset_requests where user_id=target and created_at>now()-interval '1 minute') then raise exception 'PLEASE_WAIT'; end if;
 update public.pin_reset_requests set status='rejected' where user_id=target and status='pending';
 insert into public.pin_reset_requests(user_id,pin_hash) values(target,extensions.crypt('A1-'||p_pin||'-trainer',extensions.gen_salt('bf',10))) returning id into request_id;
 return request_id;
end; $$;
create or replace function public.a1_pending_pin_resets()
returns table(id uuid,username text,created_at timestamptz) language plpgsql security definer set search_path=''
as $$ begin
 if not exists(select 1 from public.bug_report_admins where user_id=auth.uid()) then raise exception 'ADMIN_REQUIRED'; end if;
 return query select r.id,coalesce(p.username,'—'),r.created_at from public.pin_reset_requests r left join public.profiles p on p.id=r.user_id where r.status='pending' and r.created_at>now()-interval '24 hours' order by r.created_at;
end; $$;
create or replace function public.a1_review_pin_reset(p_request_id uuid,p_approve boolean)
returns boolean language plpgsql security definer set search_path=''
as $$ declare r public.pin_reset_requests%rowtype;
begin
 if not exists(select 1 from public.bug_report_admins where user_id=auth.uid()) then raise exception 'ADMIN_REQUIRED'; end if;
 select * into r from public.pin_reset_requests where id=p_request_id for update;
 if not found or r.status<>'pending' or r.created_at<=now()-interval '24 hours' then raise exception 'REQUEST_EXPIRED'; end if;
 if p_approve then
  update auth.users set encrypted_password=r.pin_hash,updated_at=now() where id=r.user_id;
  delete from auth.sessions where user_id=r.user_id;
 end if;
 update public.pin_reset_requests set status=case when p_approve then 'approved' else 'rejected' end,pin_hash='' where id=r.id;
 return true;
end; $$;
revoke all on function public.a1_pin_profile_exists(text) from public;
revoke all on function public.a1_request_pin_reset(text,text) from public;
revoke all on function public.a1_pending_pin_resets() from public,anon;
revoke all on function public.a1_review_pin_reset(uuid,boolean) from public,anon;
grant execute on function public.a1_pin_profile_exists(text),public.a1_request_pin_reset(text,text) to anon,authenticated;
grant execute on function public.a1_pending_pin_resets(),public.a1_review_pin_reset(uuid,boolean) to authenticated;
notify pgrst,'reload schema';
commit;
