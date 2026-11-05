<script lang="ts">
  import "../app.css";
  // Side-effect import: registers every icon the site uses, so
  // @iconify/svelte resolves them locally instead of fetching each one
  // from api.iconify.design on the visitor's machine.
  import "$lib/generated/icons";
  import { AppShell } from "../lib/components/layout";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";

  injectAnalytics();
</script>

<AppShell>
  <slot />
</AppShell>

<!-- The red pen's wobble, shared by every pen mark (Mark.svelte). -->
<svg
  class="pen-defs"
  width="0"
  height="0"
  aria-hidden="true"
>
  <filter
    id="pen-wobble"
    x="-5%"
    y="-20%"
    width="110%"
    height="140%"
  >
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.035"
      numOctaves="2"
      seed="7"
    />
    <feDisplacementMap
      in="SourceGraphic"
      scale="3"
    />
  </filter>
</svg>

<style>
  .pen-defs {
    position: absolute;
  }
</style>
