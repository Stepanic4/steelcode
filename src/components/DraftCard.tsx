export default function DraftCard() {
    return (
        <div className="steel-card steel-heat-tint w-full aspect-video cursor-pointer">
            <div className="steel-card-bevel"></div>
            <div className="relative z-10 flex flex-col items-center space-y-6">
                <span className="text-[14px] uppercase tracking-[0.4em] text-white/60 font-light drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                     Senior Dev Studio
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