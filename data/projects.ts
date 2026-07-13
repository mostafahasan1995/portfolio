export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  /** Optional real screenshot. Drop a file in /public/projects and set e.g. "/projects/abraa.png" to override the generated cover. */
  image?: string;
  category?:
    | "web"
    | "enterprise"
    | "ecommerce"
    | "blockchain"
    | "microservices"
    | "backend"
    | "travel"
    | "geo"
    | "erp";
  accent?: "cyan" | "violet" | "amber" | "indigo" | "emerald" | "blue" | "sky" | "rose";
}

export const projects: Project[] = [
  {
    name: "Neargami Platform",
    description: "Modern web platform featuring responsive design and interactive user experience. Built with React, Next.js, and TypeScript with Tailwind CSS for styling. Deployed to production with optimized performance.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://www.neargami.com/",
    category: "web",
    accent: "cyan",
  },
  {
    name: "Imkan - LARSA Enterprise Platform",
    description: "Enterprise platform developed for LARSA Technologies featuring modern UI/UX with responsive design. Full-stack development with admin dashboard for content management and user administration. Built with React, Next.js, and TypeScript.",
    technologies: ["React", "Next.js", "TypeScript", "Full-stack Development"],
    link: "https://imkan.larsa.io/",
    category: "enterprise",
    accent: "violet",
  },
  {
    name: "Abraa.com - E-commerce Marketplace",
    description: "Full-stack e-commerce marketplace platform serving the MENA region. Features product catalog, secure payment integration, RFQ system, and multi-language support. Comprehensive backend services with admin dashboard for inventory and order management. Built with React, Node.js, Express.js, and MongoDB from concept to production deployment.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Payment Integration"],
    link: "https://www.abraa.com/",
    category: "ecommerce",
    accent: "amber",
  },
  {
    name: "W2 Blockchain Educational Platform",
    description: "Backend infrastructure for blockchain learning platform using Node.js and Go, featuring interactive modules and real-time blockchain data integration.",
    technologies: ["Node.js", "Go", "PostgreSQL", "Web3.js"],
    category: "blockchain",
    accent: "indigo",
  },
  {
    name: "Competition & Awards Microservices",
    description: "Scalable microservices system built with Node.js and Go for competition management, real-time scoring, and automated award distribution.",
    technologies: ["Node.js", "Go", "Microservices", "Redis", "PostgreSQL"],
    category: "microservices",
    accent: "emerald",
  },
  {
    name: "E-commerce Backend Platform",
    description: "High-performance backend services with NestJS and PostgreSQL, handling payment processing, inventory management, and order fulfillment.",
    technologies: ["NestJS", "PostgreSQL", "Redis", "AWS"],
    category: "backend",
    accent: "blue",
  },
  {
    name: "Tourism Service Platform",
    description: "Comprehensive tourism booking system with backend services for reservations, payment processing, and tour management using Node.js and MongoDB.",
    technologies: ["Node.js", "MongoDB", "Express.js", "RESTful APIs"],
    category: "travel",
    accent: "sky",
  },
  {
    name: "Ride-Hailing Service (Drive Service)",
    description: "Real-time ride-matching platform with geolocation services, driver tracking, and payment integration built with Node.js and PostgreSQL.",
    technologies: ["Node.js", "PostgreSQL", "WebSockets", "Geolocation"],
    category: "geo",
    accent: "rose",
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
    category: "erp",
    accent: "violet",
  },
];
