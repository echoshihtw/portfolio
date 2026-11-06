// Calls `onSeen` once, when the element is fully on screen and clear of the
// bottom edge. Returns false, and calls nothing, with Reduce Motion: then the
// pen's ink is simply there.
//
// Marks that come into view together draw one after another in reading
// order, a beat apart, so the eye follows them instead of being pulled to
// several places at once.

type Waiting = { el: Element; onSeen: () => void };
let batch: Waiting[] = [];

function drawInOrder() {
  const due = batch.sort((a, b) =>
    a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING
      ? -1
      : 1
  );
  batch = [];
  const beat =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--motion-short"
      )
    ) || 150;
  due.forEach((w, i) => setTimeout(w.onSeen, i * beat));
}

export function whenSeen(
  el: Element,
  onSeen: () => void
): (() => void) | false {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const seen = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      seen.disconnect();
      if (batch.length === 0) requestAnimationFrame(drawInOrder);
      batch.push({ el, onSeen });
    },
    { threshold: 1, rootMargin: "0px 0px -15% 0px" }
  );
  seen.observe(el);
  return () => seen.disconnect();
}
