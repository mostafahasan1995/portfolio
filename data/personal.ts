import { getProfessionalSummary } from "@/lib/experience";

export const personal = {
  name: "Mostafa Ali Hasan",
  title: "Senior Software Engineer & Team Lead",
  location: "Lebanon - Beirut",
  email: "stevhasan17@gmail.com",
  phone: {
    primary: "+96181514292",
  },
  linkedin: "https://www.linkedin.com/in/mostafa-hasan-972aa93b4",
  github: "https://github.com/mostafahasan1995",
  portfolio: "https://portfolio-six-me.vercel.app/",
  /** Computed live so the years-of-experience figure never goes stale. */
  get summary() {
    return getProfessionalSummary();
  },
};

