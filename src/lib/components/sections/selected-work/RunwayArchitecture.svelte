<!-- Runway's real shape, drawn from each package's pubspec: a pure domain in
     the middle, adapters plugged in around it, and the app wiring them. Kept
     to six boxes so it stays true as features come and go. -->
<figure class="arch">
  <p class="vh">
    The app is built around a pure domain holding the rules and their
    interfaces. Presentation and application depend on it; data implements its
    interfaces with Drift and SQLCipher; platform adapters for RevenueCat,
    Firebase and notifications implement the application interfaces; only the
    app knows the real adapters. Presentation importing data fails CI.
  </p>
  <svg
    class="wide"
    viewBox="0 0 400 236"
    role="img"
    aria-hidden="true"
  >
    <defs>
      <marker
        id="a"
        viewBox="0 0 8 8"
        refX="7"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto"
      >
        <path
          d="M0 0L8 4L0 8z"
          fill="currentColor"
          class="head"
        />
      </marker>
      <marker
        id="ax"
        viewBox="0 0 8 8"
        refX="7"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto"
      >
        <path
          d="M0 0L8 4L0 8z"
          fill="currentColor"
          class="headx"
        />
      </marker>
    </defs>
    <rect
      class="root"
      x="4"
      y="4"
      width="392"
      height="228"
      rx="14"
    />
    <text
      class="rootl"
      x="16"
      y="20"
    >
      app · wires the real adapters in
    </text>
    <g class="n">
      <rect
        x="14.0"
        y="46.0"
        width="128"
        height="36"
        rx="8"
      />
      <text
        x="78"
        y="61"
      >
        presentation
      </text>
      <text
        class="sub"
        x="78"
        y="75"
      >
        the screens
      </text>
    </g>
    <g class="n">
      <rect
        x="14.0"
        y="158.0"
        width="128"
        height="36"
        rx="8"
      />
      <text
        x="78"
        y="173"
      >
        application
      </text>
      <text
        class="sub"
        x="78"
        y="187"
      >
        providers · ports
      </text>
    </g>
    <g class="n">
      <rect
        x="258.0"
        y="46.0"
        width="128"
        height="36"
        rx="8"
      />
      <text
        x="322"
        y="61"
      >
        data
      </text>
      <text
        class="sub"
        x="322"
        y="75"
      >
        Drift + SQLCipher
      </text>
    </g>
    <g class="n">
      <rect
        x="258.0"
        y="158.0"
        width="128"
        height="36"
        rx="8"
      />
      <text
        x="322"
        y="173"
      >
        platform adapters
      </text>
      <text
        class="sub"
        x="322"
        y="187"
      >
        in app
      </text>
    </g>
    <g class="n core">
      <circle
        cx="200"
        cy="120"
        r="50"
      />
      <text
        x="200"
        y="117"
      >
        domain
      </text>
      <text
        class="sub"
        x="200"
        y="131"
      >
        rules · ports
      </text>
    </g>
    <line
      class="e"
      x1="78"
      y1="82"
      x2="78"
      y2="156"
      marker-end="url(#a)"
    />
    <line
      class="e"
      x1="142"
      y1="76"
      x2="160"
      y2="92"
      marker-end="url(#a)"
    />
    <line
      class="e"
      x1="142"
      y1="166"
      x2="160"
      y2="150"
      marker-end="url(#a)"
    />
    <line
      class="e"
      x1="258"
      y1="76"
      x2="240"
      y2="92"
      marker-end="url(#a)"
    />
    <line
      class="e"
      x1="258"
      y1="182"
      x2="144"
      y2="182"
      marker-end="url(#a)"
    />
    <line
      class="e x"
      x1="142"
      y1="52"
      x2="256"
      y2="52"
      marker-end="url(#ax)"
    />
    <text
      class="xl"
      x="200"
      y="45"
    >
      ✕ fails CI
    </text>
    <text
      class="cap"
      x="200"
      y="222"
    >
      arrows point to what each part depends on
    </text>
  </svg>
  <svg
    class="tall"
    viewBox="0 0 320 264"
    role="img"
    aria-hidden="true"
  >
    <defs>
      <marker
        id="a2"
        viewBox="0 0 8 8"
        refX="7"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto"
      >
        <path
          d="M0 0L8 4L0 8z"
          fill="currentColor"
          class="head"
        />
      </marker>
      <marker
        id="ax2"
        viewBox="0 0 8 8"
        refX="7"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto"
      >
        <path
          d="M0 0L8 4L0 8z"
          fill="currentColor"
          class="headx"
        />
      </marker>
    </defs>
    <rect
      class="root"
      x="4"
      y="4"
      width="312"
      height="256"
      rx="14"
    />
    <text
      class="rootl"
      x="16"
      y="22"
    >
      app · wires adapters in
    </text>
    <g class="n">
      <rect
        x="14"
        y="36"
        width="136"
        height="36"
        rx="8"
      />
      <text
        x="82"
        y="51"
      >
        presentation
      </text>
      <text
        class="sub"
        x="82"
        y="65"
      >
        the screens
      </text>
    </g>
    <g class="n">
      <rect
        x="170"
        y="36"
        width="136"
        height="36"
        rx="8"
      />
      <text
        x="238"
        y="51"
      >
        data
      </text>
      <text
        class="sub"
        x="238"
        y="65"
      >
        Drift + SQLCipher
      </text>
    </g>
    <g class="n core">
      <circle
        cx="160"
        cy="124"
        r="40"
      />
      <text
        x="160"
        y="121"
      >
        domain
      </text>
      <text
        class="sub"
        x="160"
        y="135"
      >
        rules · ports
      </text>
    </g>
    <g class="n">
      <rect
        x="14"
        y="176"
        width="136"
        height="36"
        rx="8"
      />
      <text
        x="82"
        y="191"
      >
        application
      </text>
      <text
        class="sub"
        x="82"
        y="205"
      >
        ports
      </text>
    </g>
    <g class="n">
      <rect
        x="170"
        y="176"
        width="136"
        height="36"
        rx="8"
      />
      <text
        x="238"
        y="191"
      >
        adapters
      </text>
      <text
        class="sub"
        x="238"
        y="205"
      >
        in app
      </text>
    </g>
    <line
      class="e"
      x1="120"
      y1="72"
      x2="133"
      y2="94"
      marker-end="url(#a2)"
    />
    <line
      class="e"
      x1="200"
      y1="72"
      x2="187"
      y2="94"
      marker-end="url(#a2)"
    />
    <line
      class="e"
      x1="120"
      y1="176"
      x2="133"
      y2="154"
      marker-end="url(#a2)"
    />
    <line
      class="e"
      x1="170"
      y1="194"
      x2="152"
      y2="194"
      marker-end="url(#a2)"
    />
    <line
      class="e"
      x1="40"
      y1="72"
      x2="40"
      y2="174"
      marker-end="url(#a2)"
    />
    <text
      class="xl"
      x="160"
      y="240"
    >
      presentation ✕ data fails CI
    </text>
  </svg>
