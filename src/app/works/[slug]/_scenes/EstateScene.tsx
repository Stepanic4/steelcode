"use client";

import React from "react";
import Image from "next/image";

export default function EstateScene() {
  const placeholderImg = "/assets/sity.webp";

  return (
    <div className="relative w-full h-full overflow-hidden bg-black group">
      <Image
        src={placeholderImg}
        alt="Estate Scene Preview"
        fill
        className="object-cover group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40 pointer-events-none" />
      <div className="absolute inset-0 opacity-25 shadow-[inset_0_0_100px_rgba(14,165,233,0.5)] pointer-events-none" />

      <div className="absolute bottom-0 left-4 z-10">
        <p className="text-[10px] text-white font-mono uppercase tracking-[0.3em]">
          Visual Assets // Asset Loaded
        </p>
      </div>
    </div>
  );
}
