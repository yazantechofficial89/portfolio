import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Code2, Maximize2, Images } from 'lucide-react';

export default function ProjectImageCarousel({
  images = [],
  fallbackImage = '',
  title = '',
  category = '',
  className = 'h-56 sm:h-64',
  onOpenGallery = null,
}) {
  const allImages = Array.isArray(images) && images.length > 0 
    ? images 
    : (fallbackImage ? [fallbackImage] : []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const hasMultiple = allImages.length > 1;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e, index) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const currentSrc = allImages[currentIndex] || fallbackImage;

  return (
    <div
      onClick={() => onOpenGallery && onOpenGallery(currentIndex)}
      className={`relative w-full overflow-hidden bg-[#0a0712] group ${className} ${
        onOpenGallery ? 'cursor-pointer' : ''
      }`}
    >
      {/* Current Image */}
      <img
        key={currentSrc}
        src={currentSrc}
        alt={`${title} screenshot ${currentIndex + 1}`}
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          const fallback = e.currentTarget.parentElement.querySelector('.carousel-fallback');
          if (fallback) fallback.style.display = 'flex';
        }}
      />

      {/* Fallback Display if image is unavailable */}
      <div className="carousel-fallback hidden w-full h-full flex-col items-center justify-center p-4 bg-gradient-to-br from-[#120726] via-[#1a0c36] to-[#090611] text-center">
        <Code2 className="w-10 h-10 text-purple-400 mb-2 opacity-80" />
        <span className="text-sm font-bold text-white line-clamp-1 px-2">{title}</span>
        <span className="text-xs text-purple-300 font-mono mt-1">{category}</span>
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050308]/90 via-black/20 to-transparent pointer-events-none" />

      {/* Multiple Images Indicator Badge */}
      {hasMultiple && (
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold liquid-pill text-purple-200 border border-purple-500/30 bg-[#090611]/80 backdrop-blur-md">
          <Images className="w-3.5 h-3.5 text-purple-400" />
          <span>{currentIndex + 1} / {allImages.length}</span>
        </div>
      )}

      {/* Full Screen Zoom Button Hint */}
      {onOpenGallery && (
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-xl liquid-pill text-zinc-300 hover:text-white bg-[#090611]/80 backdrop-blur-md">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      )}

      {/* Left / Right Arrow Navigation for Multiple Images */}
      {hasMultiple && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous screenshot"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-purple-900/80 border border-purple-500/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md cursor-pointer hover:scale-110"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next screenshot"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-purple-900/80 border border-purple-500/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md cursor-pointer hover:scale-110"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {hasMultiple && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md">
          {allImages.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => handleDotClick(e, idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'w-4 bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                  : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Jump to screenshot ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
