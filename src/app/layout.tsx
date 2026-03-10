import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import "@/components/styles/steel-effects.css";
import {ScrollToTop} from "@/components/ui/ScrollToTop";
// Добавляем импорты твоих компонентов
import Header from "@/components/structure/Header";
import Footer from "@/components/structure/Footer";

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

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="cs" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="antialiased bg-graphite text-white">
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
        <ScrollToTop/>
        </body>
        </html>
    );
}