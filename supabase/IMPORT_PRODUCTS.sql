-- ============================================================
-- SUPER Spec. — SHOPIFY CSV IMPORT SCRIPT
-- Auto-generated from products_export 3.csv
-- ============================================================

INSERT INTO public.collections (handle, title, description) VALUES
  ('super-spectrum', 'SUPER Spectrum', 'Limited edition art prints'),
  ('super-speck', 'SUPER Speck', 'Premium apparel & clothing'),
  ('super-specification', 'SUPER Specification', 'Precision engineered goods')
ON CONFLICT (handle) DO NOTHING;


-- PRODUCT: art-print-1
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$art-print-1$$,
  $$Heart of Light: Eternal Spectrum$$,
  $$<p class="p1">Unlock the radiance of <span class="s1"><b>light and infinity</b></span> with <span class="s1"><b>“Heart of Light: Eternal Spectrum,”</b></span> a breathtaking fusion of color, energy, and emotion. Inspired by the <span class="s1"><b>timeless battle between light and darkness</b></span>, this piece embodies the <span class="s1"><b>eternal spectrum of the heart</b></span>, glowing with a celestial aura reminiscent of <span class="s1"><b>Kingdom Hearts’ ethereal worlds</b></span>.</p>
<p class="p2"><br></p>
<p class="p1">This artwork is available in <span class="s1"><b>two premium print options</b></span>:</p>
<p class="p1">✨ <span class="s1"><b>Poster Print</b></span> – A vibrant, high-quality print perfect for casual display.</p>
<p class="p1">✨ <span class="s1"><b>Fine Art Print</b></span> – Printed on <span class="s1"><b>museum-grade archival paper</b></span>, offering enhanced depth, richness, and longevity for collectors.</p>
<p class="p2"><br></p>
<p class="p3"><b>Limited Edition Stock:</b><b></b></p>
<p class="p1">🖼 <span class="s1"><b>777 Poster Prints</b></span> – Everyday accessibility with high-end quality.</p>
<p class="p1">🎨 <span class="s1"><b>77 Fine Art Prints</b></span> – A more exclusive, premium-grade offering.</p>$$,
  $$SuperSpec Store$$,
  $$art$$,
  ARRAY[$$art$$, $$limited edition$$, $$print$$]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Heartinfinityfinal2.jpg?v=1738392228$$,
  $$super-spectrum$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$art-print-1$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$art-print-1$$), $$12" x 12" Poster Print$$, 25, 20, $$Poster PRINT-8.5x11-1$$, 0, $$12" x 12" Poster Print$$, NULL, $$12" x 12" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$art-print-1$$), $$12"x 12" Framed Art Print$$, 35, 30, $$Fine Art PRINT-8.5x11-1$$, 0, NULL, NULL, $$12"x 12" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$art-print-1$$), $$14" x 14" Framed Art Print$$, 40, 45, NULL, 0, NULL, NULL, $$14" x 14" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$art-print-1$$), $$12" x 12" Metal print$$, 55, 20, NULL, 0, NULL, NULL, $$12" x 12" Metal print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$art-print-1$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$art-print-1$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Heartinfinityfinal2.jpg?v=1738392228$$, 1, $$$$);


-- PRODUCT: aura-farewell-to-the-past
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$aura-farewell-to-the-past$$,
  $$Aura: Farewell to the past$$,
  $$<p><meta charset="utf-8"><span>Lost pieces of my soul to the cold, but my aura? Still glowing, still untouchable. Shadows tried to claim me, but I move different—SUPER by design, magic by destiny. ✨🖤 </span></p>$$,
  $$SUPER Spec. $$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_19-01-2025_12-08-32-0620PM.jpg?v=1747029754$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$aura-farewell-to-the-past$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$aura-farewell-to-the-past$$), $$12" x 12" Poster Print$$, 15, NULL, NULL, 0, $$12" x 12" Poster Print$$, NULL, $$12" x 12" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$aura-farewell-to-the-past$$), $$12"x 12" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$12"x 12" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$aura-farewell-to-the-past$$), $$14" x 14" Framed Art Print$$, 30, NULL, NULL, 0, NULL, NULL, $$14" x 14" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$aura-farewell-to-the-past$$), $$12" x 12" Metal print$$, 50, NULL, NULL, 0, NULL, NULL, $$12" x 12" Metal print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$aura-farewell-to-the-past$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$aura-farewell-to-the-past$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_19-01-2025_12-08-32-0620PM.jpg?v=1747029754$$, 1, $$$$);


-- PRODUCT: eyes-that-measure
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$eyes-that-measure$$,
  $$Eyes That Measure$$,
  $$<p dir="ltr"><span>The serpent doesn't judge, it registers.</span></p>
<p dir="ltr"><span>It watches, absorbs, waits.</span></p>
<p dir="ltr"><span>Those ancient eyes hold a different kind of knowing<br>they measure depth, not distance. What feels like judgment is simply recognition. The snake sees what we hide from ourselves.</span></p>
<p><br></p>
<p dir="ltr"><span>In that steady gaze lives an ancient protection not from the world, but from our own illusions.</span></p>$$,
  $$SUPER Spec.$$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/266861E4-0C2C-4907-A092-B848A93ADD96.jpg?v=1749615839$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$eyes-that-measure$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$eyes-that-measure$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$eyes-that-measure$$), $$8.5"x 11" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$eyes-that-measure$$), $$12" x 16" Framed Art Print$$, 35, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$eyes-that-measure$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$eyes-that-measure$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/266861E4-0C2C-4907-A092-B848A93ADD96.jpg?v=1749615839$$, 1, $$$$);


-- PRODUCT: aura-endless-march
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$aura-endless-march$$,
  $$Aura: The Endless March$$,
  $$<p class="p1">🌌 ‘God’s in His heaven. All’s right with the world.’ But is it really? Like fallen soldiers, our spirits rise beyond the pain, seeking purpose in the chaos. Endings or beginnings, “Human” hearts holds the key. 🖤🚀✨ </p>
<p class="p1">This artwork is available in <span class="s1"><b>two premium print options</b></span>:</p>
<p class="p1">✨ <span class="s1"><b>Poster Print</b></span> – A vibrant, high-quality print perfect for casual display.</p>
<p class="p1">✨ <span class="s1"><b>Fine Art Print</b></span> – Printed on <span class="s1"><b>museum-grade archival paper</b></span>, offering enhanced depth, richness, and longevity for collectors.</p>
<p class="p2"><br></p>
<p class="p3"><b>Limited Edition Stock:</b><b></b></p>
<p class="p1">🖼 <span class="s1"><b>777 Poster Prints</b></span> – Everyday accessibility with high-end quality.</p>
<p class="p1">🎨 <span class="s1"><b>77 Fine Art Prints</b></span> – A more exclusive, premium-grade offering.</p>$$,
  $$SuperSpec Store$$,
  $$art$$,
  ARRAY[$$art$$, $$limited edition$$, $$print$$]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_07-01-2025_10-41-00-8910AM.jpg?v=1738784827$$,
  $$super-spectrum$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$aura-endless-march$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$aura-endless-march$$), $$12" x 12" Poster Print$$, 20, 20, $$Poster PRINT-8.5x11-1$$, 0, $$12" x 12" Poster Print$$, NULL, $$12" x 12" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$aura-endless-march$$), $$12"x 12" Framed Art Print$$, 35, 30, $$Fine Art PRINT-8.5x11-1$$, 0, NULL, NULL, $$12"x 12" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$aura-endless-march$$), $$14" x 14" Framed Art Print$$, 40, 45, NULL, 0, NULL, NULL, $$14" x 14" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$aura-endless-march$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$aura-endless-march$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_07-01-2025_10-41-00-8910AM.jpg?v=1738784827$$, 1, $$$$);


-- PRODUCT: aura-eclipse-of-fate
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$aura-eclipse-of-fate$$,
  $$Aura: Eclipse of Fate$$,
  $$<p class="p3"><i>“The eclipse is not an end, nor is it a beginning. It is a moment—a fragile instant where light and darkness exist as equals.”</i><i></i></p>
