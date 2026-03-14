import { writable } from "svelte/store";

const THEME_KEY = "echo-theme";
const LIGHT = "light";
const DARK = "dark";

function resolveInitialTheme() {
  if (typeof document === "undefined") {
    return LIGHT;
  }

  const fromDom = document.documentElement.dataset.theme;
  if (fromDom === LIGHT || fromDom === DARK) {
    return fromDom;
  }

  return LIGHT;
}

export const theme = writable(resolveInitialTheme());

/**
 * @param {string} nextTheme
 */
function applyTheme(nextTheme) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = nextTheme;
  document.documentElement.classList.toggle("dark", nextTheme === DARK);
}

export function initializeTheme() {
  if (typeof window === "undefined") {
    return;
  }

  /** @type {string} */
  let nextTheme = LIGHT;
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === LIGHT || stored === DARK) {
      nextTheme = stored;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      nextTheme = DARK;
    }
  } catch (_error) {
    // Ignore localStorage read failures.
  }

  theme.set(nextTheme);
  applyTheme(nextTheme);
}

export function toggleTheme() {
  theme.update((current) => (current === DARK ? LIGHT : DARK));
}

theme.subscribe((value) => {
  applyTheme(value);

  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(THEME_KEY, value);
  } catch (_error) {
    // Ignore localStorage write failures.
  }
});
