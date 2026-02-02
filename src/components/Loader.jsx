import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const frameCount = 120;

export default function Loader({ setIsLoading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedImages = 0;
    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${i.toString().padStart(3, "0")}.png`;
      img.onload = () => {
        loadedImages++;
        setProgress(Math.round((loadedImages / frameCount) * 100));
        if (loadedImages === frameCount) {
          setTimeout(() => setIsLoading(false), 800);
        }
      };
      img.onerror = () => {
        // Continue even if error to avoid softlock
        loadedImages++;
        setProgress(Math.round((loadedImages / frameCount) * 100));
        if (loadedImages === frameCount) {
          setTimeout(() => setIsLoading(false), 800);
        }
      };
    }
  }, [setIsLoading]);

  // Circle variants for the rotating rings
  const ringVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      },
    },
    animateReverse: {
      rotate: -360,
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-white overflow-hidden"
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: "blur(15px)",
        transition: {
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
    >
      {/* Cinematic Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(5,11,20,0)_0%,#030712_100%)] z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(0,212,255,0.08)_0%,rgba(0,0,0,0)_60%)] blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(255,106,0,0.05)_0%,rgba(0,0,0,0)_60%)] blur-[100px]" />
      </div>

      {/* Main Loader Container */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* Tech Container */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          {/* Outer Ring - Cyan */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[var(--color-accent-primary)]/10 border-t-[var(--color-accent-primary)]/60 box-border shadow-[0_0_30px_rgba(0,212,255,0.1)]"
            variants={ringVariants}
            animate="animate"
          />

          {/* Middle Ring - Orange */}
          <motion.div
            className="absolute inset-8 rounded-full border border-[var(--color-accent-secondary)]/10 border-b-[var(--color-accent-secondary)]/60 box-border"
            variants={ringVariants}
            animate="animateReverse"
          />

          {/* Inner Dashed Ring - Decorative */}
          <div className="absolute inset-16 rounded-full border border-dashed border-white/5 box-border" />

          {/* Center Core */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-primary)]/20 to-[var(--color-accent-secondary)]/20 blur-xl rounded-full" />
            <div className="relative z-10 text-5xl md:text-6xl font-bold font-heading tabular-nums tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              {progress}
              <span className="text-sm md:text-base font-sans text-[var(--color-text-muted)] ml-1 align-top">
                %
              </span>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <motion.div
            className="text-xs md:text-sm uppercase tracking-[0.4em] text-[var(--color-accent-primary)] font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Initializing System
          </motion.div>
          <div className="h-[2px] w-32 bg-gray-900 rounded-full overflow-hidden mt-2">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
