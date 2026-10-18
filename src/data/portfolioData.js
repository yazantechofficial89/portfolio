export const personalData = {
  name: "Yazan Gupta",
  title: "Full-Stack Web Developer",
  tagline: "Architecting scalable web applications, sleek user interfaces, and robust backend ecosystems.",
  status: "Available for new opportunities",
  location: "India / Remote Worldwide",
  email: "yazangupta39@gmail.com",
  phone: "+91 7011906923",
  resumeUrl: "#resume",
  bio: `I am a passionate Full-Stack Developer with deep expertise in modern JavaScript/TypeScript ecosystems. I bridge the gap between intuitive, responsive frontend design and robust, high-performance backend architecture. From concept to deployment, I build web solutions that solve real-world problems.`,
  detailedStory: `My engineering journey started with curiosity about how complex web applications handle millions of requests without breaking. Over the years, I've immersed myself in the React ecosystem, Node.js runtime, relational & non-relational database design, and cloud architecture. 

I take pride in writing readable, maintainable, and type-safe code that scales gracefully. Whether designing distributed microservices, building pixel-perfect mobile-first interfaces, or configuring CI/CD deployment pipelines, I approach every challenge with high craftsmanship and relentless attention to detail.`,
  stats: [
    { label: "Projects Completed", value: "20+" },
    { label: "Years Experience", value: "2+" },
    { label: "Technologies Mastered", value: "15+" },
    { label: "Code Commits", value: "1,200+" },
  ],
  socials: {
    github: "https://github.com/yazantechofficial89",
    linkedin: "https://www.linkedin.com/in/yazan-gupta-939b46281?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/yazan2006.tech?psln=YWtkcTM2amVtZnVr",
    whatsapp: "https://wa.me/917011906923",
    email: "mailto:yazangupta39@gmail.com",
  },
};

export const skillsData = {
  frontend: [
    { name: "React.js", level: 90, icon: "Atom" },
    { name: "Next.js", level: 85, icon: "Globe" },
  ],
  backend: [
    { name: "Node.js", level: 90, icon: "Server" },
    { name: "Express.js", level: 88, icon: "Layers" },
  ],
  database: [
    { name: "MongoDB", level: 90, icon: "HardDrive" },
    { name: "PostgreSQL", level: 85, icon: "Database" },
  ],
  tools: [
    { name: "Git & GitHub", level: 92, icon: "GitBranch" },
    { name: "Vercel / Netlify / AWS", level: 85, icon: "Cloud" },
  ],
};

export const mernStackData = {
  title: "MERN Stack Development",
  description:
    "I build full-stack web applications using MongoDB, Express.js, React, and Node.js. I enjoy creating responsive user interfaces, developing server-side functionality, and connecting applications to databases.",
  components: [
    {
      name: "MongoDB",
      role: "Database & Storage",
      desc: "Storing and managing application data",
      detail: "Designing flexible, schema-validated NoSQL documents and optimized indexes for fast data queries.",
      icon: "Database",
      accent: "emerald",
    },
    {
      name: "Express.js & Node.js",
      role: "Server Logic & APIs",
      desc: "Building server-side logic and APIs",
      detail: "Developing robust RESTful endpoints, custom middleware, authentication pipelines, and asynchronous request handling.",
      icon: "Server",
      accent: "green",
    },
    {
      name: "React",
      role: "Frontend & UI/UX",
      desc: "Creating interactive, reusable user interfaces",
      detail: "Building responsive component architectures, managing state with hooks, and crafting seamless user interactions.",
      icon: "Code",
      accent: "cyan",
    },
    {
      name: "Full-Stack Development",
      role: "End-to-End Integration",
      desc: "Connecting frontend, backend, and database components",
      detail: "Bridging client interfaces, server APIs, and database transactions into unified, scalable web products.",
      icon: "Layers",
      accent: "purple",
    },
  ],
};

export const coreValuesData = [
  {
    title: "Problem Solving",
    tagline: "Curiosity & Step-by-Step Mindset",
    desc: "I approach challenges with curiosity and a step-by-step mindset. I break problems into smaller parts, explore possible solutions, and work toward clear, practical results.",
    icon: "BrainCircuit",
    gradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
    border: "border-blue-500/30",
    badge: "Engineering Mindset",
    badgeColor: "text-blue-400 bg-blue-950/50 border-blue-500/30",
  },
  {
    title: "Communication",
    tagline: "Clear, Respectful & Transparent",
    desc: "I value clear and respectful communication. I listen carefully, share ideas in an understandable way, and keep others informed while working on a task.",
    icon: "MessageSquare",
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    border: "border-emerald-500/30",
    badge: "Interpersonal",
    badgeColor: "text-emerald-400 bg-emerald-950/50 border-emerald-500/30",
  },
  {
    title: "Teamwork",
    tagline: "Collaborative & Growth-Focused",
    desc: "I enjoy collaborating with others, sharing ideas, and contributing toward common goals. I’m open to feedback and appreciate learning from teammates.",
    icon: "Users",
    gradient: "from-purple-500/10 via-pink-500/5 to-transparent",
    border: "border-purple-500/30",
    badge: "Collaboration",
    badgeColor: "text-purple-400 bg-purple-950/50 border-purple-500/30",
  },
  {
    title: "My Approach",
    tagline: "Organized Code & Continuous Learning",
    desc: "I’m committed to learning, improving my skills, and building useful projects. I aim to write organized code, stay adaptable, and bring a thoughtful approach to every project.",
    icon: "Target",
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    border: "border-amber-500/30",
    badge: "Work Philosophy",
    badgeColor: "text-amber-400 bg-amber-950/50 border-amber-500/30",
  },
];


