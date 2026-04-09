"use client";

import React from "react";

export default function SteelCube() {
    const placeholderImg =
        "https://images.unsplash.com/photo-1774270905958-86e7eaeae23d?q=80&w=729&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return (
        <div className="relative w-full h-full overflow-hidden bg-black group">
            <img
                src={placeholderImg}
                alt="Steel Cube in start"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />

            <div className="absolute inset-0 opacity-25 shadow-[inset_0_0_100px_rgba(14,165,233,0.4)] pointer-events-none" />

            <div className="absolute bottom-0 left-4 z-3">
                <p className="text-[10px] text-white font-mono uppercase tracking-[0.3em]">
                    Visual Cube // Process Cube
                </p>
            </div>
        </div>
    );
}
