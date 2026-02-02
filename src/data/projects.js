export const projects = [
  {
    id: 1,
    title: "Scrollytelling Canvas Portfolio",
    description:
      "A high-end dark themed scrollytelling portfolio featuring a scroll-synced HTML5 canvas image sequence, cinematic text overlays, and glassmorphism UI.",
    featured: true,
    year: "2026",
    role: "Frontend Engineer & UI Designer",
    tech: [
      "React.js",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "HTML5 Canvas",
      "Vite",
    ],
    features: [
      "Scroll-scrubbed canvas animation (image sequence, no video)",
      "Preloaded frames for zero flicker and high performance",
      "Cinematic parallax and fade overlay text",
      "Modern glassmorphism project cards and micro-interactions",
      "Fully responsive and mobile-optimized layout",
    ],
    details: {
      challenge:
        "Standard video backgrounds were too heavy (50MB+) and caused stuttering on mobile devices. Scroll synchronization with video frames was imprecise.",
      solution:
        "Implemented a canvas-based image sequence renderer. Images are preloaded and drawn to a single canvas, reducing memory footprint and allowing 1:1 frame control linked directly to scroll position.",
    },
    liveLink: "https://jeevacodes.web.app/",
    githubLink: "https://github.com/JeevaVenkidu/awwwards-style-portfolio-2026",
  },
  {
    id: 2,
    title: "CRM System",
    description:
      "Designed and developed a CRM application using React.js frontend and Node.js / PHP backend. Implemented full CRUD operations, activity tracking, and role-based access.",
    featured: true,
    year: "2025",
    role: "Full Stack Developer",
    tech: ["React.js", "Node.js", "PHP", "JWT"],
    details: {
      challenge:
        "The legacy system lacked real-time updates, leading to sales conflict when multiple agents worked on the same lead.",
      solution:
        "Built a real-time WebSocket layer on top of the PHP backend to push lead status updates instantly. Implemented optimistic UI updates for better perceived performance.",
    },
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 3,
    title: "Electronic Document Management System",
    description:
      "Backend services using Laravel 12 for secure document upload, versioning, and retrieval. Implemented audit logs and document version control.",
    featured: false,
    year: "2024",
    role: "Backend Developer",
    tech: ["Laravel 12", "PHP", "Secure Uploads"],
    details: {
      challenge:
        "Handling massive file uploads (2GB+) securely while maintaining server responsiveness.",
      solution:
        "Implemented chunked uploads with resume capability. Files are scanned for malware asynchronously before being moved to permanent secure storage.",
    },
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 4,
    title: "Automated Log Monitoring System",
    description:
      "Python-based system to monitor application and server logs in real time by parsing log files and detecting error patterns using regex.",
    featured: false,
    year: "2024",
    role: "DevOps Engineer",
    tech: ["Python", "Regex", "Linux", "Webhooks"],
    details: {
      challenge:
        "Production errors were often missed until users reported them, increasing downtime.",
      solution:
        "Created a regex-based log tailer that parses nginx and app logs in real-time. Critical error patterns trigger immediate Slack alerts via webhooks.",
    },
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 5,
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive analytics dashboard for online retailers showing sales trends, inventory levels, and customer demographics.",
    featured: false,
    year: "2023",
    role: "Frontend Developer",
    tech: ["React.js", "Chart.js", "Redux"],
    details: {
      challenge:
        "Rendering large datasets of sales history without freezing the UI.",
      solution:
        "Used windowing techniques to virtualization sales lists and aggregated chart data on the backend before sending to the client.",
    },
    liveLink: "#",
    githubLink: "#",
  },
];