<p class="p3">Standing at the threshold of shadow and flame, <span class="s1"><b>Aura</b></span> does not fear the darkness at her back, nor does she chase the light ahead. She understands what others do not—that the heart is not bound to one or the other. It is forged in the balance between them, shaped by choice, strengthened by understanding. Fate is not a path—it is a decision.</p>
<p class="p1">This artwork is available in <span class="s1"><b>two premium print options</b></span>:</p>
<p class="p1">✨ <span class="s1"><b>Poster Print</b></span> – A vibrant, high-quality print perfect for casual display.</p>
<p class="p1">✨ <span class="s1"><b>Fine Art Print</b></span> – Printed on <span class="s1"><b>museum-grade archival paper</b></span>, offering enhanced depth, richness, and longevity for collectors.</p>
<p class="p2"><br></p>
<p class="p3"><b>Limited Edition Stock:</b><b></b></p>
<p class="p1">🖼 <span class="s1"><b>777 Poster Prints</b></span> – Everyday accessibility with high-end quality.</p>
<p class="p1">🎨 <span class="s1"><b>77 Fine Art Prints</b></span> – A more exclusive, premium-grade offering.</p>$$,
  $$SuperSpec Store$$,
  $$art$$,
  ARRAY[$$art$$, $$limited edition$$, $$print$$]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_07-01-2025_02-48-53-1820PM.png?v=1738785065$$,
  $$super-spectrum$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$aura-eclipse-of-fate$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$aura-eclipse-of-fate$$), $$8.5" x 11" Poster Print$$, 20, 20, $$Poster PRINT-8.5x11-1$$, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$aura-eclipse-of-fate$$), $$8.5"x 11" Framed Art Print$$, 25, 30, $$Fine Art PRINT-8.5x11-1$$, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$aura-eclipse-of-fate$$), $$12" x 16" Framed Art Print$$, 35, 45, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$aura-eclipse-of-fate$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$aura-eclipse-of-fate$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_07-01-2025_02-48-53-1820PM.png?v=1738785065$$, 1, $$$$);


-- PRODUCT: azure-spirit
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$azure-spirit$$,
  $$Azure Spirit: As Pure as water$$,
  $$<p class="p1">A woman’s essence is like water—pure, powerful, and ever-flowing. She cleanses, she nurtures, she shapes the world around her with quiet strength. Whatever she touches, she elevates. Her presence is clarity, her spirit is renewal, and her soul is the definition of purity. ✨💧</p>
<p class="p1">This artwork is available in <span class="s1"><b>two premium print options</b></span>:</p>
<p class="p1">✨ <span class="s1"><b>Poster Print</b></span> – A vibrant, high-quality print perfect for casual display.</p>
<p class="p1">✨ <span class="s1"><b>Fine Art Print</b></span> – Printed on <span class="s1"><b>museum-grade archival paper</b></span>, offering enhanced depth, richness, and longevity for collectors.</p>
<p class="p2"><br></p>
<p class="p3"><b>Limited Edition Stock:</b><b></b></p>
<p class="p1">🖼 <span class="s1"><b>777 Poster Prints</b></span> – Everyday accessibility with high-end quality.</p>
<p class="p1">🎨 <span class="s1"><b>77 Fine Art Prints</b></span> – A more exclusive, premium-grade offering.</p>$$,
  $$SuperSpec Store$$,
  $$art$$,
  ARRAY[$$art$$, $$limited edition$$, $$print$$]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_28-01-2025_07-55-49-7740PM.png?v=1738785229$$,
  $$super-spectrum$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$azure-spirit$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$azure-spirit$$), $$8.5" x 11" Poster Print$$, 25, 20, $$Poster PRINT-8.5x11-1$$, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$azure-spirit$$), $$8.5"x 11" Framed Art Print$$, 35, 30, $$Fine Art PRINT-8.5x11-1$$, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$azure-spirit$$), $$12" x 16" Framed Art Print$$, 40, 45, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$azure-spirit$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$azure-spirit$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_28-01-2025_07-55-49-7740PM.png?v=1738785229$$, 1, $$$$);


-- PRODUCT: auras-brilliant-night
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$auras-brilliant-night$$,
  $$Aura's Brilliant Night$$,
  $$<p class="p1">Dreamers can only dream until the dawn whispers their name. Under the watchful eye of the moon, waiting for the sun to write new stories in golden flames and sparkles. Every heartbeat echoes a wish, every breath a silent vow—chasing what feels like stardust, but knowing this is reality…. Dreams Loading📶🌙✨</p>
<p class="p2"><br></p>
<p class="p1">This artwork is available in <span class="s1"><b>two premium print options</b></span>:</p>
<p class="p1">✨ <span class="s1"><b>Poster Print</b></span> – A vibrant, high-quality print perfect for casual display.</p>
<p class="p1">✨ <span class="s1"><b>Fine Art Print</b></span> – Printed on <span class="s1"><b>museum-grade archival paper</b></span>, offering enhanced depth, richness, and longevity for collectors.</p>
<p class="p2"><br></p>
<p class="p3"><b>Limited Edition Stock:</b><b></b></p>
<p class="p1">🖼 <span class="s1"><b>777 Poster Prints</b></span> – Everyday accessibility with high-end quality.</p>
<p class="p1">🎨 <span class="s1"><b>77 Fine Art Prints</b></span> – A more exclusive, premium-grade offering.</p>$$,
  $$SuperSpec Store$$,
  $$art$$,
  ARRAY[$$art$$, $$limited edition$$, $$print$$]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_23-01-2025_12-49-06-2260AM.png?v=1738784440$$,
  $$super-spectrum$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$auras-brilliant-night$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$auras-brilliant-night$$), $$8.5" x 11" Poster Print$$, 20, 20, $$Poster PRINT-8.5x11-1$$, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$auras-brilliant-night$$), $$8.5"x 11" Framed Art Print$$, 35, 30, $$Fine Art PRINT-8.5x11-1$$, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$auras-brilliant-night$$), $$12" x 16" Framed Art Print$$, 40, 45, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$auras-brilliant-night$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$auras-brilliant-night$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_23-01-2025_12-49-06-2260AM.png?v=1738784440$$, 1, $$$$);


-- PRODUCT: super-angel-wings
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$super-angel-wings$$,
  $$Super Angel Wings$$,
  $$<ul data-mce-fragment="1">
<li data-mce-fragment="1">Imported</li>
<li data-mce-fragment="1">SUPER soft touch Tee</li>
<li data-mce-fragment="1">4.3 oz., 60/40 combed ringspun cotton/polyester</li>
<li data-mce-fragment="1">Fabric laundered</li>
<li data-mce-fragment="1">Side seams<img src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492" alt="" data-mce-fragment="1" data-mce-src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492">
</li>
</ul>$$,
  $$SUPER Spec.$$,
  $$clothing$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/PhotoSep30_102011PM.png?v=1633067930$$,
  $$super-speck$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$super-angel-wings$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / Black / Red Holo$$, 25, NULL, NULL, 0, $$XS$$, $$Black$$, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XS / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$S / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$M / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$L / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$XL / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$super-angel-wings$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/PhotoSep30_102011PM.png?v=1633067930$$, 1, $$$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/PhotoSep30_102059PM.png?v=1633067930$$, 2, $$$$),
