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
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">

                        {/* Смайлик */}
                        <div className="smiley-container">
                            <svg className="smiley" viewBox="0 0 128 128">
                                <defs>
                                    <clipPath id="smiley-eyes">
                                        <circle className="smiley__eye1" cx="64" cy="64" r="8" transform="rotate(-40,64,64) translate(0,-56)" />
                                        <circle className="smiley__eye2" cx="64" cy="64" r="8" transform="rotate(40,64,64) translate(0,-56)" />
                                    </clipPath>
                                    <linearGradient id="smiley-grad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#000" />
                                        <stop offset="100%" stopColor="#fff" />
                                    </linearGradient>
                                    <mask id="smiley-mask">
                                        <rect x="0" y="0" width="128" height="128" fill="url(#smiley-grad)" />
                                    </mask>
                                </defs>
                                <g strokeLinecap="round" strokeWidth="12" strokeDasharray="175.93 351.86">
                                    <g>
                                        <rect fill="#0ea5e9" width="128" height="64" clipPath="url(#smiley-eyes)" />
                                        <g fill="none" stroke="#0ea5e9">
                                            <circle className="smiley__mouth1" cx="64" cy="64" r="56" transform="rotate(180,64,64)" />
                                            <circle className="smiley__mouth2" cx="64" cy="64" r="56" transform="rotate(0,64,64)" />
                                        </g>
                                    </g>
                                    <g mask="url(#smiley-mask)">
                                        <rect fill="#0284c7" width="128" height="64" clipPath="url(#smiley-eyes)" />
                                        <g fill="none" stroke="#0284c7">
                                            <circle className="smiley__mouth1" cx="64" cy="64" r="56" transform="rotate(180,64,64)" />
                                            <circle className="smiley__mouth2" cx="64" cy="64" r="56" transform="rotate(0,64,64)" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            className="text-sky-500 font-mono text-sm md:text-base  tracking-[0.5em] uppercase text-center px-4">
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