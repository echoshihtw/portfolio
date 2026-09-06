<script lang="ts">
  import { askForConfig } from "../../../content/askFor.config";
</script>

<!-- Directly above the contact block, because it is for people who are about
     to reach out: the last thing read before the email address. -->
<section
  id="ask"
  class="section_padding section_layout"
>
  <h2
    class="section_title"
    id="ask-title"
    style="--label-tint: color-mix(in srgb, #7d3320 24%, var(--color-bg))"
  >
    What people ask me for
  </h2>

  <ul
    class="cards"
    aria-labelledby="ask-title"
  >
    {#each askForConfig as item, i}
      <li class="card tone-{i % 5}">
        <p class="need">{item.need}</p>
        <p class="proof">{item.proof}</p>
      </li>
    {/each}
  </ul>
</section>

<style>
  /* Colour blocks, no borders.
  
     The fills come from Echo's own paintings rather than from a reference
     site: the indigo is the pasta painting's ground, the oxblood is the 2014
     lips, the green sits behind the profile portrait, the ochre is what the
     lips are painted on, and the blue is the seated figure's.
  
     Colour is doing categorical work here, which is the job it is good at:
     five different things, told apart at a glance. It was on the project
     cards for a while and competed with their content, because there the
     words ARE the argument.
  
     Each tone redefines the theme tokens inside the card, so the rules below
     never mention a card colour. */
  .card.tone-0 {
    --card-bg: #171233;
    --text-color: #eef0f5;
    --text-muted: #b8b8d4;
  }

  .card.tone-1 {
    --card-bg: #7d3320;
    --text-color: #f7efe6;
    --text-muted: #ddc6b6;
  }

  .card.tone-2 {
    --card-bg: #22402d;
    --text-color: #eef3ee;
    --text-muted: #bed1c0;
  }

  .card.tone-3 {
    --card-bg: #e2b657;
    --text-color: #14122a;
    --text-muted: #4a3f2a;
  }

  .card.tone-4 {
    --card-bg: #b9cfe6;
    --text-color: #14122a;
    --text-muted: #3c4a5a;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(17rem, 100%), 1fr));
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .card {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 1.3rem 1.35rem 1.4rem;
    border-radius: var(--radius-md);
    background: var(--card-bg);
    color: var(--text-color);
  }

  /* The same arc the project cards used to carry: a large soft circle parked
     mostly outside the top-right corner, so what shows is one clean curve
     rather than a gradient fading out. Nothing hovers here, these are not
     controls, so it sits still. */
  .card::before {
    content: "";
    position: absolute;
    top: -55%;
    right: -35%;
    width: 115%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: rgb(255 255 255 / 0.07);
    pointer-events: none;
  }

  .card > :global(*) {
    position: relative;
  }

  .need {
    margin: 0;
    font-family: "DM Serif Display", serif;
    font-size: 1.2rem;
    line-height: 1.18;
    color: var(--text-color);
  }

  .proof {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.6;
    color: var(--text-muted);
  }
</style>
