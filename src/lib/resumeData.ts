
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

export const summary = "";

export const experience: ExperienceItem[] = [
  {
    "company": "Lockerbie Technology",
    "role": "**Full-Stack Engineer — Platform Architecture**",
    "date": "Taipei, Taiwan · Dec 2024 – Present",
    "highlights": [
      "Owned and operated the full production platform across **Next.js frontend, FastAPI backend, ArangoDB graph database, Docker infrastructure, and self-hosted Linux servers**.",
      "Designed a **modular Next.js frontend architecture** with a Backend-for-Frontend (BFF) layer isolating frontend code from backend APIs.",
      "Implemented **layered authentication architecture** using HttpOnly backend tokens, short-lived frontend JWTs, and CSRF validation to prevent token exposure.",
      "Redesigned backend architecture into a **modular monolith with RabbitMQ asynchronous messaging**, enabling decoupled service modules.",
      "Modeled organisational data using **ArangoDB graph + document schemas** to represent projects, work packages, and vendor relationships.",
      "Introduced **GitHub Actions CI/CD pipelines**, enabling automated deployments to self-hosted infrastructure."
    ]
  },
  {
    "company": "SPIN.FASHION by Lablaco",
    "role": "**Software Engineer · Founding Partner**",
    "date": "Singapore · Remote · Aug 2024 – Oct 2024",
    "highlights": [
      "Resolved **macOS Electron release blocker** caused by code-signing and notarisation failures, enabling successful desktop distribution.",
      "Authored the **macOS deployment runbook**, later adopted as the team's release standard.",
      "Improved **React + TypeScript frontend performance and stability** alongside backend engineers and third-party vendors.",
      "Coordinated distributed sprint delivery as **co-Scrum Master**, improving async collaboration and design handoffs."
    ]
  },
  {
    "company": "Find Recruiter (HR Tech Startup)",
    "role": "**Software Engineer**",
    "date": "Taipei, Taiwan · Aug 2022 – May 2024",
    "highlights": [
      "One of **two engineers responsible for the full product platform**, reporting directly to the CTO.",
      "Migrated the production codebase to **TypeScript**, reducing runtime bugs by ~30%.",
      "Built a **reusable React component system with Redux-Saga**, improving UI consistency and development velocity.",
      "Delivered the company’s **AI-powered JD Generator**, integrating OpenAI APIs from concept through production release.",
      "Introduced **GitHub Actions CI/CD pipelines**, enabling reliable deployments for a small engineering team."
    ]
  },
  {
    "company": "Independent Engineering Work",
    "role": "**Software Engineer**",
    "date": "Remote · 2020 – Present",
    "highlights": [
      "Built the frontend for **Echology**, a Bitcoin research wallet visualising BDK coin-selection algorithms and UTXO fee modelling.",
      "Delivered production web applications across **fintech, e-commerce, and creative sectors** using React, Next.js, TypeScript, and Supabase."
    ]
  }
];

export const skills: SkillGroup[] = [
  {
    "category": "### Languages",
    "items": [
      "TypeScript",
      "JavaScript",
      "Python"
    ]
  },
  {
    "category": "Frontend",
    "items": [
      "React",
      "Next.js",
      "SvelteKit",
      "TailwindCSS"
    ]
  },
  {
    "category": "State Management",
    "items": [
      "Redux",
      "Zustand",
      "React Query"
    ]
  },
  {
    "category": "Backend:",
    "items": [
      "Node.js",
      "Python",
      "FastAPI",
      "ArangoDB",
      "RabbitMQ",
      "Supabase"
    ]
  },
  {
    "category": "Desktop / Local-First",
    "items": [
      "Tauri",
      "Electron",
      "SQLite",
      "Rust"
    ]
  },
  {
    "category": "Infrastructure",
    "items": [
      "Docker",
      "GitHub Actions",
      "Self-Hosted Linux Servers",
      "AWS",
      "Vercel"
    ]
  },
  {
    "category": "Architecture",
    "items": [
      "Backend-for-Frontend (BFF)",
      "Modular Monolith",
      "Event-Driven Messaging",
      "Offline-First Systems",
      "REST API Design"
    ]
  },
  {
    "category": "AI & LLM",
    "items": [
      "LangChain",
      "OpenAI APIs",
      "Prompt Engineering",
      "---"
    ]
  }
];

export const projects: Projects = [
  {
    "name": "Cosmora",
    "subtitle": "Offline-First Salon Operating System",
    "description": "Cosmora is a local-first desktop application designed for independent salon owners. It keeps client and business data on-device while supporting visit history, client records, and financial insight workflows without cloud dependency.",
    "href": "https://cosmora-lab.vercel.app",
    "stack": [
      "Tauri",
      "TypeScript",
      "SQLite",
      "Local-First",
      "Privacy-First"
    ],
    "highlights": [
      "Tauri desktop application",
      "SQLite local database",
      "Privacy-first data model",
      "Financial reporting system"
    ],
    "featured": true,
    "linkLabel": "In Progress →",
    "status": "In Progress"
  },
  {
    "name": "digital-chaos",
    "subtitle": "Personal quotes and life rules collection app",
    "description": "Personal quotes and life rules collection app.",
    "href": "https://digital-chaos-jzg2.vercel.app",
    "stack": [
      "React",
      "Vercel"
    ],
    "linkLabel": "Live Demo →",
    "status": "Live"
  },
  {
    "name": "Crypto Price Ticker",
    "href": "https://github.com/echoshihtw/crypto-price-ticker",
    "description": "Full stack realtime cryptocurrency price chart built with React, TypeScript, and Socket.io.",
    "stack": [
      "React",
      "TypeScript",
      "Socket.io"
    ],
    "linkLabel": "Source Code →",
    "status": "Archived"
  },
  {
    "name": "Echology",
    "href": "https://github.com/evanlinjin/echology",
    "file": "assets/echology.png",
    "description": "Regtest custodial web wallet showcasing Bitcoin Dev Kit (BDK) coin selection and spend-scenario exploration.",
    "stack": [
      "Next.js",
      "Tailwind CSS"
    ],
    "linkLabel": "Source Code →",
    "status": "Archived"
  }
];