export const projectsData = [
  {
    id: 1,
    title: "SevaSetu - A Bridge Between Care and Need",
    category: "Full-Stack",
    description: "SevaSetu connects donors directly with orphanages and old-age homes, ensuring transparency, trust, and timely help. Built with full-stack architecture featuring real-time Live Ashram Chat, donation management for clothes & essentials, and community welfare support.",
    image: "/sevasetu.png",
    tags: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Socket.io",
      "Live Ashram Chat",
      "Cloudinary"
    ],
    features: [
      "Direct Care & Need Bridge connecting donors with orphanages & old-age homes",
      "Real-Time Live Ashram Chat with unread badge notifications & instant messaging",
      "Donation Management for clothes, food essentials, and education supplies",
      "Trust & Transparency verification system for verified ashrams & care shelters",
      "Interactive responsive web portal with user authentication & care coordination",
    ],
    demoUrl: "https://sevasetu-3h83.onrender.com/",
    githubUrl: "https://github.com/yazantechofficial89/sevasetu",
    featured: true,
  },
];

export const experienceData = [
  {
    period: "2023 - Present",
    role: "Full-Stack Web Developer",
    company: "Tech Innovations & Freelance",
    description: "Developing scalable full-stack applications with React, Node.js, and cloud databases. Leading frontend architecture, optimizing API endpoints for 40% latency reduction, and shipping client solutions.",
    highlights: ["Built 15+ production-grade web applications", "Integrated microservices & payment gateways", "Implemented CI/CD pipelines with GitHub Actions"],
  },
  {
    period: "2022 - 2023",
    role: "Frontend Developer",
    company: "Digital Solutions Studio",
    description: "Collaborated with UI/UX designers to translate Figma prototypes into accessible, responsive, pixel-perfect web interfaces. Engineered reusable component libraries.",
    highlights: ["Created 30+ reusable React UI components", "Boosted Lighthouse performance score to 98+", "Adopted Tailwind CSS across multiple client portals"],
  },
  {
    period: "2020 - 2024",
    role: "Bachelor of Technology in Computer Science",
    company: "University / Institute",
    description: "Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, Software Engineering.",
    highlights: ["Graduated with Honors", "Active lead at Campus Developer Club", "Winner of Annual Hackathon"],
  },
];

export const faqsData = [
  {
    question: "What types of roles or contracts are you open to?",
    answer: "I am open to full-time remote software engineering roles, technical contracting, and freelance full-stack architecture projects.",
  },
  {
    question: "What is your primary tech stack for new products?",
    answer: "For frontend, I typically reach for React or Next.js with TypeScript and Tailwind CSS. For the backend, Node.js with Express or NestJS, paired with PostgreSQL or MongoDB, Redis for caching, and Docker for containerized deployment.",
  },
  {
    question: "How do you handle project timelines and communication?",
    answer: "I practice agile sprint cycles with regular asynchronous Loom/Slack updates, transparent GitHub PR reviews, and scheduled milestone demos.",
  },
  {
    question: "Can you assist with existing codebases or refactoring?",
    answer: "Yes! I frequently audit existing apps for performance bottlenecks, migrate legacy codebases to modern TypeScript/React, and optimize SQL queries and API latencies.",
  },
];

export const certificationsData = [
  {
    id: "cert-aih-2026",
    title: "All India Hackathon (AIH) 2026 - Certificate of Participation",
    issuer: "Axcentra & Wolfram Research",
    issueDate: "2026",
    credentialId: "AIH-2026-VERIFIED",
    credentialUrl: "https://www.wolfram.com",
    category: "Hackathons & Competitions",
    skills: ["Problem Solving", "Competitive Coding", "Algorithms", "Wolfram Language", "Full-Stack"],
    image: "/certificates/aih_certificate_yazan_gupta.jpg",
    description: "Successfully completed the intense 72-hour national-level online coding challenge at All India Hackathon (AIH) 2026 organized by Axcentra in partnership with Wolfram Research, demonstrating exceptional problem-solving and technical skills.",
    isOriginal: true,
  },
  {
    id: "cert-my-bharat",
    title: "MY Bharat Certificate of Recognition",
    issuer: "Ministry of Youth Affairs and Sports, Govt. of India",
    issueDate: "2026",
    credentialId: "MYBHARAT-GOI-2026",
    credentialUrl: "https://mybharat.gov.in",
    category: "Government & Honors",
    skills: ["Youth Leadership", "Viksit Bharat", "National Initiative", "Civic Tech"],
    image: "/certificates/registration_certificate.jpg",
    description: "Official Certificate of Recognition presented by the Ministry of Youth Affairs and Sports, Government of India, for successful registration on Mera Yuva Bharat (MY Bharat) and taking a stride towards Viksit Bharat.",
    isOriginal: true,
  },
];

