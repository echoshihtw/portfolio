<script lang="ts">
  import { base } from "$app/paths";
  import {
    derivativeName,
    paintingsConfig,
    WIDTHS,
    type Painting,
  } from "../../../../content/paintings.config";

  // The manifest is the wall: the opening photograph is a separate asset,
  // not an entry here, so nothing has to be filtered out.
  const works = paintingsConfig;

  // Every frame is the same 4:5, so the wall reads as one calm row of
  // shapes. Inside it, the painting fills the frame by how big the real
  // object is: a hand-sized card is not blown up to match a canvas. Three
  // buckets, not measurements, because nobody has measured them.
  const FILL: Record<Painting["scale"], string> = {
    canvas: "88%",
    paper: "80%",
    card: "58%",
  };

  const [small, large] = WIDTHS;
  const src = (id: string, width: number) =>
    `${base}/assets/paintings/${derivativeName(id, width)}`;

  // The medium first, then place and year where they are known.
  const details = (work: Painting) =>
    [work.place, work.year].filter(Boolean).join(", ");
</script>

<ul class="wall">
  {#each works as work (work.id)}
    <li>
      <figure>
        <a
          class="frame"
          href={src(work.id, large)}
        >
          <img
            src={src(work.id, small)}
            srcset="{src(work.id, small)} {small}w, {src(
              work.id,
              large
            )} {large}w"
            sizes="(min-width: 860px) 30vw, (min-width: 560px) 45vw, 90vw"
            alt={work.alt}
            style="max-width: {FILL[work.scale]}; max-height: {FILL[
              work.scale
            ]}"
            loading="lazy"
            decoding="async"
          />
        </a>
        <figcaption>
          <span class="medium">{work.medium}</span>
          {#if details(work)}
            <span class="details">{details(work)}</span>
          {/if}
        </figcaption>
      </figure>
    </li>
  {/each}
</ul>

<style>
  .wall {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-7) var(--space-6);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Two columns from a phone held sideways, so a frame fits one screen. */
  @media (min-width: 560px) {
    .wall {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 860px) {
    .wall {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  figure {
    margin: 0;
  }

  /* The soft wall each painting hangs on. The painting sits whole inside
     it, never cropped to fit the frame. */
  .frame {
    position: relative;
    display: block;
    aspect-ratio: 4 / 5;
    background: var(--surface);
  }

  .frame:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 4px;
  }

  .frame img {
    position: absolute;
    inset: 0;
    margin: auto;
    display: block;
    box-shadow: 0 3px 10px rgb(28 22 14 / 0.14);
  }

  figcaption {
    display: flex;
    flex-wrap: wrap;
    gap: 0 var(--space-3);
    margin-top: var(--space-3);
    font-size: var(--text-sm);
  }

  .medium {
    color: var(--ink);
  }

  .details {
    color: var(--muted);
  }
</style>
