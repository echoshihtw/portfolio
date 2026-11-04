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
    viewBox="0 0 240 330"
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
      width="232"
      height="322"
      rx="14"
    />
    <text
      class="rootl"
      x="16"
      y="20"
    >
      app · wires adapters in
    </text>
    <g class="n">
      <rect
        x="12.0"
        y="34.0"
        width="104"
        height="36"
        rx="8"
      />
      <text
        x="64"
        y="49"
      >
        presentation
      </text>
      <text
        class="sub"
        x="64"
        y="63"
      >
        the screens
      </text>
    </g>
    <g class="n">
      <rect
        x="124.0"
        y="34.0"
        width="104"
        height="36"
        rx="8"
      />
      <text
        x="176"
        y="49"
      >
        data
      </text>
      <text
        class="sub"
        x="176"
        y="63"
      >
        Drift + SQLCipher
      </text>
    </g>
    <g class="n core">
      <circle
        cx="120"
        cy="150"
        r="46"
      />
      <text
        x="120"
        y="147"
      >
        domain
      </text>
      <text
        class="sub"
        x="120"
        y="161"
      >
        rules · ports
      </text>
    </g>
    <g class="n">
      <rect
        x="12.0"
        y="232.0"
        width="104"
        height="36"
        rx="8"
      />
      <text
        x="64"
        y="247"
      >
        application
      </text>
      <text
        class="sub"
        x="64"
        y="261"
      >
        ports
      </text>
    </g>
    <g class="n">
      <rect
        x="124.0"
        y="232.0"
        width="104"
        height="36"
        rx="8"
      />
      <text
        x="176"
        y="247"
      >
        adapters
      </text>
      <text
        class="sub"
        x="176"
        y="261"
      >
        in app
      </text>
    </g>
    <line
      class="e"
      x1="80"
      y1="70"
      x2="100"
      y2="108"
      marker-end="url(#a2)"
    />
    <line
      class="e"
      x1="160"
      y1="70"
      x2="140"
      y2="108"
      marker-end="url(#a2)"
    />
    <line
      class="e"
      x1="80"
      y1="232"
      x2="100"
      y2="192"
      marker-end="url(#a2)"
    />
    <line
      class="e"
      x1="126"
      y1="250"
      x2="118"
      y2="250"
      marker-end="url(#a2)"
    />
    <line
      class="e"
      x1="30"
      y1="70"
      x2="30"
      y2="232"
      marker-end="url(#a2)"
    />
    <text
      class="xl"
      x="120"
      y="300"
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
    max-width: 25rem;
  }
  .tall {
    display: none;
    max-width: 15rem;
  }
  /* Below 1100px the cards are a sideways strip, too narrow for the wide one. */
  @media (max-width: 1099px) {
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
