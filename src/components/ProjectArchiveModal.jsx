import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import Modal from "./ui/Modal";

const ArchiveCard = ({ project, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    onClick={() => onClick(project)}
    className="group cursor-pointer p-4 rounded-xl bg-[var(--color-background-surface)] border border-[var(--color-border-soft)] hover:border-[var(--color-accent-primary)]/50 hover:shadow-lg transition-all"
  >
    <div className="flex justify-between items-start mb-2">
      <h4 className="font-bold text-[var(--color-text-heading)] group-hover:text-[var(--color-accent-primary)] transition-colors">
        {project.title}
      </h4>
      <span className="text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-background-secondary)] px-2 py-1 rounded">
        {project.year}
      </span>
    </div>
    <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 mb-3">
      {project.description}
    </p>
    <div className="flex flex-wrap gap-1.5">
      {project.tech.slice(0, 3).map((t) => (
        <span
          key={t}
          className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-[var(--color-background-secondary)] text-[var(--color-text-muted)] border border-[var(--color-border-default)]"
        >
          {t}
        </span>
      ))}
      {project.tech.length > 3 && (
        <span className="px-2 py-0.5 text-[10px] text-[var(--color-text-muted)]">
          +{project.tech.length - 3}
        </span>
      )}
    </div>
  </motion.div>
);

export default function ProjectArchiveModal({
  projects,
  isOpen,
  onClose,
  onSelectProject,
}) {
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Project Archive">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search projects by title or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-soft)] text-[var(--color-text-heading)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ArchiveCard
              key={project.id}
              project={project}
              onClick={onSelectProject}
            />
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-12 text-center text-[var(--color-text-muted)]">
              No projects found matching "{search}"
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
