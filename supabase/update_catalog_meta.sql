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
