// types.ts (in /media/kaliluser/Acer/POrtfolio/Web2/portfolio-grok/)
export interface ProjectDoc {
    _id: string;
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
  
  export interface HeroProps {
    projects: ProjectDoc[];
  }