'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Добавляем навигацию
import { Terminal, Briefcase, Mail } from 'lucide-react';

const menuItems = [
    { id: 'works', label: 'Portfolio', icon: <Briefcase size={18} /> },
    { id: 'services', label: 'Services', icon: <Terminal size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
];

export default function Burger() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname(); // Проверяем текущий путь
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleNavClick = (id: string) => {
        setIsOpen(false); // Сразу закрываем меню

        if (pathname === '/') {
            // Если мы на главной — скроллим
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 300); // Чуть больше задержка для плавности после закрытия меню
            }
        } else {
            // Если мы в кейсе — летим на главную к нужному якорю
            router.push(`/#${id}`);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-[120] flex flex-col gap-1.5 p-2 focus:outline-none group"
                aria-label="Toggle Menu">
                <span className={`w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : 'w-5 self-end'}`}></span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 w-screen h-screen z-[110]">
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-xl animate-in fade-in duration-300"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="absolute right-6 top-24 w-64 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
                        <nav className="flex flex-col">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)} // Меняем функцию здесь
                                    className="flex items-center gap-4 px-6 py-5 text-white/80 hover:text-white hover:bg-zinc-800 transition-all border-b border-zinc-800/50 last:border-none group/item"
                                >
                                    <span className="text-blue-500 group-hover/item:scale-110 transition-transform">
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-medium uppercase tracking-[0.2em]">
                                        {item.label}
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}