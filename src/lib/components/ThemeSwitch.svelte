<script lang="ts">
  import { onMount } from "svelte";
  import { initializeTheme, theme, toggleTheme } from "$lib/theme";
  export let id = "theme-toggle";

  let darkMode = false;

  onMount(() => {
    initializeTheme();
    const unsubscribe = theme.subscribe((currentTheme) => {
      darkMode = currentTheme === "dark";
    });

    return unsubscribe;
  });
</script>

<div class="h-full grid items-center">
  <input
    type="checkbox"
    {id}
    checked={darkMode}
    class="hidden"
    on:change={toggleTheme}
  />
  <label for={id} />
</div>

<style lang="postcss">
  #theme-toggle {
    @apply invisible;
  }

  #theme-toggle-desktop + label {
    @apply inline-block cursor-pointer h-8 w-8 rounded-full duration-300 content-[''];
  }
  #theme-toggle-mobile + label {
    @apply inline-block cursor-pointer h-8 w-8 rounded-full duration-300 content-[''];
  }

  #theme-toggle-desktop:not(:checked) + label {
    @apply bg-amber-400;
  }

  #theme-toggle-mobile:not(:checked) + label {
    @apply bg-amber-400;
  }

  #theme-toggle-desktop:checked + label {
    @apply bg-transparent;
    /*change the shape / color of the moon*/
    box-shadow: inset -10px -8px 1px 1px rgb(176, 217, 243);
    filter: drop-shadow(0 0 0.5rem rgb(69, 101, 221));
  }
  #theme-toggle-mobile:checked + label {
    @apply bg-transparent;
    /*change the shape / color of the moon*/
    box-shadow: inset -10px -8px 1px 1px rgba(148, 163, 184, 0.4);
  }
</style>
