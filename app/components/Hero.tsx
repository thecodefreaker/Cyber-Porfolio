// components/Hero.tsx
"use client";
import Image  from "next/image";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import Contact from "../components/Contact";
import { Engine } from "tsparticles-engine";
//import { urlFor } from "../lib/sanity"; 
import { HeroProps } from "@/types";

// Theme Definitions
type Theme = "dark" | "light" | "cybersecurity" | "custom";
const themes = {
  dark: { bg: "bg-gray-900", text: "text-white", accent: "text-blue-400", shadow: "shadow-[0_0_10px_rgba(0,191,255,0.5)]" },
  light: { bg: "bg-gray-100", text: "text-gray-900", accent: "text-blue-600", shadow: "shadow-md" },
  cybersecurity: { bg: "bg-black", text: "text-green-400", accent: "text-green-500", shadow: "shadow-[0_0_15px_rgba(0,255,0,0.7)]" },
  custom: { bg: "bg-gray-800", text: "text-white", accent: "text-purple-400", shadow: "shadow-[0_0_12px_rgba(147,51,234,0.5)]" },
};

// Animation Variants
//const glitchVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", repeatDelay: 2 } } };
const cardVariants: Variants = { hidden: { opacity: 0, scale: 0.9, y: 30 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };
const profileVariants: Variants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } } };

// Portfolio Card Component
interface PortfolioCardProps { project: HeroProps["projects"][0]; theme: Theme } // Use ProjectDoc from HeroProps
const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, theme }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ scale: 1.05, boxShadow: themes[theme].shadow, rotateY: 10 }}
    className={`${themes[theme].bg} bg-opacity-80 p-6 rounded-lg border border-blue-500 hover:border-green-400 transition-all duration-300`}
  >
    <h3 className={`text-xl font-bold ${themes[theme].text}`}>{project.title}</h3>
    <p className="mt-2 text-gray-300">{project.description}</p>
    <Link href={project.liveLink || project.link} className={`mt-4 inline-block ${themes[theme].accent} hover:text-green-300 transition-colors duration-300`}>
      {project.liveLink ? "View Live" : "GitHub"}
    </Link>
  </motion.div>
);

// CyberHub Card Component
interface CyberHubCardProps { hub: { name: string; desc: string; link: string }; theme: Theme }
const CyberHubCard: React.FC<CyberHubCardProps> = ({ hub, theme }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ scale: 1.05, boxShadow: themes[theme].shadow }}
    className={`${themes[theme].bg} bg-opacity-80 p-6 rounded-lg border border-blue-500 hover:border-green-400 transition-all duration-300`}
  >
    <h3 className={`text-xl font-bold ${themes[theme].text}`}>{hub.name}</h3>
    <p className="mt-2 text-gray-300">{hub.desc}</p>
    <Link href={hub.link} className={`mt-4 inline-block ${themes[theme].accent} hover:text-green-300 transition-colors duration-300`}>Explore</Link>
  </motion.div>
);

