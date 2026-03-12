"use client";
import { motion } from "framer-motion";

export default function CompareSlider({ before, after }: { before: string; after: string }) {
    const images = [
        { src: before, label: "OLD" },
        { src: after, label: "NEW" }
    ].filter(img => img.src);

    return (
        <div className="w-full space-y-4">
            {/* Контейнер: заменил no-scrollbar на thick-scrollbar и добавил отступ снизу pb-10 */}
            <div className="flex gap-4 overflow-x-auto thick-scrollbar pb-10 snap-x snap-mandatory cursor-grab active:cursor-grabbing">
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="relative min-w-[90vw] md:min-w-[80%] aspect-video overflow-hidden snap-center group select-none"
                    >
                        <img
                            src={img.src}
                            alt={img.label}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                            <div className="steel-card steel-heat-tint px-4 py-1 md:px-8 md:py-2 shadow-2xl flex items-center justify-center">
                                <span className="text-[9px] md:text-[12px] font-mono text-white tracking-[0.3em] md:tracking-[0.4em] leading-none uppercase">
                                    {img.label}
                                </span>
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-6 z-10">
                            <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em]">
                                Phase_0{index + 1}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex items-center gap-3 px-1">
                <div className="h-px w-8 bg-blue-500" />
                <span className="text-[12px] font-mono text-white/30 uppercase tracking-[0.2em]">
                    Slide to interact
                </span>
            </div>
        </div>
    );
}