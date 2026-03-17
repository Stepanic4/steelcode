'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/components/styles/steel-effects.css";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import Header from "@/components/structure/Header";
import Footer from "@/components/structure/Footer";
import SteelBackground from "@/components/ui/SteelBackground";
import Preloader from "@/components/shared/Preloader";
import { LoadingProvider, useLoading } from "@/context/LoadingContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin", "cyrillic"],
});

const metadata = {
    title: "SteelCode.cz | Senior Development Studio",
    description: "High-end software development and digital solutions in Czech Republic.",
    metadataBase: new URL('https://steelcode.cz'),
    robots: { index: false, follow: false },
};

// Вспомогательный компонент, чтобы вызвать setIsReady внутри провайдера
function LayoutContent({ children }: { children: React.ReactNode }) {
    const { setIsReady } = useLoading();

    return (
        <Preloader onComplete={() => setIsReady(true)}>
            <SteelBackground />
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
            <ScrollToTop />
        </Preloader>
    );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="cs" className={`${geistSans.variable} ${geistMono.variable}`}>
        <head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
        </head>
        <body className="antialiased  text-white">
        <LoadingProvider>
            <LayoutContent>
                {children}
            </LayoutContent>
        </LoadingProvider>
        </body>
        </html>
    );
}