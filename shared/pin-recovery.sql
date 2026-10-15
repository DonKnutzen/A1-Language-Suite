-- Deliberately permits PIN reset using only the profile name (via its pseudo-email).
-- Requested for this small learning app. This is not identity verification.
-- Execute once as the project owner in Supabase SQL Editor.
create extension if not exists pgcrypto with schema extensions;
create or replace function public.a1_pin_profile_exists(p_email text)
returns boolean language sql security definer set search_path = ''
as $$
  select p_email ~ '^u_[0-9a-f]{32}@profiles\.a1trainer\.app$'
    and exists(select 1 from auth.users where email = p_email);
$$;
create or replace function public.a1_reset_profile_pin(p_email text, p_pin text)
returns boolean language plpgsql security definer set search_path = ''
as $$
declare changed integer;
begin
  if p_email !~ '^u_[0-9a-f]{32}@profiles\.a1trainer\.app$' or p_email is null
     or p_pin is null or p_pin !~ '^[0-9]{4,6}$' then
    raise exception 'INVALID_PROFILE_OR_PIN';
  end if;
  update auth.users
    set encrypted_password = extensions.crypt('A1-' || p_pin || '-trainer', extensions.gen_salt('bf',10)),
        updated_at = now()
    where email = p_email;
  get diagnostics changed = row_count;
  return changed = 1;
end;
$$;
revoke all on function public.a1_pin_profile_exists(text) from public;
revoke all on function public.a1_reset_profile_pin(text,text) from public;
grant execute on function public.a1_pin_profile_exists(text) to anon,authenticated;
grant execute on function public.a1_reset_profile_pin(text,text) to anon,authenticated;
notify pgrst, 'reload schema';
