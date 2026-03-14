'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Briefcase, Mail, Cpu, Hexagon, ArrowRight } from 'lucide-react';

const menuItems = [
    { id: 'works', label: 'Portfolio', icon: <Briefcase size={24} />, code: 'STC-PRT-2026' },
    { id: 'services', label: 'Services', icon: <Terminal size={24} />, code: 'STC-SRV-NODE' },
    { id: 'contact', label: 'Contact', icon: <Mail size={24} />, code: 'STC-MSG-RECV' },
];

export default function Burger() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleNavClick = (id: string) => {
        setIsOpen(false);
        if (pathname === '/') {
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 350);
            }
        } else {
            router.push(`/#${id}`);
        }
    };

    return (
        <div className="relative">
            {/* Кнопка — стала крупнее и массивнее */}
            <motion.button
                layout
                onClick={() => setIsOpen(!isOpen)}
                className={`relative z-[120] flex items-center justify-center transition-all duration-300 ${
                    isOpen
                        ? 'w-14 h-14 bg-blue-600 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.4)]'
                        : 'w-12 h-12 bg-transparent hover:bg-white/5 rounded-xl'
                }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="active" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                            <Cpu size={28} className="text-white" />
                        </motion.div>
                    ) : (
                        <motion.div key="idle" className="flex flex-col gap-2 items-end">
                            <span className="w-10 h-0.5 bg-white" />
                            <span className="w-6 h-0.5 bg-blue-400" />
                            <span className="w-9 h-0.5 bg-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110] h-screen w-screen left-0 top-0"
                        />

                        {/* Панель управления — ширина увеличена до 320px (80 единиц) */}
                        <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 25, scale: 1 }}
                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                            className="absolute right-0 top-full w-80 z-[115] origin-top-right shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                        >
                            <div className="bg-zinc-900 border border-white/10 rounded-[2rem] overflow-hidden">

                                {/* Header — крупный заголовок */}
                                <div className="px-6 py-5 bg-white/5 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Hexagon size={16} className="text-blue-500 animate-spin-slow" />
                                        <span className="text-xs font-mono text-zinc-300 uppercase tracking-[0.2em] font-bold">
                                            OS_STC_v1.0.0
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                        <span className="text-[10px] font-mono text-blue-400 font-bold">[ SYSTEM_READY ]</span>
                                    </div>
                                </div>

                                {/* Навигация — элементы стали высокими, текст крупным */}
                                <nav className="p-3">
                                    {menuItems.map((item, i) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleNavClick(item.id)}
                                            className="w-full group flex items-center justify-between p-5 rounded-[1.25rem] hover:bg-white/5 transition-all text-left mb-2 last:mb-0"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="p-3 bg-zinc-800 rounded-xl text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                                    {item.icon}
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-white text-base font-bold tracking-widest uppercase group-hover:text-blue-400 transition-colors">
                                                        {item.label}
                                                    </span>
                                                    <span className="text-[10px] font-mono text-zinc-500 tracking-tighter uppercase italic">
                                                        {item.code}
                                                    </span>
                                                </div>
                                            </div>
                                            <ArrowRight size={18} className="text-zinc-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                        </button>
                                    ))}
                                </nav>

                                {/* Footer — статусная строка */}
                                <div className="px-7 py-5 bg-black/40 border-t border-white/5 flex flex-col gap-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-zinc-500 font-mono tracking-[0.3em] uppercase">
                                            Access Granted
                                        </span>
                                        <span className="text-[10px] text-blue-500/50 font-mono">
                                            STEELCODE_LABS
                                        </span>
                                    </div>
                                    <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                                        <motion.div
                                            initial={{ x: '-100%' }}
                                            animate={{ x: '100%' }}
                                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                            className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}