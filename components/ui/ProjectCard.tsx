"use client";

import { Project } from "@/data/projects";
import { Code, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/animations/TiltCard";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <TiltCard className="glow-border group relative flex h-full flex-col rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-2xl dark:bg-slate-900">
        <div className="mb-4 flex items-start justify-between" style={{ transform: "translateZ(40px)" }}>
          <span className="rounded-lg bg-primary/10 p-2 text-primary transition-transform duration-300 group-hover:scale-110 dark:bg-primary-dark/20 dark:text-primary-dark">
            <Code className="h-6 w-6" />
          </span>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="-m-2 inline-flex p-2 text-primary transition-colors hover:text-blue-700 dark:text-primary-dark dark:hover:text-blue-400"
              aria-label={`Visit ${project.name} live site`}
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>

        <div className="mb-3 flex items-center justify-between" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {project.name}
          </h3>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="-my-2 inline-flex items-center py-2 whitespace-nowrap text-xs font-medium text-primary hover:underline dark:text-primary-dark"
            >
              Live Site →
            </a>
          )}
        </div>

        <p className="mb-4 flex-grow text-gray-600 dark:text-gray-400">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(20px)" }}>
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-primary dark:bg-slate-800 dark:text-primary-dark"
            >
              {tech}
            </span>
          ))}
        </div>
      </TiltCard>
    </motion.div>
  );
}
