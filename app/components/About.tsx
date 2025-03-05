"use client";
import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import { useState } from "react";
import { introText, education, certifications, skills } from "../data/aboutData";
import Link from "next/link";
type AnimationStyle = "smooth" | "energetic";

const sectionVariants = {
  smooth: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } },
  energetic: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } } },
};

const itemVariants = {
  smooth: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } },
  energetic: { hidden: { opacity: 0, rotate: -10 }, visible: { opacity: 1, rotate: 0, transition: { duration: 0.5, type: "spring" } } },
};

const About: React.FC = () => {
  const [animationStyle, setAnimationStyle] = useState<AnimationStyle>("smooth");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const toggleAnimationStyle = () => {
    setAnimationStyle((prev) => (prev === "smooth" ? "energetic" : "smooth"));
  };

  return (
    <section id="about" className="py-10 md:py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Parallax Background */}
      <Parallax speed={-10} className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[url('/circuit-pattern.png')] bg-repeat animate-pulse" />
      </Parallax>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12 text-green-400 tracking-tight"
        >
          About Me
          <span className="block w-20 h-1 bg-green-400 mx-auto mt-2 rounded animate-pulse shadow-[0_0_10px_rgba(0,255,0,0.7)]" />
        </motion.h2>

        {/* Animation Toggle */}
        <div className="text-center mb-6">
          <button
            onClick={toggleAnimationStyle}
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm md:text-base"
          >
            Animation: {animationStyle}
          </button>
        </div>

        <Parallax speed={5}>
          {/* Intro */}
          <motion.p
            variants={sectionVariants[animationStyle]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl leading-relaxed mb-8 md:mb-12 mx-auto max-w-3xl text-center text-gray-200"
          >
            {introText}
          </motion.p>

          {/* Education */}
          <motion.div
            variants={sectionVariants[animationStyle]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8 md:mb-12"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-400 mb-4 md:mb-6 text-center">Education</h3>
            <div className="space-y-4 text-center">
              {education.map((item, index) => (
                <motion.p
                  key={index}
                  variants={itemVariants[animationStyle]}
                  whileHover={{ scale: 1.02, color: "#60A5FA" }}
                  className="text-sm sm:text-base md:text-lg"
                >
                  {item}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            variants={sectionVariants[animationStyle]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8 md:mb-12 text-center"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-purple-400 mb-4 md:mb-6">Certifications</h3>
            <ul className="list-disc list-inside space-y-3 ">
              {certifications.map((cert, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants[animationStyle]}
                  whileHover={{ x: 5, color: "#C084FC" }}
                  className="text-sm sm:text-base md:text-lg"
                >
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:underline"
                  >
                    {cert.name}
                  </a>
                </motion.li>
              ))}
            </ul>
              {/* Certifications Page Button */}
              <div className="mt-6 text-center ">
              <Link
                href="/certifications"
                className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors shadow-[0_0_10px_rgba(168,123,250,0.5)]"
              >
                View All Certificates
              </Link>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            variants={sectionVariants[animationStyle]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-green-400 mb-4 md:mb-6 text-center">Skills</h3>
            <div className="flex flex-wrap gap-3 md:gap-4 justify-center border border-gray-700 rounded-lg p-4 md:p-6">
              {skills.map((skill) => (
                <motion.span
                  key={skill.name}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  animate={{
                    boxShadow: hoveredSkill === skill.name ? "0 0 15px rgba(16, 185, 129, 0.7)" : "none",
                  }}
                  className="relative px-3 py-1 md:px-4 md:py-2 bg-gray-700 rounded-full text-sm md:text-base font-medium text-white hover:bg-gray-600 transition-colors"
                >
                  {skill.name}
                  {hoveredSkill === skill.name && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      className="absolute bottom-0 left-0 h-1 bg-green-400 rounded-full"
                    />
                  )}
                  {hoveredSkill === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: -10 }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-20"
                    >
                      {skill.description}
                    </motion.div>
                  )}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </Parallax>
  {/* Download Resume Button */}
  <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-4 right-4 z-20"
        >
          <a
            href="/Hardik_Srivastava_Resume.pdf"
            download
            className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-[0_0_10px_rgba(0,255,0,0.5)]"
          >
            Download Resume
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default About;