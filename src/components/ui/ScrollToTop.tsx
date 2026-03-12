'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const { scrollYProgress } = useScroll();

    const scrollRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

    useEffect(() => {
        const toggleVisibility = () => setIsVisible(window.scrollY > 300);
        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="scroll-top-badge group">
                    <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                        <path
                            id="circlePath"
                            d="M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                            fill="none"/>

                        <motion.g style={{ rotate: scrollRotation, transformOrigin: 'center' }}>
                            <text className="link-text animate-spin-reverse">
                                <textPath href="#circlePath">
                                    SCROLL TO TOP • SCROLL TO TOP • SCROLL TO TOP •
                                </textPath>
                            </text>
                        </motion.g>

                        {/* Центральная стрелка */}
                        <path
                            d="M 75 100 L 125 100 L 110 85 M 125 100 L 110 115"
                            fill="none"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="link-arrow"
                        />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
};