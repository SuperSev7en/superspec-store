"use client";

import { useEffect, useState } from "react";
import type { ThemeSettings } from "@/lib/shopify/themeSettings";
import { Icon } from "@/components/shopify/icons/Icon";
import Image from "next/image";
import { MAIN_NAV_LINKS } from "@/lib/siteNavigation";
import { HeaderCartLink } from "@/components/store/HeaderCartLink";
import { HeaderSidebarToggle } from "@/components/store/HeaderSidebarToggle";

type MenuLink = { title: string; url: string; active?: boolean };

export function Header({
  settings,
  sectionSettings,
  shopName = "SUPER Spec.",
  menu = [...MAIN_NAV_LINKS],
}: {
  settings: ThemeSettings;
  sectionSettings: Record<string, any>;
  shopName?: string;
  menu?: MenuLink[];
}) {
  const useStickyHeader = Boolean(sectionSettings.use_sticky_header ?? true);
  const navigationStyle = String(sectionSettings.navigation_style ?? "center");
  const logo =
    typeof sectionSettings.logo === "string" ? sectionSettings.logo : null;
  const logoMaxWidth = Number(sectionSettings.logo_max_width ?? 140);
  const mobileLogoMaxWidth = Number(sectionSettings.mobile_logo_max_width ?? 90);

  const [isInitialized, setIsInitialized] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
    const updateHeaderHeight = () => {
      const header = document.getElementById("shopify-section-header");
      if (header) {
        document.documentElement.style.setProperty(
          "--header-height",
          `${header.offsetHeight}px`,
        );
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div id="Search" className="Search" aria-hidden="true">
        <div className="Search__Inner">
          <div className="Search__SearchBar">
            <form
              action="/search"
              name="GET"
              role="search"
              className="Search__Form"
            >
              <div className="Search__InputIconWrapper">
                <span className="hidden-tablet-and-up">
                  <Icon icon="search" />
                </span>
                <span className="hidden-phone">
                  <Icon icon="search-desktop" />
                </span>
              </div>
              <input
                type="search"
                className="Search__Input Heading"
                name="q"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                aria-label="Search"
                placeholder="Search"
              />
              <input type="hidden" name="type" value="product" />
            </form>
            <button
              className="Search__Close Link Link--primary"
              data-action="close-search"
            >
              <Icon icon="close" />
            </button>
          </div>
        </div>
      </div>

      <header
        id="shopify-section-header"
        className={`Header Header--${navigationStyle} ${
          useStickyHeader ? "Header--sticky" : ""
        } ${isInitialized ? "Header--initialized" : ""} ${
          isScrolled ? "Header--scrolled" : ""
        }`}
        data-section-id="header"
        data-section-type="header"
      >
        <div className="Header__Wrapper">
          <div className="Header__FlexItem Header__FlexItem--logo hidden-desk">
            <HeaderSidebarToggle />
          </div>

          <div className="Header__FlexItem Header__FlexItem--logo">
            <div className="Header__LogoContainer">
              <a href="/" className="Header__Logo">
                {logo ? (
                  <Image
                    className="Header__LogoImage"
                    src={logo}
                    alt={shopName}
                    width={logoMaxWidth}
                    height={60}
                    style={{ maxWidth: `${logoMaxWidth}px`, height: "auto" }}
                    priority
                    unoptimized
                  />
                ) : (
                  <span className="Heading u-h4">{shopName}</span>
                )}
              </a>
            </div>
          </div>

          <nav
            className="Header__MainNav hidden-pocket"
            aria-label="Main navigation"
          >
            <ul className="HorizontalList HorizontalList--spacingLoose">
              {menu.map((link) => (
                <li
                  key={`${link.url}-${link.title}`}
                  className="HorizontalList__Item"
                >
                  <a href={link.url} className="Heading u-h6">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="Header__SecondaryNav">
            <div className="HorizontalList HorizontalList--spacingLoose hidden-pocket">
              <div className="HorizontalList__Item">
                <a
                  href="/account"
                  className="Header__Icon Icon-Wrapper Icon-Wrapper--clickable"
                  aria-label="Account"
                >
                  <Icon icon="account" />
                </a>
              </div>
              <div className="HorizontalList__Item">
                <a
                  href="/search"
                  className="Header__Icon Icon-Wrapper Icon-Wrapper--clickable"
                  data-action="toggle-search"
                  aria-label="Search"
                >
                  <Icon icon="search" />
                </a>
              </div>
            </div>

            {/* Icons visible on mobile too */}
            <div className="Header__Icon hidden-desk">
              <a href="/search" data-action="toggle-search">
                <Icon icon="search" />
              </a>
            </div>

            <HeaderCartLink cartType={settings.cart_type} />
          </div>
        </div>
      </header>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        :root {
          --use-sticky-header: ${useStickyHeader ? 1 : 0};
          --use-unsticky-header: ${useStickyHeader ? 0 : 1};
        }
        
        .Header--sticky {
          position: sticky;
          top: 0;
          z-index: 100;
          transition: background-color 0.3s ease, border-bottom 0.3s ease;
        }

        .Header--scrolled {
          background-color: rgba(0, 0, 0, 0.9) !important;
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        @media screen and (min-width: 641px) {
          .Header--center .Header__Wrapper {
            flex-direction: column;
            align-items: center;
            padding-top: 30px;
            padding-bottom: 24px;
          }
          .Header--center .Header__LogoContainer {
            margin-bottom: 30px;
            text-align: center;
          }
          .Header--center .Header__SecondaryNav {
            position: absolute;
            right: 40px;
            top: 40px;
            transform: none;
          }
          .Header--center .Header__FlexItem--logo.hidden-desk {
             position: absolute;
             left: 40px;
             top: 40px;
          }
          .Header--center .Header__MainNav {
            width: 100%;
            text-align: center;
          }
        }
        
        @media screen and (max-width: 640px) {
          .Header__LogoImage {
            max-width: ${mobileLogoMaxWidth}px !important;
          }
        }
      `,
        }}
      />
    </>
  );
}

