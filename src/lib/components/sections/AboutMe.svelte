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
      <div class="actions">
        <a
          class="cta mono"
          href="{base}{aboutMeConfig.cta.href}"
        >
          {aboutMeConfig.cta.label}
          <span aria-hidden="true">→</span>
        </a>

        <ul class="jumps mono">
          {#each aboutMeConfig.jumps as jump}
            <li><a href={jump.href}>{jump.label}</a></li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</section>

<style>
  /* One hairline, above. Two rules turn a section into a banded widget that
     reads as an insert rather than as part of the page. */
  .aboutme {
    border-top: 1px solid var(--section-border);
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

  /* One action and an index, not four peers. The button is the only thing
     in this section that leaves the page; the three below it are further
     down this one, so they are text and it is not. */
  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.9rem 1.4rem;
    margin-top: 0.5rem;
  }

  .cta {
    border: 1px solid var(--color-accent);
    border-radius: 999px;
    padding: 0.55rem 1.15rem;
    color: var(--text-color);
    text-decoration: none;
    white-space: nowrap;
  }

  .cta:hover {
    background: color-mix(in srgb, var(--color-accent) 10%, transparent);
  }

  .jumps {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 0.72rem;
    letter-spacing: 0.06em;
  }

  .jumps a {
    color: var(--text-muted);
    text-decoration: none;
    padding-bottom: 2px;
    border-bottom: 1px solid transparent;
  }

  .jumps a:hover,
  .jumps a:focus-visible {
    color: var(--text-color);
    border-bottom-color: var(--color-accent);
  }
</style>
