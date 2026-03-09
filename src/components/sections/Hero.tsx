'use client'
import {motion, useScroll, useTransform} from 'framer-motion';
import {useRef} from 'react';

export default function Hero() {
    const targetRef = useRef(null);
    const {scrollYProgress} = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [0.2, 0]);

    return (
        <section
            ref={targetRef}
            className="min-h-[100svh] [@media(max-height:750px)]:min-h-[750px] relative flex flex-col items-center justify-center w-full overflow-hidden border-b border-white pt-5 md:pt-8 lg:pt-12 pb-10">
            <motion.div
                style={{y, opacity}}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <div className="text-[20vw] font-black italic uppercase tracking-[-0.05em] leading-none text-white blur-sm">
                    STEELCODE
                </div>
            </motion.div>

            {/* CONTENT LAYER */}
            <div className="relative z-10 max-w-5xl px-6 text-center">
                <span className="inline-block text-blue-500 font-mono text-xs md:text-sm tracking-[0.4em] uppercase mb-6 bg-blue-500/5 px-4 py-2 border border-blue-500/10">
                    {"// High-End Engineering Studio"}
                </span>

                <h1 className="text-[11vw] sm:text-[clamp(3.5rem,8.5vw,8rem)] font-black italic uppercase tracking-[-0.03em] leading-[0.85] mb-10">
                    Hardcore<br className="md:hidden" /> Development
                </h1>

                <p className="text-base md:text-xl text-white/80 font-light max-w-2xl mx-auto mb-14 tracking-wide leading-relaxed">
                    Building robust, scalable digital infrastructure for businesses. <br/>
                    Focused on Performance, Maintainability, and Clean Architecture.
                </p>

                <div className="relative z-20 flex flex-col sm:flex-row gap-5 justify-center items-center mt-12 px-10">
                    <a href="#contact"
                        className="cursor-crosshair block w-full sm:w-auto px-12 py-4 bg-white/80 text-black text-center font-black uppercase tracking-[0.2em] text-sm transition-all hover:bg-blue-600 hover:text-white/80 active:transform active:scale-95">
                        Start Project
                    </a>

                    <a href="#works"
                        className="cursor-crosshair block w-full sm:w-auto px-12 py-4 border border-white/20 text-center font-bold uppercase tracking-[0.2em] text-sm transition-all hover:bg-white/10 hover:border-white active:transform active:scale-95">
                        View Works
                    </a>
                </div>
            </div>
        </section>
    );
}