import Image from "next/image";
import PixelCanvas from "@/components/ui/PixelCanvas";

interface DraftCardProps {
  title?: string;
  theme?: "theme-gold" | "theme-sky" | "theme-silver";
  image?: string;
}

export default function DraftCard({
  title = "SteelCode Studio",
  theme = "theme-gold",
  image,
}: DraftCardProps) {
  return (
    <div className="flex flex-col w-full group">
      {/*  Внешний заголовок (над карточкой). 
          Остается на мобильных. На десктопе (md:) при ховере исчезает и смещается вниз. */}
      <div className="mb-3 pl-1 transition-all duration-500 ease-out md:group-hover:opacity-0 md:group-hover:translate-y-2 pointer-events-none">
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/60">
          {title}
        </span>
      </div>

      {/* Контейнер карточки. */}
      <div
        className={`steel-card ${theme} w-full aspect-video relative flex items-center justify-center overflow-hidden rounded-[8px] bg-[#0a0a0a] border border-white/5 transition-all duration-700 isolation-auto`}
      >
        {/* Базовый слой: Статичная картинка */}
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover z-0 transition-transform duration-700 md:group-hover:scale-105"
          />
        )}

        {/* Слой перекрытия: Скрыт по умолчанию. */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0a] opacity-0 transition-opacity duration-500 md:group-hover:opacity-100">
          <PixelCanvas gap={4} speed={25} theme={theme} />

          <div className="inner-border absolute inset-px rounded-[7px] border border-white/5 pointer-events-none z-10" />

          <div className="content-wrapper relative z-20 flex flex-col items-center space-y-6 pointer-events-none">
            {/* Внутренний заголовок. Изначально смещен вниз (translate-y-2). 
                При ховере встает на место, создавая эффект бесшовного движения навстречу исчезающему внешнему тексту. */}
            <span className="gold-text text-[14px] uppercase tracking-[0.4em] text-white/70 font-light text-center px-4 translate-y-2 transition-all duration-500 ease-out md:group-hover:translate-y-0">
              {title}
            </span>

            <div className="flex items-center gap-2 mt-4 opacity-60 transition-opacity duration-300 md:group-hover:opacity-100">
              <div className="w-1.5 h-1.5 bg-sky-500 animate-pulse" />
              <span className="gold-text text-[10px] font-mono tracking-[0.3em] uppercase">
                <span className="text-white/30 mr-2 md:group-hover:text-white/70 transition-colors duration-300">
                  {">"}
                </span>
                Open_Case
              </span>
            </div>
          </div>

          <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent pointer-events-none z-0" />
        </div>
      </div>
    </div>
  );
}