((SELECT id FROM public.products WHERE handle = $$super-angel-wings$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/PhotoSep30_101220PM.png?v=1633067930$$, 3, $$$$);


-- PRODUCT: super-demon-wings
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$super-demon-wings$$,
  $$SUPER Demon Wings$$,
  $$<ul data-mce-fragment="1">
<li data-mce-fragment="1">﻿Imported</li>
<li data-mce-fragment="1">SUPER soft touch Tee</li>
<li data-mce-fragment="1">4.3 oz., 60/40 combed ringspun cotton/polyester</li>
<li data-mce-fragment="1">Fabric laundered</li>
<li data-mce-fragment="1">Side seams<img src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492" alt="" data-mce-fragment="1" data-mce-src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492">
</li>
</ul>$$,
  $$SUPER Spec.$$,
  $$clothing$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/PhotoSep30_100256PM.png?v=1663304946$$,
  $$super-speck$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$super-demon-wings$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / Black / Red Holo$$, 25, NULL, NULL, 0, $$XS$$, $$Black$$, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XS / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$S / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$M / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$L / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$XL / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$super-demon-wings$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/PhotoSep30_100256PM.png?v=1663304946$$, 1, $$$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/PhotoSep30_101031PM.png?v=1663304946$$, 2, $$$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-wings$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/PhotoSep30_101004PM.png?v=1663304946$$, 3, $$$$);


-- PRODUCT: super-heart-angel-wings
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$super-heart-angel-wings$$,
  $$SUPER Heart Angel Wings$$,
  $$<ul data-mce-fragment="1">
<li data-mce-fragment="1">Imported</li>
<li data-mce-fragment="1">SUPER soft touch Tee</li>
<li data-mce-fragment="1">4.3 oz., 60/40 combed ringspun cotton/polyester</li>
<li data-mce-fragment="1">Fabric laundered</li>
<li data-mce-fragment="1">Side seams<img src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492" alt="" data-mce-fragment="1" data-mce-src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492">
</li>
</ul>$$,
  $$SUPER Spec.$$,
  $$clothing$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/PhotoSep30_102219PM.png?v=1633059438$$,
  $$super-speck$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / Black / Red Holo$$, 25, NULL, NULL, 0, $$XS$$, $$Black$$, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XS / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$S / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$M / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$L / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$XL / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/PhotoSep30_102219PM.png?v=1633059438$$, 1, $$$$),
