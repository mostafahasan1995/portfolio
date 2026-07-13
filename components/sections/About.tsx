"use client";

import { motion } from "framer-motion";
import { personal } from "@/data";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Counter } from "@/components/animations/Counter";

const stats = [
  { value: 7, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Projects Delivered" },
  { value: 5, suffix: "+", label: "Team Members Led" },
];

export function About() {
  return (
    <section id="about" className="py-14 sm:py-20 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            About Me
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 mx-auto mb-12 rounded-full"></div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {personal.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  className="glow-border group relative overflow-hidden rounded-xl bg-blue-50 p-6 text-center shadow-sm transition-shadow hover:shadow-xl dark:bg-slate-800"
                >
                  <div className="mb-2 text-4xl font-bold text-primary dark:text-primary-dark md:text-5xl">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
