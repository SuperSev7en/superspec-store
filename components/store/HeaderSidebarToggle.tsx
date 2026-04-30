'use client';

import { useState } from 'react';
import { Icon } from '@/components/shopify/icons/Icon';
import { SidebarMenu } from '@/components/shopify/header/SidebarMenu';
import { MAIN_NAV_LINKS } from '@/lib/siteNavigation';

export function HeaderSidebarToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="Header__Icon Icon-Wrapper Icon-Wrapper--clickable hidden-desk"
        aria-expanded={isOpen}
        aria-label="Open navigation"
        onClick={() => setIsOpen(true)}
      >
        <span className="hidden-tablet-and-up">
          <Icon icon="nav" />
        </span>
        <span className="hidden-phone">
          <Icon icon="nav-desktop" />
        </span>
      </button>

      <SidebarMenu isOpen={isOpen} onClose={() => setIsOpen(false)} menu={MAIN_NAV_LINKS} />
    </>
  );
}
