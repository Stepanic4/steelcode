'use client'
import {motion, useScroll, useTransform} from 'framer-motion';
import {useRef} from 'react';
import {usePathname, useRouter} from 'next/navigation'; // Добавили хуки
import ParticleText from "@/components/ui/ParticleText";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero() {
    const targetRef = useRef(null);
    const pathname = usePathname();
    const router = useRouter();

    const {scrollYProgress} = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [0.2, 0]);

    const handleNavClick = (id: string) => {
        if (pathname === '/') {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({behavior: 'smooth'});
            }
        } else {
            router.push(`/#${id}`);
        }
    };

    return (
        <section
            ref={targetRef}
            className="min-h-[100svh] [@media(max-height:750px)]:min-h-[750px] relative flex flex-col items-center justify-center w-full overflow-hidden border-b border-white pt-5 md:pt-8 lg:pt-12 pb-10">
            <motion.div
                style={{y, opacity}}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <div
                    className="text-[20vw] font-black italic uppercase tracking-[-0.05em] leading-none text-white blur-sm">
                    STEELCODE
                </div>
            </motion.div>

            {/* CONTENT LAYER */}
            <div className="relative z-10 max-w-5xl px-6 text-center">
                <span
                    className="inline-block text-blue-500 font-mono text-xs md:text-sm tracking-[0.4em] uppercase mb-6 bg-blue-500/5 px-4 py-2 border border-blue-500/10">
                    {"// High-End Engineering Studio"}
                </span>

                <div className="relative z-10 w-full">
                    <ParticleText text="Hardcore Development"/>
                </div>

                <p className="text-base md:text-xl text-white/80 font-light max-w-2xl mx-auto mb-14 tracking-wide leading-relaxed">
                    Building robust, scalable digital infrastructure for businesses. <br/>
                    Focused on Performance, Maintainability, and Clean Architecture.
                </p>


                <div className="relative z-20 flex flex-col sm:flex-row gap-5 justify-center items-center mt-12 px-10">
                    <Magnetic>
                        <motion.button
                            onClick={() => handleNavClick('contact')}
                            animate={{
                                y: [0, -5, 0],
                                filter: [
                                    "drop-shadow(0 0 0px rgba(171,240,209,0))",
                                    "drop-shadow(0 0 10px rgba(171,240,209,0.3))",
                                    "drop-shadow(0 0 0px rgba(171,240,209,0))"
                                ]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="btn-neon-steel cursor-pointer block w-full sm:w-auto px-12 py-4 font-black uppercase tracking-[0.2em] text-sm active:transform active:scale-95"
                        >
                            Start Project
                        </motion.button>
                    </Magnetic>

                    <Magnetic>
                        <motion.button
                            onClick={() => handleNavClick('works')}
                            animate={{
                                y: [0, -5, 0],
                                filter: [
                                    "drop-shadow(0 0 0px rgba(171,240,209,0))",
                                    "drop-shadow(0 0 10px rgba(171,240,209,0.3))",
                                    "drop-shadow(0 0 0px rgba(171,240,209,0))"
                                ]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5 // Оставляем микро-задержку для естественности
                            }}
                            className="btn-neon-steel cursor-pointer block w-full sm:w-auto px-12 py-4 font-bold uppercase tracking-[0.2em] text-sm active:transform active:scale-95"
                        >
                            View Works
                        </motion.button>
                    </Magnetic>
                </div>
            </div>
        </section>
    );
}