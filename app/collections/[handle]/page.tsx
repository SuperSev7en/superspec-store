import { loadCatalog } from "@/lib/catalog/catalog";
import { loadCatalogFromSupabase } from "@/lib/catalog/supabaseCatalog";
import {
  ProductCatalogClient,
  type CatalogRowProduct,
} from "@/components/store/ProductCatalogClient";
import { stripHtml } from "@/lib/catalog/htmlUtils";

import type { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  let title = handle
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  if (handle === "super-speck") title = "SUPER Speck";
  if (handle === "super-spectrum") title = "SUPER Spectrum";
  return {
    title: `${title} | SUPER Spec.`,
    description: `Browse the ${title} collection at SUPER Spec.`,
    openGraph: {
      title: `${title} | SUPER Spec.`,
      description: `Shop the ${title} collection.`,
      type: "website",
    },
  };
}
/**
 * Determines if a product belongs to the SUPER Speck (clothing) collection.
 * Matches on: productType === 'Clothing', or tags containing 'clothing', 'shirts', 'super-speck', 'tee', 'apparel'.
 */
function isClothing(p: {
  productType?: string | null;
  tags: string[];
  handle: string;
  title: string;
}): boolean {
  const type = (p.productType ?? "").toLowerCase().trim();
  if (type === "clothing") return true;

  const clothingKeywords = [
    "clothing",
    "shirts",
    "super-speck",
    "tee",
    "apparel",
    "t-shirt",
  ];
  const normalizedTags = p.tags.map((t) => t.toLowerCase().trim());
  if (normalizedTags.some((t) => clothingKeywords.includes(t))) return true;

  // Handle-based heuristic: many clothing items have 'tee' or 'draft' in handle from Shopify
  const handle = p.handle.toLowerCase();
  if (handle.includes("-tee") || handle.endsWith("-tee")) return true;

  return false;
}

/**
 * Determines if a product belongs to the SUPER Spectrum (art) collection.
 * Matches on: productType === 'Art Print', or tags containing 'art', 'print', 'super-spectrum'.
 * Also catches art products with no type/tags by checking if they are NOT clothing.
 */
function isArt(p: {
  productType?: string | null;
  tags: string[];
  handle: string;
  title: string;
}): boolean {
  const type = (p.productType ?? "").toLowerCase().trim();
  if (type === "art print" || type === "art") return true;

  const artKeywords = [
    "art",
    "print",
    "super-spectrum",
    "limited edition",
    "fine art",
    "poster",
  ];
  const normalizedTags = p.tags.map((t) => t.toLowerCase().trim());
  if (normalizedTags.some((t) => artKeywords.includes(t))) return true;

  // If it has NO productType at all and is NOT clothing, it's likely art
  // (most of the user's untagged products are art prints)
  if (!type && !isClothing(p)) return true;

  return false;
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  const fromDb = await loadCatalogFromSupabase();
  const allProducts = fromDb.length > 0 ? fromDb : await loadCatalog();

  let filtered = allProducts;
  let title = handle
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  if (handle === "super-speck" || handle === "clothing") {
    title = "SUPER Speck";
    filtered = allProducts.filter(isClothing);
  } else if (handle === "super-spectrum" || handle === "art") {
    title = "SUPER Spectrum";
    filtered = allProducts.filter(isArt);
  } else if (handle === "super-specification" || handle === "engineered") {
    title = "SUPER Specification";
    filtered = allProducts.filter((p) => {
      const type = (p.productType ?? "").toLowerCase().trim();
      return (
        type === "engineered" ||
        type === "equipment" ||
        type === "hardware" ||
        p.tags.some((t) => t.toLowerCase() === "engineered")
      );
    });
  }

  const products: CatalogRowProduct[] = filtered.map((product) => {
    const excerpt = stripHtml(product.descriptionHtml);
    const short = excerpt.length > 180 ? `${excerpt.slice(0, 180)}…` : excerpt;
    return { ...product, listingExcerpt: short || undefined };
  });

  return (
    <div className="Collection">
      <div className="Container">
        <header className="PageHeader">
          <div className="SectionHeader SectionHeader--center">
            <h1 className="SectionHeader__Heading Heading u-h1">{title}</h1>
          </div>
        </header>

        <ProductCatalogClient
          products={products}
          layout="shop"
          collectionCellClassName="Grid__Cell 1/2--phone 1/2--tablet 1/4--lap-and-up"
          collectionType={
            handle.includes("speck") || handle === "clothing"
              ? "clothing"
              : handle.includes("spectrum") || handle === "art"
                ? "art"
                : handle.includes("specification") || handle === "engineered"
                  ? "engineered"
                  : "all"
          }
        />
      </div>
    </div>
  );
}
