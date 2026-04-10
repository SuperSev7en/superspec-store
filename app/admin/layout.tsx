import type { ReactNode } from 'react';
import { AdminShell } from '@/components/admin/AdminShell';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin('/admin');
  return <AdminShell>{children}</AdminShell>;
}