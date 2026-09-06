<script lang="ts">
  import { base } from "$app/paths";
  import { aboutMeConfig } from "../../../content/aboutMe.config";
  import { closingConfig } from "../../../content/portfolio.config";
  import { calendlyUrl } from "$lib/contactLinks";
</script>

<!-- The close, and the person, in one section. Home is where people arrive,
     so this is where they meet her, and it is the last thing before they
     are asked to get in touch. Keeps id="contact": the nav and the hero
     both point at it. -->
<section
  id="contact"
  class="aboutme section_padding section_band corner-tr"
  style="--band-bg: color-mix(in srgb, #e2b657 16%, var(--color-bg))"
>
  <div class="wrap">
    <div class="text">
      <p
        class="section_title"
        style="--label-tint: color-mix(in srgb, #e2b657 24%, var(--color-bg))"
      >
        {aboutMeConfig.kicker}
      </p>

      <!-- prettier-ignore -->
      <h2>{#each aboutMeConfig.heading as part}<span class:accent={part.accent}>{part.text}</span>{/each}</h2>

      {#each aboutMeConfig.story as paragraph}
        <p class="body">{paragraph}</p>
      {/each}

      <p class="ask">{closingConfig.body}</p>

      <div class="actions">
        <!-- A button says what happens, so "Email me" and not the address:
             the address is in the hero and the footer for anyone copying
             it. No résumé here: the hero's button and the nav both have it,
             and a third copy made this row the busiest thing on the page. -->
        <a
          class="btn"
          href="mailto:{closingConfig.email}"
        >
          Email me <span
            class="cta-arrow"
            aria-hidden="true"
          >
            →
          </span>
        </a>
        <a
          class="link-cta"
          href={calendlyUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Book a call <span
            class="cta-arrow"
            aria-hidden="true"
          >
            ↗
          </span>
        </a>
      </div>

      <!-- The one thing here that is not the ask, so it sits below it and
           quieter. -->
      <ul class="jumps mono">
        <li>
          <a href="{base}{aboutMeConfig.cta.href}">{aboutMeConfig.cta.label}</a>
        </li>
        {#each aboutMeConfig.jumps as jump}
          <li><a href={jump.href}>{jump.label}</a></li>
        {/each}
      </ul>
    </div>

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
  </div>
</section>

<style>
  .aboutme {
    padding-top: 3.5rem;
    padding-bottom: 3.5rem;
  }

  /* Text on the left, the photograph on the right, the reference's shape.
     She faces right in the picture, which means she now looks off the page
     rather than into her own name; the layout was asked for and that is the
     one thing it costs. */
  .wrap {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 2.4rem;
    max-width: 68rem;
    margin: 0 auto;
    align-items: center;
  }

  @media (min-width: 860px) {
    .aboutme {
      padding-top: 5rem;
      padding-bottom: 5rem;
    }

    .wrap {
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
      gap: 4rem;
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 0.95rem;
    min-width: 0;
  }

  /* Large serif, one weight, with the accent doing exactly one job: the
     full stop. Sized against the hero's headline, a step below it, so the
     page has one loudest voice and this is clearly the second. */
  .aboutme h2 {
    margin: 0.2rem 0 0.4rem;
    font-family: "DM Serif Display", serif;
    font-weight: 400;
    font-size: clamp(2.4rem, 5.6vw, 3.6rem);
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .aboutme h2 .accent {
    color: var(--color-accent);
  }

  .body,
  .ask {
    margin: 0;
    font-size: 1rem;
    line-height: 1.72;
    max-width: 58ch;
  }

  .ask {
    margin-top: 0.35rem;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.9rem 1.4rem;
    margin-top: 0.8rem;
  }

  /* One button, one link: .btn and .link-cta from app.css. The email is the
     conversion, so it is the filled pill. */
  .jumps {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0 1rem;
    margin: 0.2rem 0 0;
    padding: 0;
    list-style: none;
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    /* Further from the button than the button is from the text, so the row
       reads as a footnote to the section and not as more buttons. */
    margin-top: 1.1rem;
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
    border-bottom-color: var(--text-color);
  }

  .portrait {
    margin: 0;
    justify-self: center;
    max-width: 22rem;
    width: 100%;
  }

  @media (min-width: 860px) {
    .portrait {
      justify-self: end;
    }
  }

  .portrait img {
    display: block;
    width: 100%;
    height: auto;
    -webkit-user-drag: none;
    user-select: none;
  }
</style>
