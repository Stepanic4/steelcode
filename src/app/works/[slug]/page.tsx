import {PROJECTS_DATA} from "@/constants/projects";
import {notFound} from "next/navigation";
import SceneContainer from "./_scenes/SceneContainer";

export default async function ProjectDetailsPage({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    const project = PROJECTS_DATA.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <section className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-white">
                        {project.title}
                    </h1>
                    <p className="mt-4 text-white/50 uppercase tracking-widest text-xs font-mono italic">
                        Case Study // {project.year}
                    </p>
                </div>

                {/* Main Preview Block */}
                <div
                    className="shadow-sky-800 shadow-md group relative p-4 border border-zinc-900 bg-zinc-900/80 hover:bg-zinc-900/90 transition-all duration-500 mb-5">

                    {/* Изменяем aspect-video на динамический: квадрат на мобилке, видео на десктопе */}
                    <div
                        className="aspect-square md:aspect-video w-full flex justify-center items-end pb-8 md:pb-12 relative overflow-hidden">

                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <SceneContainer slug={slug}/>
                        </div>

                        {/* Немного уменьшаем кнопку для мобилок (py-2 вместо py-3), чтобы она не съедала весь экран */}
                        <button
                            className="relative z-10 text-[10px] md:text-xs cursor-pointer uppercase tracking-widest px-4 py-2 md:px-6 md:py-3 bg-black text-white border border-sky-500/50 shadow-[0_0_20px_rgba(14,165,233,0.5)] font-bold hover:bg-white hover:text-blue-700 transition-all animate-pulse">
                            Initialize Experience
                        </button>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Brief Card */}
                    <div
                        className="shadow-sky-800 shadow-md p-6 border border-zinc-900 bg-zinc-900/80 hover:bg-zinc-900/90 transition-all duration-500">
                        <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-tight">
                            Project Brief
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed">
                            High-end digital reconstruction for {project.title}.
                            Focused on performance, precision, and immersive visual storytelling.
                        </p>
                    </div>

                    {/* Stack Card */}
                    <div
                        className="shadow-sky-800 shadow-md p-6 border border-zinc-900 bg-zinc-900/80 hover:bg-zinc-900/90 transition-all duration-500">
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
        </section>
    );
}
