export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  duration: string;
  description: string;
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    company: "L-One Systems GmbH",
    position: "Senior Full Stack JS Developer",
    location: "Remote",
    startDate: "April 2026",
    endDate: "Present",
    duration: "3 months",
    description: "Architecting production-grade, multi-tenant applications with Angular (TypeScript) and NestJS, backed by PostgreSQL and Prisma ORM",
    achievements: [
      "Architect and deliver production-grade, multi-tenant applications using Angular (TypeScript) and NestJS",
      "Build modular, component-driven frontends and scalable REST API backends backed by PostgreSQL and Prisma ORM",
      "Design tenant-isolated data models and implement row-level security patterns ensuring strict data separation for thousands of users",
      "Drive full workflow automation by integrating AI agents — connecting GitHub and Notion to automate PR reviews, changelog generation, and documentation",
      "Champion modular, testable code throughout the monorepo with a strong focus on reliability, security, and performance",
      "Actively participate in Agile ceremonies and technical meetings, collaborating effectively across cross-functional teams",
    ],
  },
  {
    company: "LARSA Technologies",
    position: "Senior Software Engineer",
    location: "Dubai, UAE (Remote)",
    startDate: "April 2024",
    endDate: "April 2026",
    duration: "2 years",
    description: "Full-stack development with primary focus on backend architecture using Node.js and Go for enterprise applications",
    achievements: [
      "Full-stack development with primary focus on backend architecture using Node.js and Go for enterprise applications",
      "Architect and develop scalable microservices for competition management, awards systems, and blockchain platforms",
      "Design RESTful APIs and backend services for blockchain educational platform serving thousands of users",
      "Build backend infrastructure for tourism and ride-hailing platforms with real-time processing capabilities",
      "Develop admin dashboards and frontend interfaces using React and Next.js when needed",
      "Optimize database performance and implement Redis caching strategies for high-traffic applications",
    ],
  },
  {
    company: "RAMMAZ Tech",
    position: "Senior Full Stack Engineer & Team Lead",
    location: "Istanbul, Turkey (Remote)",
    startDate: "March 2021",
    endDate: "April 2024",
    duration: "3 years 2 months",
    description: "Led development team and architected full-stack applications",
    achievements: [
      "Led development team of 5+ engineers, conducting code reviews and sprint planning",
      "Architected full-stack applications using Node.js, React, and Next.js",
      "Developed blockchain solutions with Solidity and smart contracts",
      "Built RESTful APIs and backend services with Express.js and NestJS",
      "Managed AWS deployments and CI/CD pipelines",
      "Improved system performance by 40% through optimization",
      "Collaborated in Agile/Scrum environment with cross-functional teams",
    ],
  },
  {
    company: "Abraa.com",
    position: "Full Stack Engineer",
    location: "Remote",
    startDate: "August 2018",
    endDate: "March 2021",
    duration: "2 years 8 months",
    description: "Built full-stack web applications from concept to deployment",
    achievements: [
      "Built full-stack web applications from concept to deployment",
      "Designed database schemas and optimized queries",
      "Developed user interfaces with modern JavaScript frameworks",
      "Integrated third-party APIs and payment gateways",
    ],
  },
];

