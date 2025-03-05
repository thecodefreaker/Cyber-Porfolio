export interface Experience {
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string[];
  }
  
  export const resumeData = {
    experience: [
      {
        position: "Senior AI Architect",
        company: "xAI",
        startDate: "March 2020",
        endDate: "Present",
        description: "Leading global AI initiatives...",
        achievements: ["Developed groundbreaking cybersecurity models...", "..."]
      }
    ],
    // ... other sections
  };