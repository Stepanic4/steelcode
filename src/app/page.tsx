import Header from "@/components/structure/Header";
import Footer from "@/components/structure/Footer";
import Hero from "@/components/sections/Hero";
import Works from "@/components/sections/Works";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-graphite overflow-x-hidden">
            <Header/>
            <main className="flex-grow">
                <Hero />
                <Works />
            </main>
            <Footer/>
        </div>
    );
}