"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="skills" className="section px-4">
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
            Skills
          </motion.p>
          <motion.h2
            variants={item}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-14"
            style={{ color: "var(--text-primary)" }}
          >
            Tools of my trade
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {skillGroups.map((group) => (
              <motion.div
                key={group.category}
                variants={item}
                className="glass rounded-2xl p-6 transition-all duration-300"
              >
                <h3
                  className="text-xs font-semibold tracking-widest uppercase mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
