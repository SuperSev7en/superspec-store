'use client';

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __productImageManifest?: Record<string, { localPath: string }>;
  }
}

let manifestPromise: Promise<Record<string, { localPath: string }>> | null = null;

function loadManifest() {
  if (!manifestPromise) {
    manifestPromise = fetch('/assets/product-images/manifest.json')
      .then(res => res.json())
      .catch(() => ({}));
  }
  return manifestPromise;
}

function manifestLookup(url: string, manifest: Record<string, { localPath: string }>): string | undefined {
  const direct = manifest[url];
  if (direct) return direct.localPath;

  const noQuery = url.split('?')[0];
  if (noQuery !== url && manifest[noQuery]) return manifest[noQuery].localPath;

  for (const [key, val] of Object.entries(manifest)) {
    if (key.split('?')[0] === noQuery) return val.localPath;
  }
  return undefined;
}

function mapImageUrl(url: string, manifest: Record<string, { localPath: string }>) {
  const local = manifestLookup(url.trim(), manifest);
  if (local) return local;
  return url;
}

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
  const [mappedSrc, setMappedSrc] = useState(src);

  useEffect(() => {
    loadManifest().then(manifest => {
      setMappedSrc(mapImageUrl(src, manifest));
    });
  }, [src]);

  return (
    <div className="AspectRatio AspectRatio--withFallback" style={aspectBoxStyle(maxWidth, aspectRatio)}>
      <img
        className={imgClassName.trim()}
        src={mappedSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
