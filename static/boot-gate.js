// A once-per-session fake front gate before the real homepage: dark mode
// gets a terminal boot sequence, light mode gets a name card being
// presented — each matching that theme's own register. Neither
// auto-dismisses; both wait for the visitor to click "Enter portfolio".
// Skipped on repeat visits within the tab session and entirely under
// prefers-reduced-motion.
(() => {
  const KEY = "echo-gate-seen";
  const gate = document.getElementById("boot-gate");
  const enterBtn = document.getElementById("boot-gate-enter");
  if (!gate || !enterBtn) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let seen = false;
  try {
    seen = sessionStorage.getItem(KEY) === "1";
  } catch (_error) {
    seen = false;
  }

  if (seen || reduceMotion) {
    gate.remove();
    return;
  }

  try {
    sessionStorage.setItem(KEY, "1");
  } catch (_error) {
    // Ignore storage failures — worst case the gate replays.
  }

  let dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    gate.classList.add("boot-gate-hide");
    setTimeout(() => gate.remove(), 420);
  }
  enterBtn.addEventListener("click", dismiss);

  const isLight = document.documentElement.dataset.theme === "light";

  if (isLight) {
    gate.dataset.variant = "card";
    const card = document.getElementById("boot-gate-card");
    card.hidden = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => card.classList.add("card-in"));
    });
    enterBtn.classList.add("enter-visible");
    return;
  }

  gate.dataset.variant = "terminal";
  const textEl = document.getElementById("boot-gate-text");
  const lines = [
    "booting echo.dev ...",
    "loading profile: Echo Shih — Software Engineer",
    "systems nominal",
    "access granted_",
  ];
  let lineIndex = 0;
  let charIndex = 0;
  let out = "";

  function render() {
    textEl.innerHTML = "";
    textEl.appendChild(document.createTextNode(out));
    const caret = document.createElement("span");
    caret.className = "caret";
    caret.textContent = " ";
    textEl.appendChild(caret);
  }

  function typeNext() {
    if (lineIndex >= lines.length) {
      enterBtn.classList.add("enter-visible");
      return;
    }
    const line = lines[lineIndex];
    if (charIndex < line.length) {
      out += line[charIndex];
      charIndex += 1;
      render();
      setTimeout(typeNext, 18);
    } else {
      out += "\n";
      charIndex = 0;
      lineIndex += 1;
      render();
      setTimeout(typeNext, 110);
    }
  }
  render();
  typeNext();
})();
