"use client";

import { ComponentType } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/data";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  Server,
  Layers,
  Database,
  Cloud,
  Webhook,
  Blocks,
  LayoutDashboard,
  Wrench,
  Boxes,
  HardHat,
  ScrollText,
  Code2,
  Infinity as InfinityIcon,
} from "lucide-react";
import {
  SiNodedotjs,
  SiGo,
  SiJavascript,
  SiTypescript,
  SiSpring,
  SiNestjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiDocker,
  SiGit,
  SiKubernetes,
  SiVercel,
  SiCloudflare,
  SiGraphql,
  SiSolidity,
  SiWeb3Dotjs,
  SiSocketdotio,
  SiReact,
  SiNextdotjs,
  SiPostman,
  SiSwagger,
  SiJira,
  SiElasticsearch,
  SiGoogleanalytics,
} from "react-icons/si";

type IconCmp = ComponentType<{ className?: string }>;

const CATEGORY_META: Record<string, { icon: IconCmp; badge: string; color: string }> = {
  "Backend & Languages": { icon: Server, badge: "bg-blue-500/15", color: "text-blue-500" },
  Frameworks: { icon: Layers, badge: "bg-violet-500/15", color: "text-violet-500" },
  Databases: { icon: Database, badge: "bg-emerald-500/15", color: "text-emerald-500" },
  "DevOps & Cloud": { icon: Cloud, badge: "bg-sky-500/15", color: "text-sky-500" },
  APIs: { icon: Webhook, badge: "bg-amber-500/15", color: "text-amber-500" },
  Blockchain: { icon: Blocks, badge: "bg-indigo-500/15", color: "text-indigo-500" },
  Frontend: { icon: LayoutDashboard, badge: "bg-rose-500/15", color: "text-rose-500" },
  Tools: { icon: Wrench, badge: "bg-slate-500/15", color: "text-slate-500" },
};

const SKILL: Record<string, { icon: IconCmp; color: string }> = {
  "Node.js": { icon: SiNodedotjs, color: "text-[#5FA04E]" },
  "Go (Golang)": { icon: SiGo, color: "text-[#00ADD8]" },
  "JavaScript (ES6+)": { icon: SiJavascript, color: "text-yellow-600 dark:text-yellow-400" },
  TypeScript: { icon: SiTypescript, color: "text-[#3178C6]" },
  "Java (Spring Boot)": { icon: SiSpring, color: "text-[#6DB33F]" },
  NestJS: { icon: SiNestjs, color: "text-[#E0234E]" },
  "Express.js": { icon: SiExpress, color: "text-gray-900 dark:text-white" },
  "Prisma ORM": { icon: SiPrisma, color: "text-gray-800 dark:text-gray-200" },
  PostgreSQL: { icon: SiPostgresql, color: "text-[#4169E1]" },
  MongoDB: { icon: SiMongodb, color: "text-[#47A248]" },
  MySQL: { icon: SiMysql, color: "text-[#4479A1]" },
  Redis: { icon: SiRedis, color: "text-[#FF4438]" },
  Docker: { icon: SiDocker, color: "text-[#2496ED]" },
  "AWS (EC2, S3, Lambda)": { icon: Cloud, color: "text-[#FF9900]" },
  Git: { icon: SiGit, color: "text-[#F05032]" },
  "CI/CD": { icon: InfinityIcon, color: "text-emerald-500" },
  Kubernetes: { icon: SiKubernetes, color: "text-[#326CE5]" },
  Vercel: { icon: SiVercel, color: "text-gray-900 dark:text-white" },
  Cloudflare: { icon: SiCloudflare, color: "text-[#F38020]" },
  "RESTful APIs": { icon: Webhook, color: "text-sky-500" },
  GraphQL: { icon: SiGraphql, color: "text-[#E10098]" },
  WebSockets: { icon: SiSocketdotio, color: "text-gray-800 dark:text-gray-200" },
  "Microservices Architecture": { icon: Boxes, color: "text-violet-500" },
  Solidity: { icon: SiSolidity, color: "text-gray-800 dark:text-gray-200" },
  "Web3.js": { icon: SiWeb3Dotjs, color: "text-[#F16822]" },
  Hardhat: { icon: HardHat, color: "text-yellow-600 dark:text-yellow-400" },
  "Smart Contracts": { icon: ScrollText, color: "text-amber-500" },
  "React.js": { icon: SiReact, color: "text-[#087ea4] dark:text-[#61DAFB]" },
  "Next.js": { icon: SiNextdotjs, color: "text-gray-900 dark:text-white" },
  Postman: { icon: SiPostman, color: "text-[#FF6C37]" },
  Swagger: { icon: SiSwagger, color: "text-[#4CA614]" },
  Jira: { icon: SiJira, color: "text-[#0052CC]" },
  Elasticsearch: { icon: SiElasticsearch, color: "text-[#00BFB3]" },
  "Google Analytics": { icon: SiGoogleanalytics, color: "text-[#E37400]" },
};

const FALLBACK = { icon: Code2, color: "text-primary dark:text-primary-dark" };

export function Skills() {
  return (
    <section id="skills" className="py-14 sm:py-20 bg-white/75 dark:bg-slate-950/65 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Technical Skills
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 mx-auto mb-12 rounded-full"></div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            const meta =
              CATEGORY_META[category.name] ?? {
                icon: Code2,
                badge: "bg-primary/10",
                color: "text-primary dark:text-primary-dark",
              };
            const CatIcon = meta.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="glow-border group rounded-xl bg-gray-50 p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl dark:bg-slate-800"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${meta.badge}`}
                  >
                    <CatIcon className={`h-5 w-5 ${meta.color}`} />
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary-dark">
                    {category.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => {
                    const s = SKILL[skill] ?? FALLBACK;
                    const SkillIcon = s.icon;
                    return (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.08 + skillIndex * 0.05 }}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="inline-flex cursor-default items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary/20 dark:bg-primary-dark/20 dark:text-primary-dark dark:hover:bg-primary-dark/30"
                      >
                        <SkillIcon className={`h-4 w-4 shrink-0 ${s.color}`} />
                        {skill}
                      </motion.span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
