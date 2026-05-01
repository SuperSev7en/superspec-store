-- ============================================================
-- SUPER Spec. — OFFICIAL SUPABASE PRODUCTION SCHEMA
-- Copy and paste this into your Supabase SQL Editor.
-- ============================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. UPDATED_AT TRIGGER
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

-- 3. PROFILES (Standard Supabase User Profiles)
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  first_name  text,
  last_name   text,
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.tg_set_updated_at();

-- 4. ADMIN HELPER FUNCTION
create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public as $$
  select coalesce((select p.is_admin from public.profiles p where p.id = auth.uid()), false);
$$;

-- 5. AUTOMATIC PROFILE CREATION
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 6. PRODUCTS
create table if not exists public.products (
  id                uuid primary key default uuid_generate_v4(),
  handle            text not null unique,
  title             text not null,
  description_html  text not null default '',
  vendor            text,
  product_type      text,
  type              text,
  product_category  text,
  collection_handle text,
  image_url         text,
  tags              text[] not null default '{}',
  status            text not null default 'active',
  published         boolean not null default true,
  seo_title         text,
  seo_description   text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
  before update on public.products
  for each row execute function public.tg_set_updated_at();

-- 7. VARIANTS
create table if not exists public.variants (
  id                  uuid primary key default uuid_generate_v4(),
  product_id          uuid not null references public.products(id) on delete cascade,
  title               text not null,
  sku                 text,
  option1             text,
  price               numeric(10,2) not null default 0,
  compare_at_price    numeric(10,2),
  inventory_quantity  integer not null default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

drop trigger if exists set_variants_updated_at on public.variants;
create trigger set_variants_updated_at
  before update on public.variants
  for each row execute function public.tg_set_updated_at();

-- 8. COLLECTIONS
create table if not exists public.collections (
  id          uuid primary key default uuid_generate_v4(),
  handle      text not null unique,
  title       text not null,
  description text,
  image_url   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

insert into public.collections (handle, title, description) values
  ('super-spectrum', 'SUPER Spectrum', 'Limited edition art prints'),
  ('super-speck',    'SUPER Speck',    'Premium apparel & clothing'),
  ('super-specification', 'SUPER Specification', 'Precision engineered goods')
on conflict (handle) do nothing;

-- 9. ORDERS
create table if not exists public.orders (
  id                       uuid primary key default uuid_generate_v4(),
  order_number             text unique,
  user_id                  uuid references auth.users(id) on delete set null,
  email                    text,
  status                   text not null default 'pending',
  total                    numeric(10,2) not null default 0,
  currency                 text not null default 'USD',
  stripe_payment_intent_id text unique,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

-- 10. ABANDONED CARTS (Required for Sync API)
create table if not exists public.abandoned_carts (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid unique references auth.users(id) on delete cascade,
  email         text,
  cart_state    jsonb not null default '[]',
  updated_at    timestamptz not null default now()
);

-- 11. SECURITY (RLS)
alter table public.profiles        enable row level security;
alter table public.products        enable row level security;
alter table public.variants        enable row level security;
alter table public.collections     enable row level security;
alter table public.orders          enable row level security;
alter table public.abandoned_carts enable row level security;

-- 12. POLICIES
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (id = auth.uid() or public.is_admin());

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products for select using (status = 'active' and published = true);

drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own" on public.orders for select using (user_id = auth.uid() or public.is_admin());

drop policy if exists "abandoned_carts_own" on public.abandoned_carts;
create policy "abandoned_carts_own" on public.abandoned_carts for all using (user_id = auth.uid());
