// app/portfolio/page.tsx
import { client } from "../lib/sanity";
import Portfolio from "../components/portfolio";

// Define types matching Sanity schemas
interface AboutDoc {
  _id: string;
  _type: "about";
  bio: string;
  title: string;
  location: string;
  socialLinks: string[];
  profilePicture?: { asset: { _ref: string } };
}

interface SkillDoc {
  _id: string;
  _type: "skill";
  category: string;
  skills: string[];
  proficiency: number;
}

interface ExperienceDoc {
  _id: string;
  _type: "experience";
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  remote: boolean;
}

interface EducationDoc {
  _id: string;
  _type: "education";
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  percentage: number;
  certifications: string[];
}

interface ProjectDoc {
  _id: string;
  _type: "project";
  title: string;
  description: string;
  category: string;
  link: string;
  liveLink?: string;
  featured: boolean;
  techStack: string[];
  dateCompleted: string;
  image?: { asset: { _ref: string } };
}

interface ToolDoc {
  _id: string;
  _type: "tool";
  name: string;
  description: string;
  usage: string;
  link: string;
}

interface ContactDoc {
  _id: string;
  _type: "contact";
  email: string;
  linkedin: string;
  github: string;
  phone: string;
  portfolioUrl: string;
}

export default async function PortfolioPage() {
  const about = await client.fetch<AboutDoc>(`*[_type == "about"][0]`);
  const skills = await client.fetch<SkillDoc[]>(`*[_type == "skill"]`);
  const experience = await client.fetch<ExperienceDoc[]>(`*[_type == "experience"] | order(startDate desc)`);
  const education = await client.fetch<EducationDoc[]>(`*[_type == "education"] | order(startDate desc)`);
  const projects = await client.fetch<ProjectDoc[]>(`*[_type == "project"]`);
  const tools = await client.fetch<ToolDoc[]>(`*[_type == "tool"]`);
  const contact = await client.fetch<ContactDoc>(`*[_type == "contact"][0]`);

  return (
    <Portfolio
      about={about}
      skills={skills}
      experience={experience}
      education={education}
      projects={projects}
      tools={tools}
      contact={contact}
    />
  );
}

export const revalidate = 10; // Incremental Static Regeneration every 10 seconds