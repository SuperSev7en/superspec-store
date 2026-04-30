import type { Metadata } from "next";
import { getProductByHandle } from "@/lib/catalog/catalog";
import {
  getProductByHandleFromSupabase,
  loadCatalogFromSupabase,
} from "@/lib/catalog/supabaseCatalog";
import { stripHtml } from "@/lib/catalog/htmlUtils";
import { ProductDetailBase } from "@/components/store/ProductDetailBase";
import { ProductImageFrame } from "@/components/store/ProductImageFrame";
import { ProductPurchaseClient } from "@/components/store/ProductPurchaseClient";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product =
    (await getProductByHandleFromSupabase(handle)) ??
    (await getProductByHandle(handle));
  if (!product) {
    return { title: "Not found" };
  }
  const description =
    product.seoDescription?.trim() ||
    stripHtml(product.descriptionHtml).slice(0, 160) ||
    undefined;
  return {
    title: product.seoTitle?.trim() || product.title,
    description,
    openGraph: {
      title: product.seoTitle?.trim() || product.title,
      description,
      type: "article",
      images: product.images.length > 0 ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product =
    (await getProductByHandleFromSupabase(handle)) ??
    (await getProductByHandle(handle));

  if (!product) {
    return (
      <div className="Container">
        <header className="PageHeader">
          <h1 className="PageHeader__Title Heading u-h1">Not found</h1>
        </header>
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [];
  const purchaseVariants = product.variants.map((v) => ({
    id: v.id,
    title: v.title,
    price: v.price,
    compareAtPrice: v.compareAtPrice ?? null,
  }));
  const canPurchase = purchaseVariants.length > 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: stripHtml(product.descriptionHtml),
    image: product.images,
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      highPrice: Math.max(...purchaseVariants.map((v) => v.price)),
      lowPrice: Math.min(...purchaseVariants.map((v) => v.price)),
    },
  };

  const catalog = await loadCatalogFromSupabase();
  const relatedProducts = catalog
    .filter((p) => p.handle !== product.handle)
    .slice(0, 4);

  return (
    <div className="Product">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailBase
        product={product as any}
        relatedProducts={relatedProducts}
        collectionTitle={product.vendor || "SUPER Spec."}
      />
    </div>
  );
}
