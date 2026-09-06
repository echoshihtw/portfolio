<!-- A sketch, not a chart. There is no data series behind the curve, and
     the caption under it says so. What is real are the two dates on the
     axis: where Clio's records start and when it went into daily use. Drawn
     in the page's own tokens so it follows the theme. Decorative to a
     screen reader; the caption carries the facts. -->
<svg
  class="diagram"
  viewBox="0 0 320 240"
  role="img"
  aria-hidden="true"
  focusable="false"
>
  <defs>
    <pattern
      id="hero-grid"
      width="20"
      height="20"
      patternUnits="userSpaceOnUse"
    >
      <path
        d="M20 0H0V20"
        fill="none"
        stroke="currentColor"
        stroke-opacity="0.16"
        stroke-width="1"
      />
    </pattern>
  </defs>

  <!-- Graph paper -->
  <rect
    x="0.5"
    y="0.5"
    width="319"
    height="239"
    rx="11"
    fill="var(--surface)"
    stroke="var(--border)"
  />
  <rect
    x="1"
    y="1"
    width="318"
    height="238"
    rx="11"
    fill="url(#hero-grid)"
  />

  <!-- Axis annotations -->
  <text
    x="22"
    y="212"
    class="tick"
  >
    Sep 2024
  </text>
  <text
    x="286"
    y="54"
    class="tick"
  >
    1
  </text>
  <text
    x="298"
    y="212"
    class="tick"
    text-anchor="end"
  >
    now
  </text>

  <!-- Exponential: flat for most of the run, then steep. The ship marker
       sits low on it on purpose; the rise comes after. -->
  <path
    d="M40 196 C200 196 278 160 292 56"
    fill="none"
    stroke="var(--primary)"
    stroke-width="2"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <!-- Where it shipped -->
  <line
    x1="145"
    y1="44"
    x2="145"
    y2="200"
    stroke="var(--border)"
    stroke-dasharray="3 5"
  />
  <text
    x="151"
    y="48"
    class="tick"
  >
    May 2025
  </text>

  <!-- Markers -->
  <rect
    x="36"
    y="192"
    width="8"
    height="8"
    fill="var(--ink)"
  />
  <circle
    cx="145"
    cy="189"
    r="5"
    fill="var(--highlight)"
    stroke="var(--ink)"
    stroke-width="1.5"
  />
  <circle
    cx="292"
    cy="56"
    r="5.5"
    fill="var(--accent)"
  />
</svg>

<style>
  .diagram {
    display: block;
    width: 100%;
    height: auto;
    color: var(--ink);
  }

  .tick {
    font-family: var(--font-mono);
    font-size: 11px;
    fill: var(--muted);
  }
</style>
