export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Backend & Languages",
    skills: ["Node.js", "Go (Golang)", "JavaScript (ES6+)", "TypeScript", "Java (Spring Boot)"],
  },
  {
    name: "Frameworks",
    skills: ["NestJS", "Express.js", "Prisma ORM"],
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  },
  {
    name: "DevOps & Cloud",
    skills: ["Docker", "AWS (EC2, S3, Lambda)", "Git", "CI/CD", "Kubernetes", "Vercel", "Cloudflare"],
  },
  {
    name: "APIs",
    skills: ["RESTful APIs", "GraphQL", "WebSockets", "Microservices Architecture"],
  },
  {
    name: "Blockchain",
    skills: ["Solidity", "Web3.js", "Hardhat", "Smart Contracts"],
  },
  {
    name: "Frontend",
    skills: ["React.js", "Next.js"],
  },
  {
    name: "Tools",
    skills: ["Postman", "Swagger", "Jira", "Elasticsearch", "Google Analytics"],
  },
];

