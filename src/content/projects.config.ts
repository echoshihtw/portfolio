import type { Projects } from "../lib/types/types.js";

export const projectsConfig: Projects = [
  {
    name: "Cosmora",
    subtitle: "Offline-First Salon Operating System",
    description:
      "Cosmora is a local-first desktop application designed for independent salon owners. It keeps client and business data on-device while supporting visit history, client records, and financial insight workflows without cloud dependency.",
    href: "https://cosmora-lab.vercel.app",
    stack: ["Tauri", "TypeScript", "SQLite", "Local-First", "Privacy-First"],
    highlights: [
      "Tauri desktop application",
      "SQLite local database",
      "Privacy-first data model",
      "Financial reporting system",
    ],
    featured: true,
    linkLabel: "In Progress →",
    status: "In Progress",
  },
  {
    name: "digital-chaos",
    subtitle: "Personal quotes and life rules collection app",
    description: "Personal quotes and life rules collection app.",
    href: "https://digital-chaos-jzg2.vercel.app",
    stack: ["React", "Vercel"],
    linkLabel: "Live Demo →",
    status: "Live",
  },
  {
    name: "Crypto Price Ticker",
    href: "https://github.com/echoshihtw/crypto-price-ticker",
    description:
      "Full stack realtime cryptocurrency price chart built with React, TypeScript, and Socket.io.",
    stack: ["React", "TypeScript", "Socket.io"],
    linkLabel: "Source Code →",
    status: "Archived",
  },
  {
    name: "Echology",
    href: "https://github.com/evanlinjin/echology",
    file: "assets/echology.png",
    description:
      "Regtest custodial web wallet showcasing Bitcoin Dev Kit (BDK) coin selection and spend-scenario exploration.",
    stack: ["Next.js", "Tailwind CSS"],
    linkLabel: "Source Code →",
    status: "Archived",
  },
];
