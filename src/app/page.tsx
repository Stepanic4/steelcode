export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
            <main className="text-center space-y-6">

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic">
                    Steel<span className="text-steel-accent">Code</span>
                </h1>

                <div className="h-1 w-24 mx-auto bg-steel-accent shadow-[0_0_20px_var(--accent)]"></div>

                <div className="space-y-2">
                    <p className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase">
                        Senior Dev Studio
                    </p>
                    <p className="text-xs tracking-widest uppercase animate-pulse text-steel-muted">
                        Deployment in progress...
                    </p>
                </div>

                <div className="mt-12 p-4 border border-steel-border bg-steel-surface rounded-lg text-xs font-mono text-steel-muted">
                    $ steelcode --init studio_v1.0.4
                </div>
            </main>
        </div>
    );
}