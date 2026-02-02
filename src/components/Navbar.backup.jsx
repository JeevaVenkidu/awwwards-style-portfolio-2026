import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useSmoothScroll } from "../context/SmoothScrollContext";
import { Home, User, Code, Briefcase, Mail } from "lucide-react";

export default function Navbar() {
  const { lenis } = useSmoothScroll();
  const [activeTab, setActiveTab] = useState("Home");

  const navItems = useMemo(
    () => [
      { label: "Home", icon: Home, href: "#home" },
      { label: "About", icon: User, href: "#about" },
      { label: "Skills", icon: Code, href: "#skills" },
      { label: "Work", icon: Briefcase, href: "#work" },
      { label: "Contact", icon: Mail, href: "#contact" },
    ],
    [],
  );

  const handleScrollTo = (e, href, label) => {
    e.preventDefault();
    setActiveTab(label);
    if (lenis) {
      // If target is #home, scroll to 0 (top)
      const target = href === "#home" ? 0 : href;
      lenis.scrollTo(target, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  const visibleSections = useRef(new Set());

  useEffect(() => {
    const observers = [];

    navItems.forEach(({ label, href }) => {
      // if (href === "#") return; // REMOVED exclusion

      const element = document.querySelector(href);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                visibleSections.current.add(label);
              } else {
                visibleSections.current.delete(label);
              }
            });

            // Determine active tab based on priority
            const sections = Array.from(visibleSections.current);
            if (sections.length > 0) {
              // Map section labels back to their order in navItems
              const sorted = sections.sort((a, b) => {
                const indexA = navItems.findIndex((item) => item.label === a);
                const indexB = navItems.findIndex((item) => item.label === b);
                return indexA - indexB; // Prioritize earlier sections
              });
              setActiveTab(sorted[0]); // Set the first visible section as active
            } else if (window.scrollY < 100) {
              setActiveTab("Home"); // Default to Home if at top
            }
          },
          { threshold: 0.1 }, // Trigger when 10% visible (accommodates large 500vh Hero)
        );

        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [navItems]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1, type: "spring" }}
      className="fixed bottom-6 md:bottom-auto md:top-6 left-0 right-0 mx-auto w-fit z-50 flex items-center gap-2 px-2 py-2 rounded-full bg-[var(--color-background-glass)] backdrop-blur-[var(--blur-glass)] border border-[var(--color-border-default)] shadow-[var(--shadow-strong)]"
    >
      {navItems.map(({ label, icon, href }) => {
        const isActive = activeTab === label;
        const NavIcon = icon;

        return (
          <a
            key={label}
            href={href}
            onClick={(e) => handleScrollTo(e, href, label)}
            className="relative flex items-center justify-center px-4 py-3 md:px-5 md:py-2 text-sm font-medium rounded-full transition-all duration-300 z-10 cursor-pointer"
            aria-label={label}
          >
            {/* Liquid Background Blob */}
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-[var(--color-accent-primary)]/10 rounded-full shadow-[0_0_15px_var(--shadow-glow-primary)] backdrop-blur-sm border border-[var(--color-accent-primary)]/20"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}

            {/* Icon (Mobile) */}
            <motion.div
              animate={{
                scale: isActive ? 1.2 : 1,
                opacity: isActive ? 1 : 0.6,
              }}
              className="md:hidden relative z-20"
            >
              <NavIcon
                className={`w-5 h-5 ${
                  isActive
                    ? "text-[var(--color-accent-primary)] drop-shadow-[0_0_8px_var(--color-accent-primary)]"
                    : "text-[var(--color-text-muted)]"
                }`}
              />
            </motion.div>

            {/* Text (Desktop) */}
            <span
              className={`hidden md:block relative z-20 transition-colors duration-300 ${
                isActive
                  ? "text-[var(--color-accent-primary)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-body)]"
              }`}
            >
              {label}
            </span>
          </a>
        );
      })}
    </motion.nav>
  );
}
