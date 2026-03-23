"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({
                                      children,
                                      onComplete
                                  }: {
    children: React.ReactNode;
    onComplete?: () => void
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRenderContent, setShouldRenderContent] = useState(false);

    useEffect(() => {
        const handleComplete = () => {
            setShouldRenderContent(true);
            const timer = setTimeout(() => {
                setIsLoading(false);
                if (onComplete) onComplete();
            }, 800);
            return () => clearTimeout(timer);
        };

        if (document.readyState === 'complete') {
            handleComplete();
        } else {
            window.addEventListener('load', handleComplete);
            return () => window.removeEventListener('load', handleComplete);
        }
    }, [onComplete]);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="preloader"
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
                        }}
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950">

                        <div className="smiley-container">
                            <div className="loader-circle"></div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            className="text-sky-500 font-mono text-xs md:text-base tracking-[0.3em] uppercase text-center px-4">
                            {"// SteelCode Architecture"}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div
                style={{
                    opacity: isLoading ? 0 : 1,
                    visibility: shouldRenderContent ? 'visible' : 'hidden',
                    transition: 'opacity 0.5s ease-in-out'
                }}>
                {children}
            </div>
        </>
    );
}