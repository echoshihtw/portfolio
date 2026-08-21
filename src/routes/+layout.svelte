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
