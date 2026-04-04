import type { Projects } from "../lib/types/types.js";

export const projectsConfig: Projects = [
  {
    name: "Cosmora",
    subtitle: "Local-First Salon Operating System",
    description:
      "Cosmora is a production-focused local-first desktop application for independent salon owners. It manages client records, visit history, and financial workflows entirely on-device, eliminating cloud dependency while ensuring data ownership and reliability.",
    href: "https://cosmora-lab.vercel.app",
    stack: ["React", "Tauri", "TypeScript", "SQLite", "Zustand", "React Query"],
    highlights: [
      "Built desktop app with React + Tauri",
      "Designed local-first data layer using SQLite",
      "Handled complex workflows (clients, visits, finances)",
      "Implemented secure onboarding and state recovery",
    ],
    featured: true,
    linkLabel: "In Progress →",
    status: "In Progress",
  },
  {
    name: "Digital Chaos",
    subtitle: "Personal Knowledge & Reflection App",
    description:
      "A lightweight web app for capturing personal quotes, ideas, and life rules. Focused on fast input, simple organization, and clean UI for daily use.",
    href: "https://digital-chaos-jzg2.vercel.app",
    stack: ["React", "TypeScript", "Vercel"],
    highlights: [
      "Fast input and minimal UI design",
      "Lightweight personal knowledge system",
      "Deployed on Vercel for instant access",
    ],
    linkLabel: "Live Demo →",
    status: "Live",
  },
  {
    name: "Crypto Price Ticker",
    subtitle: "Real-Time Crypto Data Visualization",
    href: "https://github.com/echoshihtw/crypto-price-ticker",
    description:
      "A full-stack real-time cryptocurrency price tracker with live chart updates using WebSockets. Built to handle streaming data and dynamic UI updates.",
    stack: ["React", "TypeScript", "Socket.io"],
    highlights: [
      "Real-time data streaming with WebSockets",
      "Dynamic chart rendering",
      "Full-stack data flow handling",
    ],
    linkLabel: "Source Code →",
    status: "Archived",
  },
  {
    name: "Echology",
    subtitle: "Bitcoin UTXO Analysis Tool",
    href: "https://github.com/evanlinjin/echology",
    file: "assets/echology.png",
    description:
      "A research-focused Bitcoin wallet interface visualizing coin selection and UTXO behavior using Bitcoin Dev Kit (BDK), enabling exploration of fee modeling and transaction strategies.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Visualized UTXO-level behavior",
      "Explored coin selection algorithms",
      "Built for Bitcoin research workflows",
    ],
    linkLabel: "Source Code →",
    status: "Archived",
  },
];