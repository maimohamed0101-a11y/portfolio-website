"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, TrendingUp } from "lucide-react";
import { personal, stats } from "@/lib/data";

const highlights = [
  {
    icon: Briefcase,
    label: "Product Analyst",
    desc: "Data-driven product decisions",
  },
  {
    icon: TrendingUp,
    label: "Market Researcher",
    desc: "Deep market & user insights",
  },
  {
    icon: MapPin,
    label: personal.location,
    desc: "Open to remote opportunities",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1 },
    },
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
    <section id="about" className="section px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Section label */}
          <motion.p
            variants={item}
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            About
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: text */}
            <div>
              <motion.h2
                variants={item}
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                Analyst by craft,<br />
                <span className="gradient-text">strategist by nature.</span>
              </motion.h2>

              <motion.p
                variants={item}
                className="text-base leading-relaxed mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                {personal.bio}
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={item}
                className="grid grid-cols-3 gap-4"
              >
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="glass rounded-2xl p-4 text-center"
                  >
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="text-xs leading-tight"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: highlight cards */}
            <div className="flex flex-col gap-4">
              {highlights.map((h) => (
                <motion.div
                  key={h.label}
                  variants={item}
                  className="glass rounded-2xl p-5 flex items-center gap-4 transition-all duration-300"
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(0,113,227,0.12)" }}
                  >
                    <h.icon size={20} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold mb-0.5"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {h.label}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {h.desc}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Quote card */}
              <motion.div
                variants={item}
                className="glass rounded-2xl p-5 mt-2"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,113,227,0.08) 0%, rgba(66,165,245,0.04) 100%)",
                  borderColor: "rgba(0,113,227,0.2)",
                }}
              >
                <p
                  className="text-sm leading-relaxed italic"
                  style={{ color: "var(--text-secondary)" }}
                >
                  &ldquo;Without data you&apos;re just another person with an opinion.&rdquo;
                </p>
                <p
                  className="text-xs mt-2 font-medium"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  — W. Edwards Deming
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
