'use client';

import { usePathname } from 'next/navigation';
import { AnnouncementBar } from '@/components/shopify/sections/AnnouncementBar';

export function AnnouncementBarGate({ id, settings }: { id: string; settings: Record<string, unknown> }) {
  const pathname = usePathname();
  const template = pathname === '/' ? 'index' : 'other';
  return <AnnouncementBar id={id} settings={settings} template={template} />;
}
