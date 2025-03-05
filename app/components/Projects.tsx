'use client';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  link?: string;
  github: string;
}

const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description: 'A responsive portfolio website using HTML, CSS, and JavaScript, optimized for 95% cross-device compatibility.',
    link: 'https://yourportfolio.com',
    github: 'https://github.com/yourusername/portfolio',
  },
  {
    title: 'JSON-Power-DB',
    description: 'A CRUD application managing 500+ data entries with RESTful APIs, built using HTML, CSS, JavaScript, and jQuery.',
    link: 'https://yourjsonpowerdb.com',
    github: 'https://github.com/yourusername/json-power-db',
  },
  {
    title: 'Password Manager',
    description: 'A secure password manager encrypting 1000+ credentials with AES-256, built with Vue.js, MySQL, and Symphony API.',
    github: 'https://github.com/yourusername/password-manager',
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all"
            >
              <h3 className="text-2xl font-bold text-green-400">{project.title}</h3>
              <p className="mt-4">{project.description}</p>
              <div className="mt-6">
                {project.link && (
                  <a href={project.link} className="text-blue-400 hover:underline mr-4">Live Demo</a>
                )}
                <a href={project.github} className="text-blue-400 hover:underline">GitHub</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;