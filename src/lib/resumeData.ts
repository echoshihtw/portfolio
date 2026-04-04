
import type { Projects } from "$lib/types/types";

type ExperienceItem = {
  company: string;
  role: string;
  date: string;
  highlights: string[];
};

type SkillGroup = {
  category: string;
  items: string[];
};

export const summary = "Full-stack engineer with a strong focus on frontend systems, specialising in React and TypeScript.\n\nExperienced in building production applications end-to-end, from designing user interfaces and managing complex state to defining backend APIs, implementing testing across the stack, and structuring system architecture.\n\nParticularly interested in **local-first software and data-intensive interfaces**, with an emphasis on building reliable, scalable, and user-focused products.\n\n---";

export const experience: ExperienceItem[] = [
  {
    "company": "Lockerbie Technology",
    "role": "**Full-Stack Engineer — Frontend-focused Platform Development**",
    "date": "Taipei, Taiwan · Dec 2024 – Present",
    "highlights": [
      "Owned full-stack development of a production system, delivering both frontend (Next.js) and backend services supporting complex operational workflows.",
      "Built a **Next.js frontend for complex multi-role workflows**, designing predictable state management and ensuring consistent data flow across user interactions.",
      "**Defined backend API requirements and guided implementation**, enabling seamless end-to-end feature delivery.",
      "Designed backend services and API integrations (FastAPI, REST), structuring workflow logic and enabling reliable data flow across systems.",
      "Built reusable UI components aligned with backend domain logic, improving maintainability and development speed.",
      "**Implemented CI/CD pipelines using GitHub Actions and Makefile-based workflows**, enabling reproducible builds and reliable deployments in Linux-based environments.",
      "**Implemented unit and integration tests across frontend (Jest, React Testing Library) and backend (Python)**, ensuring reliability of UI behavior and API logic."
    ]
  },
  {
    "company": "SPIN.FASHION by Lablaco",
    "role": "**Software Engineer · Founding Partner**",
    "date": "Singapore · Remote · Aug 2024 – Oct 2024",
    "highlights": [
      "Resolved a **critical macOS Electron release blocker**, enabling successful desktop distribution.",
      "Authored a **deployment runbook**, later adopted as the team’s release standard.",
      "Improved **React + TypeScript frontend performance and stability**.",
      "Supported distributed delivery across time zones."
    ]
  },
  {
    "company": "Find Recruiter (HR Tech Startup)",
    "role": "**Software Engineer**",
    "date": "Taipei, Taiwan · Aug 2022 – May 2024",
    "highlights": [
      "One of two engineers responsible for the full product platform.",
      "Led frontend development using React and TypeScript, delivering core user-facing features.",
      "Migrated production codebase to TypeScript, reducing runtime bugs by ~30%.",
      "Built reusable UI components and structured state management, improving development speed.",
      "Delivered an AI-powered feature (JD Generator) using OpenAI APIs."
    ]
  },
  {
    "company": "Independent Engineering Work",
    "role": "**Software Engineer**",
    "date": "Remote · 2020 – Present",
    "highlights": [
      "Built full-stack applications across fintech, e-commerce, and research domains, adapting system design to varied product requirements.",
      "Built a Bitcoin research tool visualizing UTXO-level behavior and fee modeling."
    ]
  }
];

export const skills: SkillGroup[] = [
  {
    "category": "### Frontend",
    "items": [
      "React",
      "Next.js",
      "TypeScript",
      "TailwindCSS"
    ]
  },
  {
    "category": "Backend",
    "items": [
      "Node.js",
      "FastAPI",
      "REST APIs",
      "Supabase"
    ]
  },
  {
    "category": "State & Data",
    "items": [
      "React Query",
      "Zustand",
      "Redux",
      "SQLite"
    ]
  },
  {
    "category": "Testing",
    "items": [
      "Jest",
      "React Testing Library",
      "Python (unit & integration)"
    ]
  },
  {
    "category": "Infrastructure",
    "items": [
      "Linux (Ubuntu)",
      "GitHub Actions",
      "Docker",
      "AWS",
      "Vercel"
    ]
  },
  {
    "category": "Build & Automation",
    "items": [
      "Makefile"
    ]
  },
  {
    "category": "Additional",
    "items": [
      "Python",
      "Rust",
      "Tauri",
      "Electron",
      "---"
    ]
  }
];

export const projects: Projects = [
  {
    "name": "Cosmora",
    "subtitle": "Local-First Salon Operating System",
    "description": "Cosmora is a production-focused local-first desktop application for independent salon owners. It manages client records, visit history, and financial workflows entirely on-device, eliminating cloud dependency while ensuring data ownership and reliability.",
    "href": "https://cosmora-lab.vercel.app",
    "stack": [
      "React",
      "Tauri",
      "TypeScript",
      "SQLite",
      "Zustand",
      "React Query"
    ],
    "highlights": [
      "Built desktop app with React + Tauri",
      "Designed local-first data layer using SQLite",
      "Handled complex workflows (clients, visits, finances)",
      "Implemented secure onboarding and state recovery"
    ],
    "featured": true,
    "linkLabel": "In Progress →",
    "status": "In Progress"
  },
  {
    "name": "Digital Chaos",
    "subtitle": "Personal Knowledge & Reflection App",
    "description": "A lightweight web app for capturing personal quotes, ideas, and life rules. Focused on fast input, simple organization, and clean UI for daily use.",
    "href": "https://digital-chaos-jzg2.vercel.app",
    "stack": [
      "React",
      "TypeScript",
      "Vercel"
    ],
    "highlights": [
      "Fast input and minimal UI design",
      "Lightweight personal knowledge system",
      "Deployed on Vercel for instant access"
    ],
    "linkLabel": "Live Demo →",
    "status": "Live"
  },
  {
    "name": "Crypto Price Ticker",
    "subtitle": "Real-Time Crypto Data Visualization",
    "href": "https://github.com/echoshihtw/crypto-price-ticker",
    "description": "A full-stack real-time cryptocurrency price tracker with live chart updates using WebSockets. Built to handle streaming data and dynamic UI updates.",
    "stack": [
      "React",
      "TypeScript",
      "Socket.io"
    ],
    "highlights": [
      "Real-time data streaming with WebSockets",
      "Dynamic chart rendering",
      "Full-stack data flow handling"
    ],
    "linkLabel": "Source Code →",
    "status": "Archived"
  },
  {
    "name": "Echology",
    "subtitle": "Bitcoin UTXO Analysis Tool",
    "href": "https://github.com/evanlinjin/echology",
    "file": "assets/echology.png",
    "description": "A research-focused Bitcoin wallet interface visualizing coin selection and UTXO behavior using Bitcoin Dev Kit (BDK), enabling exploration of fee modeling and transaction strategies.",
    "stack": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS"
    ],
    "highlights": [
      "Visualized UTXO-level behavior",
      "Explored coin selection algorithms",
      "Built for Bitcoin research workflows"
    ],
    "linkLabel": "Source Code →",
    "status": "Archived"
  }
];
