'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Heart, MapPin, User, LogOut } from 'lucide-react';

const NAV = [
  { href: '/account/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/account/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/account/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin },
  { href: '/account/profile', label: 'Profile', icon: User },
];

export function AccountShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/');
    router.refresh();
  };

  return (
    <div className="Container" style={{ padding: '40px 20px', display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {/* Sidebar */}
      <aside style={{ flex: '0 0 220px', position: 'sticky', top: 100 }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link key={href} href={href} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 6,
                background: active ? 'var(--text-color)' : 'transparent',
                color: active ? 'var(--background)' : 'var(--text-color)',
                textDecoration: 'none', fontSize: 14, fontWeight: active ? 600 : 400,
                transition: 'background 0.15s',
              }}>
                <Icon style={{ width: 18, height: 18 }} />
                {label}
              </Link>
            );
          })}
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 6,
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'var(--text-light-color)', fontSize: 14, textAlign: 'left', marginTop: 8,
            transition: 'color 0.15s',
          }}>
            <LogOut style={{ width: 18, height: 18 }} />
            Sign Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: '1 1 0', minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}
