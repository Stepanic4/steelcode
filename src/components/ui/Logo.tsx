'use client';

import Image from 'next/image';

export default function Logo() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className="relative flex-shrink-0 focus:outline-none transition-all hover:opacity-80 active:scale-95 flex items-center justify-start cursor-crosshair"
            aria-label="Scroll to top"
            style={{ width: '180px', height: '50px' }}
        >
            <Image
                src="/assets/logo.png"
                alt="SteelCode"
                width={180}
                height={50}
                priority
                className="object-contain object-left pointer-events-none"
            />
        </button>
    );
}