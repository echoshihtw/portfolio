<script lang="ts">
  import { base } from "$app/paths";
  import { aboutMeConfig } from "../../../content/aboutMe.config";
  import { closingConfig } from "../../../content/portfolio.config";
  import SectionHead from "$lib/components/SectionHead.svelte";
  import Portrait from "$lib/components/Portrait.svelte";
  import { trackEmail, trackResume } from "$lib/analytics";

  const mailto = (subject: string) =>
    `mailto:${closingConfig.email}?subject=${encodeURIComponent(subject)}`;

  // One corner of a card opens up while it is hovered, and which corner is
  // drawn fresh each time, so the pair never settles into a fixed shape.
  // The previous pick is excluded, or a repeat would read as nothing
  // happening. Kept in the script rather than done with :nth-child so the
  // choice can actually be random; CSS has no way to pick one.
  const CORNERS = ["tl", "tr", "br", "bl"] as const;
  type Corner = (typeof CORNERS)[number];

  let openCorner: (Corner | null)[] = [null, null];

  function openRandomCorner(index: number) {
    const choices = CORNERS.filter((corner) => corner !== openCorner[index]);
    openCorner[index] = choices[Math.floor(Math.random() * choices.length)];
  }
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
          <!-- pointerenter, not mouseenter: it carries the pointer type, so
               a tap does not pick a corner the finger cannot then see
               change. Focus picks one too, so the keyboard gets the same
               card as the mouse. -->
          <li
            class="path card"
            class:path-project={path.key === "project"}
            data-corner={openCorner[i]}
            on:pointerenter={(event) =>
              event.pointerType === "mouse" && openRandomCorner(i)}
            on:focusin={() => openRandomCorner(i)}
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

  /* One radius on all four corners, so the two cards line up at rest. The
     second briefly took the site's .corner-br utility, which sets one big
     corner by zeroing the other three, and the pair read as two different
     shapes. The big corner is worth having, though, so it moved to hover:
     one corner opens to --radius-lg, the site's own large corner, and the
     script above picks which one each time.

     Two colours, from the pair the palette already has: blue, which on
     this site means "you can click this", and the orange-red that gets one
     editorial moment a page. Here they tell the two doors apart, card,
     label and button. The tint is 8% of the surface so the cards stay flat
     and quiet, and the label and button carry the colour where it is a
     word or a control rather than a field. Both tokens are defined in each
     theme, so the pair holds in light and dark, and every foreground below
     was measured against its own background rather than eyeballed. */
  .path {
    --tint: var(--primary);
    --tint-text: var(--primary);
    --corner-tl: var(--radius-md);
    --corner-tr: var(--radius-md);
    --corner-br: var(--radius-md);
    --corner-bl: var(--radius-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-5);
    border-radius: var(--corner-tl) var(--corner-tr) var(--corner-br)
      var(--corner-bl);
    background: color-mix(in srgb, var(--tint) 8%, var(--surface));
    border-color: color-mix(in srgb, var(--tint) 30%, var(--border));
    transition:
      border-radius 300ms var(--ease-out),
      border-color var(--dur-fast) ease;
  }

  /* Four one-line rules rather than four whole border-radius shorthands:
     only the chosen corner changes, and the other three keep whatever the
     card already has. :focus-within is here with :hover so tabbing into a
     card's button opens a corner the same way. */
  .path[data-corner="tl"]:hover,
  .path[data-corner="tl"]:focus-within {
    --corner-tl: var(--radius-lg);
  }

  .path[data-corner="tr"]:hover,
  .path[data-corner="tr"]:focus-within {
    --corner-tr: var(--radius-lg);
  }

  .path[data-corner="br"]:hover,
  .path[data-corner="br"]:focus-within {
    --corner-br: var(--radius-lg);
  }

  .path[data-corner="bl"]:hover,
  .path[data-corner="bl"]:focus-within {
    --corner-bl: var(--radius-lg);
  }

  /* The shape still changes, it just stops travelling there. */
  @media (prefers-reduced-motion: reduce) {
    .path {
      transition: none;
    }
  }

  /* --accent-text, not --accent: the fill orange is 2.9:1 on cream, under
     what type needs, and the palette keeps a darker one for words. Even
     that one is only 3.56:1 on this card's tinted ground, so it is taken
     three quarters of the way to the ink: 5.3:1 in light, 7.1:1 in dark.
     Mixing toward --ink darkens on the light theme and lightens on the
     dark one, which is the direction each needs. */
  .path-project {
    --tint: var(--accent);
    --tint-text: color-mix(in srgb, var(--accent-text) 75%, var(--ink));
  }

  .path .label {
    margin: 0;
    color: var(--tint-text);
  }

  /* The project button in the accent, matching its card. Its ink is the
     one literal in this file: --primary-ink is white in the light theme
     and near-black in the dark one, but the accent fill is light in both,
     so the text on it has to be dark in both. 5.4:1 in light, 7.2:1 in
     dark, and the two mixes below keep it above 4.5:1 while pressed.
     Hover and active mirror .btn's own steps so the two buttons behave
     identically, only in different colours. */
  .path-project .btn {
    --accent-ink: #171714;
    border-color: var(--accent);
    background: var(--accent);
    color: var(--accent-ink);
  }

  .path-project .btn:hover,
  .path-project .btn:focus-visible {
    background: color-mix(in srgb, var(--accent-ink) 8%, var(--accent));
    border-color: color-mix(in srgb, var(--accent-ink) 8%, var(--accent));
  }

  .path-project .btn:active {
    background: color-mix(in srgb, var(--accent-ink) 12%, var(--accent));
  }

  /* The secondary link too, so the pair is consistent top to bottom. */
  .path-project .link-cta:hover,
  .path-project .link-cta:focus-visible {
    color: var(--tint-text);
    border-bottom-color: var(--tint-text);
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
