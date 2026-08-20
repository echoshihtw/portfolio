// Adds .sweep-in to an element the first time it scrolls into view, then
// disconnects — a one-shot signal-scan cue for section titles, not a
// repeating effect. No-ops under prefers-reduced-motion. Visual styling
// (and dark-mode-only gating via --glow-strength) lives in app.css.
export function sweepOnView(node: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return {};
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add("sweep-in");
        observer.disconnect();
      }
    },
    { threshold: 0.4 }
  );
  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
}
