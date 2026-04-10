-- Shopify-like admin schema (Supabase-first)
-- Apply in Supabase SQL editor, or via Supabase CLI migrations.

-- Extensions
create extension if not exists "uuid-ossp";

-- Profiles (admin flag)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.tg_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

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

-- Catalog tables
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
create unique index if not exists product_images_unique_pos on public.product_images(product_id, position);

-- Orders + fulfillment
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

create index if not exists fulfillments_order_id_idx on public.fulfillments(order_id);

-- Audit log (enhancements uses it too)
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

create index if not exists audit_log_entity_idx on public.audit_log(entity_type, entity_id);

-- RLS
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.variants enable row level security;
alter table public.product_images enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.fulfillments enable row level security;
alter table public.audit_log enable row level security;

-- Profiles: user can read own; admins can read all
drop policy if exists "profiles_select_self_or_admin" on public.profiles;
create policy "profiles_select_self_or_admin"
on public.profiles for select
to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- Public storefront reads: only active+published
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
on public.products for select
to anon, authenticated
using (status = 'active' and published = true);

drop policy if exists "variants_public_read" on public.variants;
create policy "variants_public_read"
on public.variants for select
to anon, authenticated
using (exists (select 1 from public.products p where p.id = product_id and p.status = 'active' and p.published = true));

drop policy if exists "product_images_public_read" on public.product_images;
create policy "product_images_public_read"
on public.product_images for select
to anon, authenticated
using (exists (select 1 from public.products p where p.id = product_id and p.status = 'active' and p.published = true));

-- Admin CRUD
drop policy if exists "products_admin_all" on public.products;
create policy "products_admin_all"
on public.products for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "variants_admin_all" on public.variants;
create policy "variants_admin_all"
on public.variants for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "product_images_admin_all" on public.product_images;
create policy "product_images_admin_all"
on public.product_images for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "orders_admin_all" on public.orders;
create policy "orders_admin_all"
on public.orders for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "order_items_admin_all" on public.order_items;
create policy "order_items_admin_all"
on public.order_items for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "customers_admin_all" on public.customers;
create policy "customers_admin_all"
on public.customers for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "fulfillments_admin_all" on public.fulfillments;
create policy "fulfillments_admin_all"
on public.fulfillments for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "audit_log_admin_read" on public.audit_log;
create policy "audit_log_admin_read"
on public.audit_log for select
to authenticated
using (public.is_admin());

drop policy if exists "audit_log_admin_insert" on public.audit_log;
create policy "audit_log_admin_insert"
on public.audit_log for insert
to authenticated
with check (public.is_admin());

-- Storage bucket (Supabase Storage policies must be created in the storage schema)
-- Create bucket `product-media` in dashboard or via SQL:
-- insert into storage.buckets (id, name, public) values ('product-media', 'product-media', true);
--
-- Policies:
-- - Public read for objects in bucket (storefront images)
-- - Admin write/update/delete for objects in bucket

