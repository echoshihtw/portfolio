<script lang="ts">
  import { base } from "$app/paths";
  import { aboutMeConfig } from "../../../content/aboutMe.config";
  import { closingConfig } from "../../../content/portfolio.config";
  import { calendlyUrl } from "$lib/contactLinks";
  import SectionHead from "$lib/components/SectionHead.svelte";
  import Portrait from "$lib/components/Portrait.svelte";
  import { trackEmail } from "$lib/analytics";
</script>

<!-- The close, and the person, in one section. Keeps id="contact": the nav
     and the hero both point at it. -->
<section
  id="contact"
  class="section_padding section_layout section_rule"
  aria-labelledby="contact-title"
>
  <SectionHead
    number="05"
    label="Who I am"
    title="Just me."
    id="contact-title"
  />

  <div class="body">
    <div class="wrap">
      <div class="text">
        {#each aboutMeConfig.story as paragraph}
          <p class="story">{paragraph}</p>
        {/each}

        <p class="ask">{closingConfig.body}</p>

        <div class="actions">
          <!-- A button says what happens. The address is in the hero and
               the footer for anyone copying it. -->
          <a
            class="btn"
            href="mailto:{closingConfig.email}"
            on:click={() => trackEmail("about")}
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

        <ul class="jumps">
          <li>
            <a
              class="link-cta"
              href="{base}{aboutMeConfig.cta.href}"
            >
              {aboutMeConfig.cta.label}
            </a>
          </li>
          {#each aboutMeConfig.jumps as jump}
            <li>
              <a
                class="link-cta"
                href={jump.href}
              >
                {jump.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <div class="portrait-slot">
        <Portrait
          src={aboutMeConfig.portrait.src}
          alt={aboutMeConfig.portrait.alt}
          width={aboutMeConfig.portrait.width}
          height={aboutMeConfig.portrait.height}
        />
      </div>
    </div>
  </div>
</section>

<style>
  section {
    max-width: var(--content-max);
    margin: 0 auto;
    width: 100%;
  }

  .body {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
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

  .story,
  .ask {
    margin: 0;
    font-size: var(--text-base);
    line-height: var(--leading-body);
    max-width: 58ch;
  }

  .ask {
    color: var(--muted);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3) var(--space-5);
    margin-top: var(--space-2);
  }

  /* Further from the button than the button is from the text, so the row
     reads as a footnote and not as more buttons. */
  .jumps {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-5);
    margin: var(--space-3) 0 0;
    padding: 0;
    list-style: none;
  }

  .jumps .link-cta {
    color: var(--muted);
    border-bottom-color: transparent;
  }

  .jumps .link-cta:hover,
  .jumps .link-cta:focus-visible {
    color: var(--primary);
    border-bottom-color: var(--primary);
  }

  /* Capped so the picture is present without being the section. The
     Portrait component leaves room for its own backing offset. */
  .portrait-slot {
    width: 100%;
    max-width: 22rem;
    justify-self: center;
  }

  @media (min-width: 900px) {
    .body {
      grid-template-columns: 7rem minmax(0, 1fr);
      gap: var(--space-6);
    }
    .body > * {
      grid-column: 2;
    }
    .wrap {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: var(--space-8);
    }
    .portrait-slot {
      max-width: 30rem;
      justify-self: end;
      align-self: start;
      /* The PNG carries 199 transparent rows above the hair, out of 1435.
         Pulling the box up by that much (199/1200 of the width, since a
         percentage margin resolves against width) puts the visible top of
         the silhouette level with the first line of the story. */
      margin-top: -16.6%;
    }
  }
</style>
