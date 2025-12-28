"use client";

import { useState } from "react";
import { personal } from "@/data";
import { Mail, Linkedin, Github, MapPin, FileText } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ResumeModal } from "@/components/ui/ResumeModal";

export function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
            {personal.name}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h2 className="text-2xl md:text-4xl text-primary dark:text-primary-dark mb-4 font-semibold">
            {personal.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-300 mb-8">
            <MapPin className="h-5 w-5" />
            <span className="text-lg">{personal.location}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
            Building scalable enterprise solutions with modern technologies
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.8}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:bg-primary-dark dark:hover:bg-blue-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="View Resume"
            >
              <FileText className="h-5 w-5" />
              <span>View Resume</span>
            </button>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center space-x-2 bg-white dark:bg-slate-800 text-primary dark:text-primary-dark px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors font-medium border border-primary dark:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Send email"
            >
              <Mail className="h-5 w-5" />
              <span>Email Me</span>
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white dark:bg-slate-800 text-primary dark:text-primary-dark px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors font-medium border border-primary dark:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Visit LinkedIn profile"
            >
              <Linkedin className="h-5 w-5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white dark:bg-slate-800 text-primary dark:text-primary-dark px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors font-medium border border-primary dark:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Visit GitHub profile"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
          </div>
        </ScrollReveal>
        
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </div>
    </section>
  );
}

