import { Linkedin, Github, Mail, Phone } from "lucide-react";
import { personal } from "@/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Mostafa Ali Hasan</h3>
            <p className="text-sm">Senior Software Engineer & Team Lead</p>
            <p className="text-sm mt-2">{personal.location}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center space-x-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{personal.email}</span>
              </a>
              <a
                href={`tel:${personal.phone.primary}`}
                className="flex items-center space-x-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{personal.phone.primary}</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Follow</h4>
            <div className="flex space-x-4">
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded"
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded"
                aria-label="Visit GitHub profile"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Mostafa Ali Hasan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

