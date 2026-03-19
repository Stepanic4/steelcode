import { PROJECTS_DATA } from "@/constants/projects";
import { notFound } from "next/navigation";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = PROJECTS_DATA.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-white">
                        {project.title}
                    </h1>
                    {/* Заменил [10px] на text-xs и подправил tracking */}
                    <p className="mt-4 text-white/50 uppercase tracking-widest text-xs font-mono italic">
                        Case Study // {project.year}
                    </p>
                </div>

                {/* Main Preview Block */}
                <div className="group relative p-4 border border-zinc-900 bg-zinc-900/80 hover:bg-zinc-900/90 transition-all duration-500 mb-5">
                    <div className="aspect-video w-full flex items-center justify-center">
                        {/* Кнопка: text-xs вместо [10px] */}
                        <button className="text-xs cursor-pointer uppercase tracking-widest px-6 py-3 bg-black text-white border border-zinc-800 font-bold hover:bg-white hover:text-blue-700 transition-all">
                            Initialize Experience
                        </button>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Brief Card */}
                    <div className="p-6 border border-zinc-900 bg-zinc-900/80 hover:bg-zinc-900/90 transition-all duration-500">
                        <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-tight">
                            Project Brief
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed">
                            High-end digital reconstruction for {project.title}.
                            Focused on performance, precision, and immersive visual storytelling.
                        </p>
                    </div>

                    {/* Stack Card */}
                    <div className="p-6 border border-zinc-900 bg-zinc-900/80 hover:bg-zinc-900/90 transition-all duration-500">
                        <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-tight">
                            Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span key={tag}
                                      className="text-xs uppercase tracking-widest px-3 py-1.5 bg-black text-white border border-zinc-800 font-bold">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}