const Hero: React.FC<HeroProps> = ({ projects }) => {
  const [theme, setTheme] = useState<Theme>("cybersecurity");
  const [isMounted, setIsMounted] = useState(false);
  const [customColor, setCustomColor] = useState("#9333ea");
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (theme === "cybersecurity" && audioEnabled) {
      const audio = new Audio("/audio/terminal-click.mp3");
      audio.play().catch(() => console.log("Audio play failed"));
    }
  }, [theme, audioEnabled]);

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    if (newTheme === "cybersecurity" && audioEnabled) {
      const pulse = new Audio("/audio/data-pulse.mp3");
      pulse.play().catch(() => console.log("Audio play failed"));
    }
  };

  const particlesInit = async (engine: Engine) => await loadSlim(engine);
  const particlesOptions = {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: { value: theme === "light" ? ["#000000"] : ["#00ffcc", "#ff00ff", "#00ff00"] },
      shape: { type: "image", image: [{ src: "/binary-zero.svg", width: 20, height: 20 }, { src: "/one.svg", width: 20, height: 20 }, { src: "/circuit-svgrepo-com.svg", width: 20, height: 20 }] },
      opacity: { value: 0.5, random: true },
      size: { value: 10, random: true },
      move: { enable: true, speed: 2, direction: "none" as const, random: true, out_mode: "out" as const },
      line_linked: { enable: true, distance: 150, color: theme === "light" ? "#000000" : "#00ffcc", opacity: 0.4, width: 1 },
    },
    interactivity: { events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: false, mode: "push" } } },
    retina_detect: true,
  };

  if (!isMounted) return null;

  return (
    <section className={`min-h-screen relative font-mono overflow-hidden ${themes[theme].bg} ${themes[theme].text}`}>
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0 z-0" />
      <motion.div className="absolute top-0 right-0 p-4 z-20 flex gap-2" initial={{ x: 100 }} animate={{ x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        {(["dark", "light", "cybersecurity"] as Theme[]).map((t) => (
          <motion.button
            key={t}
            onClick={() => toggleTheme(t)}
            whileHover={{ scale: 1.2 }}
            className={`p-2 rounded-full ${theme === t ? "bg-green-500" : "bg-gray-800"} hover:bg-gray-700 transition-colors duration-300`}
            style={{ boxShadow: theme === t ? themes[t].shadow : "none" }}
            aria-label={`Switch to ${t} theme`}
          >
            {t === "dark" ? "⚫" : t === "light" ? "💡" : "🔒"}
          </motion.button>
        ))}
        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
          <input
            type="color"
            value={customColor}
            onChange={(e) => { setCustomColor(e.target.value); setTheme("custom"); }}
            className="w-8 h-8 rounded-full cursor-pointer"
            aria-label="Custom theme color"
          />
        </motion.div>
        <motion.button
          onClick={() => setAudioEnabled(!audioEnabled)}
          whileHover={{ scale: 1.2 }}
          className={`p-2 rounded-full ${audioEnabled ? "bg-green-500" : "bg-gray-800"} hover:bg-gray-700 transition-colors duration-300`}
          style={{ boxShadow: audioEnabled ? themes[theme].shadow : "none" }}
          aria-label="Toggle audio effects"
        >
          {audioEnabled ? "🔊" : "🔇"}
        </motion.button>
      </motion.div>

      <div className="relative z-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto py-16 sm:py-20">
        <motion.div
          className="flex flex-col items-center justify-center gap-8 mb-16"
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut", staggerChildren: 0.3 } } }}
        >
          <motion.div
            variants={profileVariants}
            className="relative w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 p-1"
            whileHover={{ scale: 1.05 }}
          >
            <Image src="/backgrounds/hardik.jpg" alt="Hardik Srivastava" className=" object-cover h-full w-full " width={192} height={192} />
            <motion.div
              className="absolute inset-0 border-2 border-green-400 opacity-50"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          <motion.div className="text-center">
            <motion.h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight ${themes[theme].text}`}
              style={{ 
                fontFamily: "Courier New, monospace", 
                textShadow: theme === "cybersecurity" ? "0 0 5px #00ff00" : "none",
                ...(theme === "custom" && { color: customColor }) // Inline custom color
              }}
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 2 }}
            >
              Hardik Srivastava
            </motion.h1>
            <motion.p
              className={`text-xl sm:text-2xl mt-2 font-mono ${theme === "custom" ? "" : themes[theme].accent}`}
              style={theme === "custom" ? { color: customColor } : {}}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Certified Ethical Hacker | Cybersecurity Innovator
            </motion.p>
            <motion.p
              className="text-lg mt-4 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Fortifying Digital Frontiers with Cutting-Edge Solutions
            </motion.p>
            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.1, boxShadow: themes[theme].shadow }}
              whileTap={{ scale: 0.95 }}
              className={`mt-6 inline-block px-6 py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition-colors duration-300 relative overflow-hidden`}
              onClick={() => audioEnabled && theme === "cybersecurity" && new Audio("/audio/click.mp3").play()}
            >
              <span className="relative z-10">Explore My Portfolio</span>
              <motion.span
                className="absolute inset-0 bg-green-400 opacity-0"
                animate={{ opacity: [0, 0.4, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Portfolio Showcase with Sanity Data */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
          {projects.map((project) => <PortfolioCard key={project._id} project={project} theme={theme} />)}
        </motion.div>

        <div className="mb-16 relative">
          <h2 className={`text-3xl sm:text-4xl font-extrabold mb-8 text-center ${themes[theme].text}`} style={{ textShadow: theme === "cybersecurity" ? "0 0 5px #00ff00" : "none" }}>
            CyberHub
          </h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
            {[
              { name: "CyberForge", desc: "Cutting-edge tools for developers and pentesters", link: "/tools" },
              { name: "CyberIntel Hub", desc: "Latest news and insights on cybersecurity", link: "/news" },
              { name: "CyberJobs Portal", desc: "Opportunities in tech and security", link: "/jobs" },
              { name: "CyberResources", desc: "Tutorials, certifications, and open-source projects", link: "/resources" },
            ].map((hub, index) => <CyberHubCard key={index} hub={hub} theme={theme} />)}
          </motion.div>
        </div>

        <div className="text-center">
          <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${themes[theme].text}`}>Get in Touch</h2>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.1, boxShadow: themes[theme].shadow }}
            whileTap={{ scale: 0.95 }}
            className={`inline-block px-6 py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition-colors duration-300 relative overflow-hidden`}
            onClick={() => audioEnabled && theme === "cybersecurity" && new Audio("/audio/click.mp3").play()}
          >
            <span className="relative z-10">Hire Me</span>
            <motion.span
              className="absolute inset-0 bg-green-400 opacity-0"
              animate={{ opacity: [0, 0.4, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.a>
          <div className="mt-15"><Contact /></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;