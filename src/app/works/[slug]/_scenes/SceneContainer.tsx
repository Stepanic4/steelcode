"use client";

import dynamic from "next/dynamic";
import SteelCube from "@/app/works/[slug]/_scenes/SteelCube";

const GarageScene = dynamic(() => import("./GarageScene"), { ssr: false });
const BeerScene = dynamic(() => import("./BeerScene"), { ssr: false });

export default function SceneContainer({ slug }: { slug: string }) {
  if (slug === "vintage-garage") return <GarageScene />;
  if (slug === "iron-hop-craft") return <BeerScene />;
  if (slug === "steel-cube") return <SteelCube />;
  return <div className="text-white">Scene not found</div>;
}
