"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section layout id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">
            About Studio
          </h2>
          <p className="mt-4 text-white max-w-xl uppercase tracking-[0.2em] text-[10px] font-medium italic">
            {"// Engineering Philosophy & Digital Excellence"}
          </p>
        </div>

        <div className="shadow-sky-800 shadow-md p-8 md:p-12 border border-zinc-900 bg-zinc-900/80 transition-all duration-500">
          <div className="max-w-4xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-tight">
              We build what others call impossible.
            </h3>

            <div className="space-y-6 text-white/90 text-sm md:text-base leading-relaxed tracking-wide">
              <p>
                SteelCode is a high-end engineering studio based in the Czech
                Republic. We specialize in architectural decomposition of
                complex ideas into high-performance digital products that set
                new industry standards.
              </p>
              <p>
                Our approach is rooted in technical precision and aesthetic
                dominance. We don&apos;t just develop websites; we engineer
                digital assets using a cutting-edge stack to ensure your
                business stays ahead of the curve.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "No Templates",
                "Pure Code",
                "Performance First",
                "Zero Fluff",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] uppercase tracking-[0.3em] px-4 py-2 bg-black border border-zinc-800 text-white font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
