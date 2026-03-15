<script lang="ts">
  import { rawText } from "$lib/components/sections/hero/intro";

  const principles = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
</script>

<ul
  class="hero-principles"
  aria-label="Engineering focus areas"
>
  {#each principles as principle}
    <li>{principle}</li>
  {/each}
</ul>

<style>
  .hero-principles {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.32rem;
    max-width: 65ch;
  }

  .hero-principles li {
    position: relative;
    padding-left: 0.9rem;
    color: var(--text-muted);
    font-size: 0.97rem;
    line-height: 1.6;
  }

  .hero-principles li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.83em;
    width: 0.35rem;
    height: 0.35rem;
    border-radius: 999px;
    background: rgba(200, 169, 126, 0.8);
    transform: translateY(-50%);
  }
</style>
