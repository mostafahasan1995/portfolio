/**
 * Single source of truth for "years of experience", computed live from the
 * first professional role so it stays correct every month/year without edits.
 */

/** Start of the first professional role (Abraa.com, August 2018). */
export const CAREER_START = new Date("2018-08-01T00:00:00Z");

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/** Whole years of experience as of `from` (defaults to now). */
export function getYearsOfExperience(from: Date = new Date()): number {
  const years = Math.floor((from.getTime() - CAREER_START.getTime()) / MS_PER_YEAR);
  return Math.max(0, years);
}

/** Professional summary with the live experience count injected. */
export function getProfessionalSummary(from: Date = new Date()): string {
  const years = getYearsOfExperience(from);
  return `Senior Software Engineer with over ${years} years of full-stack development experience, specializing in scalable microservices and high-performance systems. Expert in backend technologies including Node.js and Go (Golang), with strong frontend proficiency in React.js and Next.js. Proven team leader with 2+ years managing development teams. Strong track record delivering production-ready solutions for blockchain, e-commerce, and enterprise applications across the entire stack.`;
}
