import DraftCard from "@/components/shared/DraftCard";

export default function Works() {
    return (
        <section id="works" className="relative px-6 py-24 md:py-32 max-w-7xl mx-auto w-full border-t border-white/5">
            {/* Header Section */}
            <div className="flex flex-col mb-16 md:mb-24">
                <div className="flex items-center gap-4 mb-4">
                    <span className="w-12 h-[1px] bg-blue-500"></span>
                    <h2 className="text-xs font-mono uppercase tracking-[0.5em] text-blue-500">
                        Selected Cases
                    </h2>
                </div>
                <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
                    Featured <span className="text-white/20">Projects</span>
                </h3>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-y-20">

                {/* Project 01 */}
                <div className="flex flex-col">
                    <DraftCard />
                    <div className="mt-6 flex justify-between items-center px-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">
                            Frontend / Tailwind / React
                        </span>
                        <div className="h-[1px] flex-grow mx-4 bg-white/5"></div>
                        <span className="text-[10px] font-mono uppercase text-blue-500">2026</span>
                    </div>
                </div>

                {/* Project 02 */}
                <div className="flex flex-col md:mt-24">
                    <DraftCard />
                    <div className="mt-6 flex justify-between items-center px-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">
                            UI Engineering / Next.js
                        </span>
                        <div className="h-[1px] flex-grow mx-4 bg-white/5"></div>
                        <span className="text-[10px] font-mono uppercase text-blue-500">2026</span>
                    </div>
                </div>
            </div>

            {/* Footer of the section */}
            <div className="mt-24 text-center">
                <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/80">
                    {"// More projects in development phase"}
                </p>
            </div>
        </section>
    );
}