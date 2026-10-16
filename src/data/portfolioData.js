export const personalData = {
  name: "Yazan",
  title: "Full-Stack Web Developer",
  tagline: "Architecting scalable web applications, sleek user interfaces, and robust backend ecosystems.",
  status: "Available for new opportunities",
  location: "India / Remote Worldwide",
  email: "yazantechofficial89@gmail.com",
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
    email: "mailto:yazantechofficial89@gmail.com",
  },
};

export const skillsData = {
  frontend: [
    { name: "React.js", level: 90, icon: "Atom" },
    { name: "Next.js", level: 85, icon: "Globe" },
    { name: "TypeScript", level: 85, icon: "FileCode2" },
    { name: "Tailwind CSS", level: 95, icon: "Palette" },
    { name: "Redux / Zustand", level: 80, icon: "Cpu" },
    { name: "HTML5 / CSS3 / JS", level: 95, icon: "Code" },
  ],
  backend: [
    { name: "Node.js", level: 90, icon: "Server" },
    { name: "Express.js", level: 88, icon: "Layers" },
    { name: "RESTful APIs", level: 92, icon: "Network" },
    { name: "GraphQL", level: 75, icon: "Boxes" },
    { name: "JWT & Auth", level: 85, icon: "ShieldCheck" },
    { name: "WebSockets", level: 78, icon: "Radio" },
  ],
  database: [
    { name: "PostgreSQL", level: 85, icon: "Database" },
    { name: "MongoDB", level: 90, icon: "HardDrive" },
    { name: "Prisma ORM", level: 82, icon: "Binary" },
    { name: "Redis", level: 75, icon: "Zap" },
    { name: "Firebase / Supabase", level: 85, icon: "Flame" },
  ],
  tools: [
    { name: "Git & GitHub", level: 92, icon: "GitBranch" },
    { name: "Docker", level: 78, icon: "Container" },
    { name: "Postman", level: 90, icon: "Send" },
    { name: "Linux / Bash", level: 80, icon: "Terminal" },
    { name: "Vercel / Netlify / AWS", level: 85, icon: "Cloud" },
  ],
};

export const projectsData = [
  {
    id: 1,
    title: "SevaSetu - AI-Powered Citizen Civic & Crisis Coordination Platform",
    category: "Full-Stack",
    description: "A comprehensive digital public goods platform bridging citizens, municipal authorities, NGOs, and volunteers for real-time grievance redressal, emergency crisis coordination, and community welfare mobilization.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80",
    tags: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Google Gemini AI",
      "Leaflet GIS",
      "WebSockets"
    ],
    features: [
      "End-to-End Citizen Grievance Redressal with real-time lifecycle tracking",
      "AI-Powered Urgency & Severity Triage for automated complaint prioritization",
      "Interactive Geolocation GIS Mapping with duplicate report prevention & heatmaps",
      "Emergency Disaster Relief & Volunteer Mobilization coordination system",
      "Role-Based Dashboards for Citizens, Field Volunteers, and Municipal Officers",
    ],
    demoUrl: "https://sevasetu.vercel.app",
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

