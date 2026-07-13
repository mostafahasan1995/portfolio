"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function Skills() {
  return (
    <section id="skills" className="py-14 sm:py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Technical Skills
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 mx-auto mb-12 rounded-full"></div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="glow-border group rounded-xl bg-gray-50 p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl dark:bg-slate-800"
            >
              <h3 className="mb-4 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary-dark">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.08 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="cursor-default rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary/20 dark:bg-primary-dark/20 dark:text-primary-dark dark:hover:bg-primary-dark/30"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
