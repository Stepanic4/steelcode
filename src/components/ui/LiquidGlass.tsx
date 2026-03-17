"use client";
import { ReactNode } from "react";

export default function LiquidGlass({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`group relative overflow-hidden ${className}`}>
            <div className="absolute inset-0 z-0 pointer-events-none
                      bg-white/10
                      backdrop-blur-sm
                      border border-white/20
                      rounded-[inherit]
                      shadow-[inset_0_1px_2px] shadow-white/30"/>

            <div className="relative z-10 flex items-center justify-center w-full h-full">
                {children}
            </div>
        </div>
    );
}