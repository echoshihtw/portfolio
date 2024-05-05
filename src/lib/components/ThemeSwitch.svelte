<script lang="ts">
  import { onMount } from "svelte";

  let darkMode = false;

  onMount(() => {
    if (document.documentElement.classList.contains("dark")) {
      darkMode = true;
      console.log("Dark mode is enabled");
      // Perform any action you need when dark mode is enabled
    } else {
      darkMode = false;
      console.log("Dark mode is not enabled");
      // Perform any action you need when dark mode is not enabled
    }
  });
  function handleSwitchDarkMode() {
    darkMode = !darkMode;
    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }
</script>

<div class="h-full grid items-center">
  <input
    type="checkbox"
    id="theme-toggle"
    class="hidden"
    on:click={handleSwitchDarkMode}
  />
  <label for="theme-toggle" />
</div>

<style lang="postcss">
  #theme-toggle {
    @apply invisible;
  }

  #theme-toggle + label {
    @apply inline-block cursor-pointer h-8 w-8  rounded-full duration-300 content-[''];
  }

  #theme-toggle:not(:checked) + label {
    @apply bg-amber-400;
  }

  #theme-toggle:checked + label {
    @apply bg-transparent;
    /*change the shape / color of the moon*/
    box-shadow: inset -10px -8px 1px 1px rgba(148, 163, 184, 0.4);
  }
</style>
