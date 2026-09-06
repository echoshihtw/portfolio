<script lang="ts">
  import { base } from "$app/paths";
  import { aboutMeConfig } from "../../../content/aboutMe.config";
</script>

<!-- Sits directly under the hero. Home is the landing page, so the person
     is introduced here rather than a click away: the hero above makes the
     professional case, and this says who made it. -->
<section
  id="about"
  class="aboutme section_padding"
>
  <div class="aboutme-wrap">
    <figure class="portrait">
      <img
        src="{base}/{aboutMeConfig.portrait.src}"
        alt={aboutMeConfig.portrait.alt}
        width={aboutMeConfig.portrait.width}
        height={aboutMeConfig.portrait.height}
        draggable="false"
        loading="lazy"
        decoding="async"
      />
    </figure>

    <div class="aboutme-text">
      <p class="kicker mono">{aboutMeConfig.kicker}</p>
      <!-- prettier-ignore -->
      <h2>{#each aboutMeConfig.heading as part}<span class:accent={part.accent} data-text={part.accent ? part.text : undefined}>{part.text}</span>{/each}</h2>
      {#each aboutMeConfig.story as paragraph}
        <p class="body">{paragraph}</p>
      {/each}
      <a
        class="cta mono"
        href="{base}{aboutMeConfig.cta.href}"
      >
        {aboutMeConfig.cta.label}
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </div>
</section>

<style>
  .aboutme {
    border-top: 1px solid var(--section-border);
    border-bottom: 1px solid var(--section-border);
  }

  /* An L, not two columns: the photograph holds the left and the text turns
     the corner around it. The photograph is on the left because she faces
     right in it, so here she looks into her own name rather than off the
     page. */
  .aboutme-wrap {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1.6rem 3rem;
    max-width: 68rem;
    margin: 0 auto;
  }

  @media (min-width: 860px) {
    .aboutme-wrap {
      grid-template-columns: 15rem minmax(0, 1fr);
      align-items: center;
    }
  }

  .portrait {
    margin: 0;
    max-width: 15rem;
  }

  .portrait img {
    display: block;
    width: 100%;
    height: auto;
    -webkit-user-drag: none;
    user-select: none;
  }

  .aboutme-text {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    min-width: 0;
  }

  .kicker {
    margin: 0;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 500;
    color: var(--color-accent);
  }

  .aboutme h2 {
    margin: 0;
    font-size: clamp(2.1rem, 5vw, 3.2rem);
    line-height: 1.02;
    letter-spacing: -0.02em;
  }

  /* The same treatment the hero gives its headline, so the two read as one
     page rather than two blocks that happen to be stacked. */
  .aboutme h2 .accent {
    position: relative;
    color: var(--color-accent);
    font-style: italic;
  }

  .body {
    margin: 0;
    font-size: 1rem;
    line-height: 1.72;
    max-width: 60ch;
  }

  .cta {
    align-self: flex-start;
    margin-top: 0.35rem;
    border: 1px solid var(--section-border);
    border-radius: 999px;
    padding: 0.55rem 1.1rem;
    color: var(--text-color);
    text-decoration: none;
  }
</style>
