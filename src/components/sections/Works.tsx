// src/components/sections/Works.tsx
import Link from "next/link";
import DraftCard from "@/components/shared/DraftCard";
import { PROJECTS_DATA } from "@/constants/projects";

export default function Works() {
    return (
        <section id="works" className="relative px-6 py-24 md:py-32 max-w-7xl mx-auto w-full border-t border-white/5">
            {/* Header */}
            <div className="flex flex-col mb-16 md:mb-24">
                <div className="flex items-center gap-4 mb-4">
                    <span className="w-12 h-[1px] bg-blue-500"></span>
                    <h2 className="text-xs font-mono uppercase tracking-[0.5em] text-blue-500">
                        Selected Cases
                    </h2>
                </div>
                <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
                    Featured <span className="text-white/20">Projects</span>
                </h3>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-y-20">
                {PROJECTS_DATA.map((project, index) => {
                    const isEven = index % 2 !== 0;

                    return (
                        <div key={project.id} className={`flex flex-col ${isEven ? "md:mt-24" : ""}`}>
                            {/* Если проект НЕ черновик — оборачиваем в Link */}
                            {!project.isDraft ? (
                                <Link href={`/works/${project.slug}`} className="group transition-transform hover:scale-[1.01]">
                                    <DraftCard title={project.title} />
                                </Link>
                            ) : (
                                <div className="opacity-80 grayscale">
                                    <DraftCard title={project.title} />
                                </div>
                            )}

                            <div className="mt-6 flex justify-between items-center px-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">
                  {project.tags.join(" / ")}
                </span>
                                <div className="h-[1px] flex-grow mx-4 bg-white/5"></div>
                                <span className="text-[10px] font-mono uppercase text-blue-500">
                  {project.year}
                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}