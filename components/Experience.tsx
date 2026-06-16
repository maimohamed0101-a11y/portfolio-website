"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/lib/data";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="experience" className="section px-4">
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
            Experience
          </motion.p>
          <motion.h2
            variants={item}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-14"
            style={{ color: "var(--text-primary)" }}
          >
            Where I&apos;ve worked
          </motion.h2>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-0 top-2 bottom-2 w-px"
              style={{ background: "var(--border)" }}
            />

            <div className="flex flex-col gap-10 pl-8">
              {experiences.map((exp, idx) => (
                <motion.div key={idx} variants={item} className="relative">
                  {/* Dot */}
                  <div
                    className="absolute -left-8 top-1.5 w-2.5 h-2.5 rounded-full ring-2"
                    style={{
                      background: "var(--accent)",
                      ringColor: "rgba(0,113,227,0.3)",
                      boxShadow: "0 0 0 4px rgba(0,113,227,0.15)",
                    }}
                  />

                  <div className="glass rounded-2xl p-6 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3
                          className="text-base font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {exp.role}
                        </h3>
                        <p
                          className="text-sm font-medium mt-0.5"
                          style={{ color: "var(--accent)" }}
                        >
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1 flex-shrink-0">
                        <span
                          className="text-xs font-medium px-3 py-1 rounded-full"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {exp.period}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <ul className="flex flex-col gap-2">
                      {exp.description.map((point, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <span
                            className="flex-shrink-0 mt-2 w-1 h-1 rounded-full"
                            style={{ background: "var(--accent)" }}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
