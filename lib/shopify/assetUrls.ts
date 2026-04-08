export function resolveShopifyAssetUrl(input: string | null | undefined) {
  if (!input) return null;

  // Shopify theme editor stores uploaded files as `shopify://shop_images/<filename>`
  if (input.startsWith('shopify://shop_images/')) {
    const filename = input.replace('shopify://shop_images/', '');
    return `/assets/${filename}`;
  }

  // If the value is already a relative/absolute URL, keep it.
  return input;
}

/** Theme settings URLs: collections, products, or uploaded images */
export function resolveShopifyLink(input: string | null | undefined): string {
  if (!input) return '#';
  if (input.startsWith('shopify://shop_images/')) {
    return resolveShopifyAssetUrl(input) ?? '#';
  }
  if (input.startsWith('shopify://collections/')) {
    const handle = input.replace('shopify://collections/', '');
    return `/collections/${handle}`;
  }
  if (input.startsWith('shopify://products/')) {
    const handle = input.replace('shopify://products/', '');
    return `/products/${handle}`;
  }
  return input;
}

