import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiArrowRight, FiGrid } from "react-icons/fi";
import { projects } from "../data/projects";
import ProjectDetailModal from "./ProjectDetailModal";
import ProjectArchiveModal from "./ProjectArchiveModal";

const ProjectCard = ({ project, index, onSelect }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-[var(--color-background-glass)] border border-[var(--color-border-soft)] backdrop-blur-[var(--blur-glass)] hover:border-[var(--color-accent-primary)]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,212,255,0.15)] flex flex-col h-full"
    >
      <div className="flex-grow">
        <h3 className="text-2xl font-bold mb-2 text-[var(--color-text-heading)] group-hover:text-[var(--color-accent-primary)] transition-colors font-heading tracking-tight">
          {project.title}
        </h3>
        <p className="text-[var(--color-text-body)] mb-6 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--color-background-surface)] text-[var(--color-text-muted)] border border-[var(--color-border-default)] group-hover:border-[var(--color-accent-primary)]/30 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-auto">
        <button
          onClick={() => onSelect(project)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[var(--color-background-surface)] text-[var(--color-text-heading)] font-semibold text-sm border border-[var(--color-border-default)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] transition-all group-hover:-translate-y-0.5"
        >
          Read More <FiArrowRight />
        </button>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section
      id="work"
      className="py-32 px-6 md:px-12 relative z-10 bg-[var(--color-background-primary)]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[var(--color-text-heading)]">
          Selected Works
        </h2>
        <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
          A showcase of my recent digital crafts and engineering feats.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onSelect={setSelectedProject}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <button
          onClick={() => setIsArchiveOpen(true)}
          className="inline-flex items-center gap-2 py-3 px-8 rounded-full border border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] font-bold hover:bg-[var(--color-accent-primary)] hover:text-[var(--color-background-primary)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
        >
          <FiGrid /> View Full Project Archive
        </button>
      </motion.div>

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ProjectArchiveModal
        projects={projects}
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        onSelectProject={(project) => {
          setIsArchiveOpen(false);
          // Small timeout to allow archive to close smoothly before detail opens
          setTimeout(() => setSelectedProject(project), 300);
        }}
      />
    </section>
  );
}
