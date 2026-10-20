// A once-per-tab editorial cover before the homepage. It has no loading
// sequence: the visitor enters when ready, and can replay it from the footer.
(() => {
  const KEY = "echo-gate-seen";
  const gate = document.getElementById("boot-gate");
  const enterBtn = document.getElementById("boot-gate-enter");
  if (!gate || !enterBtn) return;

  let seen = false;
  try {
    seen = sessionStorage.getItem(KEY) === "1";
  } catch (_error) {
    seen = false;
  }

  if (seen) {
    gate.remove();
    return;
  }

  try {
    sessionStorage.setItem(KEY, "1");
  } catch (_error) {
    // Ignore storage failures, worst case the gate replays.
  }

  let dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    document.getElementById("app")?.removeAttribute("inert");
    gate.classList.add("boot-gate-hide");
    setTimeout(() => gate.remove(), 420);
  }
  enterBtn.addEventListener("click", dismiss);
  // The page behind is out of reach until the visitor enters, as a modal
  // dialog's would be. It is parsed after this script, so wait for it.
  document.addEventListener("DOMContentLoaded", () => {
    if (!dismissed) document.getElementById("app")?.setAttribute("inert", "");
  });
  // A modal dialog takes focus, so a keyboard or screen reader starts on it.
  enterBtn.focus();

  const themeToggle = document.getElementById("boot-gate-theme-toggle");
  const isLight = document.documentElement.dataset.theme === "light";

  if (themeToggle) {
    // Checked = dark, same convention as the real header ThemeSwitch.
    themeToggle.checked = !isLight;
    themeToggle.addEventListener("change", () => {
      const nextTheme = themeToggle.checked ? "dark" : "light";

      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      try {
        localStorage.setItem("echo-theme", nextTheme);
      } catch (_error) {
        // Ignore storage failures, the toggle still works this visit.
      }
    });
  }
})();
