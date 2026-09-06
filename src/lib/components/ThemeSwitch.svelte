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

<div class="theme-switch">
  <input
    type="checkbox"
    {id}
    checked={darkMode}
    class="theme-input"
    on:change={toggleTheme}
    aria-label="Toggle theme"
  />
  <!-- The name goes on the input, not this label. ARIA prohibits aria-label
       on a <label> with no role. -->
  <label
    for={id}
    class="theme-label chip"
  >
    <span class="theme-core" />
  </label>
</div>

<style>
  .theme-switch {
    display: grid;
    place-items: center;
  }

  .theme-input {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    opacity: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    white-space: nowrap;
  }

  /* A .chip from app.css, round. The core is a sun in the light theme and
     a moon in the ink one: the same disc, with a bite taken out of it. */
  .theme-label {
    width: 2.25rem;
    height: 2.25rem;
    min-width: 0;
    min-height: 0;
    border-radius: var(--radius-pill);
  }

  .theme-core {
    position: relative;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background: var(--highlight);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--highlight) 35%, transparent);
    transition:
      background-color var(--dur-fast) ease,
      box-shadow var(--dur-fast) ease;
  }

  .theme-core::after {
    content: "";
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    left: 0.26rem;
    top: -0.08rem;
    border-radius: 50%;
    background: var(--surface);
    opacity: 0;
    transform: scale(0.6);
    transition:
      opacity var(--dur-fast) ease,
      transform var(--dur-fast) ease;
  }

  .theme-input:focus-visible + .theme-label {
    outline: 2px solid var(--primary);
    outline-offset: 3px;
  }

  .theme-input:checked + .theme-label .theme-core {
    background: var(--ink);
    box-shadow: none;
  }

  .theme-input:checked + .theme-label .theme-core::after {
    opacity: 1;
    transform: scale(1);
  }
</style>
