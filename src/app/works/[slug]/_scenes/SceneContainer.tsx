"use client";

import dynamic from "next/dynamic";

const GarageScene = dynamic(() => import("./GarageScene"), { ssr: false });
const BeerScene = dynamic(() => import("./BeerScene"), { ssr: false });
const BarberScene = dynamic(() => import("./BarberScene"), { ssr: false });
const EstateScene = dynamic(() => import("./EstateScene"), { ssr: false });

export default function SceneContainer({ slug }: { slug: string }) {
  if (slug === "vintage-garage") return <GarageScene />;
  if (slug === "iron-hop-craft") return <BeerScene />;
  if (slug === "barber-kids") return <BarberScene />;
  if (slug === "real-estate") return <EstateScene />;
  return <div className="text-white">Scene not found</div>;
}
