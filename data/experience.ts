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
    company: "LARSA Technologies",
    position: "Senior Back End Engineer",
    location: "Dubai, UAE (Remote)",
    startDate: "May 2025",
    endDate: "Present",
    duration: "Present",
    description: "Architect and develop scalable microservices for enterprise applications",
    achievements: [
      "Architect and develop scalable microservices using Node.js and Go for enterprise applications",
      "Build competition and awards system handling complex business logic and real-time processing",
      "Design RESTful APIs for blockchain educational platform serving thousands of users",
      "Develop backend services for tourism and ride-hailing platforms",
      "Optimize database performance and implement Redis caching strategies",
    ],
  },
  {
    company: "ScrollBites (RAMMAZ Tech)",
    position: "Full-stack Developer & Team Lead",
    location: "Istanbul, Turkey (Remote)",
    startDate: "April 2023",
    endDate: "May 2025",
    duration: "2 years 2 months",
    description: "Led development team and architected full-stack applications",
    achievements: [
      "Led development team of 5+ engineers, conducting code reviews and sprint planning",
      "Architected full-stack applications using Node.js, React, and Next.js",
      "Developed blockchain solutions with Solidity and smart contracts",
      "Managed AWS deployments and CI/CD pipelines",
      "Improved system performance by 40% through optimization",
    ],
  },
  {
    company: "Qtech Group",
    position: "Senior Full Stack Engineer",
    location: "Remote",
    startDate: "April 2021",
    endDate: "April 2023",
    duration: "2 years 1 month",
    description: "Developed backend web applications and React Native mobile apps",
    achievements: [
      "Developed backend web applications and React Native mobile apps",
      "Built RESTful APIs using Node.js and Express",
      "Implemented responsive frontend with React.js",
      "Collaborated in Agile/Scrum environment",
    ],
  },
  {
    company: "Abraa.com",
    position: "Full Stack Engineer",
    location: "Remote",
    startDate: "August 2018",
    endDate: "April 2021",
    duration: "2 years 9 months",
    description: "Built full-stack web applications from concept to deployment",
    achievements: [
      "Built full-stack web applications from concept to deployment",
      "Designed database schemas and optimized queries",
      "Developed user interfaces with modern JavaScript frameworks",
      "Integrated third-party APIs and payment gateways",
    ],
  },
];

