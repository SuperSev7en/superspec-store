-- Add extra columns to products table for better categorization and Shopify feature parity
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS type text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS collection_handle text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS edition_size integer;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS edition_sold integer DEFAULT 0;

-- Add url column to product_images to store original Shopify URLs
ALTER TABLE public.product_images ADD COLUMN IF NOT EXISTS url text;
