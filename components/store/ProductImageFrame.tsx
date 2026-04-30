import type { CSSProperties } from "react";
import Image from "next/image";
function aspectBoxStyle(
  maxWidth: string | number,
  aspectRatio: number,
): CSSProperties {
  const w = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  return {
    maxWidth: w,
    ["--aspect-ratio" as string]: aspectRatio,
  } as CSSProperties;
}

/** Prestige `.AspectRatio--withFallback` needs `--aspect-ratio` or the box collapses to 0 height. */
export function ProductImageFrame({
  src,
  alt,
  maxWidth = "800px",
  aspectRatio = 1,
  imgClassName = "",
}: {
  src: string;
  alt: string;
  maxWidth?: string | number;
  aspectRatio?: number;
  imgClassName?: string;
}) {
  const classes = [imgClassName.trim(), "Image--lazyLoaded"]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="AspectRatio AspectRatio--withFallback"
      style={aspectBoxStyle(maxWidth, aspectRatio)}
    >
      <Image
        className={classes}
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
