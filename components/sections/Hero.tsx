"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { personal } from "@/data";
import { Mail, Linkedin, Github, MapPin, FileText, ChevronDown } from "lucide-react";
import { ResumeModal } from "@/components/ui/ResumeModal";
import { AnimatedBackground } from "@/components/animations/AnimatedBackground";
import { RotatingText } from "@/components/animations/RotatingText";
import { Magnetic } from "@/components/animations/Magnetic";
import { Marquee } from "@/components/animations/Marquee";

const roles = [
  "Full-Stack Engineering",
  "Scalable Microservices",
  "Go & Node.js",
  "Blockchain Platforms",
  "Team Leadership",
];

const techStack = [
  "TypeScript",
  "Node.js",
  "Go (Golang)",
  "React",
  "Next.js",
  "NestJS",
  "PostgreSQL",
  "Prisma",
  "Docker",
  "Kubernetes",
  "AWS",
  "Redis",
  "GraphQL",
  "Solidity",
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      <AnimatedBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
      >
        {/* Availability badge */}
        <motion.div variants={item} className="mb-8 flex justify-center">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm dark:text-gray-200">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="gradient-text mb-4 text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl"
        >
          {personal.name}
        </motion.h1>

        <motion.h2
          variants={item}
          className="mb-4 flex flex-wrap items-center justify-center gap-x-3 text-2xl font-semibold text-gray-800 dark:text-gray-100 md:text-4xl"
        >
          <span className="text-gray-500 dark:text-gray-400">I build</span>
          <RotatingText words={roles} />
        </motion.h2>

        <motion.div
          variants={item}
          className="mb-6 flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-300"
        >
          <MapPin className="h-5 w-5 text-primary dark:text-primary-dark" />
          <span className="text-lg">{personal.location}</span>
        </motion.div>

        <motion.p
          variants={item}
          className="mx-auto mb-12 max-w-3xl text-xl text-gray-600 dark:text-gray-400"
        >
          Senior Software Engineer &amp; Team Lead crafting scalable enterprise
          solutions with modern technologies.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="group relative inline-flex items-center space-x-2 overflow-hidden rounded-lg bg-primary px-6 py-3 font-medium text-white shadow-lg shadow-primary/30 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-primary-dark dark:shadow-primary-dark/30 dark:hover:bg-blue-600"
              aria-label="View Resume"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <FileText className="h-5 w-5" />
              <span>View Resume</span>
            </button>
          </Magnetic>

          <Magnetic>
            <a
              href={`mailto:${personal.email}`}
              className="glass inline-flex items-center space-x-2 rounded-lg px-6 py-3 font-medium text-primary transition-colors hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:text-primary-dark dark:hover:bg-slate-800/80"
              aria-label="Send email"
            >
              <Mail className="h-5 w-5" />
              <span>Email Me</span>
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center space-x-2 rounded-lg px-6 py-3 font-medium text-primary transition-colors hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:text-primary-dark dark:hover:bg-slate-800/80"
              aria-label="Visit LinkedIn profile"
            >
              <Linkedin className="h-5 w-5" />
              <span>LinkedIn</span>
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center space-x-2 rounded-lg px-6 py-3 font-medium text-primary transition-colors hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:text-primary-dark dark:hover:bg-slate-800/80"
              aria-label="Visit GitHub profile"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
          </Magnetic>
        </motion.div>

        {/* Tech stack marquee */}
        <motion.div variants={item} className="mx-auto mt-14 max-w-3xl">
          <Marquee items={techStack} />
        </motion.div>

        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gray-400 dark:text-gray-500"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.span>
      </motion.a>
    </section>
  );
}