</figure>

<style>
  .arch {
    margin: 0;
    width: 100%;
    display: grid;
    place-items: center;
  }
  svg {
    width: 100%;
    height: auto;
    overflow: visible;
  }
  .wide {
    max-width: 34rem;
  }
  .tall {
    display: none;
    max-width: 22rem;
  }
  /* On a narrow screen the tall one keeps its labels readable. */
  @media (max-width: 600px) {
    .wide {
      display: none;
    }
    .tall {
      display: block;
    }
  }
  .vh {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  .arch :global(.root) {
    fill: none;
    stroke: color-mix(in srgb, var(--runway-paper) 30%, transparent);
    stroke-dasharray: 4 3;
  }
  .arch :global(.rootl),
  .arch :global(.cap) {
    fill: color-mix(in srgb, var(--runway-paper) 60%, transparent);
    font: 10px var(--font-mono);
    letter-spacing: 0.04em;
  }
  .arch :global(.cap) {
    text-anchor: middle;
  }
  .arch :global(.n rect) {
    fill: var(--runway-field);
    stroke: color-mix(in srgb, var(--runway-paper) 35%, transparent);
  }
  .arch :global(.n text) {
    fill: var(--runway-paper);
    font: 11px var(--font-mono);
    text-anchor: middle;
  }
  .arch :global(.n .sub) {
    fill: color-mix(in srgb, var(--runway-paper) 60%, transparent);
    font-size: 9px;
  }
  .arch :global(.n circle) {
    fill: color-mix(in srgb, var(--runway-blue) 12%, transparent);
    stroke: var(--runway-blue);
  }
  .arch :global(.n.core text) {
    fill: var(--runway-blue);
  }
  .arch :global(.e) {
    stroke: color-mix(in srgb, var(--runway-paper) 45%, transparent);
    stroke-width: 1.2;
  }
  .arch :global(.e.x) {
    stroke: var(--runway-act);
    stroke-dasharray: 4 3;
  }
  .arch :global(.head) {
    fill: color-mix(in srgb, var(--runway-paper) 60%, transparent);
  }
  .arch :global(.headx) {
    fill: var(--runway-act);
  }
  .arch :global(.xl) {
    fill: var(--runway-act);
    font: 10px var(--font-mono);
    text-anchor: middle;
  }
</style>
