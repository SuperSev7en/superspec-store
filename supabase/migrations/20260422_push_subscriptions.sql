-- Push tokens for Expo (Super Spec Hub). Service role + app use; RLS for self-service registration.

create table if not exists public.push_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  expo_push_token text not null,
  platform text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint push_subscriptions_user_token unique (user_id, expo_push_token)
);

create index if not exists push_subscriptions_user_id_idx on public.push_subscriptions(user_id);

drop trigger if exists set_push_subscriptions_updated_at on public.push_subscriptions;
create trigger set_push_subscriptions_updated_at
before update on public.push_subscriptions
for each row execute function public.tg_set_updated_at();

alter table public.push_subscriptions enable row level security;

drop policy if exists "push_subscriptions_select_own" on public.push_subscriptions;
create policy "push_subscriptions_select_own"
on public.push_subscriptions for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "push_subscriptions_insert_admin_own" on public.push_subscriptions;
create policy "push_subscriptions_insert_admin_own"
on public.push_subscriptions for insert
to authenticated
with check (user_id = auth.uid() and public.is_admin());

drop policy if exists "push_subscriptions_update_own" on public.push_subscriptions;
create policy "push_subscriptions_update_own"
on public.push_subscriptions for update
to authenticated
using (user_id = auth.uid() and public.is_admin())
with check (user_id = auth.uid() and public.is_admin());

drop policy if exists "push_subscriptions_delete_own" on public.push_subscriptions;
create policy "push_subscriptions_delete_own"
on public.push_subscriptions for delete
to authenticated
using (user_id = auth.uid() and public.is_admin());
