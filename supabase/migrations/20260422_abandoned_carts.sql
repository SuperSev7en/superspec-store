create table if not exists public.abandoned_carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text,
  cart_state jsonb not null,
  recovered boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table public.abandoned_carts enable row level security;

-- Only admins can view all carts
create policy "Admins can view all abandoned carts"
  on public.abandoned_carts for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

-- Service role can do everything (for webhook/cron)
create policy "Service role can manage abandoned carts"
  on public.abandoned_carts for all
  using (true)
  with check (true);
