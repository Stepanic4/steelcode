"use client";

import { LoadingProvider, useLoading } from "@/context/LoadingContext";
import { LayoutGroup } from "framer-motion";
import Preloader from "@/components/shared/Preloader";
import SteelBackground from "@/components/ui/SteelBackground";
import Header from "@/components/structure/Header";
import Footer from "@/components/structure/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { setIsReady } = useLoading();

  return (
    <>
      <Preloader onComplete={() => setIsReady(true)}>
        <SteelBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <LayoutGroup>
            <main className="grow">{children}</main>
          </LayoutGroup>
          <Footer />
        </div>
        <ScrollToTop />
      </Preloader>
    </>
  );
}

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingProvider>
      <LayoutContent>{children}</LayoutContent>
    </LoadingProvider>
  );
}