((SELECT id FROM public.products WHERE handle = $$super-heart-angel-wings$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/PhotoSep30_102707PM.png?v=1633059438$$, 2, $$$$);


-- PRODUCT: 4-point-super-star
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$4-point-super-star$$,
  $$4 Point SUPER Star logo$$,
  $$<ul data-mce-fragment="1">
<li data-mce-fragment="1">Imported</li>
<li data-mce-fragment="1">SUPER soft touch Tee</li>
<li data-mce-fragment="1">4.3 oz., 60/40 combed ringspun cotton/polyester</li>
<li data-mce-fragment="1">Fabric laundered</li>
<li data-mce-fragment="1">Side seams</li>
<li data-mce-fragment="1">Holographic SUPER Star on Chest, Back, and Both sleeves<br><img src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492" alt="" data-mce-fragment="1" data-mce-src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492"><br>
</li>
</ul>$$,
  $$SUPER Spec.$$,
  $$clothing$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/60718.jpg?v=1633070019$$,
  $$super-speck$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$4-point-super-star$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / Black / Red Holo$$, 20, NULL, NULL, 0, $$XS$$, $$Black$$, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / Black / Orange Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / Black / Yellow Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / Black / Green Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / Black / Blue (Light Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / Black / Indigo (Deep Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / Black / Violet Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / Black / Pink Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / Black / Silver Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / Black / Black Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / White / Red Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / White / Orange Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / White / Yellow Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / White / Green Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / White / Blue (Light Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / White / Indigo (Deep Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / White / Violet Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / White / Pink Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / White / Silver Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XS / White / Black Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / Black / Red Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / Black / Orange Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / Black / Yellow Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / Black / Green Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / Black / Blue (Light Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / Black / Indigo (Deep Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / Black / Violet Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / Black / Pink Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / Black / Silver Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / Black / Black Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / White / Red Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / White / Orange Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / White / Yellow Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / White / Green Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / White / Blue (Light Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / White / Indigo (Deep Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / White / Violet Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / White / Pink Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / White / Silver Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$S / White / Black Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / Black / Red Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / Black / Orange Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / Black / Yellow Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / Black / Green Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / Black / Blue (Light Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / Black / Indigo (Deep Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / Black / Violet Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / Black / Pink Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / Black / Silver Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / Black / Black Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / White / Red Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / White / Orange Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / White / Yellow Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / White / Green Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / White / Blue (Light Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / White / Indigo (Deep Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / White / Violet Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / White / Pink Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / White / Silver Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$M / White / Black Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / Black / Red Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / Black / Orange Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / Black / Yellow Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / Black / Green Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / Black / Blue (Light Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / Black / Indigo (Deep Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / Black / Violet Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / Black / Pink Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / Black / Silver Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / Black / Black Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / White / Red Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / White / Orange Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / White / Yellow Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / White / Green Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / White / Blue (Light Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / White / Indigo (Deep Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / White / Violet Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / White / Pink Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / White / Silver Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$L / White / Black Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / Black / Red Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / Black / Orange Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / Black / Yellow Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / Black / Green Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / Black / Blue (Light Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / Black / Indigo (Deep Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / Black / Violet Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / Black / Pink Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / Black / Silver Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / Black / Black Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / White / Red Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / White / Orange Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / White / Yellow Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / White / Green Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / White / Blue (Light Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / White / Indigo (Deep Blue) Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / White / Violet Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / White / Pink Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / White / Silver Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$XL / White / Black Holo$$, 20, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$4-point-super-star$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$4-point-super-star$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/60718.jpg?v=1633070019$$, 1, $$$$);


-- PRODUCT: der-lichtweg
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$der-lichtweg$$,
  $$der Lichtweg$$,
  $$<p><meta charset="utf-8"><span>Ascend with faith, led by the Spirit, lit by the light of the Most High. These steps are not stone but they are a calling. Each one brings you closer to your destiny, your divinity, your eternal place in His presence. The sky isn’t the limit, your belief is. He is beyond the light… you hear him right?</span></p>$$,
  $$SUPER Spec. $$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_22-04-2025_11-27-15-3040AM.png?v=1747026459$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$der-lichtweg$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$der-lichtweg$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, NULL, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$der-lichtweg$$), $$8.5"x 11" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$der-lichtweg$$), $$12" x 16" Framed Art Print$$, 35, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$der-lichtweg$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$der-lichtweg$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_22-04-2025_11-27-15-3040AM.png?v=1747026459$$, 1, $$$$);


-- PRODUCT: divine-distortion-stairway-to-the-shadows
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$divine-distortion-stairway-to-the-shadows$$,
  $$Divine Distortion - Stairway To The Shadows$$,
  $$<p><meta charset="utf-8"><span>The ones who fear the dark will never master it. But to walk these stairs is to risk your soul. One step too deep, and knowledge becomes corruption. Walk not in fear, but in awareness. These steps belong to the curious. To those who seek to understand the dark without being consumed by it.</span><br><span>Every whisper is a lesson. Every shadow, a mirror. But lose your mind, heart, or soul… and you lose yourself.</span><br><span>Will this path lead to salvation—or damnation. Or your ultimate understanding of both sides☯️</span><br><span>A voice waits for you in the void:</span><br><span>I am beyond the light… you hear me right.</span></p>$$,
  $$SUPER Spec. $$,
  $$art$$,
  ARRAY[$$art$$]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_23-04-2025_04-04-18-2800AM.png?v=1746635717$$,
  $$super-spectrum$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$divine-distortion-stairway-to-the-shadows$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$divine-distortion-stairway-to-the-shadows$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$divine-distortion-stairway-to-the-shadows$$), $$8.5"x 11" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$divine-distortion-stairway-to-the-shadows$$), $$12" x 16" Framed Art Print$$, 35, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$divine-distortion-stairway-to-the-shadows$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$divine-distortion-stairway-to-the-shadows$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_23-04-2025_04-04-18-2800AM.png?v=1746635717$$, 1, $$$$);


-- PRODUCT: divine-radiance
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$divine-radiance$$,
  $$Divine Radiance$$,
  $$<p><meta charset="utf-8"><span>The sun never touched the rose, yet she bloomed, fed only by the light, not hands. This piece is a tribute to the way love can live in energy alone. A rose nourished by presence, not possession. (The Holy sun is also referred to as the Holy son Jesus at all times to me.)</span><br><br><span>I used to have a stained glass window in my house in NY back when I was a child with a rose like this. I drew it from memory. But it was a beautiful thing to sit on my steps and look at this window and the light shine thru it in the mornings. To simply walk past it was a Blessing. I used to ponder as a child about such beauty and the relationship of the Lord and his Father nourishing all things on this earth… I’ve been shown wondrous phenomena since birth and I’m just lucky to show my appreciation for all I’ve seen and learn through these eyes of mine.</span></p>$$,
  $$SUPER Spec. $$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_25-04-2025_12-28-47-8070PM.png?v=1747026135$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$divine-radiance$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$divine-radiance$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$divine-radiance$$), $$8.5"x 11" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$divine-radiance$$), $$12" x 16" Framed Art Print$$, 35, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$divine-radiance$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$divine-radiance$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_25-04-2025_12-28-47-8070PM.png?v=1747026135$$, 1, $$$$);


-- PRODUCT: draft
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$draft$$,
  $$Super Spooky face$$,
  $$<ul data-mce-fragment="1">
<li data-mce-fragment="1">Imported</li>
<li data-mce-fragment="1">SUPER soft touch Tee</li>
<li data-mce-fragment="1">4.3 oz., 60/40 combed ringspun cotton/polyester</li>
<li data-mce-fragment="1">Fabric laundered</li>
<li data-mce-fragment="1">Side seams</li>
<li data-mce-fragment="1">Holographic SUPER Star on Chest, Back, and Both sleeves<br><img src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492" alt="" data-mce-fragment="1" data-mce-src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492"><br>
</li>
</ul>$$,
  $$SUPER Spec.$$,
  $$clothing$$,
  ARRAY[]::text[],
  $$draft$$,
  false,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/image.png?v=1634837697$$,
  $$super-speck$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$draft$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / Black / Red Holo$$, 25, NULL, NULL, 0, $$XS$$, $$Black$$, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XS / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$S / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$M / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$L / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$XL / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$draft$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$draft$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/image.png?v=1634837697$$, 1, $$$$),
((SELECT id FROM public.products WHERE handle = $$draft$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/image.jpg?v=1634837699$$, 2, $$$$);


-- PRODUCT: explore-discover-research-tee
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$explore-discover-research-tee$$,
  $$Explore, Discover, Research$$,
  $$<ul data-mce-fragment="1">
<li data-mce-fragment="1">Imported</li>
<li data-mce-fragment="1">SUPER soft touch Tee</li>
<li data-mce-fragment="1">4.3 oz., 60/40 combed ringspun cotton/polyester</li>
<li data-mce-fragment="1">Fabric laundered</li>
<li data-mce-fragment="1">Side seams</li>
<li data-mce-fragment="1">Holographic Design on front with SUPER Star on back<br><img src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492" alt="" data-mce-fragment="1" data-mce-src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492"><br>
</li>
</ul>$$,
  $$SUPER Spec.$$,
  $$clothing$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/64525.jpg?v=1633070226$$,
  $$super-speck$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / Black / Red Holo$$, 25, NULL, NULL, 0, $$XS$$, $$Black$$, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XS / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$S / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$M / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$L / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$XL / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$explore-discover-research-tee$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/64525.jpg?v=1633070226$$, 1, $$$$);


-- PRODUCT: fallen-super-angel
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$fallen-super-angel$$,
  $$Evil SUPER Angel Wings$$,
  $$<ul data-mce-fragment="1">
<li data-mce-fragment="1">Imported</li>
<li data-mce-fragment="1">SUPER soft touch Tee</li>
<li data-mce-fragment="1">4.3 oz., 60/40 combed ringspun cotton/polyester</li>
<li data-mce-fragment="1">Fabric laundered</li>
<li data-mce-fragment="1">Side seams<img src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492" alt="" data-mce-fragment="1" data-mce-src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492">
</li>
</ul>$$,
  $$SUPER Spec.$$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/PhotoSep30_94108PM_296f83ed-c428-4d89-8b73-26d30a5ab440.png?v=1633068561$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$S / Black Holo / Grey$$, 25, NULL, NULL, 0, $$S$$, $$Black Holo$$, $$S$$, $$Black Holo$$),
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$S / Black Holo / Black$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black Holo$$),
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$S / Black Holo / White$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black Holo$$),
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$M / Black Holo / Grey$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black Holo$$),
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$M / Black Holo / Black$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black Holo$$),
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$M / Black Holo / White$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black Holo$$),
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$L / Black Holo / Grey$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black Holo$$),
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$L / Black Holo / Black$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black Holo$$),
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$L / Black Holo / White$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black Holo$$),
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$XL / Black Holo / Grey$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black Holo$$),
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$XL / Black Holo / Black$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black Holo$$),
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$XL / Black Holo / White$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black Holo$$),
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$XXL / Black Holo / Grey$$, 25, NULL, NULL, 0, NULL, NULL, $$XXL$$, $$Black Holo$$),
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$XXL / Black Holo / Black$$, 25, NULL, NULL, 0, NULL, NULL, $$XXL$$, $$Black Holo$$),
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$XXL / Black Holo / White$$, 25, NULL, NULL, 0, NULL, NULL, $$XXL$$, $$Black Holo$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/PhotoSep30_94108PM_296f83ed-c428-4d89-8b73-26d30a5ab440.png?v=1633068561$$, 1, $$$$),
((SELECT id FROM public.products WHERE handle = $$fallen-super-angel$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/PhotoSep30_103135PM_bbf6aa09-d816-4755-ae16-6561d01200f0.png?v=1633068561$$, 2, $$$$);


-- PRODUCT: super-glow-rib-cage
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$super-glow-rib-cage$$,
  $$SUPER Glow Rib Cage$$,
  $$$$,
  $$SUPER Spec.$$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/PhotoSep30_101109PM.png?v=1633060442$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$super-glow-rib-cage$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$super-glow-rib-cage$$), $$S / Black$$, 25, NULL, NULL, 0, $$S$$, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-glow-rib-cage$$), $$M / Black$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-glow-rib-cage$$), $$L / Black$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-glow-rib-cage$$), $$XL / Black$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-glow-rib-cage$$), $$XXL / Black$$, 25, NULL, NULL, 0, NULL, NULL, $$XXL$$, $$Black$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$super-glow-rib-cage$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$super-glow-rib-cage$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/PhotoSep30_101109PM.png?v=1633060442$$, 1, $$$$),
((SELECT id FROM public.products WHERE handle = $$super-glow-rib-cage$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/55922.jpg?v=1633060442$$, 2, $$$$),
((SELECT id FROM public.products WHERE handle = $$super-glow-rib-cage$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/IMG-5057.jpg?v=1633060442$$, 3, $$$$),
((SELECT id FROM public.products WHERE handle = $$super-glow-rib-cage$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/IMG-5062.jpg?v=1633060442$$, 4, $$$$),
((SELECT id FROM public.products WHERE handle = $$super-glow-rib-cage$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/IMG-5060.jpg?v=1633060442$$, 5, $$$$);


-- PRODUCT: heart-of-light-eternal-spectrum-copy-copy
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$heart-of-light-eternal-spectrum-copy-copy$$,
  $$Aura: Spirit of the Cosmos$$,
  $$<p class="p3"><i>“Some are born of the stars, their hearts woven from the fabric of infinity.”</i><i></i></p>
<p class="p3"><span class="s1"><b>Aura</b></span> stands between the realms, neither fully here nor there. Her form glows with an ethereal light, her presence a reminder that some souls are meant to walk beyond the boundaries of the known world. This piece speaks to the ones who wander, the ones who dream, the ones who know that home is not a place, but a feeling.</p>$$,
  $$SuperSpec Store$$,
  $$art$$,
  ARRAY[$$art$$, $$limited edition$$, $$print$$]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_06-01-2025_01-40-28-9420AM.jpg?v=1738783218$$,
  $$super-spectrum$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy$$), $$8.5" x 11" Poster Print$$, 20, 20, $$Poster PRINT-8.5x11-1$$, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy$$), $$8.5"x 11" Framed Art Print$$, 35, 30, $$Fine Art PRINT-8.5x11-1$$, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy$$), $$12" x 16" Framed Art Print$$, 40, 45, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_06-01-2025_01-40-28-9420AM.jpg?v=1738783218$$, 1, $$$$);


