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
    <section 
      className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden bg-square-pattern"
      style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
    >
      {/* ── Subtle Background ── */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,252,0.8) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(16,185,129,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.04) 1px,transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      
      <div className="container mx-auto px-6 sm:px-10 lg:px-20 py-24 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* ── Text Content ── */}
        <motion.div
          className="text-center md:text-left max-w-2xl flex-1 space-y-8 relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={lineVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest text-emerald-700 uppercase">System Active v2.0</span>
          </motion.div>

          <motion.h1 
            variants={lineVariants}
            className="text-4xl sm:text-5xl lg:text-7xl font-sans font-bold text-emerald-900 tracking-tight leading-[1.1]"
          >
            Shape Your Future with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400 pb-2 inline-block">
              Career Intelligence.
            </span>
          </motion.h1>

          <motion.p
            variants={lineVariants}
            className="text-base sm:text-lg text-slate-600 font-light leading-relaxed max-w-xl mx-auto md:mx-0"
          >
            Utilize advanced algorithms to map your career trajectory. Engage with curated intelligence, predictive skill-gap analysis, and highly targeted milestones.
          </motion.p>

          <motion.div
            variants={lineVariants}
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4"
          >
            <button className="px-8 py-4 bg-emerald-600 text-white font-mono text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-emerald-700 shadow-md transition-colors duration-300">
              Initialize Roadmap
            </button>
            <button className="px-8 py-4 border border-emerald-200 text-emerald-700 bg-white font-mono text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-emerald-50 transition-colors duration-300 shadow-sm">
              Learn Protocol
            </button>
          </motion.div>
        </motion.div>

        {/* ── Image ── */}
        <motion.div
          className="w-full max-w-[500px] flex-1 relative z-10"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          {/* Decorative scanner line / border effect */}
          <div className="absolute inset-0 border border-emerald-100 rounded-2xl transform translate-x-4 translate-y-4 -z-10 bg-white shadow-sm" />
          <img
            src={aiImage}
            alt="Career Intelligence"
            className="w-full object-cover rounded-2xl transition-all duration-[1.5s]"
            style={{ boxShadow: "0 20px 80px rgba(16,185,129,0.15)" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
