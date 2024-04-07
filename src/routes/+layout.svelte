<script lang="ts">
  import "../app.css";
  import { Drawer, initializeStores } from "@skeletonlabs/skeleton";
  import { AppShell } from "../lib/components/layout";
  import { tabs } from "$lib/menuTabs";

  initializeStores();
</script>

<Drawer
  position="right"
  bgDrawer="bg-slate-200"
  rounded="rounded-l-2xl"
  width="w-[280px] md:w-[480px]"
>
  <div class="btn-group-vertical variant-filled w-full">
    {#each tabs as tab, index}
      <a
        href={tab.link}
        class="duration-200 toggle_hover_font_color"
        target={index === 3 ? "_blank" : ""}
      >
        <p>{tab.name}</p>
      </a>
    {/each}
  </div>
</Drawer>
<AppShell>
  <slot />
</AppShell>
