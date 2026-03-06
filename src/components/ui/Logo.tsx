'use client';

export default function Logo() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button onClick={scrollToTop}
            className="cursor-crosshair focus:outline-none transition-opacity hover:opacity-80 active:scale-95 transition-transform"
            aria-label="Scroll to top">
            <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text
                    x="0"
                    y="30"
                    className="text-3xl font-black italic uppercase tracking-tighter fill-white">
                    Steel
                    <tspan className="fill-blue-600 font-extrabold tracking-normal">Code</tspan>
                </text>
            </svg>
        </button>
    );
}