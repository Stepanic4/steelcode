'use client'
import {motion} from 'framer-motion';
import {useRef} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {useLoading} from '@/context/LoadingContext';
import ParticleText from "@/components/ui/ParticleText";
import Magnetic from "@/components/ui/Magnetic";
import LiquidGlass from "@/components/ui/LiquidGlass";
import Spanizer from "@/components/ui/Spanizer";

export default function Hero() {
    const {isReady} = useLoading();
    const targetRef = useRef(null);
    const pathname = usePathname();
    const router = useRouter();

    const handleNavClick = (id: string) => {
        if (pathname === '/') {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({behavior: 'smooth'});
        } else {
            router.push(`/#${id}`);
        }
    };

    return (
        <section
            ref={targetRef}
            className="min-h-[100svh] [@media(max-height:750px)]:min-h-[750px] relative flex flex-col items-center justify-center w-full overflow-hidden border-b border-white pt-5 md:pt-8 lg:pt-12 pb-10">

            <div className="relative z-10 max-w-5xl px-6 text-center">
                {/* ЭТАП 1: Верхняя строка начинает печататься сразу (T = 0) */}
                <motion.span
                    initial={{opacity: 0}}
                    animate={isReady ? {opacity: 1} : {opacity: 0}}
                    className="inline-block text-blue-500 font-mono text-xs md:text-sm tracking-[0.4em] uppercase mb-6 bg-blue-500/5 px-4 py-2 border border-blue-500/10 backdrop-blur-sm">
                    {"// High-End Engineering Studio".split("").map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{opacity: 0}}
                            animate={isReady ? {opacity: 1} : {opacity: 0}}
                            transition={{
                                duration: 0.05,
                                delay: isReady ? (index * 0.04) : 0, // Плотная печать
                                ease: "easeIn"
                            }}>
                            {char}
                        </motion.span>
                    ))}
                    {isReady && (
                        <motion.span
                            animate={{opacity: [1, 1, 0, 0]}}
                            transition={{duration: 0.8, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1]}}
                            className="inline-block w-[6px] h-[12px] bg-blue-500 ml-2 align-middle"
                        />
                    )}
                </motion.span>

                {/* ЭТАП 2: ParticleText (T = 0.5с - когда верхняя строка наполовину готова) */}
                <div className="relative z-10 w-full">
                    <ParticleText text="Hardcore Development" isStarted={isReady}/>
                </div>

                {/* ЭТАП 3: Описание (T = 1.2с - когда заголовок уже читается) */}
                <motion.div
                    initial={{opacity: 0, y: 15}}
                    animate={isReady ? {opacity: 1, y: 0} : {opacity: 0}}
                    transition={{
                        delay: isReady ? 1.2 : 0,
                        duration: 0.8,
                        ease: "easeOut"
                    }}
                    className="max-w-3xl mx-auto mb-14 text-white">

                    <p className="text-lg md:text-2xl font-medium tracking-wide leading-tight mb-4">
                        <Spanizer
                            text="Authorial decomposition of ideas into flawless digital products."
                            shouldStart={isReady}
                            startDelay={1.2}
                            delayStep={0.04}
                        />
                    </p>

                    <p className="text-sm md:text-base text-white/90 font-light tracking-widest uppercase">
                        <Spanizer
                            text="High-performance interfaces through declarative UI and procedural graphics."
                            shouldStart={isReady}
                            startDelay={1.7}
                            delayStep={0.04}
                        />
                    </p>
                </motion.div>

                {/* ЭТАП 4: Кнопки (T = 1.6с - финальный аккорд композиции) */}
                <motion.div
                    initial={{opacity: 0, scale: 0.95}}
                    animate={isReady ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.95}}
                    transition={{
                        delay: isReady ? 1.6 : 0,
                        duration: 0.6,
                        ease: "backOut"
                    }}
                    className="relative z-20 flex flex-col sm:flex-row gap-6 justify-center items-center mt-12 px-10">
                    <Magnetic>
                        <motion.button
                            onClick={() => handleNavClick('contact')}
                            className="group cursor-pointer block w-full sm:w-auto p-0 border-none bg-transparent active:scale-95 transition-transform">
                            <LiquidGlass
                                className="px-12 py-4 rounded-full border border-white/20 hover:border-white/40 transition-colors">
                              <span className="font-black uppercase tracking-[0.2em] text-sm text-white drop-shadow-md">
                                  <Spanizer text="Start Project"
                                            shouldStart={isReady}
                                            startDelay={2.0}
                                            delayStep={0.04}/>
                              </span>
                            </LiquidGlass>
                        </motion.button>
                    </Magnetic>

                    <Magnetic>
                        <motion.button
                            onClick={() => handleNavClick('works')}
                            className="group cursor-pointer block w-full sm:w-auto p-0 border-none bg-transparent active:scale-95 transition-transform">
                            <LiquidGlass
                                className="px-12 py-4 rounded-full border border-white/20 hover:border-white/40 transition-colors">
                              <span className="font-bold uppercase tracking-[0.2em] text-sm text-white drop-shadow-md">
                                  <Spanizer text="View Works"
                                            shouldStart={isReady}
                                            startDelay={2.0}
                                            delayStep={0.04}/>
                              </span>
                            </LiquidGlass>
                        </motion.button>
                    </Magnetic>
                </motion.div>
            </div>
        </section>
    );
}