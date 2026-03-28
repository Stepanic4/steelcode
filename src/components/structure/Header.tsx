'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Logo from "@/components/ui/Logo";
import Burger from "@/components/ui/Burger";
import MoleculeScene from "@/components/ui/MoleculeScene";

const navLinks = [
    { id: 'works', label: 'Portfolio' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname(); // Узнаем, на какой мы странице
    const router = useRouter();

    useEffect(() => {
        const handleScrollEvent = () => {
            setIsScrolled(window.scrollY > 20);
        };
        handleScrollEvent();
        window.addEventListener('scroll', handleScrollEvent);
        return () => window.removeEventListener('scroll', handleScrollEvent);
    }, []);

    const handleNavClick = (id: string) => {
        if (pathname === '/') {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            router.push(`/#${id}`);
        }
    };

    return (
        <header
            className={`
                fixed top-0 left-0 w-full z-[100] flex items-center justify-between transition-all duration-300
                ${isScrolled
                ? 'py-0 px-6 bg-zinc-900/95'
                : 'py-6 px-6 bg-transparent'}
            `}>
            <div className="flex items-center gap-4">
                <div onClick={() => router.push('/')} className="cursor-pointer">
                    <Logo />
                </div>
                <div className="molecule-wrapper flex-shrink-0 w-20 h-20 flex items-center justify-center overflow-visible">
                    <MoleculeScene isScrolled={isScrolled} />
                </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <button
                        key={link.id}
                        onClick={() => handleNavClick(link.id)}
                        className="cursor-crosshair text-sm uppercase tracking-widest text-white/80 hover:text-blue-500 transition-colors font-medium font-mono">
                        {link.label}
                    </button>
                ))}
            </nav>

            <div className="md:hidden">
                <Burger />
            </div>
        </header>
    );
}