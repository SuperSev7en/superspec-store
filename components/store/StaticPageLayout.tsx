import type { ReactNode } from 'react';

/** Mirrors Prestige `templates/page.liquid` (narrow RTE page). */
export function StaticPageLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="Container">
      <header className="PageHeader">
        <div className="SectionHeader SectionHeader--center">
          <h1 className="SectionHeader__Heading Heading u-h1">{title}</h1>
        </div>
      </header>
      <div className="PageContent PageContent--narrow Rte">{children}</div>
    </div>
  );
}
