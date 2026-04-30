-- ============================================================
-- SUPER Spec. — COMPLETE PRODUCTION SCHEMA
-- Run this in Supabase SQL Editor. Safe to re-run (idempotent).
-- ============================================================

-- EXTENSIONS
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- UPDATED_AT TRIGGER
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- ============================================================
-- 1. PROFILES
-- ============================================================
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
create trigger set_profiles_updated_at before update on public.profiles
  for each row execute function public.tg_set_updated_at();

create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public as $$
  select coalesce((select p.is_admin from public.profiles p where p.id = auth.uid()), false);
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- 2. PRODUCTS
-- ============================================================
create table if not exists public.products (
  id                uuid primary key default uuid_generate_v4(),
  handle            text not null unique,
  title             text not null,
  description_html  text not null default '',
  vendor            text,
  product_type      text,
  type              text check (type in ('clothing','art','engineered','general')),
  product_category  text,
  collection_handle text,
  image_url         text,
  tags              text[] not null default '{}',
  status            text not null default 'active' check (status in ('draft','active','archived')),
  published         boolean not null default true,
  seo_title         text,
  seo_description   text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at before update on public.products
  for each row execute function public.tg_set_updated_at();

create index if not exists products_handle_idx           on public.products(handle);
create index if not exists products_collection_handle_idx on public.products(collection_handle);
create index if not exists products_type_idx             on public.products(type);
create index if not exists products_status_idx           on public.products(status);

-- ============================================================
-- 3. PRODUCT IMAGES
-- ============================================================
create table if not exists public.product_images (
  id           uuid primary key default uuid_generate_v4(),
  product_id   uuid not null references public.products(id) on delete cascade,
  storage_path text not null,
  url          text,
  alt          text,
  position     integer not null default 1,
  width        integer,
  height       integer,
  created_at   timestamptz not null default now()
);
create index if not exists product_images_product_id_idx on public.product_images(product_id);

-- ============================================================
-- 4. VARIANTS
-- ============================================================
create table if not exists public.variants (
  id                  uuid primary key default uuid_generate_v4(),
  product_id          uuid not null references public.products(id) on delete cascade,
  title               text not null,
  sku                 text,
  option1             text,
  option2             text,
  size                text,
  color               text,
  price               numeric(10,2) not null default 0,
  compare_at_price    numeric(10,2),
  inventory_quantity  integer not null default 0,
  inventory_policy    text not null default 'deny',
  low_stock_threshold integer not null default 3,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
drop trigger if exists set_variants_updated_at on public.variants;
create trigger set_variants_updated_at before update on public.variants
  for each row execute function public.tg_set_updated_at();
create index if not exists variants_product_id_idx on public.variants(product_id);

-- ============================================================
-- 5. PRODUCT METAFIELDS
-- ============================================================
create table if not exists public.product_metafields (
  id         uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  key        text not null,
  value      text,
  created_at timestamptz not null default now()
);
create index if not exists product_metafields_product_id_idx on public.product_metafields(product_id);

-- ============================================================
-- 6. COLLECTIONS
-- ============================================================
create table if not exists public.collections (
  id          uuid primary key default uuid_generate_v4(),
  handle      text not null unique,
  title       text not null,
  description text,
  image_url   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
drop trigger if exists set_collections_updated_at on public.collections;
create trigger set_collections_updated_at before update on public.collections
  for each row execute function public.tg_set_updated_at();

insert into public.collections (handle, title, description) values
  ('super-spectrum', 'SUPER Spectrum', 'Limited edition art prints'),
  ('super-speck',    'SUPER Speck',    'Premium apparel & clothing'),
  ('super-specification', 'SUPER Specification', 'Precision engineered goods')
on conflict (handle) do nothing;

-- ============================================================
-- 7. ORDERS
-- ============================================================
create table if not exists public.orders (
  id                       uuid primary key default uuid_generate_v4(),
  order_number             text unique,
  user_id                  uuid references auth.users(id) on delete set null,
  email                    text,
  status                   text not null default 'pending' check (status in ('pending','paid','unfulfilled','fulfilled','cancelled','refunded')),
  fulfillment_status       text not null default 'pending' check (fulfillment_status in ('pending','in_transit','delivered','cancelled')),
  subtotal                 numeric(10,2) not null default 0,
  shipping_total           numeric(10,2) not null default 0,
  discount_total           numeric(10,2) not null default 0,
  tax_total                numeric(10,2) not null default 0,
  total                    numeric(10,2) not null default 0,
  currency                 text not null default 'USD',
  stripe_payment_intent_id text unique,
  stripe_session_id        text unique,
  notes                    text,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);
drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at before update on public.orders
  for each row execute function public.tg_set_updated_at();
create index if not exists orders_user_id_idx    on public.orders(user_id);
create index if not exists orders_email_idx      on public.orders(email);
create index if not exists orders_status_idx     on public.orders(status);
create index if not exists orders_created_at_idx on public.orders(created_at desc);

-- ============================================================
-- 8. ORDER ITEMS
-- ============================================================
create table if not exists public.order_items (
  id            uuid primary key default uuid_generate_v4(),
  order_id      uuid not null references public.orders(id) on delete cascade,
  variant_id    uuid references public.variants(id) on delete set null,
  title         text not null,
  variant_title text,
  price         numeric(10,2) not null default 0,
  quantity      integer not null default 1,
  image_url     text
);
create index if not exists order_items_order_id_idx on public.order_items(order_id);

-- ============================================================
-- 9. ORDER SHIPPING ADDRESS
-- ============================================================
create table if not exists public.order_shipping_address (
  id       uuid primary key default uuid_generate_v4(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  name     text,
  line1    text,
  line2    text,
  city     text,
  state    text,
  zip      text,
  country  text default 'US',
  phone    text
);

-- ============================================================
-- 10. ORDER FULFILLMENTS
-- ============================================================
create table if not exists public.order_fulfillments (
  id             uuid primary key default uuid_generate_v4(),
  order_id       uuid not null references public.orders(id) on delete cascade,
  carrier        text,
  tracking_number text,
  shipped_at     timestamptz,
  created_at     timestamptz not null default now()
);

-- ============================================================
-- 11. ORDER TIMELINE
-- ============================================================
create table if not exists public.order_timeline (
  id         uuid primary key default uuid_generate_v4(),
  order_id   uuid not null references public.orders(id) on delete cascade,
  event      text not null,
  note       text,
  created_at timestamptz not null default now()
);
create index if not exists order_timeline_order_id_idx on public.order_timeline(order_id);

-- ============================================================
-- 12. DISCOUNTS
-- ============================================================
create table if not exists public.discounts (
  id               uuid primary key default uuid_generate_v4(),
  code             text not null unique,
  type             text not null check (type in ('percentage','fixed')),
  value            numeric(10,2) not null,
  min_order_amount numeric(10,2),
  usage_limit      integer,
  used_count       integer not null default 0,
  starts_at        timestamptz,
  ends_at          timestamptz,
  is_active        boolean not null default true,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- 13. REVIEWS
-- ============================================================
create table if not exists public.reviews (
  id         uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id    uuid references auth.users(id) on delete set null,
  author     text,
  rating     integer not null check (rating between 1 and 5),
  title      text,
  body       text,
  approved   boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists reviews_product_id_idx on public.reviews(product_id);

-- ============================================================
-- 14. WISHLISTS
-- ============================================================
create table if not exists public.wishlists (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  variant_id uuid references public.variants(id) on delete set null,
  created_at timestamptz not null default now(),
  unique(user_id, product_id)
);
create index if not exists wishlists_user_id_idx on public.wishlists(user_id);

-- ============================================================
-- 15. CART SESSIONS
-- ============================================================
create table if not exists public.cart_sessions (
  id            uuid primary key default uuid_generate_v4(),
  session_token text not null unique,
  user_id       uuid references auth.users(id) on delete set null,
  items         jsonb not null default '[]',
  updated_at    timestamptz not null default now()
);
create index if not exists cart_sessions_token_idx   on public.cart_sessions(session_token);
create index if not exists cart_sessions_user_id_idx on public.cart_sessions(user_id);

-- ============================================================
-- 16. ABANDONED CARTS
-- ============================================================
create table if not exists public.abandoned_carts (
  id              uuid primary key default gen_random_uuid(),
  cart_session_id uuid references public.cart_sessions(id) on delete set null,
  user_id         uuid references auth.users(id) on delete cascade,
  email           text,
  cart_state      jsonb not null default '[]',
  reminded_1hr    boolean not null default false,
  reminded_24hr   boolean not null default false,
  reminded_48hr   boolean not null default false,
  recovered       boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ============================================================
-- 17. EMAIL SUBSCRIBERS
-- ============================================================
create table if not exists public.email_subscribers (
  id            uuid primary key default uuid_generate_v4(),
  email         text not null unique,
  source        text,
  subscribed_at timestamptz not null default now(),
  is_active     boolean not null default true
);

-- ============================================================
-- 18. SCHEDULED EMAILS
-- ============================================================
create table if not exists public.scheduled_emails (
  id       uuid primary key default uuid_generate_v4(),
  to_email text not null,
  template text not null,
  payload  jsonb,
  send_at  timestamptz not null,
  sent_at  timestamptz,
  status   text not null default 'pending' check (status in ('pending','sent','failed'))
);
create index if not exists scheduled_emails_send_at_idx on public.scheduled_emails(send_at) where status = 'pending';

-- ============================================================
-- 19. PASSWORD RESET TOKENS
-- ============================================================
create table if not exists public.password_reset_tokens (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  token      text not null unique,
  expires_at timestamptz not null,
  used_at    timestamptz
);

-- ============================================================
-- 20. STORE SETTINGS
-- ============================================================
create table if not exists public.store_settings (
  id         uuid primary key default uuid_generate_v4(),
  key        text not null unique,
  value      jsonb,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 21. ANALYTICS EVENTS
-- ============================================================
create table if not exists public.analytics_events (
  id         uuid primary key default uuid_generate_v4(),
  session_id text,
  event_type text not null,
  product_id uuid references public.products(id) on delete set null,
  order_id   uuid references public.orders(id) on delete set null,
  metadata   jsonb,
  created_at timestamptz not null default now()
);
create index if not exists analytics_events_type_idx       on public.analytics_events(event_type);
create index if not exists analytics_events_created_at_idx on public.analytics_events(created_at desc);

-- ============================================================
-- 22. ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles           enable row level security;
alter table public.products           enable row level security;
alter table public.product_images     enable row level security;
alter table public.variants           enable row level security;
alter table public.product_metafields enable row level security;
alter table public.collections        enable row level security;
alter table public.orders             enable row level security;
alter table public.order_items        enable row level security;
alter table public.order_shipping_address enable row level security;
alter table public.order_fulfillments enable row level security;
alter table public.order_timeline     enable row level security;
alter table public.discounts          enable row level security;
alter table public.reviews            enable row level security;
alter table public.wishlists          enable row level security;
alter table public.cart_sessions      enable row level security;
alter table public.abandoned_carts    enable row level security;
alter table public.email_subscribers  enable row level security;
alter table public.scheduled_emails   enable row level security;
alter table public.store_settings     enable row level security;
alter table public.analytics_events   enable row level security;

-- PROFILES
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update to authenticated using (id = auth.uid());

-- PRODUCTS (public read)
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products for select using (status = 'active' and published = true);
drop policy if exists "products_admin_all" on public.products;
create policy "products_admin_all" on public.products for all to authenticated using (public.is_admin());

-- PRODUCT IMAGES (public read)
drop policy if exists "product_images_public_read" on public.product_images;
create policy "product_images_public_read" on public.product_images for select using (true);
drop policy if exists "product_images_admin_all" on public.product_images;
create policy "product_images_admin_all" on public.product_images for all to authenticated using (public.is_admin());

-- VARIANTS (public read)
drop policy if exists "variants_public_read" on public.variants;
create policy "variants_public_read" on public.variants for select using (true);
drop policy if exists "variants_admin_all" on public.variants;
create policy "variants_admin_all" on public.variants for all to authenticated using (public.is_admin());

-- PRODUCT METAFIELDS (public read)
drop policy if exists "metafields_public_read" on public.product_metafields;
create policy "metafields_public_read" on public.product_metafields for select using (true);

-- COLLECTIONS (public read)
drop policy if exists "collections_public_read" on public.collections;
create policy "collections_public_read" on public.collections for select using (true);

-- ORDERS (own or admin)
drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own" on public.orders for select to authenticated
  using (user_id = auth.uid() or public.is_admin());
drop policy if exists "orders_insert_anon" on public.orders;
create policy "orders_insert_anon" on public.orders for insert with check (true);
drop policy if exists "orders_admin_all" on public.orders;
create policy "orders_admin_all" on public.orders for all to authenticated using (public.is_admin());

-- ORDER ITEMS / ADDRESS / FULFILLMENTS / TIMELINE (admin only write, own read)
drop policy if exists "order_items_select_own" on public.order_items;
create policy "order_items_select_own" on public.order_items for select using (
  exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin()))
);
drop policy if exists "order_items_insert" on public.order_items;
create policy "order_items_insert" on public.order_items for insert with check (true);

drop policy if exists "order_shipping_select" on public.order_shipping_address;
create policy "order_shipping_select" on public.order_shipping_address for select using (
  exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin()))
);
drop policy if exists "order_shipping_insert" on public.order_shipping_address;
create policy "order_shipping_insert" on public.order_shipping_address for insert with check (true);

-- DISCOUNTS (admin only)
drop policy if exists "discounts_admin_all" on public.discounts;
create policy "discounts_admin_all" on public.discounts for all to authenticated using (public.is_admin());
drop policy if exists "discounts_public_read" on public.discounts;
create policy "discounts_public_read" on public.discounts for select using (is_active = true);

-- REVIEWS (public read approved; own insert)
drop policy if exists "reviews_public_read" on public.reviews;
create policy "reviews_public_read" on public.reviews for select using (approved = true);
drop policy if exists "reviews_insert_any" on public.reviews;
create policy "reviews_insert_any" on public.reviews for insert with check (true);
drop policy if exists "reviews_admin_all" on public.reviews;
create policy "reviews_admin_all" on public.reviews for all to authenticated using (public.is_admin());

-- WISHLISTS (own)
drop policy if exists "wishlists_own" on public.wishlists;
create policy "wishlists_own" on public.wishlists for all to authenticated using (user_id = auth.uid());

-- CART SESSIONS
drop policy if exists "cart_sessions_own" on public.cart_sessions;
create policy "cart_sessions_own" on public.cart_sessions for all using (user_id = auth.uid() or user_id is null);

-- EMAIL SUBSCRIBERS (insert only from anon)
drop policy if exists "email_subscribers_insert" on public.email_subscribers;
create policy "email_subscribers_insert" on public.email_subscribers for insert with check (true);
drop policy if exists "email_subscribers_admin" on public.email_subscribers;
create policy "email_subscribers_admin" on public.email_subscribers for all to authenticated using (public.is_admin());

-- STORE SETTINGS (admin)
drop policy if exists "store_settings_admin" on public.store_settings;
create policy "store_settings_admin" on public.store_settings for all to authenticated using (public.is_admin());

-- ANALYTICS (insert from anon, read admin)
drop policy if exists "analytics_insert" on public.analytics_events;
create policy "analytics_insert" on public.analytics_events for insert with check (true);
drop policy if exists "analytics_admin_read" on public.analytics_events;
create policy "analytics_admin_read" on public.analytics_events for select to authenticated using (public.is_admin());

-- ============================================================
-- 23. PRODUCT TYPE & COLLECTION UPDATES
-- (Run after products are imported — updates types & handles)
-- ============================================================

-- Set art products
update public.products set type = 'art', collection_handle = 'super-spectrum'
where product_type ilike '%art%'
   or product_type ilike '%print%'
   or product_category ilike '%art%'
   or tags && array['art','print','super-spectrum','limited edition'];

-- Set clothing products
update public.products set type = 'clothing', collection_handle = 'super-speck'
where product_type ilike '%clothing%'
   or product_type ilike '%apparel%'
   or product_type ilike '%shirt%'
   or product_type ilike '%tee%'
   or tags && array['clothing','apparel','tee','shirt','super-speck']
   or handle ilike '%-tee%';

-- Set engineered products
update public.products set type = 'engineered', collection_handle = 'super-specification'
where product_type ilike '%engineered%'
   or product_type ilike '%hardware%'
   or tags && array['engineered','hardware','specification'];

-- Clean up old Shopify copy-of handles
update public.products set handle = 'super-angel-wings'    where handle = 'copy-of-copy-of-copy-of-draft' and not exists (select 1 from public.products where handle = 'super-angel-wings');
update public.products set handle = 'super-demon-wings'    where handle = 'copy-of-copy-of-draft'        and not exists (select 1 from public.products where handle = 'super-demon-wings');
update public.products set handle = 'super-heart-angel-wings' where handle = 'copy-of-draft'             and not exists (select 1 from public.products where handle = 'super-heart-angel-wings');
update public.products set handle = '4-point-super-star'   where handle = 'copy-of-super-butterfly-tee'  and not exists (select 1 from public.products where handle = '4-point-super-star');
update public.products set handle = 'aura-endless-march'   where handle = 'aura-the-endless-march-copy'   and not exists (select 1 from public.products where handle = 'aura-endless-march');
update public.products set handle = 'aura-eclipse-of-fate' where handle = 'aura-the-endless-march-copy-1' and not exists (select 1 from public.products where handle = 'aura-eclipse-of-fate');
update public.products set handle = 'azure-spirit'         where handle = 'aura-the-endless-march-copy-2' and not exists (select 1 from public.products where handle = 'azure-spirit');
update public.products set handle = 'auras-brilliant-night' where handle = 'auras-brilliant-night-copy'  and not exists (select 1 from public.products where handle = 'auras-brilliant-night');
update public.products set handle = 'eyes-that-measure'    where handle = 'aura-farm-drawn-power-copy'    and not exists (select 1 from public.products where handle = 'eyes-that-measure');
