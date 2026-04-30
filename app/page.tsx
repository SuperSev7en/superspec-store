import { getHomePageSectionOrder, getThemeSections } from '@/lib/shopify/themeConfig';
import { CollectionList } from '@/components/shopify/sections/CollectionList';
import { Slideshow } from '@/components/shopify/sections/Slideshow';
import { FeaturedCollections } from '@/components/shopify/sections/FeaturedCollections';
import { FeaturedProduct } from '@/components/shopify/sections/FeaturedProduct';
import { Timeline } from '@/components/shopify/sections/Timeline';
import { BlogPosts } from '@/components/shopify/sections/BlogPosts';
import { ShopTheLook } from '@/components/shopify/sections/ShopTheLook';
import { Marquee } from '@/components/shopify/sections/Marquee';
import { Newsletter } from '@/components/shopify/sections/Newsletter';

import { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'SUPER Spec - Home',
    description: 'Welcome to SUPER Spec. Shop apparel, prints, and engineered goods.',
    openGraph: {
      title: 'SUPER Spec - Home',
      description: 'Welcome to SUPER Spec. Shop apparel, prints, and engineered goods.',
      type: 'website',
    },
  };
}
type SectionData = {
  type?: string;
  disabled?: boolean;
  settings?: Record<string, unknown>;
  blocks?: Record<string, { type?: string; settings?: Record<string, unknown> }>;
  block_order?: string[];
};

async function renderSection(key: string, section: SectionData | undefined) {
  if (!section) return null;
  if (section.disabled === true) return null;

  const type = section.type ?? key;
  const settings = section.settings;
  const blocks = section.blocks;
  const blockOrder = section.block_order;

  if (type === 'slideshow') {
    if (!settings || !blocks || !Array.isArray(blockOrder)) return null;
    return <Slideshow id={key} settings={settings} blocks={blocks} blockOrder={blockOrder} />;
  }

  if (type === 'collection-list') {
    if (!settings || !blocks || !Array.isArray(blockOrder)) return null;
    return (
      <CollectionList
        id={key}
        settings={settings}
        blocks={blocks}
        blockOrder={blockOrder}
        template="index"
      />
    );
  }

  if (type === 'featured-collections') {
    if (!settings || !blocks || !Array.isArray(blockOrder)) return null;
    return <FeaturedCollections id={key} settings={settings} blocks={blocks} blockOrder={blockOrder} />;
  }

  if (type === 'featured-product') {
    if (!settings) return null;
    return <FeaturedProduct id={key} settings={settings} />;
  }

  if (type === 'timeline') {
    if (!blocks || !Array.isArray(blockOrder)) return null;
    const textColor =
      typeof settings?.text_color === 'string' ? settings.text_color : '#ffffff';
    return <Timeline id={key} textColor={textColor} blocks={blocks} blockOrder={blockOrder} />;
  }

  if (type === 'blog-posts') {
    if (!settings) return null;
    return <BlogPosts id={key} settings={settings} />;
  }

  if (type === 'shop-the-look') {
    if (!settings || !blocks || !Array.isArray(blockOrder)) return null;
    return <ShopTheLook id={key} settings={settings} blocks={blocks} blockOrder={blockOrder} />;
  }

  if (type === 'marquee') {
    if (!settings) return null;
    return <Marquee id={key} settings={settings} />;
  }

  if (type === 'newsletter') {
    if (!settings) return null;
    return <Newsletter id={key} settings={settings} />;
  }

  return null;
}

export default async function HomePage() {
  const sections = (await getThemeSections()) as Record<string, SectionData>;
  const order = await getHomePageSectionOrder();

  const fragments = await Promise.all(
    order.map(async (key) => {
      const node = await renderSection(key, sections[key]);
      return <div key={key}>{node}</div>;
    }),
  );

  return <div>{fragments}</div>;
}