-- PRODUCT: heart-of-light-eternal-spectrum-copy-copy-1
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$heart-of-light-eternal-spectrum-copy-copy-1$$,
  $$Aura: The Keeper’s Embrace$$,
  $$<p class="p1">A keeper of all, Death holds what we cannot🖤 Very grateful to be in Deaths graces🙏🏾🌌 But to my enemies: every breath you take brings you closer to the keeper’s embrace. Death has no favorites, and it never forgets. Tread carefully—your time is already borrowed⌛️.🌕<br></p>
<p class="p1">There are no enemies here, no victors—only those who were, those who are, and those who will be.</p>
<p class="p1">This artwork is available in <span class="s1"><b>two premium print options</b></span>:</p>
<p class="p1">✨ <span class="s1"><b>Poster Print</b></span> – A vibrant, high-quality print perfect for casual display.</p>
<p class="p1">✨ <span class="s1"><b>Fine Art Print</b></span> – Printed on <span class="s1"><b>museum-grade archival paper</b></span>, offering enhanced depth, richness, and longevity for collectors.</p>
<p class="p2"><br></p>
<p class="p3"><b>Limited Edition Stock:</b><b></b></p>
<p class="p1">🖼 <span class="s1"><b>777 Poster Prints</b></span> – Everyday accessibility with high-end quality.</p>
<p class="p1">🎨 <span class="s1"><b>77 Fine Art Prints</b></span> – A more exclusive, premium-grade offering.</p>$$,
  $$SuperSpec Store$$,
  $$art$$,
  ARRAY[$$art$$, $$limited edition$$, $$print$$]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/2AB8318E-986A-4B93-8999-CBCA17A1E427.jpg?v=1738784094$$,
  $$super-spectrum$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-1$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-1$$), $$8.5" x 11" Poster Print$$, 20, 20, $$Poster PRINT-8.5x11-1$$, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-1$$), $$8.5"x 11" Framed Art Print$$, 35, 30, $$Fine Art PRINT-8.5x11-1$$, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-1$$), $$12" x 16" Framed Art Print$$, 40, 45, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-1$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-1$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/2AB8318E-986A-4B93-8999-CBCA17A1E427.jpg?v=1738784094$$, 1, $$$$);


-- PRODUCT: heart-of-light-eternal-spectrum-copy-copy-copy
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$heart-of-light-eternal-spectrum-copy-copy-copy$$,
  $$Aura: Blood Moon Elegy$$,
  $$<p class="p1"><i>“Even in darkness, the moon still shines. Even in sorrow, the heart still beats.”</i><i></i></p>
<p class="p1">Under the glow of a crimson moon, <span class="s1"><b>Aura</b></span> stands as a beacon between worlds. The weight of eternity lingers in her gaze, a quiet resolve forged through loss and longing. Shadows coil at the edges of her being, yet they do not consume her—for she carries the light within, undying, unbroken. This piece is a tribute to those who walk the line between light and dark, never yielding to either.</p>
<p class="p3"><b>Limited Edition Stock:</b><b></b></p>
<p class="p1">🖼 <span class="s1"><b>777 Poster Prints</b></span> – Everyday accessibility with high-end quality.</p>
<p class="p1">🎨 <span class="s1"><b>77 Fine Art Prints</b></span> – A more exclusive, premium-grade offering.</p>$$,
  $$SuperSpec Store$$,
  $$art$$,
  ARRAY[$$art$$, $$limited edition$$, $$print$$]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_05-01-2025_03-31-42-5110PM.png?v=1738783029$$,
  $$super-spectrum$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-copy$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-copy$$), $$8.5" x 11" Poster Print$$, 20, 20, $$Poster PRINT-8.5x11-1$$, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-copy$$), $$8.5"x 11" Framed Art Print$$, 35, 30, $$Fine Art PRINT-8.5x11-1$$, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-copy$$), $$12" x 16" Framed Art Print$$, 40, 45, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-copy$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-copy$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_05-01-2025_03-31-42-5110PM.png?v=1738783029$$, 1, $$$$);


-- PRODUCT: heart-of-light-eternal-spectrum-copy-copy-copy-copy
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$heart-of-light-eternal-spectrum-copy-copy-copy-copy$$,
  $$Reddy So Rosey: Luminous Tears$$,
  $$<p class="p3">Bathed in the neon glow of a world caught between dreams and reality, <span class="s1"><b>Reddy too Rosey</b></span> wears her heart in her eyes—shimmering, vulnerable, infinite. Her tears aren’t just sorrow; they’re light, reflecting the depth of emotions too powerful for words. Each droplet holds a universe of longing, love, and hope, cascading from the heart of someone who feels everything all at once.</p>
<p class="p2"><br></p>
<p class="p3">Her fiery red hair, kissed by the glow of a distant sky, frames a moment suspended in time—where pain and beauty intertwine, where sadness shimmers like stardust. In this ethereal portrait, <span class="s1"><b>Reddy too Rosey</b></span> reminds us that even in our most fragile moments, we glow, we radiate, we remain eternal.</p>
<p class="p2"><br></p>
<p class="p3">A breathtaking addition to any collection, this piece captures the raw essence of emotion, wrapped in color, energy, and light.</p>
<p class="p2"><br></p>
<p class="p4"><b>Available now—own a piece of the luminous soul.</b></p>
<p class="p2"><br></p>
<p class="p3"><b>Limited Edition Stock:</b><b></b></p>
<p class="p1">🖼 <span class="s1"><b>777 Poster Prints</b></span> – Everyday accessibility with high-end quality.</p>
<p class="p1">🎨 <span class="s1"><b>77 Fine Art Prints</b></span> – A more exclusive, premium-grade offering.</p>$$,
  $$SuperSpec Store$$,
  $$art$$,
  ARRAY[$$art$$, $$limited edition$$, $$print$$]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/CA9E9DDC-AD13-4235-8A90-1C6BEAA1D10C.jpg?v=1746987734$$,
  $$super-spectrum$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-copy-copy$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-copy-copy$$), $$8.5" x 11" Poster Print$$, 20, 20, $$Poster PRINT-8.5x11-1$$, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-copy-copy$$), $$8.5"x 11" Framed Art Print$$, 35, 30, $$Fine Art PRINT-8.5x11-1$$, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-copy-copy$$), $$12" x 16" Framed Art Print$$, 40, 45, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-copy-copy$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$heart-of-light-eternal-spectrum-copy-copy-copy-copy$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/CA9E9DDC-AD13-4235-8A90-1C6BEAA1D10C.jpg?v=1746987734$$, 1, $$$$);


-- PRODUCT: love-in-full-bloom
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$love-in-full-bloom$$,
  $$Love In Full Bloom$$,
  $$<p><meta charset="utf-8"><span>Sakura’s bloom when I think about you…🎆 🌸</span><br><span>Like a scene out of a dream I never want to leave or wake up from. </span></p>$$,
  $$SUPER Spec. $$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_18-04-2025_08-05-56-6390AM.png?v=1747026459$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$love-in-full-bloom$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$love-in-full-bloom$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$love-in-full-bloom$$), $$8.5"x 11" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$love-in-full-bloom$$), $$12" x 16" Framed Art Print$$, 30, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$love-in-full-bloom$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$love-in-full-bloom$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_18-04-2025_08-05-56-6390AM.png?v=1747026459$$, 1, $$$$);


