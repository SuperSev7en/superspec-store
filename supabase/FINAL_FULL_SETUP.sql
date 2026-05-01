-- ============================================================
-- SUPER Spec. — THE "ONE-CLICK" MASTER SETUP
-- This script contains BOTH the Database Schema AND all Products.
-- Run this in the Supabase SQL Editor once.
-- ============================================================

-- 1. SETUP EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. SETUP TRIGGERS & HELPERS
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public as $$
  select coalesce((select p.is_admin from public.profiles p where p.id = auth.uid()), false);
$$;

-- 3. CREATE TABLES
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text, first_name text, last_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.collections (
  id uuid primary key default uuid_generate_v4(),
  handle text not null unique,
  title text not null,
  description text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  handle text not null unique,
  title text not null,
  description_html text not null default '',
  vendor text,
  product_type text,
  type text,
  product_category text,
  collection_handle text references public.collections(handle) on delete set null,
  image_url text,
  tags text[] not null default '{}',
  status text not null default 'active',
  published boolean not null default true,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  title text not null,
  sku text,
  option1 text,
  price numeric(10,2) not null default 0,
  compare_at_price numeric(10,2),
  inventory_quantity integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text,
  position integer not null default 1,
  alt text,
  created_at timestamptz not null default now()
);

create table if not exists public.abandoned_carts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid unique references auth.users(id) on delete cascade,
  email text,
  cart_state jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

-- 4. APPLY TRIGGERS
drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.tg_set_updated_at();

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at before update on public.products for each row execute function public.tg_set_updated_at();

drop trigger if exists set_variants_updated_at on public.variants;
create trigger set_variants_updated_at before update on public.variants for each row execute function public.tg_set_updated_at();

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
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- 6. SECURITY (RLS)
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.variants enable row level security;
alter table public.collections enable row level security;
alter table public.abandoned_carts enable row level security;

create policy "Profiles are viewable by owner or admin" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "Products are viewable by everyone" on public.products for select using (status = 'active' and published = true);
create policy "Collections are viewable by everyone" on public.collections for select using (true);
create policy "Abandoned carts are viewable by owner" on public.abandoned_carts for all using (user_id = auth.uid());

-- 7. IMPORT DATA (COLLECTIONS)
insert into public.collections (handle, title, description) values
  ('super-spectrum', 'SUPER Spectrum', 'Limited edition art prints'),
  ('super-speck', 'SUPER Speck', 'Premium apparel & clothing'),
  ('super-specification', 'SUPER Specification', 'Precision engineered goods')
on conflict (handle) do update set title = excluded.title;

-- 8. IMPORT PRODUCTS (START)
-- NOTE: I will now append the contents of IMPORT_PRODUCTS.sql here.
