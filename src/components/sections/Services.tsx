import { Monitor, Cpu, Sparkles } from 'lucide-react';

const services = [
    {
        title: "Immersive Experiences",
        description: "Crafting digital interfaces that breathe. Focused on interactive storytelling, 3D graphics, and aesthetics that elevate your brand above the noise.",
        icon: <Monitor className="w-8 h-8 text-blue-600" />,
        skills: ["Three.js", "Framer Motion", "GSAP"]
    },
    {
        title: "Creative Engineering",
        description: "Building high-performance solutions with flawless execution. Leveraging Next.js 16 to ensure instant load times under heavy visual loads.",
        icon: <Cpu className="w-8 h-8 text-blue-600" />,
        skills: ["Next.js 16", "Tailwind 4", "TypeScript"]
    },
    {
        title: "Digital Art Direction",
        description: "Full-cycle project oversight from concept to launch. Designing strategic visual systems that turn a standard website into a digital masterpiece.",
        icon: <Sparkles className="w-8 h-8 text-blue-600" />,
        skills: ["UI/UX Strategy", "Brand Identity", "Motion Design"]
    }
];

export default function Services() {
    return (
        <section id="services" className="py-24 px-6 border-t border-white/70">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">
                        Services
                    </h2>
                    <p className="mt-4 text-white max-w-xl uppercase tracking-[0.2em] text-xs font-medium italic">
                        HIGH-END DIGITAL EXPERIENCES & CREATIVE CODING
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {services.map((service, index) => (
                        <div key={index}
                            className="group p-4 border border-zinc-900 bg-zinc-900/80 hover:border-blue-600 transition-all duration-500 cursor-crosshair">
                            <div className="mb-6 inline-block p-4 border border-zinc-800 bg-zinc-900 group-hover:border-blue-600 transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">
                                {service.title}
                            </h3>
                            <p className="text-white text-sm leading-relaxed mb-8">
                                {service.description}
                            </p>

                            {/* Tech Stack Tags */}
                            <div className="flex flex-wrap gap-2">
                                {service.skills.map((skill) => (
                                    <span key={skill}
                                        className="text-[10px] uppercase tracking-widest px-3 py-1.5 bg-black text-white border border-zinc-800 font-bold">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}