-- PRODUCT: love-in-full-bloom-deep-feeling
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$love-in-full-bloom-deep-feeling$$,
  $$Love In Full Bloom: Deep Feelings$$,
  $$<p><meta charset="utf-8"><span>Sakura’s bloom when I think about you…🎆 🌸</span><br><span>Like a scene out of a dream I never want to leave or wake up from.</span></p>$$,
  $$SUPER Spec.$$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_18-04-2025_08-05-56-2570AM.png?v=1747026459$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$love-in-full-bloom-deep-feeling$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$love-in-full-bloom-deep-feeling$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, NULL, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$love-in-full-bloom-deep-feeling$$), $$8.5"x 11" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$love-in-full-bloom-deep-feeling$$), $$12" x 16" Framed Art Print$$, 35, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$love-in-full-bloom-deep-feeling$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$love-in-full-bloom-deep-feeling$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_18-04-2025_08-05-56-2570AM.png?v=1747026459$$, 1, $$$$);


-- PRODUCT: mighty-menace
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$mighty-menace$$,
  $$Mighty Menace$$,
  $$<p><meta charset="utf-8"><span>Through pain, he has learned. Through instinct, he survives. A force of quiet power, moving with purpose—unshaken, unyielding. He does not seek the path; he carves it. His presence is a warning, his vision a weapon. ⚫</span></p>$$,
  $$SUPER Spec. $$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_31-03-2025_02-35-51-6380AM.png?v=1747028982$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$mighty-menace$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$mighty-menace$$), $$12" x 12" Poster Print$$, 15, NULL, NULL, 0, $$12" x 12" Poster Print$$, NULL, $$12" x 12" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$mighty-menace$$), $$12"x 12" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$12"x 12" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$mighty-menace$$), $$14" x 14" Framed Art Print$$, 30, NULL, NULL, 0, NULL, NULL, $$14" x 14" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$mighty-menace$$), $$12" x 12" Metal print$$, 50, NULL, NULL, 0, NULL, NULL, $$12" x 12" Metal print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$mighty-menace$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$mighty-menace$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_31-03-2025_02-35-51-6380AM.png?v=1747028982$$, 1, $$$$);


-- PRODUCT: mystical-mystery
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$mystical-mystery$$,
  $$Mystical Mystery$$,
  $$<p><meta charset="utf-8"><span>Shrouded in mystical mystery, she perceives what lies beyond the visible— her intuition an unspoken force, her vision piercing through the unseen. The sixth sense is her secret, her power, her truth. ✨</span></p>$$,
  $$SUPER Spec. $$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_31-03-2025_02-35-50-5560AM.png?v=1747026459$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$mystical-mystery$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$mystical-mystery$$), $$12" x 12" Poster Print$$, 15, NULL, NULL, 0, $$12" x 12" Poster Print$$, NULL, $$12" x 12" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$mystical-mystery$$), $$12"x 12" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$12"x 12" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$mystical-mystery$$), $$14" x 14" Framed Art Print$$, 30, NULL, NULL, 0, NULL, NULL, $$14" x 14" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$mystical-mystery$$), $$12" x 12" Metal print$$, 50, NULL, NULL, 0, NULL, NULL, $$12" x 12" Metal print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$mystical-mystery$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$mystical-mystery$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_31-03-2025_02-35-50-5560AM.png?v=1747026459$$, 1, $$$$);


-- PRODUCT: painted-by-your-presence
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$painted-by-your-presence$$,
  $$Painted by Your Presence$$,
  $$<p><meta charset="utf-8"><span>Stopped crossing meadows in search of more vibrant hues when I realized your love paints even ordinary moments in colors time cannot fade.  </span></p>$$,
  $$SUPER Spec. $$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_22-03-2025_08-58-21-4360PM.png?v=1747030171$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$painted-by-your-presence$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$painted-by-your-presence$$), $$12" x 12" Poster Print$$, 15, NULL, NULL, 0, $$12" x 12" Poster Print$$, NULL, $$12" x 12" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$painted-by-your-presence$$), $$12"x 12" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$12"x 12" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$painted-by-your-presence$$), $$14" x 14" Framed Art Print$$, 30, NULL, NULL, 0, NULL, NULL, $$14" x 14" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$painted-by-your-presence$$), $$12" x 12" Metal print$$, 50, NULL, NULL, 0, NULL, NULL, $$12" x 12" Metal print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$painted-by-your-presence$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$painted-by-your-presence$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_22-03-2025_08-58-21-4360PM.png?v=1747030171$$, 1, $$$$);


-- PRODUCT: reddy-so-rosey-distant-eden
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$reddy-so-rosey-distant-eden$$,
  $$Reddy So Rosey: “Distant Eden”$$,
  $$<p>She holds a rare flower of dreams, picked by a man truly wanting to make his mark on her heart, a peaceful secret under a star-kissed sky. No rush to say a word but to truly feel what’s real and this rare, Between dreams and destiny she will remember this moment and he will remember this image of the beauty that can never be replicated or duplicated in time.✨🌸🌈 <br></p>$$,
  $$SUPER Spec. $$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_16-03-2025_11-54-53-9440PM.png?v=1747287850$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$reddy-so-rosey-distant-eden$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$reddy-so-rosey-distant-eden$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$reddy-so-rosey-distant-eden$$), $$8.5"x 11" Framed Art Print$$, 20, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$reddy-so-rosey-distant-eden$$), $$12" x 16" Framed Art Print$$, 35, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$reddy-so-rosey-distant-eden$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$reddy-so-rosey-distant-eden$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_16-03-2025_11-54-53-9440PM.png?v=1747287850$$, 1, $$$$);


-- PRODUCT: reddy-so-rosey-when-love-pretends-to-stay
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$reddy-so-rosey-when-love-pretends-to-stay$$,
  $$Reddy So Rosey: When Love Pretends to Stay$$,
  $$<p><meta charset="utf-8"><span>Falling in love with the thought of forever, but forever feels just like a dream. Lost in a moment that feels infinite, yet slipping through my fingers like stardust. Maybe love is just a beautiful illusion—real enough to feel, but never meant to last.</span></p>$$,
  $$SUPER Spec. $$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_28-03-2025_07-03-42-4230AM.png?v=1747026462$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$reddy-so-rosey-when-love-pretends-to-stay$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$reddy-so-rosey-when-love-pretends-to-stay$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$reddy-so-rosey-when-love-pretends-to-stay$$), $$8.5"x 11" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$reddy-so-rosey-when-love-pretends-to-stay$$), $$12" x 16" Framed Art Print$$, 35, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$reddy-so-rosey-when-love-pretends-to-stay$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$reddy-so-rosey-when-love-pretends-to-stay$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_28-03-2025_07-03-42-4230AM.png?v=1747026462$$, 1, $$$$);


-- PRODUCT: super-butterfly-tee
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$super-butterfly-tee$$,
  $$SUPER Star Sparkle Butterfly$$,
  $$<ul data-mce-fragment="1">
<li data-mce-fragment="1">Imported</li>
<li data-mce-fragment="1">SUPER soft touch Tee</li>
<li data-mce-fragment="1">4.3 oz., 60/40 combed ringspun cotton/polyester</li>
<li data-mce-fragment="1">Fabric laundered</li>
<li data-mce-fragment="1">Side seams</li>
<li data-mce-fragment="1">Holographic Design on front with text on back of shirt<br><img src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492" alt="" data-mce-fragment="1" data-mce-src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492"><br>
</li>
</ul>$$,
  $$SUPER Spec.$$,
  $$clothing$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/IMG_4230.png?v=1625708391$$,
  $$super-speck$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / Black / Red Holo$$, 25, NULL, NULL, 0, $$XS$$, $$Black$$, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XS / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$S / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$M / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$L / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$XL / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$super-butterfly-tee$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/IMG_4230.png?v=1625708391$$, 1, $$$$);


-- PRODUCT: super-demon-skull-tee
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$super-demon-skull-tee$$,
  $$SUPER Demon Skull$$,
  $$<ul data-mce-fragment="1">
