import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DraftCard from "@/components/DraftCard";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-graphite">
            <Header/>

            <main className="flex-grow w-full p-4 md:p-8">

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {[...Array(6)].map((_, i) => (
                        <DraftCard key={i}/>
                    ))}
                </section>
            </main>

            <Footer/>
        </div>
    );
}