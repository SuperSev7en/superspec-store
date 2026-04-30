import type { ThemeSettings } from "@/lib/shopify/themeSettings";
import { getCssVariables } from "@/lib/shopify/themeUtils";
import { Header } from "@/components/shopify/header/Header";
import { Footer } from "@/components/shopify/footer/Footer";
import { AnnouncementBarGate } from "@/components/shopify/sections/AnnouncementBarGate";

export function ThemeLayout({
  children,
  settings,
  sections,
}: {
  children: React.ReactNode;
  settings: ThemeSettings;
  sections: Record<
    string,
    {
      type: string;
      settings?: Record<string, unknown>;
      blocks?: Record<string, unknown>;
      block_order?: string[];
    }
  >;
}) {
  const headerSection = sections["header"];
  const footerSection = sections["footer"];
  const announcementSection = sections["announcement"];

  return (
    <>
      <a className="PageSkipLink u-visually-hidden" href="#main">
        Skip to content
      </a>
      <span className="LoadingBar"></span>
      <div className="PageOverlay"></div>

      {settings.show_page_transition ? (
        <div className="PageTransition"></div>
      ) : null}

      {/* Theme-level CSS variables (from `snippets/css-variables.liquid`) */}
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `:root{${Object.entries(getCssVariables(settings))
            .map(([k, v]) => `${k}:${v};`)
            .join("")}}`,
        }}
      />

      <div className="PageContainer">
        {announcementSection?.settings ? (
          <AnnouncementBarGate
            id="announcement"
            settings={announcementSection.settings}
          />
        ) : null}

        {/* TODO: sections: popup, sidebar-menu, cart-drawer */}
        <Header
          settings={settings}
          sectionSettings={
            (headerSection?.settings ?? {}) as Record<string, unknown>
          }
        />

        <main id="main" role="main">
          {children}
        </main>

        <Footer
          settings={settings}
          section={
            footerSection as unknown as {
              settings?: Record<string, unknown>;
              blocks?: Record<string, unknown>;
              block_order?: string[];
            }
          }
        />
      </div>
    </>
  );
}
