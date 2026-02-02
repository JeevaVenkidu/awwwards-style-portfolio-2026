import { motion, useTransform } from "framer-motion";
import HeroAtmosphere from "./HeroAtmosphere";
import ScrollIndicator from "./ScrollIndicator";

{
  /* Scroll Indicator - Removed */
}

export default function Overlay({ scrollYProgress }) {
  // Section 1: Hero ("JEEVA") - Visible start to 30%
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const scale1 = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Section 2: Value Prop - Visible 30% to 70%
  const opacity2 = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.6, 0.7],
    [0, 1, 1, 0],
  );
  const y2 = useTransform(scrollYProgress, [0.3, 0.7], [50, -50]);

  // Section 3: Vision - Visible 70% to 100%
  const opacity3 = useTransform(scrollYProgress, [0.7, 0.8, 1.0], [0, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0.7, 1.0], [50, 0]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-10 col-start-1 row-start-1 mix-blend-normal">
      <HeroAtmosphere />
      {/* Section 1: Hero Title */}
      <motion.div
        style={{ opacity: opacity1, y: y1, scale: scale1 }}
        className="absolute inset-0 flex flex-col items-center justify-end pb-44 md:pb-28"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center px-4 relative z-10"
        >
          {/* Main Title - Massive & Tight */}
          <div className="relative">
            <motion.h1
              variants={itemVariants}
              className="text-[18vw] md:text-[12vw] leading-[0.8] font-bold tracking-tighter text-white font-heading select-none drop-shadow-2xl"
            >
              JEEVA
            </motion.h1>
          </div>

          {/* Subtitle - Tech & Wide */}
          <motion.div
            variants={itemVariants}
            className="overflow-hidden flex items-center justify-center gap-4 mt-8 md:mt-12"
          >
            <div className="h-[1px] w-8 md:w-16 bg-[var(--color-accent-primary)]/50" />
            <p className="text-xs md:text-sm text-[var(--color-accent-primary)] font-medium tracking-[0.5em] uppercase font-sans">
              Creative Developer
            </p>
            <div className="h-[1px] w-8 md:w-16 bg-[var(--color-accent-primary)]/50" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Section 2: Value Prop */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-x-0 top-0 h-full flex items-center justify-center md:justify-start px-6 md:px-24 pointer-events-none"
      >
        <div className="max-w-4xl text-center md:text-left backdrop-blur-sm bg-black/10 p-8 rounded-3xl border border-white/5">
          <h2 className="text-4xl md:text-7xl font-bold leading-[1.0] text-white mb-6 font-heading">
            I build
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-primary)] via-white to-[var(--color-accent-secondary)]">
              digital ecosystems.
            </span>
          </h2>
          <p className="text-lg md:text-2xl text-[var(--color-text-body)] font-light max-w-xl md:border-l-2 md:border-[var(--color-accent-secondary)] md:pl-6">
            Bridging the gap between robust backend logic and fluid frontend
            experiences.
          </p>
        </div>
      </motion.div>

      {/* Section 3: Vision */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-x-0 top-0 h-full flex items-center justify-center md:justify-end px-6 md:px-24 pointer-events-none"
      >
        <div className="text-center md:text-right max-w-4xl backdrop-blur-sm bg-black/10 p-8 rounded-3xl border border-white/5">
          <h2 className="text-4xl md:text-7xl font-bold leading-[1.0] text-white mb-6 font-heading">
            Engineering
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent-primary)]">
              meets Art.
            </span>
          </h2>
          <p className="text-lg md:text-2xl text-[var(--color-text-body)] font-light md:border-r-2 md:border-[var(--color-accent-primary)] md:pr-6 inline-block">
            Where performance meets emotion.
          </p>
        </div>
      </motion.div>
      {/* Scroll Indicator - Responsive (Center Mobile, Right Desktop) */}
      <motion.div
        style={{ opacity: opacity1 }}
        className="absolute bottom-16 md:-bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
      >
        <ScrollIndicator />
      </motion.div>
    </div>
  );
}
