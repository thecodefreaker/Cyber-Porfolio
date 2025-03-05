// data/aboutData.ts
// This file holds all the data for the About section. Edit here to change content without touching the component code.

export interface Skill {
    name: string;
    proficiency: number; // 0-100, for the proficiency meter
    description: string; // Tooltip text
  }
  
  export const introText: string =
    "Certified Ethical Hacker (CEH v12 Master) with a passion for cybersecurity and software development. I specialize in penetration testing, network security, and building robust systems using cutting-edge tools and languages.";
  
  export const education: string[] = [
    "GL Bajaj Institute of Technology and Management - B.Tech in IT (75.2%) - 2020-2024",
    "Lucknow Public School - Higher Secondary (80%) - 2019-2020",
  ];
  
//   export const certifications: string[] = [
//     "Certified Ethical Hacker (CEH v12 Master) - EC-Council - Oct 2024",
//     "Penetration Testing Certification - WscubeTech - Mar 2024",
//     "Fundamentals of Network Security - Udemy - Jul 2023",
//     "SQL Fundamentals - Udemy - Nov 2022",
//     "Introduction to C++ - Coding Ninjas - Feb 2022",
//   ];
  
  export const skills: Skill[] = [
    { name: "Penetration Testing", proficiency: 90, description: "Expert in finding and fixing vulnerabilities." },
    { name: "JavaScript", proficiency: 85, description: "Builds dynamic web applications." },
    { name: "Python", proficiency: 88, description: "Automates security scans and scripts." },
    { name: "React.js", proficiency: 80, description: "Creates modern, responsive UIs." },
    { name: "Node.js", proficiency: 75, description: "Develops scalable backends." },
    { name: "Nmap", proficiency: 92, description: "Network scanning and mapping." },
    { name: "Burp Suite", proficiency: 87, description: "Web vulnerability testing." },
    { name: "Wireshark", proficiency: 85, description: "Network traffic analysis." },
    { name: "Metasploit", proficiency: 88, description: "Exploitation framework mastery." },
    { name: "MySQL", proficiency: 80, description: "Database management and security." },
  ];




  // data/aboutData.ts
// Update this file to change content without touching the component.

//export const introText: string =
//"Certified Ethical Hacker (CEH v12 Master) with expertise in cybersecurity, penetration testing, and software development. I specialize in securing systems and automating security tasks using modern tools and programming languages.";

// export const education: string[] = [
// "GL Bajaj Institute of Technology and Management - B.Tech in IT (75.2%) - 2020-2024",
// "Lucknow Public School - Higher Secondary (80%) - 2019-2020",
// ];

export interface Certification {
name: string;
link: string; // URL to certificate (PDF or external page)
}

export const certifications: Certification[] = [
{
  name: "Certified Ethical Hacker (CEH v12 Master) - EC-Council - Oct 2024",
  link: "https://example.com/ceh-certification", // Replace with your actual URL
},
{
  name: "Penetration Testing Certification - WscubeTech - Mar 2024",
  link: "https://example.com/penetration-testing-certification", // Replace with your actual URL
},
{
  name: "Fundamentals of Network Security - Udemy - Jul 2023",
  link: "https://example.com/network-security-certification", // Replace with your actual URL
},
];

export interface Skill {
name: string;
proficiency: number; // 0-100
description: string;
}

