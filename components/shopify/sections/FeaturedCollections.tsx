import { getProductsForCollectionHandle } from "@/lib/catalog/catalog";
import { getProductsForCollectionHandleFromSupabase } from "@/lib/catalog/supabaseCatalog";
import {
  FeaturedCollectionsClient,
  type FeaturedCollectionTab,
} from "@/components/shopify/sections/FeaturedCollectionsClient";

export async function FeaturedCollections({
  id,
  settings,
  blocks,
  blockOrder,
}: {
  id: string;
  settings: Record<string, unknown>;
  blocks: Record<string, { type?: string; settings?: Record<string, unknown> }>;
  blockOrder: string[];
}) {
  const layoutMode =
    typeof settings.layout_mode === "string" ? settings.layout_mode : "grid";
  const showProductInfo = Boolean(settings.show_product_info ?? true);
  const showVendor = Boolean(settings.show_vendor ?? false);
  const mobileCols = String(settings.grid_mobile_items_per_row ?? "2");
  const desktopCols = String(settings.grid_desktop_items_per_row ?? "4");
  const sectionTitle = typeof settings.title === "string" ? settings.title : "";

  const tabs: FeaturedCollectionTab[] = [];

  for (const bid of blockOrder) {
    const block = blocks[bid];
    if (!block?.settings) continue;
    const handle =
      typeof block.settings.collection === "string" &&
      block.settings.collection.trim() !== ""
        ? block.settings.collection.trim()
        : "all";
    const limit = Number(block.settings.grid_items_count) || 8;
    const blockTitle =
      typeof block.settings.title === "string"
        ? block.settings.title.trim()
        : "";
    const products = handle
      ? await getProductsForCollectionHandleFromSupabase(handle, limit)
      : [];

    if (products.length > 0) {
      const displayTitle =
        blockTitle ||
        (handle
          ? handle.replace(/-/g, " ")
          : sectionTitle || "Featured collection");

      tabs.push({
        blockId: bid,
        title: displayTitle.replace(/\b\w/g, (c) => c.toUpperCase()),
        products,
        limit,
        layoutMode,
        mobileCols,
        desktopCols,
        showProductInfo,
        showVendor,
      });
    }
  }

  if (tabs.length === 0) return null;

  return (
    <FeaturedCollectionsClient
      id={id}
      sectionTitle={sectionTitle}
      tabs={tabs}
    />
  );
}
