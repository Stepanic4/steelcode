'use client';
import { useEffect, useState } from 'react';

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center bg-white text-black hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-2xl z-[100] group active:scale-90"
            aria-label="Scroll to top">
            {/* Геометрическая стрелка вместо текстового символа */}
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:-translate-y-1 transition-transform">
                <path d="M18 15l-6-6-6 6" />
            </svg>
        </button>
    );
};