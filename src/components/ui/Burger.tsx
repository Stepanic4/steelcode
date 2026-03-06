'use client';

import { useState } from 'react';
// Импортируем иконки. Если их нет на экране - проверь установку: npm i lucide-react
import { Terminal, Briefcase, Mail } from 'lucide-react';

const menuItems = [
    { id: 'works', label: 'Portfolio', icon: <Briefcase size={18} /> },
    { id: 'services', label: 'Services', icon: <Terminal size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
];

export default function Burger() {
    const [isOpen, setIsOpen] = useState(false);

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            setIsOpen(false);
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative">
            {/* Кнопка гамбургер */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col gap-1.5 p-2 focus:outline-none group z-[60] relative"
                aria-label="Toggle Menu"
            >
                <span className={`w-8 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-8 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-8 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : 'w-5 self-end'}`}></span>
            </button>

            {/* Выпадающее меню */}
            {isOpen && (
                <>
                    {/* Overlay для закрытия при клике вне меню */}
                    <div
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="absolute right-0 mt-4 w-56 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl z-50 overflow-hidden">
                        <nav className="flex flex-col">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleScroll(item.id)}
                                    className="flex items-center gap-4 px-5 py-4 text-white/80 hover:text-white hover:bg-zinc-800 transition-all border-b border-zinc-800 last:border-none"
                                >
                                    {/* Иконка теперь должна отображаться */}
                                    <span className="text-blue-500">{item.icon}</span>
                                    <span className="text-sm font-medium uppercase tracking-[0.15em]">
                                        {item.label}
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </>
            )}
        </div>
    );
}