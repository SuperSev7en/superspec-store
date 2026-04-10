import { loadCatalog } from './lib/catalog/catalog';

async function testCatalog() {
  console.log('Loading catalog...');
  const products = await loadCatalog();
  console.log(`Loaded ${products.length} products`);
  
  // Show first few products
  console.log('\nFirst 5 products:');
  products.slice(0, 5).forEach((p, i) => {
    console.log(`${i + 1}. ${p.title} (${p.handle}) - ${p.variants.length} variants`);
  });
  
  // Show product with most variants
  const productWithMostVariants = products.reduce((max, p) => 
    p.variants.length > max.variants.length ? p : max
  );
  console.log('\nProduct with most variants:');
  console.log(`${productWithMostVariants.title} - ${productWithMostVariants.variants.length} variants`);
  
  // Show variant details for first product
  if (products.length > 0) {
    console.log('\nVariants for first product:');
    products[0].variants.forEach((v, i) => {
      console.log(`${i + 1}. ${v.title} - $${v.price} (SKU: ${v.sku ?? 'N/A'})`);
    });
  }
}

testCatalog().catch(console.error);