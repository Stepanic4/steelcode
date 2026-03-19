"use client";
import {motion, AnimatePresence} from "framer-motion";
import {useEffect, useState} from "react";

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
                            transition: {duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96]}
                        }}
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 0.6}}
                            className="text-blue-400 font-mono text-xs tracking-[0.5em] uppercase mb-8">
                            {"// SteelCode Architecture"}
                        </motion.div>
                        <div className="w-[180px] h-[1px] bg-white/10 relative overflow-hidden">
                            <motion.div
                                animate={{x: ["-100%", "100%"]}}
                                transition={{duration: 1.5, repeat: Infinity, ease: "linear"}}
                                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                            />
                        </div>
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