<li data-mce-fragment="1">Imported</li>
<li data-mce-fragment="1">SUPER soft touch Tee</li>
<li data-mce-fragment="1">4.3 oz., 60/40 combed ringspun cotton/polyester</li>
<li data-mce-fragment="1">Fabric laundered</li>
<li data-mce-fragment="1">Side seams</li>
<li data-mce-fragment="1">Holographic Design on front with SUPER Star on back<br><img src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492" alt="" data-mce-fragment="1" data-mce-src="https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Fit_Chart_480x480.jpg?v=1625705492"><br>
</li>
</ul>$$,
  $$SUPER Spec.$$,
  $$clothing$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/71658.jpg?v=1633070326$$,
  $$super-speck$$
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / Black / Red Holo$$, 25, NULL, NULL, 0, $$XS$$, $$Black$$, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XS / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XS$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$S / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$S$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$M / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$M$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$L / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$L$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / Black / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / Black / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / Black / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / Black / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / Black / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / Black / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / Black / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / Black / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / Black / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / Black / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$Black$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / White / Red Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / White / Orange Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / White / Yellow Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / White / Green Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / White / Blue (Light Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / White / Indigo (Deep Blue) Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / White / Violet Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / White / Pink Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / White / Silver Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$XL / White / Black Holo$$, 25, NULL, NULL, 0, NULL, NULL, $$XL$$, $$White$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/71658.jpg?v=1633070326$$, 1, $$$$),
((SELECT id FROM public.products WHERE handle = $$super-demon-skull-tee$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/products/IMG_4237.png?v=1633070337$$, 2, $$$$);


-- PRODUCT: super-radiant-energy-wave
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$super-radiant-energy-wave$$,
  $$Super Radiant Energy Wave (White)$$,
  $$<p><meta charset="utf-8"><span>Every soul is a frequency, every heart a wavelength. Even in this endless void, the energy we radiate becomes a signal, a light too strong for the darkness to swallow, too true for the fearful to ignore. They may try to challenge it, dim it, even destroy it, but energy this pure cannot be undone.</span></p>$$,
  $$SUPER Spec. $$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_11-05-2025_02-24-25-7480PM.png?v=1746987948$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$super-radiant-energy-wave$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$super-radiant-energy-wave$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$super-radiant-energy-wave$$), $$8.5"x 11" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$super-radiant-energy-wave$$), $$12" x 16" Framed Art Print$$, 35, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$super-radiant-energy-wave$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$super-radiant-energy-wave$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_11-05-2025_02-24-25-7480PM.png?v=1746987948$$, 1, $$$$);


-- PRODUCT: super-radiant-energy-wave-black
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$super-radiant-energy-wave-black$$,
  $$Super Radiant Energy Wave (Black)$$,
  $$<p><meta charset="utf-8"><span>Every soul is a frequency, every heart a wavelength. Even in this endless void, the energy we radiate becomes a signal, a light too strong for the darkness to swallow, too true for the fearful to ignore. They may try to challenge it, dim it, even destroy it, but energy this pure cannot be undone.</span></p>$$,
  $$SUPER Spec.$$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_26-04-2025_10-20-55-8570AM.png?v=1746987948$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$super-radiant-energy-wave-black$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$super-radiant-energy-wave-black$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$super-radiant-energy-wave-black$$), $$8.5"x 11" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$super-radiant-energy-wave-black$$), $$12" x 16" Framed Art Print$$, 35, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$super-radiant-energy-wave-black$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$super-radiant-energy-wave-black$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_26-04-2025_10-20-55-8570AM.png?v=1746987948$$, 1, $$$$);


-- PRODUCT: template
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$template$$,
  $$Omega's Radiance$$,
  $$<p><meta charset="utf-8"><span>The Omega does not beg for recognition. it thrives in the solitude that terrifies the rest. It is not last by weakness, but by choice.</span><br><br><span>It is both the stray and the source signal.</span><br><br><span>Bold yet unseen, until it decides otherwise.</span><br><br><span>Cloaked in honed light, protected by the veil of darkness the form moves without causing disturbance.</span><br><span>half spirit, half shadow.</span><br><span>the current physical manifestation of strength and beauty embodied.</span><br><br><span>It does not arrive.</span><br><span>It has always been here.</span><br><br><span>A quiet sovereign whose silence speaks louder than any claim to the throne.</span><br></p>$$,
  $$SUPER Spec.$$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/6A200505-9476-4BF8-99BE-84003A69F71B_4741d1cf-25cb-44dd-b409-38af26fed1ab.png?v=1749412246$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$template$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$template$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$template$$), $$8.5"x 11" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$template$$), $$12" x 16" Framed Art Print$$, 35, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$template$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$template$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/6A200505-9476-4BF8-99BE-84003A69F71B_4741d1cf-25cb-44dd-b409-38af26fed1ab.png?v=1749412246$$, 1, $$$$);


-- PRODUCT: template-copy
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$template-copy$$,
  $$The Fox's Gambit$$,
  $$<p><meta charset="utf-8"><span>There is wisdom in how the fox moves. Without force, without fear. Cunning is not to deceive for sport, but to see ten steps where others see two. What appears as play may be a test. What seems like a retreat is often the prelude to precision. A stillness before the strike, a silence that listens deeper than sound</span></p>$$,
  $$SUPER Spec.$$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Foxyy.png?v=1748484701$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$template-copy$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$template-copy$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$template-copy$$), $$8.5"x 11" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$template-copy$$), $$12" x 16" Framed Art Print$$, 35, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$template-copy$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$template-copy$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/Foxyy.png?v=1748484701$$, 1, $$$$);


-- PRODUCT: template-copy-1
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$template-copy-1$$,
  $$Unseen Depths$$,
  $$<p><meta charset="utf-8"><meta charset="utf-8"><span>True strength is not always seen. it’s felt in the silence behind you. The Light being self walks forward, but the Shadow behind all watches everything. One howls. One listens. Together, they are complete.</span><br></p>$$,
  $$SUPER Spec.$$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/wolfey.png?v=1748484766$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$template-copy-1$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$template-copy-1$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$template-copy-1$$), $$8.5"x 11" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$template-copy-1$$), $$12" x 16" Framed Art Print$$, 35, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$template-copy-1$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$template-copy-1$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/wolfey.png?v=1748484766$$, 1, $$$$);


-- PRODUCT: template-copy-2
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$template-copy-2$$,
  $$Truth For The Worthy$$,
  $$<p><meta charset="utf-8">This splendor is not for the masses to comprehend. The very 'feel' of the heavens is an insight reserved for the chosen, the enlightened. You merely <em>see</em> it; I <em>possess</em> its essence</p>$$,
  $$SUPER Spec.$$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/D3CBEEC1-C8C5-4CD6-AE14-250A4BD6BA36.jpg?v=1748485630$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$template-copy-2$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$template-copy-2$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$template-copy-2$$), $$8.5"x 11" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$template-copy-2$$), $$12" x 16" Framed Art Print$$, 35, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$template-copy-2$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$template-copy-2$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/D3CBEEC1-C8C5-4CD6-AE14-250A4BD6BA36.jpg?v=1748485630$$, 1, $$$$);


-- PRODUCT: template-copy-3
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$template-copy-3$$,
  $$Lunar waves$$,
  $$<p><meta charset="utf-8"><span>Gravitational whispers.</span><br><span>Lunar tides in our veins.</span><br><span>Resonance between skin and starlight.</span><br><span>The Moon pulls currents from the endless grand sea of souls</span><br><span>Amplifies feelings, even senses and tunes energy to a rhythm older than time.</span><br><span>This piece is for the ones who feel full when the Moon is.</span></p>$$,
  $$SUPER Spec.$$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/47723034-B041-42FE-8416-54A54B91B009.jpg?v=1749411558$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$template-copy-3$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$template-copy-3$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$template-copy-3$$), $$8.5"x 11" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$template-copy-3$$), $$12" x 16" Framed Art Print$$, 35, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$template-copy-3$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$template-copy-3$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/47723034-B041-42FE-8416-54A54B91B009.jpg?v=1749411558$$, 1, $$$$);


