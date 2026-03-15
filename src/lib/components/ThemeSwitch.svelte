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
  />
  <label
    for={id}
    class="theme-label"
    aria-label="Toggle theme"
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

  .theme-label {
    width: 1.9rem;
    height: 1.9rem;
    display: grid;
    place-items: center;
    border-radius: 999px;
    border: 1px solid var(--section-border);
    background: rgba(255, 255, 255, 0.45);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.42) inset,
      0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition:
      transform 160ms ease,
      border-color 160ms ease,
      background-color 160ms ease,
      box-shadow 160ms ease;
  }

  .theme-core {
    position: relative;
    width: 0.86rem;
    height: 0.86rem;
    border-radius: 999px;
    background: #f4c95f;
    box-shadow:
      0 0 0 3px rgba(244, 201, 95, 0.18),
      0 0 14px rgba(244, 201, 95, 0.24);
    transition:
      background-color 180ms ease,
      box-shadow 180ms ease,
      transform 180ms ease;
  }

  .theme-core::before,
  .theme-core::after {
    content: "";
    position: absolute;
    border-radius: 999px;
    transition:
      opacity 180ms ease,
      transform 180ms ease;
  }

  .theme-core::before {
    inset: -0.25rem;
    border: 1.5px solid rgba(244, 201, 95, 0.5);
    opacity: 0.9;
  }

  .theme-core::after {
    width: 0.88rem;
    height: 0.88rem;
    left: 0.28rem;
    top: -0.06rem;
    background: var(--section-border);
    opacity: 0;
    transform: scale(0.6);
  }

  .theme-label:hover {
    transform: translateY(-1px);
    border-color: var(--color-accent);
    background: rgba(255, 255, 255, 0.75);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.48) inset,
      0 6px 14px rgba(0, 0, 0, 0.1);
  }

  .theme-input:focus-visible + .theme-label {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .theme-input:checked + .theme-label {
    background: rgba(237, 236, 232, 0.08);
  }

  .theme-input:checked + .theme-label .theme-core {
    background: #d7e7fa;
    box-shadow:
      inset -0.16rem -0.08rem 0 rgba(145, 172, 205, 0.55),
      0 0 12px rgba(166, 198, 230, 0.24);
    transform: translateX(-0.04rem);
  }

  .theme-input:checked + .theme-label .theme-core::before {
    opacity: 0;
    transform: scale(0.7);
  }

  .theme-input:checked + .theme-label .theme-core::after {
    opacity: 1;
    transform: scale(1);
  }

  :global(html[data-theme="dark"]) .theme-label {
    background: rgba(237, 236, 232, 0.05);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.03) inset,
      0 2px 10px rgba(0, 0, 0, 0.24);
  }

  :global(html[data-theme="dark"]) .theme-label:hover {
    background: rgba(237, 236, 232, 0.1);
  }
</style>
