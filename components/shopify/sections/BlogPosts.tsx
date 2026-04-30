import { resolveShopifyLink } from "@/lib/shopify/assetUrls";

export function BlogPosts({
  id,
  settings,
}: {
  id: string;
  settings: Record<string, unknown>;
}) {
  const subheading =
    typeof settings.subheading === "string" ? settings.subheading : "";
  const title = typeof settings.title === "string" ? settings.title : "";
  const showCategory = Boolean(settings.show_category ?? false);
  const buttonText =
    typeof settings.button_text === "string" ? settings.button_text : "";
  const buttonLink =
    typeof settings.button_link === "string"
      ? resolveShopifyLink(settings.button_link)
      : "#";

  return (
    <section
      className="Section Section--spacingNormal"
      id={`section-${id}`}
      data-section-type="article-list"
      data-section-id={id}
    >
      <div className="Container">
        {subheading || title ? (
          <header className="SectionHeader SectionHeader--center">
            {subheading ? (
              <h3 className="SectionHeader__SubHeading Heading u-h6">
                {subheading}
              </h3>
            ) : null}
            {title ? (
              <h2 className="SectionHeader__Heading Heading u-h1">{title}</h2>
            ) : null}
          </header>
        ) : null}

        <div className="ArticleListWrapper">
          <div className="ArticleList Grid Grid--m Grid--center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`Grid__Cell 1/2--tablet 1/3--lap-and-up ${i === 2 ? "hidden-tablet" : ""}`.trim()}
              >
                <article className="ArticleItem">
                  <div
                    className="ArticleItem__ImageWrapper AspectRatio"
                    style={{
                      minHeight: 200,
                      background: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="ArticleItem__Image PlaceholderBackground PlaceholderSvg PlaceholderSvg--dark" />
                  </div>
                  <div className="ArticleItem__Content">
                    {showCategory ? (
                      <span className="ArticleItem__Category Heading u-h6 Text--subdued">
                        Journal
                      </span>
                    ) : null}
                    <h2 className="ArticleItem__Title Heading u-h2">
                      <a href="/blog">Connect a blog or CMS to show articles</a>
                    </h2>
                    <p className="ArticleItem__Excerpt">
                      Article excerpts from Shopify Online Store blogging can be
                      wired later. Placeholder cards keep the homepage layout.
                    </p>
                    <a
                      href="/blog"
                      className="ArticleItem__Link Link Link--underline"
                    >
                      Read more
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {buttonText ? (
          <div className="SectionFooter">
            <a href={buttonLink} className="Button Button--primary">
              {buttonText}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
