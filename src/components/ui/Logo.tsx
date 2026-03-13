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
            // flex-shrink-0 не даст хедеру сжимать логотип
            className="relative flex-shrink-0 focus:outline-none transition-all hover:opacity-80 active:scale-95 flex items-center justify-start cursor-crosshair"
            aria-label="Scroll to top"
            style={{ width: '180px', height: '50px' }} // Жестко задаем область кнопки
        >
            <Image
                src="/assets/logo.png"
                alt="SteelCode"
                // Используем конкретные размеры вместо fill, чтобы контролировать масштаб
                width={180}
                height={50}
                priority
                className="object-contain object-left pointer-events-none"
            />
        </button>
    );
}