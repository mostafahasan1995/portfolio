"use client";

import { education } from "@/data";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Education
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="w-20 h-1 bg-primary dark:bg-primary-dark mx-auto mb-12"></div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-lg shadow-md p-8">
            <div className="flex items-start space-x-4">
              <GraduationCap className="h-8 w-8 text-primary dark:text-primary-dark flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {education.degree}
                </h3>
                <h4 className="text-xl text-primary dark:text-primary-dark font-semibold mb-4">
                  {education.institution}
                </h4>
                <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{education.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Graduated {education.graduationYear}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

