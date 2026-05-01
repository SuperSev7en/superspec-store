"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/shopify/icons/Icon";
import { MAIN_NAV_LINKS } from "@/lib/siteNavigation";

export function SidebarMenu({
  isOpen,
  onClose,
  menu = MAIN_NAV_LINKS,
}: {
  isOpen: boolean;
  onClose: () => void;
  menu?: readonly { title: string; url: string }[];
}) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Trap focus
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;

    const focusableElements = drawerRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleTab);
    firstElement?.focus();

    return () => window.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="PageOverlay is-visible"
        onClick={onClose}
        style={{ zIndex: 100 }}
      />
      <div
        ref={drawerRef}
        id="sidebar-menu"
        className="Drawer Drawer--fromLeft"
        aria-hidden={!isOpen}
        role="dialog"
        tabIndex={-1}
        style={{
          zIndex: 101,
          transform: isOpen ? "translateX(0)" : undefined,
          visibility: isOpen ? "visible" : undefined,
        }}
      >
        <header className="Drawer__Header" data-drawer-animated-left>
          <button
            className="Drawer__Close Icon-Wrapper--clickable"
            data-action="close-drawer"
            data-drawer-id="sidebar-menu"
            aria-label="Close navigation"
            onClick={onClose}
          >
            <Icon icon="close" />
          </button>
        </header>

        <div className="Drawer__Content">
          <div
            className="Drawer__Main"
            data-drawer-animated-left
            data-scrollable
          >
            <div className="Drawer__Container">
              <nav
                className="SidebarMenu__Nav SidebarMenu__Nav--primary"
                aria-label="Sidebar navigation"
              >
                {menu.map((link) => (
                  <div key={link.url} className="Collapsible">
                    <a
                      href={link.url}
                      className="Collapsible__Button Heading Link Link--primary u-h4"
                      style={{ color: "var(--navigation-text-color)", display: "block", padding: "12px 0" }}
                    >
                      {link.title}
                    </a>
                  </div>
                ))}
              </nav>

              <nav className="SidebarMenu__Nav SidebarMenu__Nav--secondary" style={{ marginTop: "40px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px" }}>
                <ul className="Linklist Linklist--spacingLoose">
                  <li className="Linklist__Item">
                    <a
                      href="/account"
                      className="Heading u-h6 Link Link--primary"
                      style={{ color: "var(--text-color)" }}
                    >
                      Account
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <aside className="Drawer__Footer" data-drawer-animated-bottom>
            <div className="SidebarMenu__SocialList">
              {/* Add social links later if needed */}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
