export default function DraftCard() {
    return (
        <div className="w-full aspect-video border border-white/10 bg-white/[0.02] rounded-lg relative overflow-hidden flex items-center justify-center group">

            {/* Контент внутри блока */}
            <div className="flex flex-col items-center space-y-4">

                {/* Статичная надпись внутри */}
                <span className="text-[17px] uppercase tracking-[0.2em] text-white/50 font-light">
          Senior Dev Studio
        </span>

                {/* Пульсирующая рамка с прогрессом */}
                <div className="px-4 py-2 border border-blue-500/30 rounded-md animate-pulse">
          <span className="text-[12px] font-mono text-blue-400 tracking-[0.3em] uppercase">
            Deployment in progress...
          </span>
                </div>

            </div>

        </div>
    );
}