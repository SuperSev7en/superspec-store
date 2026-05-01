# Research and Audit: SUPER Spec. Original Storefront

## 1. Wayback Machine & Original Aesthetic
Based on historical captures and the provided Shopify theme export, the original **superspec.store** (and currently **superspec.studio**) followed these core design principles:

*   **Color Palette:** High-contrast Dark Mode.
    *   **Background:** Solid Black (`#000000`).
    *   **Primary Text:** White (`#FFFFFF`).
    *   **Accent/Gold:** `#c3922e` (used for links, active states, and specific headings).
    *   **Secondary Elements:** Deep charcoal or semi-transparent overlays.
*   **Typography:**
    *   **Primary Font:** Century Gothic or similar clean sans-serif.
    *   **Headings:** Futura or Exo 2 (Variable font provided in `Exo_2/` folder).
*   **Imagery:** 
    *   High-quality, vibrant art prints.
    *   Apparel shots with clean backgrounds.
    *   Engineered goods with technical aesthetic.
*   **Layout:** 
    *   Utilizes the **Prestige Shopify Theme** (v4).
    *   Characteristic "staggered" product grid (optional).
    *   Overlay-heavy UI with blur effects (`backdrop-filter`).

## 2. Current Discrepancies (Audit)
*   **Backgrounds:** Currently using "solid black" too aggressively in areas where it makes text unreadable or creates harsh transitions. User requested *no solid black backgrounds* where they hinder readability.
*   **Visibility:** Filter and Sort controls are currently invisible due to black-on-black text/background settings.
*   **Overlap:** Grid/List buttons are overlapping the filter controls on mobile and desktop.
*   **PDP Descriptions:** Missing on the "scroll page" (collection/catalog view).
*   **Homepage Panels:** Images are "zoomed in" and not centered correctly. They should fit the panel frame perfectly.
*   **Font Integration:** Exo 2 is loaded but not applied globally or correctly mapped to headings/body.
*   **Favicon:** Not loading correctly (currently pointing to a Shopify CDN URL that may be broken or inaccessible).
*   **Popup UI:** Coupon/Exit-intent popup lacks a clear close button, forcing a refresh.

## 3. Shopify Theme Export Analysis
The `/shopify files copy/theme_export...` folder contains:
*   `assets/theme.css`: The massive CSS file defining the Prestige look.
*   `config/settings_data.json`: Key colors, font settings, and section configurations.
*   `sections/`: Liquid files defining the structure of Homepage sections (Slideshow, Collection List, etc.).
*   `snippets/`: Reusable components (Product Item, Icons).

**Conversion Goal:** We must map every setting in `settings_data.json` to our Next.js theme configuration and ensure `theme.css` is applied without conflicting with Tailwind or local overrides.
