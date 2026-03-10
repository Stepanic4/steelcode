"use client";
import {useState, useRef, useEffect} from "react";

export default function CompareSlider({before, after}: { before: string; after: string }) {
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!isDragging || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const position = (x / rect.width) * 100;
        setSliderPos(Math.min(Math.max(position, 0), 100));
    };

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
        const onMouseUp = () => setIsDragging(false);
        const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
        const onTouchEnd = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
            window.addEventListener("touchmove", onTouchMove);
            window.addEventListener("touchend", onTouchEnd);
        }
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [isDragging]);

    return (
        <div ref={containerRef}
             className="relative w-full aspect-video overflow-hidden border border-white/10 select-none touch-none shadow-xl bg-neutral-900 group"
             onMouseDown={() => setIsDragging(true)}
             onTouchStart={() => setIsDragging(true)}>

            <div className="absolute inset-0 w-full h-full">
                <img src={after} alt="New" className="absolute inset-0 w-full h-full object-cover" draggable={false}/>
                <div
                    className="absolute top-4 right-4 z-10 pointer-events-none px-2 py-1 bg-blue-500/70 text-[10px] font-mono uppercase tracking-widest border border-blue-500 text-white">
                    SteelCode Core
                </div>
            </div>

            <div className="absolute inset-0 h-full overflow-hidden border-r-2 border-blue-500 z-20"
                 style={{width: `${sliderPos}%`}}>

                <div className="absolute inset-0 h-full aspect-video min-w-[1000px] md:min-w-full">
                    <img src={before} alt="Old" className="absolute inset-0 w-full h-full object-cover grayscale"
                         draggable={false}/>
                    <div
                        className="absolute top-4 left-4 z-30 pointer-events-none px-2 py-1 bg-blue-500/70 text-[10px] font-mono uppercase tracking-widest border border-blue-500 text-white">
                        Original Case
                    </div>
                </div>
            </div>

            <div
                className="absolute top-0 bottom-0 z-40 pointer-events-none"
                style={{left: `${sliderPos}%`}}>
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)] cursor-grab active:cursor-grabbing pointer-events-auto">
                    <span className="text-white text-lg font-bold">⋮</span>
                </div>
            </div>
        </div>
    );
}