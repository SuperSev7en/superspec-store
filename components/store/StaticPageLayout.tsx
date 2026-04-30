import type { ReactNode } from "react";

/** Mirrors Prestige `templates/page.liquid` (narrow RTE page). */
export function StaticPageLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="Container">
      <div className="text-backdrop rounded-xl max-w-4xl mx-auto mt-8">
        <header className="PageHeader mb-8">
          <div className="SectionHeader SectionHeader--center">
            <h1 className="SectionHeader__Heading Heading u-h1">{title}</h1>
          </div>
        </header>
        <div className="PageContent PageContent--narrow Rte">{children}</div>
      </div>
    </div>
  );
}
