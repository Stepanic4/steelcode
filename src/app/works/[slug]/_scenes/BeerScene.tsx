"use client";

import React from "react";

export default function BeerScene() {
  const placeholderImg =
    "https://images.unsplash.com/photo-1555658636-6e4a36218be7?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full overflow-hidden bg-black group">
      <img
        src={placeholderImg}
        alt="Iron Hop Craft Preview"
        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />

      <div className="absolute inset-0 opacity-25 shadow-[inset_0_0_100px_rgba(14,165,233,0.4)] pointer-events-none" />

      <div className="absolute bottom-0 left-4 z-3">
        <p className="text-[10px] text-white font-mono uppercase tracking-[0.3em]">
          Visual Assets // Brewing Process
        </p>
      </div>
    </div>
  );
}
