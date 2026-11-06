// WCAG 2 contrast ratio between two #rrggbb colours.
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// A see-through colour, rgb(r g b / a), laid over a #rrggbb ground, as the eye
// sees it: the hex a contrast check needs. A #rrggbb colour comes back as it is.
export function over(colour: string, ground: string): string {
  const m = colour.match(
    /^rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\d.]+)\s*\)$/
  );
  if (!m) return colour;
  const alpha = Number(m[4]);
  const back = [1, 3, 5].map((i) => parseInt(ground.slice(i, i + 2), 16));
  return (
    "#" +
    [m[1], m[2], m[3]]
      .map((v, i) =>
        Math.round(Number(v) * alpha + back[i] * (1 - alpha))
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  );
}
