import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiCalendar, FiUser } from "react-icons/fi";
import Modal from "./ui/Modal";

export default function ProjectDetailModal({ project, isOpen, onClose }) {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.title}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <p className="text-lg text-[var(--color-text-body)] leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-muted)]">
            {project.year && (
              <div className="flex items-center gap-2">
                <FiCalendar className="text-[var(--color-accent-primary)]" />
                <span>{project.year}</span>
              </div>
            )}
            {project.role && (
              <div className="flex items-center gap-2">
                <FiUser className="text-[var(--color-accent-primary)]" />
                <span>{project.role}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--color-background-surface)] text-[var(--color-text-heading)] border border-[var(--color-border-default)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Deep Dive Section */}
        {project.details && (
          <div className="grid md:grid-cols-2 gap-6 bg-[var(--color-background-surface)]/50 p-6 rounded-xl border border-[var(--color-border-soft)]">
            <div className="space-y-2">
              <h4 className="font-bold text-[var(--color-status-error)] flex items-center gap-2">
                The Challenge
              </h4>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {project.details.challenge}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-[var(--color-status-success)] flex items-center gap-2">
                The Solution
              </h4>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {project.details.solution}
              </p>
            </div>
          </div>
        )}

        {/* Feature List */}
        {project.features && (
          <div className="space-y-3">
            <h4 className="font-bold text-[var(--color-text-heading)]">
              Key Features
            </h4>
            <ul className="grid gap-2">
              {project.features.map((feature, idx) => (
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={idx}
                  className="flex items-start gap-3 text-sm text-[var(--color-text-body)]"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)] flex-shrink-0" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[var(--color-border-soft)]">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-[var(--color-accent-primary)] text-[var(--color-background-primary)] font-bold hover:bg-[var(--color-accent-primary-hover)] transition-all"
          >
            <FiExternalLink /> Live Demo
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-[var(--color-background-surface)] text-[var(--color-text-heading)] border border-[var(--color-border-default)] hover:bg-[var(--color-background-secondary)] transition-all"
          >
            <FiGithub /> Source Code
          </a>
        </div>
      </div>
    </Modal>
  );
}
