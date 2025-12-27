"use client";

import { personal } from "@/data";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            About Me
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="w-20 h-1 bg-primary dark:bg-primary-dark mx-auto mb-12"></div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {personal.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-lg">
                <div className="text-4xl font-bold text-primary dark:text-primary-dark mb-2">
                  7+
                </div>
                <div className="text-gray-700 dark:text-gray-300">Years Experience</div>
              </div>
              <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-lg">
                <div className="text-4xl font-bold text-primary dark:text-primary-dark mb-2">
                  20+
                </div>
                <div className="text-gray-700 dark:text-gray-300">Projects Delivered</div>
              </div>
              <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-lg">
                <div className="text-4xl font-bold text-primary dark:text-primary-dark mb-2">
                  5+
                </div>
                <div className="text-gray-700 dark:text-gray-300">Team Members Led</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

