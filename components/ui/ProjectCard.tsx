"use client";

import { Project } from "@/data/projects";
import { Code, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <Code className="h-6 w-6 text-primary dark:text-primary-dark" />
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary dark:text-primary-dark hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {project.name}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-blue-100 dark:bg-slate-800 text-primary dark:text-primary-dark rounded-full text-xs font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

