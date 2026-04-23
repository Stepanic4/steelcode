"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Box, Code2, Palette, LucideIcon } from "lucide-react";
import { DotLottiePlayer } from "@dotlottie/react-player";

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  lottiePath?: string;
  skills: string[];
}

const services: Service[] = [
  {
    title: "Immersive Experiences",
    description:
      "Crafting digital interfaces that breathe. Focused on interactive storytelling, 3D graphics, and aesthetics that elevate your brand above the noise.",
    icon: Box,
    lottiePath: "/animations/services/boo.json",
    skills: ["Three.js", "Framer Motion", "GSAP"],
  },
  {
    title: "Creative Engineering",
    description:
      "Building high-performance solutions with flawless execution. Leveraging Next.js 16 to ensure instant load times under heavy visual loads.",
    icon: Code2,
    lottiePath: "/animations/services/aiservice.json",
    skills: ["Next.js 16", "Tailwind 4", "TypeScript"],
  },
  {
    title: "Digital Art Direction",
    description:
      "Full-cycle project oversight from concept to launch. Designing strategic visual systems that turn a standard website into a digital masterpiece.",
    icon: Palette,
    lottiePath: "/animations/services/cat.json",
    skills: ["UI/UX Strategy", "Brand Identity", "Motion Design"],
  },
];

export function ServiceCard({ service }: { service: Service }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="shadow-sky-800 shadow-md group relative p-4 border border-zinc-900 bg-zinc-900/80 hover:bg-zinc-900 transition-all duration-500 cursor-crosshair spark-border overflow-hidden"
    >
      <div className="spark-trail" />

      <div className="relative z-10">
        <div className="mb-6 inline-block p-1">
          <div className="w-16 h-16 flex items-center justify-center border border-zinc-800 bg-black/50 overflow-hidden">
            {service.lottiePath ? (
              <div className="w-15 h-15 flex items-center justify-center">
                <DotLottiePlayer
                  src={service.lottiePath}
                  autoplay
                  loop
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ) : (
              <motion.div
                animate={{
                  scale: isHovered ? 1.2 : 1,
                  rotate: isHovered ? 5 : 0,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon size={32} className="text-white" strokeWidth={1.5} />
              </motion.div>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">
          {service.title}
        </h3>
        <p className="text-white text-sm leading-relaxed mb-8">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {service.skills.map((skill) => (
            <span
              key={skill}
              className="text-[10px] uppercase tracking-widest px-3 py-1.5 bg-black text-white border border-zinc-800 font-bold"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <motion.section
      layout
      id="services"
      className="py-24 px-6 border-t border-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">
            Services
          </h2>
          <p className="mt-4 text-white max-w-xl uppercase tracking-[0.2em] text-xs font-medium italic">
            HIGH-END DIGITAL EXPERIENCES & CREATIVE CODING
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
