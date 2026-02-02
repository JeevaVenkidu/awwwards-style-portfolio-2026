import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { Toaster } from "sonner";
import {
  SmoothScrollProvider,
  useSmoothScroll,
} from "./context/SmoothScrollContext";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CustomCursor from "./components/CustomCursor";
import "./styles/globals.css";

const InnerApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setLenis } = useSmoothScroll();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    setLenis(lenis);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, [setLenis]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader setIsLoading={setIsLoading} />}
      </AnimatePresence>
      {!isLoading && (
        <main className="relative bg-[var(--color-background-primary)] text-[var(--color-text-body)]">
          <CustomCursor />
          <Navbar />
          <Home />
        </main>
      )}
    </>
  );
};

function App() {
  return (
    <SmoothScrollProvider>
      <InnerApp />
      <Toaster
        position="top-right"
        theme="dark"
        richColors
        expand
        toastOptions={{
          style: {
            background: "rgba(5, 5, 5, 0.8)", // Deep dark glass
            border: "1px solid rgba(255, 255, 255, 0.08)", // Subtle border
            backdropFilter: "blur(16px)", // Heavy blur
            color: "var(--color-text-body)",
            fontFamily: "var(--font-sans)",
            borderRadius: "16px",
            boxShadow:
              "0 10px 40px -10px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.2) inset", // Inner glow + Drop shadow
            padding: "16px 20px",
            fontSize: "14px",
            gap: "12px",
          },
          classNames: {
            toast: "glass-toast group",
            title:
              "text-[var(--color-text-heading)] font-bold text-base tracking-tight mb-1",
            description:
              "text-[var(--color-text-muted)] font-medium leading-relaxed",
            actionButton:
              "bg-[var(--color-accent-primary)] text-black font-bold px-4 py-2 rounded-lg hover:brightness-110 transition-all",
            cancelButton:
              "bg-[var(--color-background-surface)] text-[var(--color-text-muted)] hover:text-white transition-colors",
            error:
              "!border-[var(--color-status-danger)]/30 !bg-[var(--color-status-danger)]/5 !text-[var(--color-status-danger)] drop-shadow-[0_0_15px_rgba(255,50,50,0.1)]",
            success:
              "!border-[var(--color-status-success)]/30 !bg-[var(--color-status-success)]/5 !text-[var(--color-status-success)] drop-shadow-[0_0_15px_rgba(50,255,100,0.1)]",
            warning:
              "!border-[var(--color-status-warning)]/30 !bg-[var(--color-status-warning)]/5 !text-[var(--color-status-warning)]",
            info: "!border-[var(--color-status-info)]/30 !bg-[var(--color-status-info)]/5 !text-[var(--color-status-info)]",
          },
        }}
        icons={{
          success: (
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              <svg
                className="w-4 h-4 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ),
          error: (
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <svg
                className="w-4 h-4 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          ),
        }}
      />
    </SmoothScrollProvider>
  );
}

export default App;
