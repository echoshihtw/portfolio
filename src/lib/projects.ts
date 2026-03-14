import type { Projects } from "$lib/types/types";

export const projects: Projects = [
  {
    name: "Cosmora",
    subtitle: "Offline-First Salon Operating System",
    description:
      "Offline-first desktop operating system for salon businesses, focused on privacy-first workflows for independent stylists.",
    // TODO: Replace this placeholder with the final production Cosmora URL.
    href: "https://cosmora.vercel.app",
    stack: ["Tauri", "React", "TypeScript", "SQLite", "Offline-First", "Privacy-First"],
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
    href: "https://github.com/echoshihtw/crypto-price-ticker",
    name: "Crypto Price Ticker",
    file: "assets/crypto-price-ticker.png",
    description:
      "Full stack realtime cryptocurrency price chart built with React, TypeScript, and Socket.io.",
    stack: ["React", "TypeScript", "Socket.io"],
    linkLabel: "Source Code →",
    status: "Live",
  },
  {
    href: "https://github.com/evanlinjin/echology",
    name: "Ecology",
    file: "assets/echology.png",
    description:
      "Regtest custodial web wallet that showcases Bitcoin Dev Kit (BDK) coin selection and spend-scenario exploration.",
    stack: ["Next.js", "Tailwind CSS"],
    linkLabel: "Source Code →",
    status: "Live",
  },
];
