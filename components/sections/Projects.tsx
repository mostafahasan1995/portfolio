"use client";

import { projects } from "@/data";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Key Projects
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="w-20 h-1 bg-primary dark:bg-primary-dark mx-auto mb-12"></div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

