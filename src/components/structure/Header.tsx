'use client';

import Logo from "@/components/ui/Logo";
import Burger from "@/components/ui/Burger";
import MoleculeScene from "@/components/ui/MoleculeScene";

const navLinks = [
    {id: 'works', label: 'Portfolio'},
    {id: 'services', label: 'Services'},
    {id: 'contact', label: 'Contact'},
];

export default function Header() {
    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        <header className="z-[100] flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <Logo/>
                <div className="molecule-wrapper w-16 h-16 flex-shrink-0">
                    <MoleculeScene />
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