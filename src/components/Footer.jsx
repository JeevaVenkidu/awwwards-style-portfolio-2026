import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, url: "https://github.com/JeevaVenkidu", label: "GitHub" },
  {
    icon: Linkedin,
    url: "https://www.linkedin.com/in/jeeva-/",
    label: "LinkedIn",
  },
  { icon: Twitter, url: "https://x.com/JeevaV79048646", label: "Twitter" },
  { icon: Mail, url: "mailto:jeeva6316x@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="pt-8 pb-[calc(110px+env(safe-area-inset-bottom))] bg-[var(--color-background-primary)] text-center border-t border-[var(--color-border-soft)] relative z-10">
      <div className="text-[var(--color-text-muted)] text-sm">
        © {new Date().getFullYear()} Jeeva. All rights reserved.
      </div>
      <div className="flex justify-center gap-6 mt-4">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors"
            aria-label={link.label}
          >
            <link.icon size={20} />
          </a>
        ))}
      </div>
    </footer>
  );
}
