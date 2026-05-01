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

  const cssVars = getCssVariables(settings);
  // Inject Exo 2 for headings
  const customVars = {
    ...cssVars,
    "--heading-font-family": "var(--font-exo2), Futura, sans-serif",
    "--accent-color": settings.link_color || "#c3922e",
  };

  return (
    <>
      <a className="PageSkipLink u-visually-hidden" href="#main">
        Skip to content
      </a>
      <span className="LoadingBar"></span>
      <div className="PageOverlay"></div>

      {/* Prestige Premium Background Layers */}
      <div className="animated-background"></div>
      <div className="animated-background-particles"></div>

      {settings.show_page_transition ? (
        <div className="PageTransition"></div>
      ) : null}

      {/* Theme-level CSS variables */}
      <style
        dangerouslySetInnerHTML={{
          __html: `:root, [data-theme="dark"]{${Object.entries(customVars)
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

        <Header
          settings={settings}
          sectionSettings={
            (headerSection?.settings ?? {}) as Record<string, any>
          }
        />

        <main id="main" role="main">
          {children}
        </main>

        <Footer
          settings={settings}
          section={
            footerSection as unknown as {
              settings?: Record<string, any>;
              blocks?: Record<string, any>;
              block_order?: string[];
            }
          }
        />
      </div>
    </>
  );
}
