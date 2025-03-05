"use client";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

// Animation Variants
const formVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: "easeOut", staggerChildren: 0.2 },
  },
};

const inputVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const buttonVariants: Variants = {
  hover: { scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 204, 0.8)" },
  tap: { scale: 0.95 },
};

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  // Input validation function
  const validateInput = () => {
    const newErrors = { name: "", email: "", message: "" };
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateInput()) return;

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
    } catch  {
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-max p-20 bg-gray-900 bg-opacity-95 rounded-2xl border border-blue-600 shadow-[0_0_25px_rgba(59,130,246,0.5)] relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      {/* Circuit Pattern Background */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 10px 10px, rgba(0, 255, 204, 0.2) 2px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Name Input */}
      <div className="mb-6 relative">
        <motion.input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-white transition-all duration-300"
          required
          variants={inputVariants}
          whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(0, 255, 204, 0.7)" }}
        />
        {errors.name && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mt-1 absolute"
          >
            {errors.name}
          </motion.p>
        )}
      </div>

      {/* Email Input */}
      <div className="mb-6 relative">
        <motion.input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-white transition-all duration-300"
          required
          variants={inputVariants}
          whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(0, 255, 204, 0.7)" }}
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mt-1 absolute"
          >
            {errors.email}
          </motion.p>
        )}
      </div>

      {/* Message Textarea */}
      <div className="mb-6 relative">
        <motion.textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-white resize-y min-h-[140px] transition-all duration-300"
          required
          variants={inputVariants}
          whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(0, 255, 204, 0.7)" }}
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mt-1 absolute"
          >
            {errors.message}
          </motion.p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 relative overflow-hidden z-10"
      >
        <span className="relative z-10">Send Message</span>
        <motion.span
          className="absolute inset-0 bg-green-400 opacity-0"
          animate={{ opacity: [0, 0.5, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Status Message */}
      {status && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 text-center font-semibold ${
            status.includes("successfully") ? "text-green-400" : "text-red-400"
          }`}
        >
          {status}
        </motion.p>
      )}
    </motion.form>
  );
}