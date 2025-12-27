export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    name: "W2 Blockchain Educational Platform",
    description: "Backend infrastructure for blockchain learning platform using Node.js and Go, featuring interactive modules and real-time blockchain data integration.",
    technologies: ["Node.js", "Go", "PostgreSQL", "Web3.js"],
  },
  {
    name: "Competition & Awards Microservices",
    description: "Scalable microservices system built with Node.js and Go for competition management, real-time scoring, and automated award distribution.",
    technologies: ["Node.js", "Go", "Microservices", "Redis", "PostgreSQL"],
  },
  {
    name: "E-commerce Backend Platform",
    description: "High-performance backend services with NestJS and PostgreSQL, handling payment processing, inventory management, and order fulfillment.",
    technologies: ["NestJS", "PostgreSQL", "Redis", "AWS"],
  },
  {
    name: "Tourism Service Platform",
    description: "Comprehensive tourism booking system with backend services for reservations, payment processing, and tour management using Node.js and MongoDB.",
    technologies: ["Node.js", "MongoDB", "Express.js", "RESTful APIs"],
  },
  {
    name: "Ride-Hailing Service (Drive Service)",
    description: "Real-time ride-matching platform with geolocation services, driver tracking, and payment integration built with Node.js and PostgreSQL.",
    technologies: ["Node.js", "PostgreSQL", "WebSockets", "Geolocation"],
  },
  {
    name: "Enterprise ERP System",
    description: "Full-featured ERP solution including email management, CRM, user authentication, file management, and system configuration using NestJS and microservices architecture.",
    technologies: [
      "NestJS",
      "Microservices",
      "PostgreSQL",
      "Email Service",
      "CRM",
      "File Management",
    ],
  },
];

