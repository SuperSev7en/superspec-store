-- ==========================================================
-- SUPER Spec. FULL DATABASE SCHEMA SETUP
-- ==========================================================
-- Apply this file in your Supabase SQL Editor to initialize all tables, 
-- functions, and security policies.

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. UPDATED_AT TRIGGER FUNCTION
create or replace function public.tg_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 3. PROFILES (Admin Management)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.tg_set_updated_at();

-- Helper: is_admin() (SECURITY DEFINER so RLS can call it safely)
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce((select p.is_admin from public.profiles p where p.id = auth.uid()), false);
$$;

-- 4. PRODUCT CATALOG
do $$
begin
  if not exists (select 1 from pg_type where typname = 'product_status') then
    create type public.product_status as enum ('draft','active','archived');
  end if;
end$$;

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  handle text not null unique,
  title text not null,
  description_html text not null default '',
  vendor text,
  product_type text,
  product_category text,
  tags text[] not null default '{}',
  status public.product_status not null default 'draft',
  published boolean not null default false,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row execute function public.tg_set_updated_at();

create table if not exists public.variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  title text not null,
  sku text,
  option1 text,
  price numeric(10,2) not null default 0,
  compare_at_price numeric(10,2),
  inventory_policy text not null default 'deny',
  inventory_quantity integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists variants_product_id_idx on public.variants(product_id);

drop trigger if exists set_variants_updated_at on public.variants;
create trigger set_variants_updated_at
before update on public.variants
for each row execute function public.tg_set_updated_at();

create table if not exists public.product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,
  alt text,
  position integer not null default 1,
  width integer,
  height integer,
  created_at timestamptz not null default now()
);

create index if not exists product_images_product_id_idx on public.product_images(product_id);

-- 5. ORDERS & CUSTOMERS
do $$
begin
  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type public.order_status as enum ('pending','paid','unfulfilled','fulfilled','cancelled','refunded');
  end if;
end$$;

create table if not exists public.customers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text,
  customer_id uuid references public.customers(id),
  status public.order_status not null default 'pending',
  total numeric(10,2) not null default 0,
  currency text not null default 'USD',
  stripe_session_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at
before update on public.orders
for each row execute function public.tg_set_updated_at();

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  variant_id uuid references public.variants(id),
  quantity integer not null default 1,
  price numeric(10,2) not null default 0
);

create index if not exists order_items_order_id_idx on public.order_items(order_id);

do $$
begin
  if not exists (select 1 from pg_type where typname = 'fulfillment_status') then
    create type public.fulfillment_status as enum ('pending','in_transit','delivered','cancelled');
  end if;
end$$;

create table if not exists public.fulfillments (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status public.fulfillment_status not null default 'pending',
  carrier text,
  tracking_number text,
  shipped_at timestamptz,
  created_at timestamptz not null default now()
);

-- 6. MARKETING & AUTOMATION
create table if not exists public.abandoned_carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text,
  cart_state jsonb not null,
  recovered boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.push_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  expo_push_token text not null,
  platform text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint push_subscriptions_user_token unique (user_id, expo_push_token)
);

-- 7. AUDIT LOG
create table if not exists public.audit_log (
  id uuid primary key default uuid_generate_v4(),
  actor_user_id uuid references auth.users(id),
  entity_type text not null,
  entity_id uuid,
  action text not null,
  before jsonb,
  after jsonb,
  created_at timestamptz not null default now()
);

-- 8. SECURITY (RLS)
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.variants enable row level security;
alter table public.product_images enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.fulfillments enable row level security;
alter table public.abandoned_carts enable row level security;
alter table public.push_subscriptions enable row level security;
alter table public.audit_log enable row level security;

-- Policies (Simplified for Initial Setup)
drop policy if exists "profiles_select_self_or_admin" on public.profiles;
create policy "profiles_select_self_or_admin" on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products for select to anon, authenticated using (status = 'active' and published = true);

-- Add all other policies as needed... (Omitted for brevity in this consolidated view, but included in the original migration files)
-- ==========================================================
-- FIX 13: UPDATE PRODUCT TYPES AND COLLECTIONS
-- ==========================================================

-- 1. ART PRINTS (super-spectrum)
UPDATE products SET product_type = 'art', collection_handle = 'super-spectrum'
WHERE handle IN (
  'aura-farewell-to-the-past', 
  'aura-farm-drawn-power-copy', 
  'aura-the-endless-march-copy',
  'aura-the-endless-march-copy-1', 
  'aura-the-endless-march-copy-2',
  'auras-brilliant-night-copy', 
  'der-lichtweg', 
  'divine-distortion-stairway-to-the-shadows', 
  'divine-radiance', 
  'fallen-super-angel', 
  'glow-rib-cage',
  'heart-of-light-eternal-spectrum',
  'eyes-that-measure',
  'azure-spirit'
);

-- 2. CLOTHING (super-speck)
UPDATE products SET product_type = 'clothing', collection_handle = 'super-speck'
WHERE handle IN (
  'copy-of-copy-of-copy-of-draft',
  'copy-of-copy-of-draft', 
  'copy-of-draft',
  'copy-of-super-butterfly-tee', 
  'explore-discover-research-tee',
  'super-butterfly-tee', 
  'super-demon-skull-tee',
  'super-angel-wings',
  'super-demon-wings',
  'super-heart-angel-wings',
  '4-point-super-star-logo',
  'super-star-sparkle-butterfly',
  'super-demon-skull'
);

-- ==========================================================
-- FIX 14: CLEAN PRODUCT URL SLUGS
-- ==========================================================

UPDATE products SET handle = 'super-angel-wings' 
  WHERE handle = 'copy-of-copy-of-copy-of-draft';
UPDATE products SET handle = 'super-demon-wings' 
  WHERE handle = 'copy-of-copy-of-draft';
UPDATE products SET handle = 'super-heart-angel-wings' 
  WHERE handle = 'copy-of-draft';
UPDATE products SET handle = '4-point-super-star' 
  WHERE handle = 'copy-of-super-butterfly-tee';
UPDATE products SET handle = 'aura-endless-march' 
  WHERE handle = 'aura-the-endless-march-copy';
UPDATE products SET handle = 'aura-eclipse-of-fate' 
  WHERE handle = 'aura-the-endless-march-copy-1';
UPDATE products SET handle = 'azure-spirit' 
  WHERE handle = 'aura-the-endless-march-copy-2';
UPDATE products SET handle = 'auras-brilliant-night' 
  WHERE handle = 'auras-brilliant-night-copy';
UPDATE products SET handle = 'eyes-that-measure' 
  WHERE handle = 'aura-farm-drawn-power-copy';
