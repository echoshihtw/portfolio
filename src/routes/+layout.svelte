<script lang="ts">
  import "../app.css";
  import { AppShell } from "../lib/components/layout";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";

  injectAnalytics();
</script>

<AppShell>
  <slot />
</AppShell>
