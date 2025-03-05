"use client";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

// Animation Variants
const formVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
  },
};

const inputVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch {
      setStatus("An error occurred.");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w mx-auto p-6 bg-gray-900 bg-opacity-90 rounded-xl border border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      {/* Name Input */}
      <motion.input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 text-white transition-all duration-300"
        required
        variants={inputVariants}
        whileFocus={{ scale: 1.02, boxShadow: "0 0 10px rgba(0, 255, 204, 0.7)" }}
      />

      {/* Email Input */}
      <motion.input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 text-white transition-all duration-300"
        required
        variants={inputVariants}
        whileFocus={{ scale: 1.02, boxShadow: "0 0 10px rgba(0, 255, 204, 0.7)" }}
      />

      {/* Message Textarea */}
      <motion.textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 text-white resize-y min-h-[120px] transition-all duration-300"
        required
        variants={inputVariants}
        whileFocus={{ scale: 1.02, boxShadow: "0 0 10px rgba(0, 255, 204, 0.7)" }}
      />

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 204, 0.8)" }}
        whileTap={{ scale: 0.95 }}
        className="w-full border-s-green-800 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 relative overflow-hidden"
      >
        <span className="relative z-10">Send Message</span>
        <motion.span
          className="absolute inset-0 bg-green-400 opacity-0"
          animate={{ opacity: [0, 0.4, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.button>

      {/* Status Message */}
      {status && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-4 text-center ${
            status.includes("successfully") ? "text-green-400" : "text-red-400"
          }`}
        >
          {status}
        </motion.p>
      )}
    </motion.form>
  );
}