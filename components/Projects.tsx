"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="projects" className="section px-4">
      <div
        className="max-w-5xl mx-auto"
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "80px",
        }}
      >
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.p
            variants={item}
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            Projects
          </motion.p>
          <motion.h2
            variants={item}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-14"
            style={{ color: "var(--text-primary)" }}
          >
            Selected work
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, idx) => (
              <motion.a
                key={idx}
                variants={item}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-5 flex flex-col gap-4 group cursor-pointer transition-all duration-300"
                style={{ textDecoration: "none" }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="text-sm font-semibold leading-snug"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    size={16}
                    className="flex-shrink-0 mt-0.5 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: "var(--text-tertiary)" }}
                  />
                </div>

                {/* Description */}
                <p
                  className="text-xs leading-relaxed flex-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-full"
                      style={{
                        background: "rgba(0,113,227,0.1)",
                        border: "1px solid rgba(0,113,227,0.2)",
                        color: "#42a5f5",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
