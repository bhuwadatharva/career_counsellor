import React from "react";
import { motion } from "framer-motion";
import contactImage from "../assets/contact.png";

const leftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const rightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Contact = () => {
  return (
    <section className="min-h-screen bg-white px-6 sm:px-10 py-32 flex items-center justify-center overflow-x-hidden border-t border-emerald-100" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-16 items-start">
        {/* Left Side - Text and Image */}
        <motion.div
          className="w-full md:w-1/2 space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={leftVariants}
        >
          <div>
            <p className="font-mono text-[10px] tracking-widest text-emerald-600 uppercase mb-4 font-bold">
              Support Protocol
            </p>
            <h2 className="text-3xl md:text-5xl font-sans font-bold text-emerald-900 tracking-tight leading-tight">
              Awaiting Communication
            </h2>
          </div>
          <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed">
            Need advanced systemic details? Our expert intelligence counselors are monitoring channels and will relay priority guidance directly.
          </p>
          <div className="w-full pt-4">
            <div className="relative inline-block border border-emerald-100 p-2 bg-white shadow-sm rounded-lg">
              <img
                src={contactImage}
                alt="Contact Interface"
                className="w-full max-w-sm sm:max-w-md"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          className="w-full md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={rightVariants}
        >
          <div className="bg-slate-50 border border-emerald-100 shadow-md p-8 sm:p-12 relative overflow-hidden rounded-xl">
            {/* Minimal Corner Decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-300 pointer-events-none rounded-tl-xl" />
            
            <form className="space-y-8 relative z-10 pt-4">
              <div className="relative group">
                <input
                  type="text"
                  placeholder=" "
                  className="block w-full py-2 px-0 text-emerald-900 bg-transparent border-0 border-b border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer transition-colors font-medium"
                />
                <label className="absolute text-slate-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-mono tracking-widest uppercase text-[11px] font-semibold">
                  Identity Key (Name)
                </label>
              </div>

              <div className="relative group">
                <input
                  type="email"
                  placeholder=" "
                  className="block w-full py-2 px-0 text-emerald-900 bg-transparent border-0 border-b border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer transition-colors font-medium"
                />
                <label className="absolute text-slate-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-mono tracking-widest uppercase text-[11px] font-semibold">
                  Comms Channel (Email)
                </label>
              </div>

              <div className="relative group">
                <input
                  type="tel"
                  placeholder=" "
                  className="block w-full py-2 px-0 text-emerald-900 bg-transparent border-0 border-b border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer transition-colors font-medium"
                />
                <label className="absolute text-slate-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-mono tracking-widest uppercase text-[11px] font-semibold">
                  Secure Line (Phone)
                </label>
              </div>

              <div className="relative group mt-10">
                <textarea
                  rows="4"
                  placeholder=" "
                  className="block w-full py-2 px-0 text-emerald-900 bg-transparent border-0 border-b border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer transition-colors resize-none font-medium"
                ></textarea>
                <label className="absolute text-slate-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-mono tracking-widest uppercase text-[11px] font-semibold">
                  Transmission Payload (Message)
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white shadow-md font-mono text-xs tracking-widest uppercase font-semibold py-4 mt-8 hover:bg-emerald-700 transition-colors duration-300 rounded-sm"
              >
                Transmit Query
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
