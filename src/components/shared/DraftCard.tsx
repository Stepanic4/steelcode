import PixelCanvas from "@/components/ui/PixelCanvas";

interface DraftCardProps {
  title?: string;
  theme?: "theme-gold" | "theme-sky" | "theme-silver";
}

export default function DraftCard({
  title = "SteelCode Studio",
  theme = "theme-gold",
}: DraftCardProps) {
  return (
    <div
      className={`steel-card ${theme} w-full aspect-video cursor-pointer group relative flex items-center justify-center overflow-hidden rounded-[8px] bg-[#0a0a0a] border border-white/5 transition-all duration-700 isolation-auto`}
    >
      {/* Холст с пикселями */}
      <PixelCanvas gap={4} speed={25} theme={theme} />

      {/* Внутренняя динамическая рамка */}
      <div className="inner-border absolute inset-px rounded-[7px] border border-white/5 pointer-events-none z-10 transition-all duration-500 group-hover:opacity-100" />

      <div className="content-wrapper relative z-20 flex flex-col items-center space-y-6 pointer-events-none">
        <span className="gold-text text-[14px] uppercase tracking-[0.4em] text-white/70 font-light text-center px-4 transition-all duration-500 group-hover:translate-y-[-2px]">
          {title}
        </span>

        <div className="steel-badge relative overflow-hidden px-5 py-2 border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500">
          <span className="gold-text text-[10px] font-mono text-white/40 tracking-[0.3em] uppercase transition-all duration-500">
            Deployment in progress...
          </span>
        </div>
      </div>

      {/* Фоновый градиент для глубины */}
      <div className="absolute inset-0 bg-linear-to-br from-white/[0.02] to-transparent pointer-events-none" />
    </div>
  );
}
