<script lang="ts">
  import "../app.css";
  import { Drawer, initializeStores } from "@skeletonlabs/skeleton";
  import { AppShell } from "../lib/components/layout";
  import { tabs } from "$lib/menuTabs";

  initializeStores();
</script>

<Drawer
  position="right"
  bgDrawer="backdrop-blur-md bg-white/20"
  rounded="rounded-l-2xl"
  width="w-[280px]"
>
  <div class="w-full p-10 flex items-start gap-4 flex-col">
    {#each tabs as tab}
      <a
        href={tab.link}
        class="duration-200 text-[var(--text-color)] toggle_hover_font_color hover:line-through"
      >
        <p>{tab.name}</p>
      </a>
    {/each}
  </div>
</Drawer>
<AppShell>
  <slot />
</AppShell>
