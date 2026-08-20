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

  const card = document.getElementById("boot-gate-card");
  const lineBootEl = document.getElementById("gate-line-boot");
  const lineProfileEl = document.getElementById("gate-line-profile");
  const lineSystemsEl = document.getElementById("gate-line-systems");
  const profileEl = document.getElementById("gate-profile");
  const themeToggle = document.getElementById("boot-gate-theme-toggle");

  // Each pre already reserves one line's height via line-height even
  // while empty, and the profile block's photo/name/role are always in
  // the DOM at full size (only opacity/transform animate) — so typing
  // into them and revealing the profile never shifts anything below.

  function typeLine(el, text) {
    return new Promise((resolve) => {
      let i = 0;
      function step() {
        el.innerHTML = "";
        el.appendChild(document.createTextNode(text.slice(0, i)));
        const caret = document.createElement("span");
        caret.className = "caret";
        caret.textContent = " ";
        el.appendChild(caret);
        if (i < text.length) {
          i += 1;
          setTimeout(step, 18);
        } else {
          setTimeout(resolve, 200);
        }
      }
      step();
    });
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function runTerminalSequence() {
    await typeLine(lineBootEl, "booting echo.dev ....");
    await typeLine(lineProfileEl, "loading profile:");
    profileEl.classList.add("profile-in");
    await wait(480);
    await typeLine(lineSystemsEl, "systems nominal.......");
    await wait(200);
    enterBtn.classList.add("enter-visible");
  }

  // Used both for the initial dark-mode load and for switching into the
  // terminal variant via the toggle after the light card was already
  // showing — in the latter case there's no reason to replay the typing
  // animation, so it jumps straight to the finished state.
  function showTerminalFinal() {
    lineBootEl.textContent = "booting echo.dev ....";
    lineProfileEl.textContent = "loading profile:";
    lineSystemsEl.textContent = "systems nominal.......";
    profileEl.classList.add("profile-in");
    enterBtn.classList.add("enter-visible");
  }

  function showCard() {
    card.hidden = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => card.classList.add("card-in"));
    });
    enterBtn.classList.add("enter-visible");
  }

  function enterDark() {
    gate.dataset.variant = "terminal";
  }

  function enterLight() {
    gate.dataset.variant = "card";
    showCard();
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const goingLight = gate.dataset.variant !== "card";
      const nextTheme = goingLight ? "light" : "dark";

      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      try {
        localStorage.setItem("echo-theme", nextTheme);
      } catch (_error) {
        // Ignore storage failures — the toggle still works this visit.
      }

      if (goingLight) {
        enterLight();
      } else {
        enterDark();
        showTerminalFinal();
      }
    });
  }

  const isLight = document.documentElement.dataset.theme === "light";

  if (isLight) {
    enterLight();
    return;
  }

  enterDark();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(runTerminalSequence);
  } else {
    runTerminalSequence();
  }
})();
