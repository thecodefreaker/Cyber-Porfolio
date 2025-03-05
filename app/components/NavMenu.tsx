"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  href: string;
  subItems?: { name: string; href: string }[];
}

const menuItems: MenuItem[] = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog", subItems: [{ name: "CEH Tips", href: "/blog/ceh-tips" }, { name: "Cyber Trends", href: "/blog/trends" }] },
  { name: "Tools", href: "/tools", subItems: [{ name: "Scanning", href: "/tools/scanning" }, { name: "Exploitation", href: "/tools/exploitation" }] },
];

const NavMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <header className="bg-gray-900 py-4 fixed w-full top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-bold text-green-400 hover:text-green-300 transition-colors">
          CyberHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 lg:space-x-6"> {/* 🔴 CHANGE HERE: Reduced spacing on medium screens */}
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href={item.href}>
                <motion.span
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className={`text-base md:text-lg font-semibold ${item.name === "Portfolio" ? "text-blue-400" : item.name === "Blog" ? "text-purple-400" : "text-green-400"} hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all`}
                >
                  {item.name}
                </motion.span>
              </Link>
              {item.subItems && (
                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.ul
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute bg-gray-800 rounded-lg shadow-lg mt-2 p-2 w-40 md:w-48" // 🔴 CHANGE HERE: Adjusted width for responsiveness
                    >
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link href={subItem.href} className="block px-2 py-1 md:px-4 md:py-2 text-sm text-white hover:bg-gray-700 hover:text-green-400 transition-colors">
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-green-400 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.svg
            whileHover={{ scale: 1.2 }}
            className="w-6 h-6 md:w-8 md:h-8" // 🔴 CHANGE HERE: Adjusted size for mobile
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </motion.svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-gray-800 px-4 py-2 overflow-y-auto max-h-screen" // 🔴 CHANGE HERE: Added overflow and max-height for mobile scrolling
          >
            {menuItems.map((item) => (
              <div key={item.name} className="py-2">
                <Link
                  href={item.href}
                  className={`block text-base font-semibold ${item.name === "Portfolio" ? "text-blue-400" : item.name === "Blog" ? "text-purple-400" : "text-green-400"} hover:text-green-300`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
                {item.subItems && (
                  <ul className="pl-4 mt-2">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          href={subItem.href}
                          className="block text-sm text-white hover:text-green-400 py-1"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavMenu;