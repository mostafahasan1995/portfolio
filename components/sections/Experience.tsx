"use client";

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
          <div className="w-20 h-1 bg-primary dark:bg-primary-dark mx-auto mb-12"></div>
        </ScrollReveal>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ScrollReveal key={index} delay={0.3 + index * 0.1}>
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Briefcase className="h-5 w-5 text-primary dark:text-primary-dark" />
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {exp.position}
                      </h3>
                    </div>
                    <h4 className="text-xl text-primary dark:text-primary-dark font-semibold mb-2">
                      {exp.company}
                    </h4>
                  </div>
                  <div className="flex flex-col items-start md:items-end mt-4 md:mt-0">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">{exp.description}</p>

                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li
                      key={idx}
                      className="flex items-start space-x-2 text-gray-600 dark:text-gray-400"
                    >
                      <span className="text-primary dark:text-primary-dark mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

