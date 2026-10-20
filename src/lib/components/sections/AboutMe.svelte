<script lang="ts">
  import { base } from "$app/paths";
  import { aboutMeConfig } from "../../../content/aboutMe.config";
  import SectionHead from "$lib/components/SectionHead.svelte";
</script>

<!-- The person. Contact follows as its own section. -->
<section
  id="about"
  class="section_padding section_layout section_smoke"
  aria-labelledby="about-title"
>
  <SectionHead
    number="04"
    title="Who I am"
    id="about-title"
  />

  <!-- Lead and notes: her portrait, her story beside it. -->
  <div class="wrap">
    <div class="portrait-slot">
      <img
        class="portrait"
        src="{base}/{aboutMeConfig.portrait.src}"
        alt={aboutMeConfig.portrait.alt}
        width={aboutMeConfig.portrait.width}
        height={aboutMeConfig.portrait.height}
        loading="lazy"
      />
    </div>

    <div class="text">
      <p class="just-me">Just me.</p>
      {#each aboutMeConfig.story as paragraph}
        <p class="story">{paragraph}</p>
      {/each}

      <a
        class="link-cta"
        href="{base}{aboutMeConfig.cta.href}"
      >
        {aboutMeConfig.cta.label}
        <span aria-hidden="true">↗</span>
      </a>
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

  .story {
    margin: 0;
    max-width: 58ch;
    line-height: var(--leading-body);
  }

  .portrait {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    border-radius: var(--radius-md);
  }

  /* Capped so the picture is present without being the section. */
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

    .portrait {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 4 / 5;
      object-fit: cover;
      border-radius: var(--radius-md);
    }

    .portrait-slot {
      max-width: 26rem;
    }
  }
</style>
