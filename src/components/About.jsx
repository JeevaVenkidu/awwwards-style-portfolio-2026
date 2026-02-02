import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-32 bg-[var(--color-background-primary)] relative z-10"
    >
      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-[var(--color-text-heading)]">
            About Me
          </h2>
          <div className="space-y-4 text-[var(--color-text-body)] text-lg leading-relaxed mb-6">
            <p>
              I’m Jeeva, a backend-focused full-stack developer specializing in
              secure, scalable web applications. My core expertise lies in{" "}
              <span className="text-[var(--color-accent-primary)] font-medium">
                Node.js, Express, and PHP frameworks
              </span>{" "}
              (Laravel, CodeIgniter), managing databases like MySQL and
              PostgreSQL with precision.
            </p>
            <p>
              Beyond the backend, I craft responsive UIs using{" "}
              <span className="text-[var(--color-accent-primary)] font-medium">
                React and Tailwind CSS
              </span>
              , delivering complete end-to-end solutions. My goal is to build
              reliable systems with clean, maintainable code.
            </p>
          </div>
          <ul className="space-y-3 text-[var(--color-text-muted)]">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)]"></span>
              Secure & Scalable Backend
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-secondary)]"></span>
              Database Management (SQL/NoSQL)
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--color-status-info)]"></span>
              Clean APIs & Responsive UI
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="p-6 rounded-2xl bg-[var(--color-background-glass)] border border-[var(--color-border-soft)] backdrop-blur-[var(--blur-glass)] text-center hover:border-[var(--color-accent-primary)] transition-all duration-300 shadow-[var(--shadow-soft)] hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]">
            <div className="text-4xl font-bold bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent mb-2 font-heading">
              2+
            </div>
            <div className="text-sm text-[var(--color-text-muted)] font-medium uppercase tracking-wider">
              Years Experience
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-[var(--color-background-glass)] border border-[var(--color-border-soft)] backdrop-blur-[var(--blur-glass)] text-center hover:border-[var(--color-accent-secondary)] transition-all duration-300 shadow-[var(--shadow-soft)] hover:shadow-[0_0_20px_rgba(255,106,0,0.1)]">
            <div className="text-4xl font-bold bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent-primary)] bg-clip-text text-transparent mb-2 font-heading">
              10+
            </div>
            <div className="text-sm text-[var(--color-text-muted)] font-medium uppercase tracking-wider">
              Projects Built
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-[var(--color-background-glass)] border border-[var(--color-border-soft)] backdrop-blur-[var(--blur-glass)] text-center hover:border-[var(--color-status-info)] transition-all duration-300 col-span-2 shadow-[var(--shadow-soft)] hover:shadow-[0_0_20px_rgba(50,255,100,0.1)]">
            <div className="text-4xl font-bold bg-gradient-to-r from-[var(--color-status-info)] to-[var(--color-accent-primary)] bg-clip-text text-transparent mb-2 font-heading">
              100%
            </div>
            <div className="text-sm text-[var(--color-text-muted)] font-medium uppercase tracking-wider">
              Client Satisfaction
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
