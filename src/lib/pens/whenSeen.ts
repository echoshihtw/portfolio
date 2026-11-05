// Calls `onSeen` once, when the element is fully on screen and clear of the
// bottom edge. Returns false, and calls nothing, with Reduce Motion: then the
// pen's ink is simply there.
export function whenSeen(
  el: Element,
  onSeen: () => void
): (() => void) | false {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const seen = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      onSeen();
      seen.disconnect();
    },
    { threshold: 1, rootMargin: "0px 0px -15% 0px" }
  );
  seen.observe(el);
  return () => seen.disconnect();
}
