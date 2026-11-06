<script lang="ts">
  import { Doodle, Marked } from "$lib/pens";
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

  <!-- Her portrait, then her line and the four parts of her story beside it.
       The portrait takes 5 columns and the words 7, the one section where the
       lead is the narrower side (DESIGN.md). -->
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
      <h3 class="headline">
        <Marked
          text={aboutMeConfig.headline}
          phrase={aboutMeConfig.headlineMark.phrase}
          kind={aboutMeConfig.headlineMark.kind}
        />
      </h3>
      <dl class="parts">
        {#each aboutMeConfig.parts as part}
          <div>
            <dt class="label">
              {part.label}{#if "doodle" in part}<Doodle
                  icon={part.doodle}
                />{/if}
            </dt>
            <dd>
              <Marked
                text={part.text}
                phrase={"mark" in part ? part.mark.phrase : ""}
                kind={"mark" in part ? part.mark.kind : undefined}
              />
            </dd>
          </div>
        {/each}
      </dl>

      <a
        class="link-cta"
        href="{base}{aboutMeConfig.cta.href}"
      >
        {aboutMeConfig.cta.label}
        <!-- a page on this site: her pen arrow, not the external ↗ -->
        <Doodle
          icon="arrow"
          ink="currentColor"
        />
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

  .link-cta {
    align-self: flex-start;
    justify-self: start;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    min-width: 0;
  }

  /* Her own line, set large: the row above only says where you are. */
  .headline {
    margin: 0;
    max-width: 20ch;
    text-wrap: balance;
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 600;
    line-height: 1.12;
    letter-spacing: -0.025em;
  }

  /* Four parts, each a label and one idea, divided by a hairline. */
  .parts {
    margin: 0;
    display: grid;
  }

  .parts div {
    display: grid;
    gap: var(--space-1);
    padding: var(--space-4) 0;
    border-top: 1px solid var(--border);
  }

  .parts div:first-child {
    padding-top: 0;
    border-top: 0;
  }

  .parts dt {
    color: var(--muted);
  }

  .parts dd {
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

  .portrait-slot {
    width: 100%;
    max-width: 26rem;
    justify-self: start;
  }

  /* On a phone the portrait comes first, then her line and the parts. */
  @media (max-width: 899.98px) {
    .wrap {
      gap: var(--space-5);
    }
  }

  @media (min-width: 900px) {
    .wrap {
      grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
      gap: var(--space-7);
    }

    .portrait-slot {
      max-width: none;
    }
  }
</style>
