import { PROJECTS_DATA } from "@/constants/projects";
import { notFound } from "next/navigation";
import CompareSlider from "@/components/ui/CompareSlider";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = PROJECTS_DATA.find((p) => p.slug === slug);

    if (!project || project.isDraft) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-graphite pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Заголовок вынесен из рамки для масштаба */}
                <h1 className="text-[clamp(2.5rem,10vw,5.5rem)] md:text-8xl font-black italic uppercase tracking-tighter pb-12 leading-[0.85] text-white">
                    {project.title}
                </h1>

                <div className="mb-24">
                    {project.imageBefore && project.imageAfter ? (
                        <CompareSlider
                            before={project.imageBefore}
                            after={project.imageAfter}/>
                    ) : (
                        <div className="w-full aspect-video bg-white/5 border border-white/5 flex items-center justify-center">
                            <span className="text-white/10 font-mono uppercase tracking-widest text-xs">
                                Visual Presentation Space
                            </span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="md:col-span-2">
                        <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                            <span className="h-px w-8 bg-blue-500"></span> Technical Overview
                        </h2>
                        <div className="space-y-8">
                            <p className="text-white/90 leading-relaxed text-xl font-light">
                                The primary objective was to overhaul a legacy digital interface,
                                transforming outdated visual patterns into a high-performance
                                React-based ecosystem.
                            </p>
                            <p className="text-white/50 leading-relaxed text-base border-l-2 border-white/10 pl-8 italic">
                                Beyond the aesthetic upgrade, the architecture was rebuilt for scalability.
                                We implemented modular components and optimized asset delivery,
                                ensuring the brand's digital presence matches its professional reputation.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 p-5 h-fit backdrop-blur-sm">
                        <h2 className="text-[13px] font-mono text-blue-500 uppercase tracking-[0.2em] mb-4">System Stack</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 text-white/60 text-[11px] font-mono uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                            <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-mono uppercase tracking-wider">TypeScript</span>
                        </div>

                        <div className="mt-11 pt-8 border-t border-white/10">
                            <div className="flex justify-between items-center text-[11px] font-mono uppercase">
                                <span className="text-white/30">Year</span>
                                <span className="text-white/70">{project.year}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-mono uppercase mt-3">
                                <span className="text-white/30">Status</span>
                                <span className="text-white/70">Stable / Live</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}