interface DraftCardProps {
    title?: string;
}

export default function DraftCard({ title = "Senior Dev Studio" }: DraftCardProps) {
    return (
        <div className="steel-card steel-heat-tint w-full aspect-video cursor-pointer transition-all hover:brightness-110">
            <div className="steel-card-bevel"></div>
            <div className="relative z-10 flex flex-col items-center space-y-6">
                <span className="text-[14px] uppercase tracking-[0.4em] text-white font-light drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-center px-4">
                     {title}
                </span>
                <div className="steel-badge">
                    <span className="text-[10px] font-mono text-blue-400 tracking-[0.3em] uppercase opacity-80">
                        Deployment in progress...
                    </span>
                </div>
            </div>
        </div>
    );
}