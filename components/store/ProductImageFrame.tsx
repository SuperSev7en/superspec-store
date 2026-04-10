import type { CSSProperties } from 'react';

function aspectBoxStyle(maxWidth: string | number, aspectRatio: number): CSSProperties {
  const w = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
  return {
    maxWidth: w,
    ['--aspect-ratio' as string]: aspectRatio,
  } as CSSProperties;
}

/** Prestige `.AspectRatio--withFallback` needs `--aspect-ratio` or the box collapses to 0 height. */
export function ProductImageFrame({
  src,
  alt,
  maxWidth = '800px',
  aspectRatio = 1,
  imgClassName = '',
}: {
  src: string;
  alt: string;
  maxWidth?: string | number;
  aspectRatio?: number;
  imgClassName?: string;
}) {
  return (
    <div className="AspectRatio AspectRatio--withFallback" style={aspectBoxStyle(maxWidth, aspectRatio)}>
      <img
        className={imgClassName.trim()}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}