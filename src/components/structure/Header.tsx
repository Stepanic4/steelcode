'use client';

import {useState, useEffect} from 'react';
import Logo from "@/components/ui/Logo";
import Burger from "@/components/ui/Burger";
import MoleculeScene from "@/components/ui/MoleculeScene";

const navLinks = [
    {id: 'works', label: 'Portfolio'},
    {id: 'services', label: 'Services'},
    {id: 'contact', label: 'Contact'},
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScrollEvent = () => {
            setIsScrolled(window.scrollY > 20);
        };
        handleScrollEvent();

        window.addEventListener('scroll', handleScrollEvent);
        return () => window.removeEventListener('scroll', handleScrollEvent);
    }, []);

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        <header
            className={`
                fixed top-0 left-0 w-full z-[100] flex items-center justify-between transition-all duration-300
                ${isScrolled
                ? 'py-0 px-6 bg-cyan-900/95 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
                : 'py-6 px-6 bg-transparent'}
            `}>
            <div className="flex items-center gap-4">
                <Logo/>
                <div className="molecule-wrapper flex-shrink-0 w-20 h-20 flex items-center justify-center overflow-visible">
                    <MoleculeScene isScrolled={isScrolled} />
                </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <button
                        key={link.id}
                        onClick={() => handleScroll(link.id)}
                        className="cursor-crosshair text-sm uppercase tracking-widest text-white/80 hover:text-blue-500 transition-colors font-medium">
                        {link.label}
                    </button>
                ))}
            </nav>

            <div className="md:hidden">
                <Burger/>
            </div>
        </header>
    );
}