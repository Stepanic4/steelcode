export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 font-[family-name:var(--font-geist-sans)]">
            <main className="text-center space-y-4">
                <h1 className="text-6xl font-black tracking-tighter">
                    STEEL<span className="text-blue-500">CODE</span>
                </h1>
                <div className="h-1 w-20 bg-blue-500 mx-auto"></div>
                <p className="text-xl text-gray-400 font-light tracking-widest uppercase">
                    Senior Dev Studio
                </p>
                <p className="pt-10 text-sm text-gray-500 animate-pulse">
                    Deployment in progress...
                </p>
            </main>
        </div>
    );
}