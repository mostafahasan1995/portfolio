"use client";

import { X, Download } from "lucide-react";
import { personal, experiences, skillCategories, projects, education } from "@/data";
import { useEffect } from "react";

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

  if (!isOpen) return null;

  const generateResumeHTML = () => {
    const skillsHTML = skillCategories
      .map(
        (cat) =>
          `<div class="skills-line"><strong>${cat.name}:</strong> ${cat.skills.join(", ")}</div>`
      )
      .join("");

    const experienceHTML = experiences
      .map(
        (exp) => `
      <h3>${exp.position}</h3>
      <div class="company">${exp.company} | ${exp.location}</div>
      <div class="date">${exp.startDate} - ${exp.endDate} (${exp.duration})</div>
      <ul>
        ${exp.achievements.map((ach) => `<li>${ach}</li>`).join("")}
      </ul>
    `
      )
      .join("");

    const projectsHTML = projects
      .map(
        (proj) => `
      <div class="project-title">${proj.name}</div>
      <p>${proj.description}${proj.link ? ` <a href="${proj.link}">View Project</a>` : ""}</p>
    `
      )
      .join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mostafa Ali Hasan - CV</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 850px;
            margin: 0 auto;
            padding: 40px 50px;
            background: #fff;
        }
        
        h1 {
            font-size: 32px;
            color: #1a1a1a;
            margin-bottom: 5px;
        }
        
        .subtitle {
            font-size: 18px;
            color: #555;
            margin-bottom: 15px;
        }
        
        .contact-info {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
            line-height: 1.8;
        }
        
        .contact-info a {
            color: #0066cc;
            text-decoration: none;
        }
        
        hr {
            border: none;
            border-top: 2px solid #ddd;
            margin: 20px 0;
        }
        
        h2 {
            font-size: 20px;
            color: #1a1a1a;
            margin-top: 25px;
            margin-bottom: 12px;
            border-bottom: 2px solid #333;
            padding-bottom: 5px;
        }
        
        h3 {
            font-size: 16px;
            color: #1a1a1a;
            margin-top: 15px;
            margin-bottom: 3px;
        }
        
        .company {
            font-size: 15px;
            color: #444;
            margin-bottom: 2px;
        }
        
        .date {
            font-size: 14px;
            color: #666;
            font-style: italic;
            margin-bottom: 8px;
        }
        
        ul {
            margin-left: 20px;
            margin-bottom: 15px;
        }
        
        li {
            margin-bottom: 6px;
            font-size: 14px;
        }
        
        p {
            margin-bottom: 10px;
            font-size: 14px;
        }
        
        .skills-line {
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .skills-line strong {
            color: #1a1a1a;
        }
        
        .project-title {
            font-weight: bold;
            color: #1a1a1a;
            font-size: 15px;
            margin-top: 10px;
        }
        
        @media print {
            body {
                padding: 0.5in;
                max-width: 100%;
            }
            
            @page {
                margin: 0.5in;
                size: letter;
            }
            
            h1 {
                page-break-after: avoid;
            }
            
            h2 {
                page-break-after: avoid;
                margin-top: 15px;
            }
            
            h3 {
                page-break-after: avoid;
            }
            
            ul, p {
                page-break-inside: avoid;
            }
            
            .contact-info a {
                color: #0066cc;
                text-decoration: none;
            }
        }
    </style>
</head>
<body>
    <h1>${personal.name}</h1>
    <div class="subtitle">${personal.title}</div>
    
    <div class="contact-info">
        📧 ${personal.email} | 📞 ${personal.phone.primary}<br>
        🌍 ${personal.location}<br>
        🔗 <a href="${personal.github}">GitHub: github.com/mostafahasan1995</a> | 
        🔗 <a href="${personal.linkedin}">LinkedIn: linkedin.com/in/mostafa-hasan-757688332</a>${personal.portfolio ? ` | 
        🔗 <a href="${personal.portfolio}">Portfolio: portfolio-six-me.vercel.app</a>` : ""}
    </div>
    
    <hr>
    
    <h2>Professional Summary</h2>
    <p>${personal.summary}</p>
    
    <h2>Technical Skills</h2>
    ${skillsHTML}
    
    <h2>Professional Experience</h2>
    ${experienceHTML}
    
    <h2>Key Projects</h2>
    ${projectsHTML}
    
    <h2>Education</h2>
    <h3>${education.degree}</h3>
    <div class="company">${education.institution}, ${education.location}</div>
    <div class="date">Graduated ${education.graduationYear}</div>
    
    <h2>Languages</h2>
    <p><strong>English:</strong> Fluent | <strong>Arabic:</strong> Native</p>
    
    <h2>Additional Information</h2>
    <ul>
        <li>Open to full-time opportunities and remote work</li>
        <li>Available for immediate start</li>
        <li>Willing to relocate</li>
    </ul>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Resume / CV
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 dark:bg-primary-dark dark:hover:bg-blue-600 transition-colors text-sm font-medium"
              aria-label="Download Resume"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
              aria-label="Print Resume"
            >
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
              aria-label="Close Resume"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <iframe
            srcDoc={generateResumeHTML()}
            className="w-full h-full border-0"
            title="Resume Preview"
          />
        </div>
      </div>
    </div>
  );
}

