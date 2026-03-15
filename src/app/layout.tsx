import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import "@/components/styles/steel-effects.css";
import {ScrollToTop} from "@/components/ui/ScrollToTop";
import Header from "@/components/structure/Header";
import Footer from "@/components/structure/Footer";
import SteelBackground from "@/components/ui/SteelBackground";
import Preloader from "@/components/shared/Preloader";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
    title: "SteelCode.cz | Senior Development Studio",
    description: "High-end software development and digital solutions in Czech Republic.",
    metadataBase: new URL('https://steelcode.cz'),
    robots: {
        index: false,
        follow: false,
    },
    openGraph: {
        title: "SteelCode.cz | Senior Development Studio",
        description: "High-end software development and digital solutions.",
        url: 'https://steelcode.cz',
        siteName: 'SteelCode',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'SteelCode Studio Preview',
            },
        ],
        locale: 'cs_CZ',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SteelCode.cz',
        description: 'Senior Development Studio',
        images: ['/og-image.png'],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="cs" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="antialiased bg-[#050a0f] text-white">

        <Preloader>
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

        </body>
        </html>
    );
}