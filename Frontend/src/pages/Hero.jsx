import React from "react";
import { motion } from "framer-motion";
import aiImage from "../assets/aiwithgirl.png";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* ── Subtle Radial Glow ── */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle at 50% -20%, rgba(50,50,50,0.4) 0%, rgba(0,0,0,1) 60%)"
        }}
      />
      
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 py-24 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* ── Text Content ── */}
        <motion.div
          className="text-center md:text-left max-w-2xl flex-1 space-y-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={lineVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">System Active v2.0</span>
          </motion.div>

          <motion.h1 
            variants={lineVariants}
            className="text-4xl sm:text-5xl lg:text-7xl font-sans font-bold text-white tracking-tight leading-[1.1]"
          >
            Shape Your Future with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 pb-2 inline-block">
              Career Intelligence.
            </span>
          </motion.h1>

          <motion.p
            variants={lineVariants}
            className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-xl mx-auto md:mx-0"
          >
            Utilize advanced algorithms to map your career trajectory. Engage with curated intelligence, predictive skill-gap analysis, and highly targeted milestones.
          </motion.p>

          <motion.div
            variants={lineVariants}
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4"
          >
            <button className="px-8 py-4 bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-gray-200 transition-colors duration-300">
              Initialize Roadmap
            </button>
            <button className="px-8 py-4 border border-neutral-800 text-white font-mono text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-neutral-900 transition-colors duration-300">
              Learn Protocol
            </button>
          </motion.div>
        </motion.div>

        {/* ── Image ── */}
        <motion.div
          className="w-full max-w-[500px] flex-1 relative"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          {/* Decorative scanner line / border effect */}
          <div className="absolute inset-0 border border-neutral-800 rounded-2xl transform translate-x-4 translate-y-4 -z-10" />
          <img
            src={aiImage}
            alt="Career Intelligence"
            className="w-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-[1.5s]"
            style={{ boxShadow: "0 20px 80px rgba(0,0,0,0.8)" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
