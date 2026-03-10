import { PROJECTS_DATA } from "@/constants/projects";
import { notFound } from "next/navigation";
import CompareSlider from "@/components/ui/CompareSlider"; // Импортируем слайдер

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = PROJECTS_DATA.find((p) => p.slug === slug);

    if (!project || project.isDraft) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-graphite  pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 p-8 h-fit">

                <h1 className="text-[clamp(2rem,10vw,4.5rem)] md:text-8xl font-black italic uppercase tracking-tighter pb-8 [word-spacing:0.2em] leading-[0.9] break-keep">
                    {project.title}
                </h1>

                <div className="mb-20">
                    {project.imageBefore && project.imageAfter ? (
                        <CompareSlider
                            before={project.imageBefore}
                            after={project.imageAfter}/>
                    ) : (
                        <div className="w-full aspect-video bg-white/5 border border-white/5 flex items-center justify-center">
             <span className="text-white/10 font-mono uppercase tracking-widest text-xs">
                Visual Presentation Space (Add images to projects.ts)
             </span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold mb-6 uppercase italic tracking-tight text-white">Overview</h2>
                        <div className="space-y-6">
                            <p className="text-white/80 leading-relaxed text-lg font-light">
                                The primary objective was to overhaul a legacy digital interface,
                                transforming outdated visual patterns into a high-performance
                                React-based ecosystem. We focused on eliminating cognitive load by
                                introducing a rigorous grid system and a "Steel" design language.
                            </p>
                            <p className="text-white/50 leading-relaxed text-base border-l border-blue-500/30 pl-6 italic">
                                Beyond the aesthetic upgrade, the architecture was rebuilt for scalability.
                                By implementing modular components and optimized asset delivery,
                                we achieved a significant reduction in Time to Interactive (TTI),
                                ensuring the brand's digital presence matches its professional reputation.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 h-fit">
                        <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.2em] mb-6">Technical Stack</h2>
                        <div className="flex flex-wrap gap-3">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-wider">
                    {tag}
                </span>
                            ))}

                            <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 text-[10px] font-mono uppercase">TypeScript</span>
                            <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 text-[10px] font-mono uppercase">Motion Engine</span>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <p className="text-[10px] font-mono text-white/30 uppercase tracking-tight">
                                Project Year: {project.year}
                            </p>
                            <p className="text-[10px] font-mono text-white/30 uppercase tracking-tight mt-1">
                                Status: Deployed / Stable
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}