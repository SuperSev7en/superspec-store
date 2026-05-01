# Shopify Theme Conversion Guide

To achieve an **Exact Replica** of the Shopify theme export, follow these rules:

## 1. CSS Mapping
*   **Do not** write new CSS from scratch if the `theme.css` already has it.
*   Use the classes found in `sections/` and `snippets/` of the liquid files.
    *   Example: Use `ProductItem`, `Grid__Cell`, `Button--primary`, `Heading u-h1`.
*   Ensure `app/globals.css` only contains *overrides* for Next.js-specific routing or layout fixes, not brand styling.

## 2. Asset Resolution
*   Shopify images use `shopify://shop_images/...`.
*   In Next.js, these must be mapped to `/assets/...` or public URLs.
*   The `resolveShopifyAssetUrl` function must be the single source of truth for these mappings.

## 3. Section Replication
*   Homepage sections in `app/page.tsx` must render exactly the same HTML structure as their Liquid counterparts.
*   Check `sections/slideshow.liquid` vs `components/shopify/sections/Slideshow.tsx`.

## 4. Interaction Logic
*   Shopify's `theme.js` handles drawer toggles, image zooming, and AJAX cart.
*   We must replicate these behaviors using React state in our client components (`CartDrawer`, `ProductGallery`, etc.).
