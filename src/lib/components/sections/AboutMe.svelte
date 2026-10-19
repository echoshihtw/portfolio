<script lang="ts">
  import { base } from "$app/paths";
  import { aboutMeConfig } from "../../../content/aboutMe.config";
  import SectionHead from "$lib/components/SectionHead.svelte";
  import Portrait from "$lib/components/Portrait.svelte";
</script>

<!-- The person. Contact follows as its own section. -->
<section
  id="about"
  class="section_padding section_layout section_rule"
  aria-labelledby="about-title"
>
  <SectionHead
    number="05"
    title="Who I am"
    id="about-title"
  />

  <div class="body">
    <div class="wrap">
      <div class="text">
        <p class="just-me">
          Just me
          <span class="dot">.</span>
        </p>
        {#each aboutMeConfig.story as paragraph}
          <p class="story">{paragraph}</p>
        {/each}

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
          rest={aboutMeConfig.portrait.rest}
          morph={aboutMeConfig.portrait.morph}
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

  /* The section's real headline, set large: the row above only says where
     you are. */
  .just-me {
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

  .text {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-width: 0;
  }

  .story {
    margin: 0;
    font-size: var(--text-base);
    line-height: var(--leading-body);
    max-width: 58ch;
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
      /* The previous PNG carried 199 transparent rows above the hair and
         was pulled up by that much to sit level with the first line of the
         story. This one is opaque from its first row, so it sits where the
         grid puts it. */
    }
  }
</style>
