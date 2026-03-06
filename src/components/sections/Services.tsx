import { Code2, Layout, Database } from 'lucide-react';

const services = [
    {
        title: "Web Development",
        description: "High-performance applications built with React and Next.js. Clean code, focused on Core Web Vitals and speed.",
        icon: <Layout className="w-8 h-8 text-blue-600" />,
        skills: ["React", "Next.js", "TypeScript"]
    },
    {
        title: "API & Backend",
        description: "Architecting scalable backends, third-party integrations, and building robust RESTful APIs for your business.",
        icon: <Database className="w-8 h-8 text-blue-600" />,
        skills: ["Node.js", "PostgreSQL", "API Design"]
    },
    {
        title: "Technical Support",
        description: "Project maintenance, legacy code refactoring, and migrating systems to a modern tech stack.",
        icon: <Code2 className="w-8 h-8 text-blue-600" />,
        skills: ["Refactoring", "Optimization", "Audit"]
    }
];

export default function Services() {
    return (
        <section id="services" className="py-24 px-6 bg-zinc-950 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-white">
                        Services
                    </h2>
                    <p className="mt-4 text-white/70 max-w-xl uppercase tracking-[0.2em] text-xs font-medium italic">
                        Engineering approach to business solutions
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group p-8 border border-zinc-900 bg-zinc-900/30 hover:border-blue-600/50 transition-all duration-500 cursor-crosshair"
                        >
                            <div className="mb-6 inline-block p-4 border border-zinc-800 bg-zinc-900 group-hover:border-blue-600 transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white/90 mb-4 uppercase tracking-tight">
                                {service.title}
                            </h3>
                            <p className="text-white/80 text-sm leading-relaxed mb-8">
                                {service.description}
                            </p>

                            {/* Tech Stack Tags */}
                            <div className="flex flex-wrap gap-2">
                                {service.skills.map((skill) => (
                                    <span key={skill}
                                        className="text-[10px] uppercase tracking-widest px-3 py-1.5 bg-black text-white/80 border border-zinc-800 font-bold">
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