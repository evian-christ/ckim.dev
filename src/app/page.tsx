'use client';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 font-[Helvetica,Arial,sans-serif]"
        >
          Chan Kim
        </motion.h1>
        
        {/* GitHub Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://ghchart.rshah.org/evian-christ" 
            alt="GitHub Contributions"
            className="mx-auto max-w-full h-auto"
          />
        </motion.div>
        
        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center items-center gap-8 text-gray-600"
        >
          <motion.a
            href="https://github.com/evian-christ"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="hover:text-gray-900 transition-colors duration-200"
          >
            github
          </motion.a>
          
          <span className="text-gray-300">•</span>
          
          <motion.a
            href="https://www.linkedin.com/in/chankim97"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="hover:text-gray-900 transition-colors duration-200"
          >
            linkedin
          </motion.a>
          
          <span className="text-gray-300">•</span>
          
          <motion.a
            href="mailto:chankim97@outlook.com"
            whileHover={{ scale: 1.05 }}
            className="hover:text-gray-900 transition-colors duration-200"
          >
            email
          </motion.a>
        </motion.div>

        {/* Itch.io Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <iframe
            frameBorder="0"
            src="https://itch.io/embed/4616720"
            width="646"
            height="167"
            className="w-full max-w-[646px]"
            title="Humankind in a nutshell by juron"
          >
            <a href="https://juron.itch.io/humankind-in-a-nutshell">
              Humankind in a nutshell by juron
            </a>
          </iframe>
        </motion.div>

        {/* Steam Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 flex justify-center"
        >
          <iframe
            src="https://store.steampowered.com/widget/1779280/"
            frameBorder="0"
            width="646"
            height="190"
            className="w-full max-w-[646px]"
            title="Steam store widget"
          />
        </motion.div>
        
      </div>
    </div>
  );
}
