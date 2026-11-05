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

// app.html chooses the first theme before the page paints; this reads it.
export function initializeTheme() {
  if (typeof window === "undefined") {
    return;
  }
  theme.set(resolveInitialTheme());
}

// Only a flip of the switch is remembered, so until then the site keeps
// following the device's own setting.
export function toggleTheme() {
  theme.update((current) => {
    const next = current === DARK ? LIGHT : DARK;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Ignore localStorage write failures.
    }
    return next;
  });
}

theme.subscribe(applyTheme);
