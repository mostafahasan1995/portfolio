"use client";

import { Project } from "@/data/projects";
import {
  ExternalLink,
  Globe,
  Building2,
  ShoppingCart,
  Blocks,
  Boxes,
  Server,
  Plane,
  Navigation,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/animations/TiltCard";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const CATEGORY: Record<
  NonNullable<Project["category"]>,
  { icon: LucideIcon; label: string }
> = {
  web: { icon: Globe, label: "Web Platform" },
  enterprise: { icon: Building2, label: "Enterprise" },
  ecommerce: { icon: ShoppingCart, label: "E-Commerce" },
  blockchain: { icon: Blocks, label: "Blockchain" },
  microservices: { icon: Boxes, label: "Microservices" },
  backend: { icon: Server, label: "Backend" },
  travel: { icon: Plane, label: "Travel Tech" },
  geo: { icon: Navigation, label: "Real-Time" },
  erp: { icon: LayoutDashboard, label: "ERP" },
};

const ACCENT: Record<NonNullable<Project["accent"]>, string> = {
  cyan: "from-cyan-500 to-blue-600",
  violet: "from-violet-500 to-purple-600",
  amber: "from-amber-500 to-orange-600",
  indigo: "from-indigo-500 to-blue-700",
  emerald: "from-emerald-500 to-teal-600",
  blue: "from-blue-500 to-indigo-600",
  sky: "from-sky-500 to-cyan-600",
  rose: "from-rose-500 to-pink-600",
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const category = CATEGORY[project.category ?? "web"];
  const gradient = ACCENT[project.accent ?? "blue"];
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <TiltCard className="glow-border group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-2xl dark:bg-slate-900">
        {/* Cover */}
        <div className="relative h-40 w-full overflow-hidden">
          {/* Generated gradient art (also the fallback if an image fails) */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-105`}
          />
          <div
            className="absolute inset-0 opacity-25 transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/25 blur-2xl" />

          {/* Optional real screenshot on top of the gradient */}
          {project.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={`${project.name} preview`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Center icon badge (hidden when a real image is provided) */}
          {!project.image && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 shadow-lg ring-1 ring-white/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-8 w-8 text-white" />
              </span>
            </div>
          )}

          {/* Category tag */}
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Icon className="h-3.5 w-3.5" />
            {category.label}
          </span>

          {/* Live link */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-3 top-3 inline-flex rounded-lg bg-black/25 p-2 text-white backdrop-blur-sm transition hover:bg-black/45"
              aria-label={`Visit ${project.name} live site`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-start justify-between gap-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {project.name}
            </h3>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="-my-2 inline-flex shrink-0 items-center py-2 whitespace-nowrap text-xs font-medium text-primary hover:underline dark:text-primary-dark"
              >
                Live Site →
              </a>
            )}
          </div>

          <p className="mb-4 flex-grow text-gray-600 dark:text-gray-400">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-primary dark:bg-slate-800 dark:text-primary-dark"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
