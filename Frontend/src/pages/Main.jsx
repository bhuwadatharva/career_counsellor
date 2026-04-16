import React, { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";
import { bag, book, cap, globe, scale, set } from "../assets/main";

const featuresCareer = [
  {
    title: "AI Protocol Guide",
    color: "bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-700",
    icon: cap,
  },
  {
    title: "Resume Synthesis",
    color: "bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-700",
    icon: bag,
  },
  {
    title: "Opportunity Algorithm",
    color: "bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-700",
    icon: globe,
  },
  {
    title: "Delta Analysis",
    color: "bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-700",
    icon: book,
  },
  {
    title: "Simulation Preps",
    color: "bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-700",
    icon: scale,
  },
  {
    title: "Telemetry Tracker",
    color: "bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-700",
    icon: set,
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const iconFloat = {
  animate: {
    y: [0, -6, 0],
    transition: {
      repeat: Infinity,
      duration: 4,
      ease: "easeInOut",
    },
  },
};

const FeatureCard = memo(({ title, color, icon, custom }) => (
  <motion.div
    custom={custom}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    className="flex flex-col items-center gap-6 group cursor-pointer w-full"
  >
    <div
      className={`w-36 h-36 sm:w-44 sm:h-44 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] ${color}`}
    >
      <img
        src={icon}
        alt={title}
        className="w-16 sm:w-20 object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
        loading="lazy"
      />
    </div>
    <span className="font-mono text-xs tracking-widest uppercase text-neutral-400 group-hover:text-white transition-colors duration-300">
      {title}
    </span>
  </motion.div>
));

const FloatingIcon = ({ src, alt, className, isVisible }) => (
  <motion.img
    src={src}
    alt={alt}
    className={`grayscale opacity-20 ${className}`}
    variants={iconFloat}
    animate={isVisible ? "animate" : ""}
    loading="lazy"
  />
);

const Main = () => {
  const iconRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full bg-[#050505] py-32 border-t border-neutral-900 overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20 relative z-10">
        
        {/* ── Heading ── */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <p className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-4">
            Operational Matrix
          </p>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white mb-6 tracking-tight leading-tight">
            Empower Your Career <br className="hidden sm:block" /> with AI Intelligence.
          </h2>
          <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed">
            Eliminate guesswork. Utilize our dedicated neural networks to map your potential against structural demands and actively simulate professional environments.
          </p>
        </div>

        {/* ── Tools Grid ── */}
        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-y-20 gap-x-10 justify-items-center"
        >
          {featuresCareer.map((feature, index) => (
            <FeatureCard key={index} {...feature} custom={index} />
          ))}
        </div>

        {/* ── Floating Background Elements ── */}
        <div className="absolute inset-0 hidden lg:block pointer-events-none" ref={iconRef}>
          <FloatingIcon
            src={globe}
            alt="globe"
            className="absolute top-[10%] left-[8%]"
            isVisible={isInView}
          />
          <FloatingIcon
            src={bag}
            alt="bag"
            className="absolute top-[60%] left-[-2%] blur-[2px]"
            isVisible={isInView}
          />
          <FloatingIcon
            src={cap}
            alt="cap"
            className="absolute bottom-[5%] left-[15%]"
            isVisible={isInView}
          />
          <FloatingIcon
            src={scale}
            alt="scale"
            className="absolute bottom-[20%] right-[8%] blur-[1px]"
            isVisible={isInView}
          />
          <FloatingIcon
            src={book}
            alt="book"
            className="absolute top-[40%] right-[-5%] blur-[3px]"
            isVisible={isInView}
          />
          <FloatingIcon
            src={set}
            alt="set"
            className="absolute top-[5%] right-[15%]"
            isVisible={isInView}
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
