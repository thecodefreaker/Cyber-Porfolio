"use client";
import { motion } from 'framer-motion';

const Blog: React.FC = () => {
  const posts = [
    { title: "Top 10 CEH Study Tips", date: "March 2025", content: "Tips for mastering CEH certification..." },
    { title: "Common Vulnerabilities in 2025", date: "February 2025", content: "Overview of recent threats..." },
  ];

  return (
    <section id="blog" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-700 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-green-400">{post.title}</h3>
              <p className="text-sm text-gray-400 mt-2">{post.date}</p>
              <p className="mt-4">{post.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;