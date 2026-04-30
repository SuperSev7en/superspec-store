const fs = require('fs');
const { parse } = require('csv-parse/sync');

const inputPath = '/Users/superroygbiv/Desktop/SuperSpec.store/shopify files copy/products_export 3.csv';
const outputPath = '/Users/superroygbiv/Desktop/SuperSpec.store/supabase/IMPORT_PRODUCTS.sql';

const rawCsv = fs.readFileSync(inputPath, 'utf8');
const records = parse(rawCsv, {
  columns: true,
  skip_empty_lines: true,
});

// Group by handle
const productsMap = new Map();

const renames = {
  'copy-of-copy-of-copy-of-draft': 'super-angel-wings',
  'copy-of-copy-of-draft': 'super-demon-wings',
  'copy-of-draft': 'super-heart-angel-wings',
  'copy-of-super-butterfly-tee': '4-point-super-star',
  'aura-the-endless-march-copy': 'aura-endless-march',
  'aura-the-endless-march-copy-1': 'aura-eclipse-of-fate',
  'aura-the-endless-march-copy-2': 'azure-spirit',
  'auras-brilliant-night-copy': 'auras-brilliant-night',
  'aura-farm-drawn-power-copy': 'eyes-that-measure',
  'glow-rib-cage': 'super-glow-rib-cage'
};

for (const row of records) {
  let handle = row['Handle'] || '';
  if (!handle) continue;
  
  if (renames[handle]) {
    handle = renames[handle];
  }

  if (!productsMap.has(handle)) {
    productsMap.set(handle, {
      handle,
      title: row['Title'] || '',
      bodyHtml: row['Body (HTML)'] || '',
      vendor: row['Vendor'] || '',
      type: row['Type'] || '',
      tags: row['Tags'] ? row['Tags'].split(',').map(t => t.trim()).filter(Boolean) : [],
      published: row['Published']?.toLowerCase() === 'true',
      status: row['Status']?.toLowerCase() === 'active' || row['Published']?.toLowerCase() === 'true' ? 'active' : 'draft',
      variants: [],
      images: []
    });
  }

  const prod = productsMap.get(handle);

  // Use the title from the first row of this handle if current is empty
  if (row['Title'] && !prod.title) prod.title = row['Title'];
  if (row['Body (HTML)'] && !prod.bodyHtml) prod.bodyHtml = row['Body (HTML)'];
  if (row['Vendor'] && !prod.vendor) prod.vendor = row['Vendor'];
  if (row['Type'] && !prod.type) prod.type = row['Type'];
  if (row['Tags'] && prod.tags.length === 0) {
    prod.tags = row['Tags'].split(',').map(t => t.trim()).filter(Boolean);
  }

  // Parse Variant
  const price = parseFloat(row['Variant Price']);
  if (!isNaN(price)) {
    const o1Name = row['Option1 Name'] || '';
    const o1Val = row['Option1 Value'] || '';
    const o2Name = row['Option2 Name'] || '';
    const o2Val = row['Option2 Value'] || '';
    const o3Name = row['Option3 Name'] || '';
    const o3Val = row['Option3 Value'] || '';

    let vTitleParts = [];
    if (o1Val && o1Val !== 'Default Title') vTitleParts.push(o1Val);
    if (o2Val && o2Val !== 'Default Title') vTitleParts.push(o2Val);
    if (o3Val && o3Val !== 'Default Title') vTitleParts.push(o3Val);
    const vTitle = vTitleParts.length > 0 ? vTitleParts.join(' / ') : 'Default';

    let size = null;
    let color = null;
    const assignOption = (name, val) => {
      if (name.toLowerCase() === 'size') size = val;
      if (name.toLowerCase() === 'color') color = val;
    };
    assignOption(o1Name, o1Val);
    assignOption(o2Name, o2Val);
    assignOption(o3Name, o3Val);

    prod.variants.push({
      title: vTitle,
      price: price,
      compare_at_price: parseFloat(row['Variant Compare At Price']) || null,
      sku: row['Variant SKU'] || null,
      inventory: parseInt(row['Variant Inventory Qty']) || 0,
      size,
      color,
      option1: o1Val !== 'Default Title' ? o1Val : null,
      option2: o2Val !== 'Default Title' ? o2Val : null,
    });
  }

  // Parse Image
  const imgSrc = row['Image Src'];
  if (imgSrc) {
    prod.images.push({
      url: imgSrc,
      position: parseInt(row['Image Position']) || prod.images.length + 1,
      alt: row['Image Alt Text'] || ''
    });
  }
}

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "$$" + String(str) + "$$";
}

