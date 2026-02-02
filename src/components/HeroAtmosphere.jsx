import { motion } from "framer-motion";

export default function HeroAtmosphere() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 hidden lg:block">
      {/* 1. Cinematic Vignette - Darkens corners to focus on face */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,11,20,0.8)_100%)] mix-blend-multiply" />

      {/* 2. Ambient Primary Glow (Cyan) - Drifting Top Left */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[var(--color-accent-primary)] rounded-full blur-[120px] opacity-30 mix-blend-screen"
      />

      {/* 3. Ambient Secondary Glow (Orange) - Drifting Bottom Right */}
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/2 -right-20 w-[600px] h-[600px] bg-[var(--color-accent-secondary)] rounded-full blur-[140px] opacity-20 mix-blend-screen"
      />

      {/* 4. Subtle Noise Texture - Adds film grain realism */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
