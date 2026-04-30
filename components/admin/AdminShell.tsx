"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Archive,
  FileText,
  Settings,
} from "lucide-react";
import { getBrowserSupabase } from "@/lib/supabaseBrowser";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Inventory", href: "/admin/inventory", icon: Archive },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Discounts", href: "/admin/discounts", icon: Tag },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Pages", href: "/admin/pages", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  function navItemActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  async function onLogout() {
    const supabase = getBrowserSupabase();
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  }

  const sidebar = (
    <div className="flex flex-col flex-grow bg-[#f1f2f4] border-r border-[#e1e3e5] h-full shadow-sm">
      <div className="flex items-center justify-between h-14 px-4 border-b border-[#e1e3e5] bg-white">
        <h1 className="text-lg font-bold text-[#1a1a1a] tracking-tight flex items-center">
          <div className="w-7 h-7 bg-black rounded-md mr-2 flex items-center justify-center text-white text-xs font-black">
            S
          </div>
          SUPER Spec.
        </h1>
        <button
          type="button"
          className="md:hidden rounded-md p-2 text-[#616a75] hover:bg-[#ebebeb] hover:text-[#1a1a1a]"
          aria-label="Close menu"
          onClick={() => setMobileNavOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = navItemActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileNavOpen(false)}
              className={`flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-white text-[#1a1a1a] font-semibold shadow-sm border border-[#e1e3e5]"
                  : "text-[#4a5568] hover:bg-[#ebebeb] hover:text-[#1a1a1a] font-medium"
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${isActive ? "text-[#1a1a1a]" : "text-[#616a75]"}`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-[#e1e3e5] bg-[#f8f9fa]">
        <button
          type="button"
          onClick={() => {
            setMobileNavOpen(false);
            void onLogout();
          }}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-[#4a5568] rounded-md hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-[#616a75] group-hover:text-red-600" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f6f6f7] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex h-14 items-center justify-between border-b border-[#e1e3e5] bg-white px-4">
        <span className="text-lg font-bold text-[#1a1a1a]">Admin</span>
        <button
          type="button"
          className="rounded-md p-2 text-[#616a75] hover:bg-[#ebebeb]"
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
          className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity"
          aria-label="Close menu"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {sidebar}
      </aside>

      <div className="flex flex-1 flex-col pt-14 md:pt-0 md:pl-60">
        <main className="flex-1">
          <div className="py-8">
            <div className="mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
