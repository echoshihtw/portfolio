<script lang="ts">
  import { base } from "$app/paths";
  import { aboutMeConfig } from "../../../content/aboutMe.config";
  import { closingConfig } from "../../../content/portfolio.config";
  import SectionHead from "$lib/components/SectionHead.svelte";
  import Portrait from "$lib/components/Portrait.svelte";
  import { trackEmail, trackResume } from "$lib/analytics";

  const mailto = (subject: string) =>
    `mailto:${closingConfig.email}?subject=${encodeURIComponent(subject)}`;
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

    <!-- The fork at the end: a role, or a project. Two flat cards of equal
         width, hiring first and carrying the résumé. Each card's email
         states its own subject, so the intent is visible before the message
         is opened. "Book a call" left with the old single action; Calendly
         is in the footer. -->
    <div class="paths-block">
      <h3
        class="paths-title"
        id="paths-title"
      >
        {closingConfig.heading}
      </h3>
      <ul
        class="paths"
        aria-labelledby="paths-title"
      >
        {#each closingConfig.paths as path, i}
          <li
            class="path card"
            class:corner-br={i === 1}
          >
            <p class="label">{path.kicker}</p>
            <h4 class="path-title">{path.title}</h4>
            <p class="path-copy">{path.copy}</p>
            <div class="path-actions">
              <a
                class="btn"
                href={mailto(path.subject)}
                on:click={() =>
                  trackEmail(
                    path.key === "role" ? "about-role" : "about-project"
                  )}
              >
                {path.action}
                <span
                  class="cta-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
              {#if "resume" in path.secondary}
                <a
                  class="link-cta"
                  href="{base}/{closingConfig.resume}"
                  download
                  on:click={() => trackResume("about")}
                >
                  {path.secondary.label}
                </a>
              {:else}
                <a
                  class="link-cta"
                  href={path.secondary.href}
                >
                  {path.secondary.label}
                </a>
              {/if}
            </div>
          </li>
        {/each}
      </ul>
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

  /* The close. Its own rule above it, so it reads as the end of the page
     rather than more of the story. */
  .paths-block {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    margin-top: var(--space-7);
    padding-top: var(--space-6);
    border-top: var(--border-w) solid var(--border);
  }

  .paths-title {
    margin: 0;
    font-size: var(--text-lg);
    line-height: var(--leading-snug);
  }

  .paths {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-4);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* The same card as everywhere else on the page. The second takes the one
     big corner the site gives a closing block; no colour, no illustration. */
  .path {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-5);
  }

  .path .label {
    margin: 0;
  }

  .path-title {
    margin: 0;
    font-size: var(--text-lg);
    line-height: var(--leading-snug);
  }

  .path-copy {
    margin: 0;
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--muted);
    max-width: 44ch;
  }

  /* Pushed to the bottom so the two cards' actions sit level however long
     the copy above them runs. */
  .path-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3) var(--space-5);
    margin-top: auto;
    padding-top: var(--space-2);
  }

  @media (min-width: 900px) {
    .body {
      grid-template-columns: 7rem minmax(0, 1fr);
      gap: var(--space-6);
    }
    .paths {
      grid-template-columns: repeat(2, minmax(0, 1fr));
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
