import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaPhp,
  FaLaravel,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaLinux,
  FaWindows,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiCodeigniter,
  SiMysql,
  SiPrisma,
  SiPostman,
  SiExpress,
  SiPostgresql,
  SiJsonwebtokens,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const uniqueSkills = [
  { name: "HTML", icon: FaHtml5, color: "#E34F26" },
  { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "#fff" },
  { name: "PHP", icon: FaPhp, color: "#777BB4" },
  { name: "Laravel", icon: FaLaravel, color: "#FF2D20" },
  { name: "CodeIgniter", icon: SiCodeigniter, color: "#EF4223" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Prisma", icon: SiPrisma, color: "#fff" },
  { name: "JWT", icon: SiJsonwebtokens, color: "#000000" },
  { name: "Git", icon: FaGitAlt, color: "#F05032" },
  { name: "GitHub", icon: FaGithub, color: "#ffffff" },
  { name: "Linux", icon: FaLinux, color: "#FCC624" },
  { name: "VS Code", icon: VscVscode, color: "#007ACC" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Windows", icon: FaWindows, color: "#0078D6" },
];

// Duplicate skills to achieve the crowded "V" look
// Target structure: 15, 12, 8, 4, 1 (Total ~40)
const skills = uniqueSkills;

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-32 bg-[var(--color-background-primary)] relative z-10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] text-sm font-medium mb-6 border border-[var(--color-accent-primary)]/20">
            Build with Modern Tech
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-heading)] mb-4 tracking-tight">
            Making apps with modern technologies.
          </h2>
          <p className="text-[var(--color-text-body)] text-lg md:text-xl font-serif italic opacity-80">
            Never miss a task, deadline or idea.
          </p>
        </motion.div>

        {/* Skills Grid - Inverted Pyramid approximation */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
                zIndex: 10,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.02,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="group relative flex flex-col items-center justify-center p-2 md:p-3 transition-all duration-300"
            >
              <div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-[var(--color-background-surface)]/50 rounded-full group-hover:bg-[var(--color-background-secondary)] transition-colors duration-300 border border-transparent group-hover:border-[var(--color-border-soft)]">
                <skill.icon
                  className="text-5xl md:text-6xl drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                  style={{
                    color: skill.color === "#2D3748" ? "#fff" : skill.color,
                    filter: "drop-shadow(0 0 10px rgba(0,0,0,0.5))",
                  }}
                />
              </div>

              {/* Label: Visible on Mobile, Hidden on Desktop (Tooltip style) */}
              <div className="mt-2 md:mt-0 md:absolute md:-bottom-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs md:text-sm font-bold text-[var(--color-text-heading)] bg-transparent md:bg-[var(--color-background-secondary)] px-0 md:px-3 py-0 md:py-1.5 rounded-full pointer-events-none transform md:translate-y-2 md:group-hover:translate-y-0 md:backdrop-blur-sm md:border md:border-[var(--color-border-soft)] z-20">
                {skill.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
