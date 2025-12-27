# Portfolio Website - Mostafa Ali Hasan

A modern, professional portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. This portfolio showcases my experience as a Senior Software Engineer & Team Lead.

## Features

- 🎨 **Professional Corporate Design** - Clean, modern, and professional design suitable for enterprise roles
- 🌙 **Dark Mode Support** - Toggle between light and dark themes with system preference detection
- 📱 **Fully Responsive** - Optimized for all screen sizes from mobile to desktop
- ⚡ **Performance Optimized** - Built with Next.js 14 App Router for optimal performance
- 🎭 **Smooth Animations** - Framer Motion animations for engaging user experience
- ♿ **Accessible** - WCAG compliant with proper ARIA labels and keyboard navigation
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and structured data for better search visibility

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Home page with all sections
│   └── globals.css         # Global styles
├── components/
│   ├── sections/           # Section components (Hero, About, Experience, etc.)
│   ├── ui/                 # Reusable UI components (Navigation, Footer, etc.)
│   └── animations/         # Animation wrappers
├── data/                   # Data files (personal info, experience, skills, projects)
└── lib/                    # Utility functions
```

## Customization

All personal information is stored in the `data/` directory:
- `data/personal.ts` - Personal information and contact details
- `data/experience.ts` - Work experience entries
- `data/skills.ts` - Technical skills by category
- `data/projects.ts` - Project portfolio
- `data/education.ts` - Education information

Simply update these files to customize the portfolio with your own information.

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

## License

This project is open source and available under the MIT License.