let sql = `-- ============================================================
-- SUPER Spec. — SHOPIFY CSV IMPORT SCRIPT
-- Auto-generated from products_export 3.csv
-- ============================================================

INSERT INTO public.collections (handle, title, description) VALUES
  ('super-spectrum', 'SUPER Spectrum', 'Limited edition art prints'),
  ('super-speck', 'SUPER Speck', 'Premium apparel & clothing'),
  ('super-specification', 'SUPER Specification', 'Precision engineered goods')
ON CONFLICT (handle) DO NOTHING;

`;

for (const prod of productsMap.values()) {
  // Determine collection logic based on prompt
  let collectionHandle = null;
  let finalType = 'general';
  
  const typeLower = prod.type.toLowerCase();
  const tagsLower = prod.tags.map(t => t.toLowerCase());

  if (typeLower === 'clothing' || tagsLower.includes('clothing') || tagsLower.includes('apparel')) {
    collectionHandle = 'super-speck';
    finalType = 'clothing';
  } else if (typeLower === 'art' || tagsLower.includes('art') || tagsLower.includes('print')) {
    collectionHandle = 'super-spectrum';
    finalType = 'art';
  } else if (typeLower === 'engineered') {
    collectionHandle = 'super-specification';
    finalType = 'engineered';
  }

  // Image URL is first image
  prod.images.sort((a, b) => a.position - b.position);
  const mainImage = prod.images.length > 0 ? prod.images[0].url : null;

  const tagsArray = "ARRAY[" + prod.tags.map(t => escapeSql(t)).join(", ") + "]::text[]";

  sql += `
-- PRODUCT: ${prod.handle}
INSERT INTO public.products (handle, title, description_html, vendor, type, tags, status, published, image_url, collection_handle)
VALUES (
  ${escapeSql(prod.handle)},
  ${escapeSql(prod.title)},
  ${escapeSql(prod.bodyHtml)},
  ${escapeSql(prod.vendor)},
  ${escapeSql(finalType)},
  ${tagsArray},
  ${escapeSql(prod.status)},
  ${prod.published},
  ${escapeSql(mainImage)},
  ${escapeSql(collectionHandle)}
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

DELETE FROM public.variants WHERE product_id = (SELECT id FROM public.products WHERE handle = ${escapeSql(prod.handle)});
`;

  if (prod.variants.length > 0) {
    const varRows = prod.variants.map(v => {
      return `((SELECT id FROM public.products WHERE handle = ${escapeSql(prod.handle)}), ${escapeSql(v.title)}, ${v.price}, ${v.compare_at_price || 'NULL'}, ${escapeSql(v.sku)}, ${v.inventory}, ${escapeSql(v.size)}, ${escapeSql(v.color)}, ${escapeSql(v.option1)}, ${escapeSql(v.option2)})`;
    });
    sql += `INSERT INTO public.variants (product_id, title, price, compare_at_price, sku, inventory_quantity, size, color, option1, option2) VALUES\n${varRows.join(',\n')};\n`;
  }

  sql += `\nDELETE FROM public.product_images WHERE product_id = (SELECT id FROM public.products WHERE handle = ${escapeSql(prod.handle)});\n`;

  if (prod.images.length > 0) {
    const imgRows = prod.images.map(i => {
      return `((SELECT id FROM public.products WHERE handle = ${escapeSql(prod.handle)}), ${escapeSql(i.url)}, ${i.position}, ${escapeSql(i.alt)})`;
    });
    sql += `INSERT INTO public.product_images (product_id, url, position, alt) VALUES\n${imgRows.join(',\n')};\n`;
  }

  sql += `\n`;
}

fs.writeFileSync(outputPath, sql);
console.log('Successfully generated ' + outputPath);
