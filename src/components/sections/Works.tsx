"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import DraftCard from "@/components/shared/DraftCard";
import { PROJECTS_DATA } from "@/constants/projects";

export default function Works() {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleProjects = isExpanded
    ? PROJECTS_DATA
    : PROJECTS_DATA.slice(0, 2);

  return (
    <motion.section
      layout
      id="works"
      className="py-24 px-6 border-t border-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">
            Featured <span className="text-white/20">Projects</span>
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <span className="w-12 h-px bg-sky-500"></span>
            <p className="uppercase tracking-[0.2em] text-xs font-medium italic text-sky-500">
              Selected Cases
            </p>
          </div>
        </div>
        <motion.div
          layout
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-y-20"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProjects.map((project, index) => {
              const isEven = index % 2 !== 0;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ duration: 0.4 }}
                  className={`flex flex-col ${isEven ? "md:mt-24" : ""}`}
                >
                  <Link
                    href={`/works/${project.slug}`}
                    className="group transition-transform hover:scale-[1.01]"
                  >
                    <DraftCard
                      title={project.title}
                      theme={project.theme || "theme-gold"}
                      image={project.image}
                    />
                  </Link>

                  <div className="mt-6 flex justify-between items-center px-2">
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/90">
                      {project.tags.join(" / ")}
                    </span>
                    <div className="h-px grow mx-4 bg-sky-500"></div>
                    <span className="text-[10px] md:text-xs font-mono uppercase text-sky-500">
                      {project.year}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Кнопка скролла */}
        {PROJECTS_DATA.length > 2 && (
          <motion.div layout className="mt-20 flex flex-col items-center gap-6">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex flex-col items-center gap-4 w-full outline-none"
            >
              <div className="relative w-full max-w-[200px] h-px bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-sky-500"
                  initial={{ x: "-100%" }}
                  animate={{ x: isExpanded ? "0%" : "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <div className="flex flex-col items-center gap-2 transition-colors group-hover:text-sky-500">
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                  <ChevronDown className="w-6 h-6 text-sky-500" />
                </motion.div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 group-hover:text-sky-500">
                  {isExpanded ? "Collapse Cases" : "View All Projects"}
                </span>
              </div>
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
