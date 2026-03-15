
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
    "role": "Full-Stack Engineer — Sole Engineer",
    "date": "Taipei, Taiwan · Dec 2024 – Present",
    "highlights": [
      "Owned the full production platform across Python backend, Next.js frontend, ArangoDB database, Docker infrastructure, and self-hosted Linux servers.",
      "Redesigned system architecture → modular monolith with RabbitMQ async messaging, improving maintainability and enabling independent feature development.",
      "Refactored ArangoDB graph schema, simplifying cross-module data relationships and reducing friction when introducing new features.",
      "Implemented CI/CD pipelines using GitHub Actions, replacing manual deployments with automated releases.",
      "Served as the primary technical owner, coordinating requirements and maintaining delivery momentum as the sole engineer."
    ]
  },
  {
    "company": "SPIN.FASHION by Lablaco",
    "role": "Software Engineer & Founding Partner",
    "date": "Singapore · Remote · Aug 2024 – Oct 2024",
    "highlights": [
      "Resolved macOS Electron release blocker caused by code-signing and notarisation failures, enabling successful desktop distribution.",
      "Authored the macOS deployment runbook, later adopted as the team standard.",
      "Optimised React + TypeScript frontend performance alongside backend engineers and third-party vendors.",
      "Led distributed sprint delivery as co-Scrum Master, improving async collaboration and design handoff workflows."
    ]
  },
  {
    "company": "Find Recruiter (HR Tech Startup)",
    "role": "Software Engineer",
    "date": "Taipei, Taiwan · Aug 2022 – May 2024",
    "highlights": [
      "One of two engineers responsible for the full product platform, reporting directly to the CTO.",
      "Migrated the production codebase to TypeScript, reducing runtime bugs by ~30%.",
      "Built a reusable React component system with Redux-Saga, improving development speed and UI consistency.",
      "Delivered the company’s AI-powered JD Generator, integrating OpenAI APIs from concept through production release.",
      "Introduced GitHub Actions CI/CD pipelines, enabling reliable deployments for a small engineering team."
    ]
  },
  {
    "company": "Independent / Freelance",
    "role": "Software Engineer",
    "date": "Remote · 2020 – Present",
    "highlights": [
      "Built the frontend for Echology, a Bitcoin research wallet visualising BDK coin-selection algorithms and UTXO fee modelling.",
      "Delivered production applications across fintech, e-commerce, and creative sectors using React, Next.js, TypeScript, and Supabase."
    ]
  }
];

export const skills: SkillGroup[] = [
  {
    "category": "Languages",
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
      "TailwindCSS",
      "SvelteKit"
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
    "category": "Backend",
    "items": [
      "Node.js",
      "Python",
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
      "Rust (integration)"
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
      "Modular Monolith",
      "Event-Driven Messaging",
      "Offline-First Systems",
      "REST API Design"
    ]
  },
  {
    "category": "AI & LLM",
    "items": [
      "LangChain (JS)",
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
