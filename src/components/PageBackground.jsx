import React from 'react';

/**
 * Reusable GTA 6 Cinematic Background Layer
 * Renders a high-res responsive artwork layer with cinematic Vice City vignette and gradient mesh.
 */
export default function PageBackground({
  image,
  alt = 'GTA 6 Vice City Artwork',
  opacity = 'opacity-30 sm:opacity-35',
  gradient = true,
}) {
  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Background artwork */}
      <img
        src={image}
        alt={alt}
        className={`w-full h-full object-cover object-center ${opacity} transform-gpu will-change-transform scale-100`}
        loading="eager"
        decoding="async"
      />

      {/* Cinematic Vice City sunset & midnight contrast overlays */}
      {gradient && (
        <>
          {/* Vertical darken gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#07040d]/80 via-[#07040d]/70 to-[#07040d]/95" />
          
          {/* Radial sunset magenta & amber glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ff2a85]/15 via-transparent to-[#07040d]/80" />
          
          {/* Vignette border fade */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(7,4,13,0.9)]" />
        </>
      )}
    </div>
  );
}