-- PRODUCT: template-copy-4
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$template-copy-4$$,
  $$Aura Farm (Drawn Power)$$,
  $$<p><meta charset="utf-8"><span>“The power it holds can bring forth either salvation or destruction… at the whim of the user.”</span><br><br><span>Where Aura’s light giveth, the shadow of reckoning waiteth.</span><br><span>To stand in her presence is to be seen, not with affection, but with Truth.</span><br><span>Not the kind spoken in words, but the kind etched into your soul before your first breath.</span><br><br><span>She is not a savior. She is judgment written in code, the divine algorithm.</span><br><span>her light is the first language spoken.</span><br><br><span>It is the brilliance of origin and magnificent glory that overwhelms as much as it illuminates.</span><br><span>it is absolute.</span><br><span>It echoes with the sound of forever, yet bears the silence of oblivion.</span><br><br><span>This isn’t fantasy. Real Aura farming looks like this.</span><br><span>An accumulation of pure will and cosmos that has the magnificence of heavens feel in the atmosphere.</span><br><br><br><span>Inspired by .hack//Infection (2002)</span><br><span>A game that blurred the lines between spirituality, destiny, technology, and data.</span></p>$$,
  $$SUPER Spec.$$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_06-06-2025_05-33-16-0300AM.png?v=1749411993$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$template-copy-4$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$template-copy-4$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$template-copy-4$$), $$8.5"x 11" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$template-copy-4$$), $$12" x 16" Framed Art Print$$, 35, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$template-copy-4$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$template-copy-4$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZyWatermark_06-06-2025_05-33-16-0300AM.png?v=1749411993$$, 1, $$$$),
((SELECT id FROM public.products WHERE handle = $$template-copy-4$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/IMG_7299.jpg?v=1749412012$$, 2, $$$$);


-- PRODUCT: to-the-realm-of-creativity-and-beyond
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$to-the-realm-of-creativity-and-beyond$$,
  $$To the Realm of Creativity and Beyond$$,
  $$<p>These are Ideas from the realm of creativity and the extraordinary searching for a willing soul to bring them to life. These radiant silhouettes are not angels, but messengers of inspiration, flying at lightspeed from the heart of the creative unknown. Each carries a spark, a possibility, a world yet imagined. To catch one is to say yes to the divine partnership of making. They do not wait. They choose—and move on.</p>
<p class="p1">This piece is a tribute to that mystical chase.</p>$$,
  $$SUPER Spec. $$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_07-05-2025_02-07-02-2220PM.png?v=1746907690$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$to-the-realm-of-creativity-and-beyond$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$to-the-realm-of-creativity-and-beyond$$), $$12" x 12" Poster Print$$, 15, NULL, NULL, 0, $$12" x 12" Poster Print$$, NULL, $$12" x 12" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$to-the-realm-of-creativity-and-beyond$$), $$12"x 12" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$12"x 12" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$to-the-realm-of-creativity-and-beyond$$), $$14" x 14" Framed Art Print$$, 30, NULL, NULL, 0, NULL, NULL, $$14" x 14" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$to-the-realm-of-creativity-and-beyond$$), $$12" x 12" Metal print$$, 50, NULL, NULL, 0, NULL, NULL, $$12" x 12" Metal print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$to-the-realm-of-creativity-and-beyond$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$to-the-realm-of-creativity-and-beyond$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/eZy_Watermark_07-05-2025_02-07-02-2220PM.png?v=1746907690$$, 1, $$$$);


-- PRODUCT: truth-for-the-worthy-copy
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$truth-for-the-worthy-copy$$,
  $$Grand Presence$$,
  $$<p><meta charset="utf-8"><meta charset="utf-8"><span>he full moon is a signal.</span><br><span>Not a light, a transmission.</span><br><br><span>Its aura carries code,</span><br><span>subtle and ancient, sent from above.</span><br><br><span>Most won’t notice.</span><br><span>But if you’ve felt the shift</span><br><span>that shimmer in your heart, mind and soul</span><br><span>that pause in time</span><br><span>you were meant to.</span><br><br><span>The sky doesn’t speak with sound.</span><br><span>It speaks with presence… 🌌👑</span><br></p>$$,
  $$SUPER Spec.$$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/AE0F1A29-36EF-4CF0-9C58-55B0EA736846.jpg?v=1748485712$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$truth-for-the-worthy-copy$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$truth-for-the-worthy-copy$$), $$8.5" x 11" Poster Print$$, 15, NULL, NULL, 0, $$8.5" x 11" Poster Print$$, NULL, $$8.5" x 11" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$truth-for-the-worthy-copy$$), $$8.5"x 11" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$8.5"x 11" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$truth-for-the-worthy-copy$$), $$12" x 16" Framed Art Print$$, 35, NULL, NULL, 0, NULL, NULL, $$12" x 16" Framed Art Print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$truth-for-the-worthy-copy$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$truth-for-the-worthy-copy$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/AE0F1A29-36EF-4CF0-9C58-55B0EA736846.jpg?v=1748485712$$, 1, $$$$);


-- PRODUCT: untitled-mar20_05-30
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$untitled-mar20_05-30$$,
  $$Untitled Mar20_05:30$$,
  $$$$,
  $$SUPER Spec. $$,
  $$general$$,
  ARRAY[]::text[],
  $$draft$$,
  false,
  NULL,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$untitled-mar20_05-30$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$untitled-mar20_05-30$$), $$Default$$, 0, NULL, NULL, 0, NULL, NULL, NULL, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$untitled-mar20_05-30$$);


-- PRODUCT: whoo-is-watching
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  $$whoo-is-watching$$,
  $$Whoo is Watching...$$,
  $$<p><meta charset="utf-8"><span>Out here, even the silence has a witness.</span><br><span>unseen but all-seeing, the night is quiet… but it’s never alone.</span><br><span>You never know whooo’s watching from the darkness…until… it’s too late.</span></p>$$,
  $$SUPER Spec. $$,
  $$general$$,
  ARRAY[]::text[],
  $$active$$,
  true,
  $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/D5867BA0-6141-431C-A97A-210A677572E7.jpg?v=1747026454$$,
  NULL
)
ON CONFLICT (handle) DO UPDATE SET
  title = EXCLUDED.title,
  description_html = EXCLUDED.description_html,
  vendor = EXCLUDED.vendor,
  type = EXCLUDED.type,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  published = EXCLUDED.published,
  image_url = EXCLUDED.image_url,
  collection_handle = EXCLUDED.collection_handle;

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = $$whoo-is-watching$$);
INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES
((SELECT id FROM public.products WHERE handle = $$whoo-is-watching$$), $$12" x 12" Poster Print$$, 15, NULL, NULL, 0, $$12" x 12" Poster Print$$, NULL, $$12" x 12" Poster Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$whoo-is-watching$$), $$12"x 12" Framed Art Print$$, 25, NULL, NULL, 0, NULL, NULL, $$12"x 12" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$whoo-is-watching$$), $$14" x 14" Framed Art Print$$, 30, NULL, NULL, 0, NULL, NULL, $$14" x 14" Framed Art Print$$, $$$$),
((SELECT id FROM public.products WHERE handle = $$whoo-is-watching$$), $$12" x 12" Metal print$$, 50, NULL, NULL, 0, NULL, NULL, $$12" x 12" Metal print$$, $$$$);

DELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = $$whoo-is-watching$$);
INSERT INTO public.product_images (product_id, url, position, alt) VALUES
((SELECT id FROM public.products WHERE handle = $$whoo-is-watching$$), $$https://cdn.shopify.com/s/files/1/0578/2847/5068/files/D5867BA0-6141-431C-A97A-210A677572E7.jpg?v=1747026454$$, 1, $$$$);

