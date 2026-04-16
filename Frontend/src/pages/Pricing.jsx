import React from "react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Standard Protocol",
    price: "₹199 / mo",
    billed: "Billed monthly or annually. Cancel anytime.",
    features: ["Access to Phase 01 & 02", "Predictive job matching analysis", "Core skill validation tools"],
    color: "bg-neutral-800",
  },
  {
    name: "Advanced Node",
    price: "₹349 / mo",
    billed: "Billed annually. Cancel anytime.",
    features: ["Access to all operational Phases", "Advanced AI telemetry tracking", "Priority roadmap generation"],
    color: "bg-white",
  },
  {
    name: "Enterprise Core",
    price: "₹799 / mo",
    billed: "Billed annually. Cancel anytime.",
    features: ["Unlimited system access", "1-on-1 human expert calibration", "Lifetime updates to ML models"],
    color: "bg-neutral-800",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const Pricing = () => {
  return (
    <section className="bg-black py-32 px-6 min-h-screen border-t border-neutral-900">
      <div className="max-w-6xl mx-auto text-center">
        
        <p className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-4">
          System Access
        </p>
        <motion.h2
          className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight leading-tight"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Select Your Configuration
        </motion.h2>

        <motion.p
          className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed mt-4 mb-20 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Initialize your engagement by choosing the resource tier that matches your career acceleration parameters.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`flex flex-col h-[480px] bg-[#0a0a0a] border ${
                plan.name === "Advanced Node" ? "border-white" : "border-neutral-800"
              } transition-all duration-300 hover:border-neutral-500`}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className={`h-1.5 w-full ${plan.color}`} />
              <div className="p-8 pb-4">
                <h3 className="font-mono text-xs tracking-widest uppercase text-neutral-400">{plan.name}</h3>
                <p className="text-4xl font-serif font-bold text-white mt-4">{plan.price}</p>
                <p className="text-neutral-500 text-[11px] mt-2 font-mono uppercase tracking-widest">{plan.billed}</p>
              </div>
              
              <div className="p-8 pt-4 flex flex-col justify-between flex-grow border-t border-neutral-900 mt-2">
                <ul className="space-y-4 text-neutral-300 font-light text-sm">
                  {plan.features.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-white translate-y-[2px]">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full mt-8 py-3.5 font-mono text-xs tracking-widest uppercase font-semibold transition-colors duration-300 ${
                    plan.name === "Advanced Node" 
                      ? "bg-white text-black hover:bg-gray-200" 
                      : "bg-[#111] text-white border border-neutral-800 hover:bg-neutral-800"
                  }`}
                >
                  Activate Tier 
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
