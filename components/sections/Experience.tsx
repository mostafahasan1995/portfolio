"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Work Experience
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 mx-auto mb-16 rounded-full"></div>
        </ScrollReveal>

        <div className="relative mx-auto max-w-4xl">
          {/* Animated timeline spine */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            className="absolute left-4 top-1 h-full w-0.5 origin-top bg-gradient-to-b from-blue-500 via-violet-500 to-cyan-400 md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-10 md:space-y-14">
            {experiences.map((exp, index) => {
              const isRight = index % 2 === 0;
              const isCurrent = index === 0;
              return (
                <div
                  key={index}
                  className="relative pl-14 md:grid md:grid-cols-2 md:gap-12 md:pl-0"
                >
                  {/* Node */}
                  <span className="absolute left-4 top-1 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-md ring-4 ring-blue-100 dark:bg-slate-900 dark:ring-slate-700 md:left-1/2">
                    {isCurrent && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
                    )}
                    <Briefcase className="relative h-4 w-4 text-primary dark:text-primary-dark" />
                  </span>

                  {/* Card column */}
                  <div className={isRight ? "md:col-start-2" : "md:col-start-1 md:row-start-1"}>
                    <ScrollReveal direction={isRight ? "left" : "right"}>
                      <div className="glow-border group rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-slate-900 md:p-7">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
                            {exp.position}
                          </h3>
                          {isCurrent && (
                            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                              Current
                            </span>
                          )}
                        </div>
                        <h4 className="mb-3 text-lg font-semibold text-primary dark:text-primary-dark">
                          {exp.company}
                        </h4>

                        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {exp.startDate} - {exp.endDate}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </span>
                        </div>

                        <p className="mb-4 text-gray-700 dark:text-gray-300">
                          {exp.description}
                        </p>

                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
