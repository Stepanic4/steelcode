import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/components/styles/steel-effects.css";
import ClientProviders from "@/components/shared/ClientProviders";

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
                url: '/assets/steel26.webp',
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
        images: ['/assets/steel26.webp'],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="cs" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="antialiased text-white">
        <ClientProviders>
            {children}
        </ClientProviders>
        </body>
        </html>
    );
}