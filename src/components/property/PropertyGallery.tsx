'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  title?: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeImages = images.length > 0 ? images : ['/placeholder-property.jpg'];

  const goTo = (index: number) => {
    setActiveIndex((index + safeImages.length) % safeImages.length);
  };

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={safeImages[activeIndex]}
          alt={title ?? `Image ${activeIndex + 1}`}
          className="h-full w-full object-cover transition-opacity duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" fill="%23f3f4f6"><rect width="800" height="500"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="16">No Image</text></svg>';
          }}
        />

        {/* Navigation Arrows */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
            >
              <ChevronLeft className="h-4 w-4 text-gray-700" />
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
            >
              <ChevronRight className="h-4 w-4 text-gray-700" />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {activeIndex + 1}/{safeImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {safeImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`shrink-0 overflow-hidden rounded-lg transition-all ${
                i === activeIndex
                  ? 'ring-2 ring-blue-600 ring-offset-1'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="h-16 w-20 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="64" fill="%23e5e7eb"><rect width="80" height="64"/></svg>';
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
