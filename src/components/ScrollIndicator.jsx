import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2 opacity-80 mix-blend-plus-lighter">
      {/* Animated Mouse Icon */}
      <div className="relative w-6 h-10 rounded-full border-2 border-[var(--color-text-muted)] p-1 flex justify-center">
        <motion.div
          animate={{
            y: [0, 12, 0],
            opacity: [1, 0, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-1 h-2 bg-[var(--color-accent-primary)] rounded-full"
        />
      </div>

      {/* "SCROLL" Text with Tracking */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[var(--color-text-muted)] uppercase">
          Scroll
        </span>
        {/* Infinite Line */}
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-[var(--color-text-muted)]/20 to-transparent overflow-hidden relative">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-accent-primary)] to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
