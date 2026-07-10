"use client";

import { X, Download, Printer } from "lucide-react";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const generateResumeHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mostafa Ali Hasan - CV</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #eef1f5;
            padding: 24px 16px;
            color: #222;
        }
        .btn-bar {
            max-width: 800px;
            margin: 0 auto 18px;
            text-align: center;
        }
        .btn-bar button {
            background: #1a1a1a;
            color: #fff;
            border: none;
            padding: 11px 28px;
            font-size: 14px;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .btn-bar button:hover { background: #333; }
        #cv {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
            padding: 40px 44px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.12);
            border-radius: 8px;
            font-size: 13px;
            color: #222;
            line-height: 1.55;
        }
        h1 { font-size: 26px; color: #1a1a1a; margin-bottom: 3px; }
        .subtitle { font-size: 15px; color: #555; margin-bottom: 10px; }
        .contact-info { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: 4px; }
        .contact-info a { color: #0055aa; text-decoration: none; }
        hr { border: none; border-top: 1.5px solid #ccc; margin: 12px 0; }
        h2 {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #1a1a1a;
            border-bottom: 1.5px solid #1a1a1a;
            padding-bottom: 3px;
            margin-top: 18px;
            margin-bottom: 10px;
        }
        h3 { font-size: 13.5px; color: #1a1a1a; margin-top: 12px; margin-bottom: 1px; font-weight: bold; }
        .company { font-size: 13px; color: #444; margin-bottom: 1px; }
        .date { font-size: 12px; color: #777; font-style: italic; margin-bottom: 6px; }
        ul { margin-left: 18px; margin-bottom: 10px; }
        li { margin-bottom: 4px; font-size: 12.5px; line-height: 1.45; }
        p { margin-bottom: 8px; font-size: 12.5px; line-height: 1.45; }
        .skills-line { margin-bottom: 5px; font-size: 12.5px; }
        .skills-line strong { color: #1a1a1a; }
        .project-title { font-weight: bold; font-size: 13px; margin-top: 9px; color: #1a1a1a; }
        @media (max-width: 640px) {
            body { padding: 12px 8px; }
            #cv { padding: 24px 22px; }
        }
        @media print {
            body { background: white; padding: 0; }
            .btn-bar { display: none; }
            #cv { box-shadow: none; border-radius: 0; margin: 0; width: 100%; max-width: none; padding: 15mm; }
        }
    </style>
</head>
<body>

    <div id="cv">

        <h1>Mostafa Ali Hasan</h1>
        <div class="subtitle">Senior Full Stack Developer</div>

        <div class="contact-info">
            mostafa1995hasan@gmail.com &nbsp;|&nbsp; +963930066629<br>
            <a href="https://www.linkedin.com/in/mostafa-hasan-972aa93b4">linkedin.com/in/mostafa-hasan-972aa93b4</a> &nbsp;|&nbsp;
            <a href="https://mostafa-ali-hasan.vercel.app/">mostafa-ali-hasan.vercel.app</a>
        </div>

        <hr>

        <h2>Professional Summary</h2>
        <p>Senior Full Stack Developer with over 7 years of experience building scalable, production-grade web applications using modern JavaScript and Python stacks. Proficient in Angular (TypeScript) and React for frontend development, and Node.js, NestJS, and Django (Python) for backend services. Strong expertise in PostgreSQL, relational database design, RESTful API architecture, and microservices. Experienced in Agile/Scrum environments with a strong track record of cross-functional collaboration and delivering multi-tenant enterprise solutions.</p>

        <h2>Technical Skills</h2>
        <div class="skills-line"><strong>Backend & Languages:</strong> Node.js, Python (Django, Django REST Framework, FastAPI), Go (Golang), JavaScript (ES6+), TypeScript, Java (Spring Boot)</div>
        <div class="skills-line"><strong>Frontend:</strong> Angular (TypeScript, RxJS, NgRx), React.js, Next.js, Tailwind CSS, Responsive Design</div>
        <div class="skills-line"><strong>Frameworks:</strong> NestJS, Express.js, Django, FastAPI, Prisma ORM</div>
        <div class="skills-line"><strong>Databases:</strong> PostgreSQL (incl. JSONB), MongoDB, MySQL, Redis, Oracle — hybrid data architecture experience</div>
        <div class="skills-line"><strong>APIs:</strong> RESTful APIs, API-first Architecture, GraphQL, WebSockets, Microservices Architecture</div>
        <div class="skills-line"><strong>DevOps & Cloud:</strong> Docker, AWS (EC2, S3, Lambda), Git, CI/CD, Kubernetes, Vercel, Cloudflare</div>
        <div class="skills-line"><strong>Blockchain:</strong> Solidity, Web3.js, Hardhat, Smart Contracts</div>
        <div class="skills-line"><strong>Tools:</strong> Postman, Swagger, Jira, Trello, Elasticsearch, Google Analytics, Celery</div>
        <div class="skills-line"><strong>Soft Skills:</strong> Strong analytical & problem-solving skills, Agile/Scrum, Team Leadership, Cross-functional collaboration, English B2+</div>

        <h2>Professional Experience</h2>

        <h3>Senior Full Stack JS Developer</h3>
        <div class="company">L-One Systems GmbH | Remote</div>
        <div class="date">April 2026 - Present</div>
        <ul>
            <li>Architect and deliver production-grade, multi-tenant applications using Angular (TypeScript) and NestJS</li>
            <li>Build modular, component-driven frontends with Angular and scalable REST API backends backed by PostgreSQL and Prisma ORM</li>
            <li>Design tenant-isolated data models and implement row-level security patterns ensuring strict data separation for thousands of users</li>
            <li>Drive full workflow automation by integrating AI agents — connecting GitHub and Notion to automate PR reviews, changelog generation, and documentation</li>
            <li>Champion modular, testable code throughout the monorepo with a strong focus on reliability, security, and performance</li>
            <li>Actively participate in Agile ceremonies and technical meetings, collaborating effectively across cross-functional teams</li>
        </ul>

        <h3>Senior Software Engineer</h3>
        <div class="company">LARSA Technologies | Dubai, UAE (Remote)</div>
        <div class="date">April 2024 - April 2026 (2 years)</div>
        <ul>
            <li>Full-stack development using Node.js, Go, Angular, and React for enterprise-grade applications</li>
            <li>Designed and built RESTful API-first architecture for a blockchain educational platform serving thousands of users</li>
            <li>Implemented multi-tenant architecture with isolated data models and per-tenant configurations using PostgreSQL</li>
            <li>Built backend services for tourism and competition management platforms with real-time processing</li>
            <li>Applied hybrid data architecture combining PostgreSQL (with JSONB), MongoDB for flexible data needs</li>
            <li>Optimized database performance and implemented Redis caching for high-traffic, scalable systems</li>
        </ul>

        <h3>Senior Full Stack Engineer & Team Lead</h3>
        <div class="company">RAMMAZ Tech | Istanbul, Turkey (Remote)</div>
        <div class="date">March 2021 - April 2024 (3 years 2 months)</div>
        <ul>
            <li>Led development team of 5+ engineers in an Agile/Scrum environment with sprint planning and code reviews</li>
            <li>Built full-stack applications with Angular (TypeScript) for frontend and Node.js/NestJS for backend</li>
            <li>Developed Python (Django) services for data processing and REST API integrations</li>
            <li>Architected e-commerce microservices platform using RabbitMQ (Celery-compatible async tasks), MongoDB, and Oracle</li>
            <li>Designed relational database schemas in PostgreSQL with a strong focus on performance and data integrity</li>
            <li>Implemented event-driven, API-first architecture for inter-service communication</li>
            <li>Managed AWS deployments and CI/CD pipelines; improved system performance by 40%</li>
        </ul>

        <h3>Full Stack Engineer</h3>
        <div class="company">Abraa.com | Remote</div>
        <div class="date">August 2018 - March 2021 (2 years 8 months)</div>
        <ul>
            <li>Built full-stack web applications with Angular and Django (Python) from concept to production deployment</li>
            <li>Designed and optimized PostgreSQL relational database schemas and complex queries</li>
            <li>Developed RESTful APIs using Django REST Framework and integrated third-party payment gateways</li>
            <li>Collaborated in cross-functional Agile teams to deliver multi-language, multi-region e-commerce features</li>
        </ul>

        <h2>Key Projects</h2>

        <div class="project-title">HA Government Portal & Competition Management System</div>
        <p><strong>Role: Backend Engineer</strong> — Government microservices project built with Node.js and Go, featuring real-time scoring, automated award distribution, PostgreSQL data modeling, and enterprise-grade API-first design. <a href="https://www.ha.ae/en">View Project</a></p>

        <div class="project-title">Imkan - Enterprise Tourism & Business Platform</div>
        <p><strong>Role: Backend Engineer</strong> — Microservices system with Email, CRM, HR, Marketing, Files, and RBAC user management. Built with Node.js and MongoDB with hybrid PostgreSQL integration. <a href="https://imkan.larsa.io/">View Project</a></p>

        <div class="project-title">Abraa.com - E-commerce Marketplace</div>
        <p>Full-stack marketplace for the MENA region. Built with Angular, Django REST Framework, and PostgreSQL. Features product catalog, RFQ system, secure payments, and multi-language support. <a href="https://www.abraa.com/">View Project</a></p>

        <div class="project-title">W2 Blockchain Educational Platform</div>
        <p>Backend infrastructure for a blockchain learning platform using Node.js and Go, with real-time data integration and interactive learning modules.</p>

        <div class="project-title">Drive - Cloud Storage & File Management System</div>
        <p>Google Drive-like platform built with Go (Golang) featuring hierarchical folder structure, advanced search, file sharing, and permission management.</p>

        <div class="project-title">Enterprise ERP System</div>
        <p>Full-featured ERP using NestJS microservices — covering email, CRM, authentication, file management, and system configuration with role-based access control.</p>

        <h2>Education</h2>
        <h3>Bachelor's Degree in Informatics Engineering</h3>
        <div class="company">Aleppo University, Syria</div>
        <div class="date">Graduated 2018</div>

        <h2>Languages</h2>
        <p><strong>English:</strong> B2+ (Fluent) &nbsp;|&nbsp; <strong>Arabic:</strong> Native</p>

        <h2>Additional Information</h2>
        <ul>
            <li>Open to full-time opportunities and remote work</li>
            <li>Available for immediate start</li>
            <li>Willing to relocate</li>
        </ul>

    </div>

    <script>
        function downloadPDF() {
            const el = document.getElementById('cv');
            const opt = {
                margin: 0,
                filename: 'Mostafa_Ali_Hasan_CV.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(el).save();
        }
    </script>

</body>
</html>`;
  };

  const handleDownload = () => {
    const html = generateResumeHTML();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Mostafa_Ali_Hasan_CV.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(generateResumeHTML());
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-slate-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-slate-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Resume / CV
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-primary-dark dark:hover:bg-blue-600"
                  aria-label="Download Resume"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center space-x-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                  aria-label="Print Resume"
                >
                  <Printer className="h-4 w-4" />
                  <span className="hidden sm:inline">Print</span>
                </button>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-gray-200"
                  aria-label="Close Resume"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden bg-[#eef1f5]">
              <iframe
                srcDoc={generateResumeHTML()}
                className="h-full w-full border-0"
                title="Resume Preview"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
