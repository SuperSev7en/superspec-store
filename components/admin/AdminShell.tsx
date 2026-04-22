'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  BarChart3,
  FileClock,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { getBrowserSupabase } from '@/lib/supabaseBrowser';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Discounts', href: '/admin/discounts', icon: Tag },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Audit log', href: '/admin/audit', icon: FileClock },
  ];

  function navItemActive(href: string) {
    if (href === '/admin') return pathname === '/admin';
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  async function onLogout() {
    const supabase = getBrowserSupabase();
    await supabase.auth.signOut();
    router.replace('/');
    router.refresh();
  }

  const sidebar = (
    <div className="flex flex-col flex-grow bg-white border-r border-gray-200 h-full">
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">SUPER Spec</h1>
        <button
          type="button"
          className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          aria-label="Close menu"
          onClick={() => setMobileNavOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = navItemActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileNavOpen(false)}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-200 p-4">
        <button
          type="button"
          onClick={() => {
            setMobileNavOpen(false);
            void onLogout();
          }}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4">
        <span className="text-lg font-bold text-gray-900">Admin</span>
        <button
          type="button"
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
          aria-label="Open menu"
          onClick={() => setMobileNavOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileNavOpen ? (
        <button
          type="button"
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          aria-label="Close menu"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}

      {/* Sidebar: drawer on small screens, fixed column on md+ */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-200 ease-out md:translate-x-0 ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {sidebar}
      </aside>

      <div className="flex flex-1 flex-col pt-14 md:pt-0 md:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
