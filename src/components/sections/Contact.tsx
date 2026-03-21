'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Linkedin, MapPin } from 'lucide-react';

const contactInfo = [
    {
        label: "Email",
        value: "steelcode.cz@gmail.com",
        link: "mailto:steelcode.cz@gmail.com",
        icon: <Mail className="w-5 h-5"/>
    },
    {
        label: "Telegram",
        value: "Contact via Telegram",
        link: "https://t.me/steelcode_dev",
        icon: <MessageSquare className="w-5 h-5"/>
    },
    {
        label: "LinkedIn",
        value: "Connect on LinkedIn",
        link: "https://www.linkedin.com/in/ivan-zolotukhin/",
        icon: <Linkedin className="w-5 h-5"/>
    }
];

function LocationLink() {
    const [isHovered, setIsHovered] = useState(false);
    const castleImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Melnik.jpg/1280px-Melnik.jpg";

    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Mělník, Czech Republic")}`;

    return (
        <div className="relative inline-block"
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>

            <a href={mapUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="mt-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors uppercase tracking-widest text-xs font-medium cursor-pointer">
                <MapPin size={14} className={isHovered ? "text-blue-500" : "transition-colors"}/>
                <span className="border-b border-white/10 hover:border-white/40 transition-all">
                    Mělník, Czech Republic
                </span>
            </a>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: -10 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="hidden md:block absolute bottom-full left-0 mb-4 z-50 pointer-events-none">
                        <div className="relative w-64 h-40 rounded-lg border border-white/20 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-zinc-950">
                            <img
                                src={castleImg}
                                alt="Mělník Castle"
                                className="w-full h-full object-cover grayscale brightness-75 contrast-125"/>
                            <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                            <div className="absolute top-2 right-2 px-1.5 py-0.5 border border-white/10 bg-black/40 backdrop-blur-md rounded text-[8px] text-white/60 font-mono tracking-tighter">
                                LOCATION: CASTLE_VIEW
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Contact() {
    return (
        <section id="contact" className="py-24 px-6 border-t border-white/70">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                    {/* Left side: Content (Теперь идентичен правым карточкам) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        whileHover="hover"
                        className="shadow-sky-800 shadow-md flex flex-col gap-6 p-8 border border-zinc-800 bg-zinc-900/80 rounded-none text-white relative overflow-hidden group"
                    >
                        {/* ЛАЗЕР ДЛЯ ЛЕВОГО БЛОКА */}
                        <motion.div
                            variants={{
                                hover: { left: '150%' }
                            }}
                            initial={{ left: '-150%', skewX: -25 }}
                            transition={{
                                duration: 0.9,
                                ease: [0.23, 1, 0.32, 1]
                            }}
                            className="absolute top-0 bottom-0 w-80 pointer-events-none z-10"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(50, 255, 126, 0.1), rgba(100, 255, 100, 0.4), rgba(50, 255, 126, 0.1), transparent)',
                                filter: 'blur(3px)'
                            }}
                        />

                        <motion.div
                            className="relative z-20 space-y-6"
                            variants={{ hover: { x: 10 } }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">
                                Contact
                            </h2>
                            <div className="space-y-4">
                                <p className="text-lg leading-relaxed max-w-md">
                                    Ready to discuss your project? We are based in the Czech Republic
                                    and work with clients across Europe.
                                </p>
                                <p className="font-medium uppercase tracking-widest text-sm text-zinc-400 group-hover:text-blue-500 transition-colors">
                                    Professional approach, zero fluff.
                                </p>
                                <LocationLink />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right side: Interactive Cards */}
                    <div className="space-y-4">
                        {contactInfo.map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }} // Задержка после левого блока
                                whileHover="hover"
                                whileTap={{ scale: 0.97 }}
                                className="shadow-sky-800 shadow-md flex items-center justify-between p-6 border border-zinc-800 bg-zinc-900/80 transition-all group relative overflow-hidden"
                            >
                                {/* КИСЛОТНЫЙ КИБЕРЛАНЗЕР */}
                                <motion.div
                                    variants={{
                                        hover: { left: '150%' }
                                    }}
                                    initial={{ left: '-150%', skewX: -25 }}
                                    transition={{
                                        duration: 0.9,
                                        ease: [0.23, 1, 0.32, 1]
                                    }}
                                    className="absolute top-0 bottom-0 w-80 pointer-events-none z-10"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent, rgba(50, 255, 126, 0.1), rgba(100, 255, 100, 0.4), rgba(50, 255, 126, 0.1), transparent)',
                                        filter: 'blur(3px)'
                                    }}
                                />

                                <motion.div
                                    className="flex items-center gap-5 relative z-20 "
                                    variants={{ hover: { x: 10 } }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <div className="text-zinc-400 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
                                            {item.label}
                                        </p>
                                        <p className="text-zinc-100 font-medium tracking-tight">
                                            {item.value}
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="text-zinc-700 group-hover:text-blue-500 relative z-20"
                                    variants={{ hover: { x: 5, y: -5 } }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.16666 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15"
                                              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </motion.div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}