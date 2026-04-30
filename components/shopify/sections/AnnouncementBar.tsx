import { resolveShopifyLink } from "@/lib/shopify/assetUrls";

export function AnnouncementBar({
  id,
  settings,
  template = "index",
}: {
  id: string;
  settings: Record<string, unknown>;
  template?: string;
}) {
  const enableBar = Boolean(settings.enable_bar ?? false);
  if (!enableBar) return null;

  const homeOnly = Boolean(settings.home_page_only ?? false);
  if (homeOnly && template !== "index") return null;

  const background =
    typeof settings.background === "string" ? settings.background : "#000000";
  const textColor =
    typeof settings.text_color === "string" ? settings.text_color : "#ffffff";
  const content = typeof settings.content === "string" ? settings.content : "";
  const link = typeof settings.link === "string" ? settings.link : "";

  const href = link ? resolveShopifyLink(link) : "";

  return (
    <>
      <section
        id={`section-${id}`}
        data-section-id={id}
        data-section-type="announcement-bar"
      >
        <div className="AnnouncementBar">
          <div className="AnnouncementBar__Wrapper">
            <p className="AnnouncementBar__Content Heading">
              {href ? <a href={href}>{content}</a> : content}
            </p>
          </div>
        </div>
      </section>

      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `#section-${id}{background:${background};color:${textColor};}`,
        }}
      />
    </>
  );
}
