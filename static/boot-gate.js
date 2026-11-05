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
  } catch {
    seen = false;
  }

  // An introduction belongs at the front door. A visitor who lands on a post
  // or the gallery came for that page, so it is never in their way.
  // A link to a section (/#about) came for that section, so it skips it too.
  const home =
    (location.pathname === "/" || location.pathname === "/index.html") &&
    !location.hash;

  if (seen || !home) {
    gate.remove();
    return;
  }

  // The cover introduces the top of the page, so the page waits there: it
  // cannot scroll behind the cover, and a reload does not restore an old
  // position. Entering hands it back.
  history.scrollRestoration = "manual";
  scrollTo(0, 0);
  document.documentElement.style.overflow = "hidden";

  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    // Ignore storage failures, worst case the gate replays.
  }

  let dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    document.getElementById("app")?.removeAttribute("inert");
    scrollTo(0, 0);
    if (!carryTheDot()) {
      gate.classList.add("boot-gate-hide");
      setTimeout(() => {
        gate.remove();
        release();
      }, 420);
    }
  }

  // The page is handed back once the cover has gone, so the rest of the
  // flick that entered does not carry it away.
  function release() {
    document.documentElement.style.overflow = "";
    history.scrollRestoration = "auto";
    // The hero's one move waits for this, so the two never overlap.
    document.dispatchEvent(new Event("cover:gone"));
  }

  // The red full stop of the name is the one thing that stays: the cover
  // leaves, the dot travels to the full stop of "learn." and the headline
  // arrives around it as it lands. With Reduce Motion it is skipped, and the
  // cover goes at once.
  function carryTheDot() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    const dot = gate.querySelector(".gate-accent");
    const word = document.querySelector(".hero-headline .stop");
    const hero = document.getElementById("home");
    const from = fullStop(dot);
    const to = fullStop(word);
    if (!from || !to || !hero) return false;

    const style = getComputedStyle(dot);
    const flyer = document.createElement("span");
    flyer.textContent = ".";
    flyer.setAttribute("aria-hidden", "true");
    Object.assign(flyer.style, {
      position: "fixed",
      left: from.left + "px",
      top: from.top + "px",
      height: from.height + "px",
      lineHeight: from.height + "px",
      font: style.font,
      letterSpacing: style.letterSpacing,
      color: style.color,
      zIndex: "10000",
      pointerEvents: "none",
    });
    document.body.append(flyer);
    // Line boxes differ from glyph boxes, so set the copy exactly over the
    // original, then hide the original: one dot on screen, never two.
    const own = fullStop(flyer);
    flyer.style.left = from.left + (from.left - own.left) + "px";
    flyer.style.top = from.top + (from.top - own.top) + "px";
    const start = fullStop(flyer);
    const box = flyer.getBoundingClientRect();
    flyer.style.transformOrigin = `${start.left - box.left}px ${start.top - box.top}px`;
    dot.style.visibility = "hidden";

    // The site's motion scale, from app.css, with the cover's own fallbacks.
    const root = getComputedStyle(document.documentElement);
    const ms = (name, fallback) =>
      parseFloat(root.getPropertyValue(name)) || fallback;
    const short = ms("--motion-short", 150);
    const long = ms("--motion-long", 450);
    const base = ms("--motion-base", 250);
    const enter =
      root.getPropertyValue("--motion-enter").trim() ||
      "cubic-bezier(.05,.7,.1,1)";
    const exit =
      root.getPropertyValue("--motion-exit").trim() ||
      "cubic-bezier(.3,0,.8,.15)";

    const scale = to.height / start.height;
    const leave = {
      duration: short,
      easing: exit,
      fill: "forwards",
    };
    const arrive = {
      duration: long,
      delay: short,
      easing: enter,
      fill: "forwards",
    };
    hero.style.opacity = "0";
    gate.animate([{ opacity: 1 }, { opacity: 0 }], leave);
    flyer
      .animate(
        [
          { transform: "none" },
          {
            transform: `translate(${to.left - start.left}px, ${to.top - start.top}px) scale(${scale})`,
            color: getComputedStyle(word).color,
          },
        ],
        arrive
      )
      .finished.then(() => {
        hero
          .animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: base,
            easing: enter,
            fill: "forwards",
          })
          .finished.then(() => {
            hero.style.opacity = "";
            flyer.remove();
            release();
          });
        gate.remove();
      });
    return true;
  }

  // Where the "." of an element is drawn on screen.
  function fullStop(el) {
    if (!el) return null;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node,
      last = null;
    while ((node = walker.nextNode()))
      if (node.textContent.includes(".")) last = node;
    if (!last) return null;
    const i = last.textContent.lastIndexOf(".");
    const range = document.createRange();
    range.setStart(last, i);
    range.setEnd(last, i + 1);
    const r = range.getBoundingClientRect();
    return r.width ? r : null;
  }
  enterBtn.addEventListener("click", dismiss);
  // Scrolling, swiping up or a key that moves down the page also enters, so
  // the most natural move never meets a wall.
  gate.addEventListener("wheel", (e) => e.deltaY > 0 && dismiss(), {
    passive: true,
  });
  let touchY = null;
  gate.addEventListener("touchstart", (e) => (touchY = e.touches[0].clientY), {
    passive: true,
  });
  gate.addEventListener(
    "touchmove",
    (e) => touchY !== null && touchY - e.touches[0].clientY > 24 && dismiss(),
    { passive: true }
  );
  addEventListener("keydown", (e) => {
    if (
      ["ArrowDown", "PageDown", "End", " "].includes(e.key) &&
      !(e.target instanceof HTMLInputElement)
    )
      dismiss();
  });
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
      } catch {
        // Ignore storage failures, the toggle still works this visit.
      }
    });
  }
})();
