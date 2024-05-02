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
  width="w-[280px] md:w-[480px]"
>
  <div class="w-full pt-10 flex items-center gap-4 flex-col">
    {#each tabs as tab, index}
      <a
        href={tab.link}
        class="duration-200 text-white toggle_hover_font_color hover:line-through"
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
