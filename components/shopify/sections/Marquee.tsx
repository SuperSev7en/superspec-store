export function Marquee({
  id,
  settings,
}: {
  id: string;
  settings: Record<string, unknown>;
}) {
  const text = typeof settings.text === "string" ? settings.text : "";
  const backgroundColor =
    typeof settings.background_color === "string"
      ? settings.background_color
      : "#000000";
  const textColor =
    typeof settings.text_color === "string" ? settings.text_color : "#ffffff";

  if (!text) return null;

  return (
    <section
      id={`section-${id}`}
      data-section-id={id}
      data-section-type="marquee"
    >
      <div
        className="MarqueeWrapper"
        style={{
          backgroundColor,
          color: textColor,
          padding: "12px 0",
          overflow: "hidden",
          whiteSpace: "nowrap",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div
          className="MarqueeContent"
          style={{
            display: "inline-block",
            animation: "marquee 25s linear infinite",
            fontSize: "14px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp;{" "}
          {text}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
