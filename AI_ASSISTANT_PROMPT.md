# SuperSpec.store Shopify Migration Fix Prompt
## Complete Context for AI Assistant

### 🚨 Critical Issues To Fix:
1. **HYDRATION ERROR**: `<html className="no-js" lang="en">` mismatches client-side JavaScript that changes it to `js supports-sticky supports-hover`
2. **PRODUCT IMAGES NOT DISPLAYING**: All product pages show broken images / 404 errors
3. **PRODUCT DESCRIPTION CUTOFF**: Product description gets clipped behind footer
4. **404 ERRORS**: Missing assets (lightspeed_2022.png etc)

---

### 📂 Relevant Project Files & Current State:

| File Path | Purpose | Known Issue |
|-----------|---------|-------------|
| `app/layout.tsx` | Root layout | Contains `className="no-js"` on html tag |
| `app/products/[handle]/page.tsx` | Product detail page | Image loading broken, description layout issue |
| `components/store/ProductImageFrame.tsx` | Product image component | Not correctly using local image paths |
| `lib/catalog/catalog.ts` | CSV product data loader | Loads product data including images |
| `lib/catalog/htmlUtils.ts` | HTML description sanitizer | May be truncating content |
| `public/assets/product-images/manifest.json` | Image mapping | Contains 222 downloaded product images |
| `scripts/download-product-images.mjs` | Image download script | Already downloaded all images successfully |

---

### ✅ What Is Already Working:
- ✅ All product images downloaded to `/public/assets/product-images/`
- ✅ Manifest file maps Shopify CDN urls to local paths
- ✅ Product CSV data is fully parsed
- ✅ Catalog loading system works
- ✅ `npm run dev` runs successfully on port 3001

---

### 🛠 Step-by-Step Implementation Plan:

#### 1. FIX HYDRATION ERROR FIRST
**Problem**: Server renders `<html className="no-js">` but client JavaScript immediately modifies this causing React hydration mismatch

**Solution**:
- Remove `className="no-js"` from `<html>` tag in `app/layout.tsx`
- OR Add `suppressHydrationWarning` to the html tag
- OR Move the class replacement logic to run **before** React hydrates

#### 2. FIX PRODUCT IMAGES
**Problem**: ProductImageFrame component is not properly mapping Shopify urls to local paths using the manifest

**Solution**:
- In `ProductImageFrame.tsx` implement the same manifest lookup logic from `lib/catalog/catalog.ts`
- Add `manifestLookup()` and `mapImageUrl()` functions
- Ensure images use `/assets/product-images/` paths not external CDN urls
- Verify image urls actually resolve correctly in browser

#### 3. FIX PRODUCT DESCRIPTION CUTOFF
**Problem**: Product description container has insufficient height / wrong z-index / overlapped by footer

**Solution**:
- Check CSS for product description container
- Ensure proper spacing, min-height, overflow settings
- Add `padding-bottom` equal to footer height
- Verify `z-index` stacking order

#### 4. FIX MISSING ASSETS
**Problem**: 404 errors for `lightspeed_2022.png` and other missing assets

**Solution**:
- Find placeholder or remove references to missing assets
- Add proper fallbacks for missing images

---

### 🎯 Verification Checklist:
- [ ] No hydration warnings in browser console
- [ ] Product images load correctly on all product pages
- [ ] Product description is fully visible, no cutoff
- [ ] No 404 errors for assets
- [ ] All product pages render without errors
- [ ] Site functions correctly on mobile and desktop

---

### ⚠️ Important Notes:
- This is a Next.js 15.5.14 App Router project
- All Shopify theme code has been extracted
- Images are already downloaded - do NOT re-run download script
- Focus only on fixing the 4 issues listed above
- Test each fix incrementally
- Do not rewrite entire components unless absolutely necessary

---

### 💡 Hints:
The manifest lookup logic is already perfectly implemented in `lib/catalog/catalog.ts` lines 69-80. Just reuse that exact logic for ProductImageFrame.