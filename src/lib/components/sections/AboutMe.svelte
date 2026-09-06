<script lang="ts">
  import { base } from "$app/paths";
  import { aboutMeConfig } from "../../../content/aboutMe.config";
  import { closingConfig } from "../../../content/portfolio.config";
  import { calendlyUrl } from "$lib/contactLinks";
</script>

<!-- The close, and the person, in one section.
  
     These were two blocks in a row: who she is, then a separate "Want to
     talk?". Both are low-density and both are about the same moment, so
     stacking them made the page end twice. Merged, it reads as one arc: who
     this is, what she is good for, how to reach her.
  
     Keeps id="contact", because the nav, the hero and the floating pill all
     point at it. -->
<section
  id="contact"
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
      <p class="ask">{closingConfig.body}</p>

      <div class="actions">
        <a
          class="cta primary"
          href="mailto:{closingConfig.email}"
        >
          {closingConfig.email}
        </a>
        <a
          class="cta mono"
          href={calendlyUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Book a call <span aria-hidden="true">→</span>
        </a>
        <a
          class="cta mono"
          href="{base}/{closingConfig.resume}"
          download
        >
          Download résumé <span aria-hidden="true">↓</span>
        </a>
      </div>

      <!-- The one thing here that is not the ask, so it sits below it and
           quieter. Contact left the index: this section is #contact. -->
      <ul class="jumps mono">
        <li>
          <a href="{base}{aboutMeConfig.cta.href}">{aboutMeConfig.cta.label}</a>
        </li>
        {#each aboutMeConfig.jumps as jump}
          <li><a href={jump.href}>{jump.label}</a></li>
        {/each}
      </ul>
    </div>
  </div>
</section>

<style>
  /* Its own ground, not its own rule.
  
     The hero above says "I own it, end to end." and this says "Just me."
     Two large statements back to back compete, and the second was
     undercutting the first before any evidence had arrived. Separating them
     by surface rather than by shrinking one keeps both at full strength and
     makes this read as a different KIND of thing rather than a second
     headline.
  
     Full-bleed via a viewport-width trick, because the tint has to reach
     both edges or it reads as a card sitting on the page. */
  .aboutme {
    width: 100vw;
    margin-left: 50%;
    transform: translateX(-50%);
    background: var(--surface-bg);
    border-top: 1px solid var(--section-border);
    border-bottom: 1px solid var(--section-border);
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  @media (min-width: 860px) {
    .aboutme {
      padding-top: 4.5rem;
      padding-bottom: 4.5rem;
    }
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

  /* Deliberately below the hero's clamp(2.6rem, 7.5vw, 4.6rem). The hero
     stays the page's loudest voice; this one is close enough to feel like
     the same person speaking and quiet enough not to argue with it. */
  .aboutme h2 {
    margin: 0;
    font-size: clamp(1.9rem, 4.4vw, 2.9rem);
    line-height: 1.04;
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

  .ask {
    margin: 0.35rem 0 0;
    font-size: 1rem;
    line-height: 1.72;
    max-width: 60ch;
  }

  .cta {
    border: 1px solid var(--section-border);
    border-radius: 999px;
    padding: 0.55rem 1.15rem;
    color: var(--text-color);
    text-decoration: none;
    white-space: nowrap;
  }

  /* One primary among three: the email is the conversion, the other two are
     ways of putting it off. */
  .cta.primary {
    border-color: var(--color-accent);
  }

  .cta:hover {
    border-color: var(--color-accent);
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
