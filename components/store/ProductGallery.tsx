"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  // Touch swipe (basic)
  let touchStartX = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) {
      setCurrentIndex((prev) => (prev + 1) % images.length); // Swipe left
    } else if (touchEndX - touchStartX > 50) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length); // Swipe right
    }
  };

  // Hover zoom (desktop)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div
      className="ProductGallery"
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <div
        className="ProductGallery__Main"
        ref={containerRef}
        style={{
          position: "relative",
          aspectRatio: "1",
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
          cursor: isZoomed ? "zoom-out" : "zoom-in",
        }}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <Image
          src={images[currentIndex] || ""}
          alt={`${alt} image ${currentIndex + 1}`}
          fill
          priority
          style={{
            objectFit: "contain",
            transform: isZoomed ? "scale(2)" : "scale(1)",
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transition: "transform 0.2s ease",
          }}
        />
      </div>

      {images.length > 1 && (
        <div
          className="ProductGallery__Thumbnails"
          style={{
            display: "flex",
            gap: 10,
            overflowX: "auto",
            paddingBottom: 8,
          }}
        >
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setCurrentIndex(i)}
              style={{
                position: "relative",
                width: 80,
                height: 80,
                flexShrink: 0,
                border:
                  currentIndex === i
                    ? "2px solid var(--text-color)"
                    : "1px solid var(--border-color)",
                opacity: currentIndex === i ? 1 : 0.6,
                transition: "opacity 0.2s",
              }}
            >
              <Image
                src={img}
                alt={`Thumbnail ${i + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
