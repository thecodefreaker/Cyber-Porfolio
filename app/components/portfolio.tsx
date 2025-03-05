// components/Portfolio.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink, Element } from "react-scroll";
import { useState } from "react";
import Image from "next/image";
import { urlFor } from "../lib/sanity";

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Define props types matching Sanity data
interface PortfolioProps {
  about: { bio: string; title: string; location: string; socialLinks: string[]; profilePicture?: { asset: { _ref: string } } };
  skills: { _id: string; category: string; skills: string[]; proficiency: number }[];
  experience: { _id: string; role: string; company: string; startDate: string; endDate?: string; description: string; technologies: string[]; remote: boolean }[];
  education: { _id: string; institution: string; degree: string; startDate: string; endDate: string; percentage: number; certifications: string[] }[];
  projects: { _id: string; title: string; description: string; category: string; link: string; liveLink?: string; featured: boolean; techStack: string[]; dateCompleted: string; image?: { asset: { _ref: string } } }[];
  tools: { _id: string; name: string; description: string; usage: string; link: string }[];
  contact: { email: string; linkedin: string; github: string; phone: string; portfolioUrl: string };
}

const Portfolio = ({ about, skills, experience, education, projects, tools, contact }: PortfolioProps) => {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredProjects = projects.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900 p-4 z-10 shadow-lg border-b border-green-500">
        <ul className="flex justify-center space-x-6">
          {["about", "skills", "experience", "education", "projects", "tools", "contact"].map((section) => (
            <li key={section}>
              <ScrollLink
                to={section}
                smooth={true}
                duration={500}
                className="text-green-400 hover:text-green-300 cursor-pointer capitalize transition-colors"
              >
                {section}
              </ScrollLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-10 text-center bg-gradient-to-b from-gray-900 to-gray-800">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-green-400 mb-2 tracking-wide"
        >
          Hardik Srivastava
        </motion.h1>
        <p className="text-xl text-blue-400">{about.title}</p>
      </section>

      {/* About Section */}
      <Element name="about">
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-10 px-4"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-green-400">About Me</h2>
          <div className="flex flex-col items-center max-w-2xl mx-auto">
            {about.profilePicture && (
              <Image
                src={urlFor(about.profilePicture).width(128).height(128).url()}
                alt="Hardik"
                width={128}
                height={128}
                className="rounded-full mb-4 border-2 border-green-400 shadow-[0_0_10px_rgba(0,255,0,0.5)]"
              />
            )}
            <p className="text-center text-gray-200">{about.bio}</p>
          </div>
        </motion.section>
      </Element>

      {/* Skills Section */}
      <Element name="skills">
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-10 px-4 bg-gray-800"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-green-400">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {skills.map((skill) => (
              <div key={skill._id} className="p-4 bg-gray-700 rounded-lg">
                <h3 className="text-xl font-bold text-blue-400 mb-2">{skill.category}</h3>
                <ul className="list-disc list-inside text-gray-200">
                  {skill.skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>
      </Element>

      {/* Experience Section */}
      <Element name="experience">
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-10 px-4"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-green-400">Experience</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {experience.map((exp) => (
              <div key={exp._id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-[0_0_15px_rgba(0,255,0,0.5)] transition-shadow">
                <h3 className="text-xl font-bold text-blue-400">{exp.role} at {exp.company}</h3>
                <p className="text-gray-400">{exp.startDate} - {exp.endDate || "Present"}</p>
                <p className="mt-2 text-gray-200">{exp.description}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </Element>

      {/* Education Section */}
      <Element name="education">
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-10 px-4 bg-gray-800"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-green-400">Education</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {education.map((edu) => (
              <div key={edu._id} className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-400">{edu.degree}</h3>
                <p className="text-gray-200">{edu.institution}</p>
                <p className="text-gray-400">{edu.startDate} - {edu.endDate}</p>
                <p className="text-gray-200">Percentage: {edu.percentage}%</p>
              </div>
            ))}
          </div>
        </motion.section>
      </Element>

      {/* Projects Section */}
      <Element name="projects">
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-10 px-4"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-green-400">Projects</h2>
          {featuredProjects.length > 0 && (
            <div className="mb-10 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Featured Projects</h3>
              <div className="grid grid-cols-1 gap-6">
                {featuredProjects.map((project) => (
                  <motion.div
                    key={project._id}
                    className="bg-gray-700 p-6 rounded-lg cursor-pointer hover:shadow-[0_0_15px_rgba(0,255,0,0.5)]"
                    onClick={() => setSelectedProject(project)}
                    whileHover={{ scale: 1.05 }}
                  >
                    {project.image && (
                      <Image
                        src={urlFor(project.image).width(400).height(160).url()}
                        alt={project.title}
                        width={400}
                        height={160}
                        className="w-full h-40 object-cover rounded-md mb-4"
                      />
                    )}
                    <h3 className="text-xl font-bold text-blue-400">{project.title}</h3>
                    <p className="text-sm text-gray-200">{project.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-6 p-2 rounded bg-gray-800 text-white w-full max-w-md mx-auto block border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-700 p-6 rounded-lg cursor-pointer hover:shadow-[0_0_15px_rgba(0,255,0,0.5)] transition-shadow"
                onClick={() => setSelectedProject(project)}
              >
                {project.image && (
                  <Image
                    src={urlFor(project.image).width(400).height(160).url()}
                    alt={project.title}
                    width={400}
                    height={160}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-xl font-bold text-blue-400">{project.title}</h3>
                <p className="text-sm text-gray-200">{project.description}</p>
                <span className="text-green-400 text-sm">{project.category}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </Element>

      {/* Tools Section */}
      <Element name="tools">
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-10 px-4 bg-gray-800"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-green-400">Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tools.map((tool) => (
              <div key={tool._id} className="bg-gray-700 p-6 rounded-lg hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition-shadow">
                <h3 className="text-xl font-bold text-blue-400">{tool.name}</h3>
                <p className="text-sm text-gray-200">{tool.description}</p>
                <p className="text-green-400 text-sm">Usage: {tool.usage}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </Element>

      {/* Contact Section */}
      <Element name="contact">
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-10 px-4"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-green-400">Contact</h2>
          <div className="text-center max-w-md mx-auto">
            <p>Email: <a href={`mailto:${contact.email}`} className="text-blue-400 hover:underline">{contact.email}</a></p>
            <p>LinkedIn: <a href={contact.linkedin} target="_blank" className="text-blue-400 hover:underline">Profile</a></p>
            <p>GitHub: <a href={contact.github} target="_blank" className="text-blue-400 hover:underline">Profile</a></p>
            <a
              href="/resume.pdf"
              download="Hardik_Srivastava_Resume.pdf"
              className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Download Resume
            </a>
          </div>
        </motion.section>
      </Element>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

// Project Modal Component
const ProjectModal = ({ project, onClose }: { project: PortfolioProps["projects"][0]; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full border border-green-500" onClick={(e) => e.stopPropagation()}>
      <h3 className="text-2xl font-bold text-green-400 mb-4">{project.title}</h3>
      {project.image && (
        <Image
          src={urlFor(project.image).width(400).height(240).url()}
          alt={project.title}
          width={400}
          height={240}
          className="w-full h-60 object-cover rounded-md mb-4"
        />
      )}
      <p className="text-white mb-4">{project.description}</p>
      <p className="text-gray-300 mb-4">Category: {project.category}</p>
      <div className="flex flex-col sm:flex-row gap-4">
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            Live Demo
          </a>
        )}
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
          View on GitHub
        </a>
      </div>
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
        Close
      </button>
    </div>
  </motion.div>
);

export default Portfolio;