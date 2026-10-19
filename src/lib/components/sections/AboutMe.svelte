<script lang="ts">
  import { base } from "$app/paths";
  import { aboutMeConfig } from "../../../content/aboutMe.config";
  import SectionHead from "$lib/components/SectionHead.svelte";
  import Portrait from "$lib/components/Portrait.svelte";
  import {
    derivativeName,
    paintingsConfig,
  } from "../../../content/paintings.config";

  const painting = paintingsConfig.find(
    (p) => p.id === aboutMeConfig.paintingId
  );
</script>

<!-- The person. Contact follows as its own section. -->
<section
  id="about"
  class="section_padding section_layout section_rule"
  aria-labelledby="about-title"
>
  <SectionHead
    number="04"
    title="Who I am"
    id="about-title"
  />

  <!-- Lead and notes (DESIGN.md): her portrait leads, her story beside it.
       One doodle, the sun by the heading, and one taped painting as the way
       to the gallery. -->
  <div class="wrap">
    <div class="portrait-slot">
      <Portrait
        src={aboutMeConfig.portrait.src}
        alt={aboutMeConfig.portrait.alt}
        width={aboutMeConfig.portrait.width}
        height={aboutMeConfig.portrait.height}
        rest={aboutMeConfig.portrait.rest}
        morph={aboutMeConfig.portrait.morph}
      />
    </div>

    <div class="text">
      <!-- prettier-ignore -->
      <p class="just-me">Just me<span class="dot">.</span>
        <img
          class="sun"
          src="{base}/assets/sun-doodle.webp"
          alt=""
          aria-hidden="true"
          width="360"
          height="339"
        />
      </p>
      {#each aboutMeConfig.story as paragraph}
        <p class="story">{paragraph}</p>
      {/each}

      {#if painting}
        <a
          class="painting"
          href="{base}{aboutMeConfig.cta.href}"
        >
          <span
            class="tape"
            aria-hidden="true"
          />
          <img
            src="{base}/assets/paintings/{derivativeName(painting.id, 640)}"
            alt={painting.alt}
            width={aboutMeConfig.paintingSize.width}
            height={aboutMeConfig.paintingSize.height}
            loading="lazy"
          />
          <span class="link-cta">{aboutMeConfig.cta.label} ↗</span>
        </a>
      {/if}
    </div>
  </div>
</section>

<style>
  section {
    max-width: var(--content-max);
    margin: 0 auto;
    width: 100%;
  }

  .wrap {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-6);
    align-items: start;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-width: 0;
  }

  /* The section's real headline, set large: the row above only says where
     you are. */
  .just-me {
    position: relative;
    align-self: flex-start;
    justify-self: start;
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.035em;
  }

  .just-me .dot {
    color: var(--primary);
  }

  /* Her sun, the section's one doodle, drawn in pencil beside the heading.
     Its strokes are lifted onto a clear ground, so it reads on paper and
     on the ink theme alike. */
  .sun {
    position: absolute;
    left: 100%;
    top: -1.4rem;
    width: 4.5rem;
    height: auto;
    margin-left: 0.6rem;
    transform: rotate(-10deg);
    pointer-events: none;
  }

  .story {
    margin: 0;
    max-width: 58ch;
    line-height: var(--leading-body);
  }

  /* One painting, taped in, as the way to the gallery. Paper stays paper
     in both themes. */
  .painting {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    align-self: flex-start;
    width: 11rem;
    margin-top: var(--space-3);
    padding: 0.5rem 0.5rem 0.75rem;
    background: #fffdf8;
    color: #1a1a1a;
    text-decoration: none;
    box-shadow:
      0 2px 0 rgba(0, 0, 0, 0.05),
      0 10px 22px rgba(60, 40, 10, 0.13);
    transform: rotate(-2deg);
  }

  .painting img {
    display: block;
    width: 100%;
    height: auto;
  }

  .painting .link-cta {
    align-self: flex-start;
    color: #1a1a1a;
  }

  .painting:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 4px;
  }

  .tape {
    position: absolute;
    z-index: 1;
    left: 35%;
    top: -0.6rem;
    width: 4.25rem;
    height: 1.1rem;
    transform: rotate(4deg);
    background: repeating-linear-gradient(
      45deg,
      rgba(143, 221, 170, 0.9) 0 8px,
      rgba(255, 255, 255, 0.85) 8px 16px
    );
  }

  /* Capped so the picture is present without being the section. The
     Portrait component leaves room for its own backing offset. */
  .portrait-slot {
    width: 100%;
    max-width: 20rem;
    justify-self: center;
  }

  /* On a phone the heading comes first, then the portrait, then the
     story (DESIGN.md, "On a phone"). */
  @media (max-width: 899.98px) {
    .text {
      display: contents;
    }

    .just-me {
      order: -1;
    }
  }

  @media (min-width: 900px) {
    .wrap {
      grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
      gap: var(--space-7);
    }

    .portrait-slot {
      max-width: 26rem;
    }
  }
</style>
