// Maps a skill name to a simple-icons slug, for skills that have a
// recognizable logo. Concept/judgment entries (design systems, UI patterns,
// Responsive & accessible, etc.) intentionally have no icon — they render as
// plain text, same as before. Simple Icons render as a single currentColor
// path, so every logo picks up one accent tint instead of each tool's own
// brand color.
export const skillIcons: Record<string, string> = {
  React: "simple-icons:react",
  TypeScript: "simple-icons:typescript",
  "Next.js": "simple-icons:nextdotjs",
  "Tailwind CSS": "simple-icons:tailwindcss",
  MUI: "simple-icons:mui",
  Redux: "simple-icons:redux",
  SvelteKit: "simple-icons:svelte",
  "TanStack Query": "simple-icons:reactquery",
  Zustand: "simple-icons:zustand",
  FastAPI: "simple-icons:fastapi",
  Python: "simple-icons:python",
  "Node.js": "simple-icons:nodedotjs",
  Postgres: "simple-icons:postgresql",
  ArangoDB: "simple-icons:arangodb",
  Supabase: "simple-icons:supabase",
  RabbitMQ: "simple-icons:rabbitmq",
  SQLite: "simple-icons:sqlite",
  Docker: "simple-icons:docker",
  "GitHub Actions": "simple-icons:githubactions",
  AWS: "simple-icons:amazonaws",
  Vitest: "simple-icons:vitest",
  "React Testing Library": "simple-icons:testinglibrary",
  pytest: "simple-icons:pytest",
  "Claude Code": "simple-icons:anthropic",
  Flutter: "simple-icons:flutter",
  Dart: "simple-icons:dart",
  Riverpod: "simple-icons:riverpod",
  Tauri: "simple-icons:tauri",
  Electron: "simple-icons:electron",
};
