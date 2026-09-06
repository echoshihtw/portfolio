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

  // How wide a piece runs inside its column. Three buckets, not measurements:
  // nothing on the page may claim these are shown at their true relative
  // size, because nobody has measured them. What it does buy is that a
  // hand-sized card is not blown up to match a canvas.
  const WIDTH: Record<Painting["scale"], string> = {
    canvas: "100%",
    paper: "86%",
    card: "58%",
  };

  // One strip of tape each, cycling position so the wall never repeats a
  // pattern. Two strips per piece was tried and read as wrapped, not taped.
  const TAPE = ["tl", "tr", "tc"] as const;

  // A fixed cycle rather than Math.random: the wall has to look hung by hand
  // and has to render identically on the server and the client, or hydration
  // mismatches. Prime length, so it never lines up with the column count.
  const TILT = [-0.7, 1.4, 0.5, -1.1, 0.9, -0.4, 1.1];

  const [small, large] = WIDTHS;
</script>

<div class="wall">
  {#each works as work, i (work.id)}
    <figure
      class="work {work.scale}"
      style="width: {WIDTH[work.scale]}; --tilt: {TILT[i % TILT.length]}deg"
    >
      <span
        class="tape {TAPE[i % TAPE.length]}"
        aria-hidden="true"
      />
      <img
        src="{base}/assets/paintings/{derivativeName(work.id, small)}"
        srcset="{base}/assets/paintings/{derivativeName(
          work.id,
          small
        )} {small}w, {base}/assets/paintings/{derivativeName(
          work.id,
          large
        )} {large}w"
        sizes="(min-width: 1080px) 28vw, (min-width: 700px) 42vw, 88vw"
        alt={work.alt}
        draggable="false"
        loading="lazy"
        decoding="async"
      />
    </figure>
  {/each}
</div>

<style>
  /* CSS columns, not grid: a grid forces a common row height and there is no
     common aspect ratio here, so every piece would have to be cropped to fit.
     Columns let each keep its own proportion. Reading order runs down each
     column rather than across, which is right for a wall. */
  .wall {
    column-count: 1;
    column-gap: 2.6rem;
  }

  @media (min-width: 700px) {
    .wall {
      column-count: 2;
    }
  }

  @media (min-width: 1080px) {
    .wall {
      column-count: 3;
    }
  }

  .work {
    position: relative;
    break-inside: avoid;
    margin: 0 0 2.6rem;
    display: flex;
    flex-direction: column;
    transform: rotate(var(--tilt));
    transition: transform 240ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  /* Straightens under the cursor. The hover earns its place by reading as
     attention rather than by adding another shadow. */
  .work:hover,
  .work:focus-within {
    transform: rotate(0deg) translateY(-6px);
    z-index: 4;
  }

  .work img {
    display: block;
    width: 100%;
    height: auto;
    background: var(--surface-bg);
    /* Friction against casual copying, not protection: anything the browser
       draws can be screenshotted and these bytes are in the page. What this
       stops is dragging a picture to the desktop, which is most of it. */
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
    user-select: none;
  }

  /* Each kind is fixed to the wall the way it actually would be, so the
     shadow follows from the fixing rather than being a uniform card effect:
     a stretched canvas stands off the wall, taped paper sits almost flat. */
  .work.canvas img {
    box-shadow:
      0 14px 30px rgb(28 22 14 / 0.2),
      0 2px 5px rgb(28 22 14 / 0.14);
  }

  .work.paper img {
    box-shadow: 0 3px 9px rgb(28 22 14 / 0.15);
  }

  .work.card img {
    box-shadow: 0 8px 14px rgb(28 22 14 / 0.18);
  }

  /* Washi tape: translucent, so the work reads through it, with the two cut
     edges a shade darker than the body the way real tape looks. The angle
     comes off the piece's own tilt, so no two strips match. */
  .tape {
    position: absolute;
    top: -13px;
    width: 74px;
    height: 23px;
    z-index: 3;
    background: linear-gradient(
      180deg,
      rgb(252 251 245 / 0.74) 0%,
      rgb(244 240 228 / 0.62) 45%,
      rgb(236 231 215 / 0.66) 100%
    );
    border-left: 1px solid rgb(28 22 14 / 0.07);
    border-right: 1px solid rgb(28 22 14 / 0.07);
    box-shadow: 0 1px 3px rgb(28 22 14 / 0.13);
  }

  .tape.tl {
    left: -20px;
    transform: rotate(calc(-34deg - var(--tilt)));
  }

  .tape.tr {
    right: -20px;
    transform: rotate(calc(31deg - var(--tilt)));
  }

  /* A small work takes one strip across the top instead of a corner. */
  .tape.tc {
    left: 50%;
    width: 58px;
    margin-left: -29px;
    top: -11px;
    transform: rotate(calc(-2deg - var(--tilt)));
  }

  @media (prefers-reduced-motion: reduce) {
    .work {
      transform: none;
      transition: none;
    }

    .work:hover,
    .work:focus-within {
      transform: none;
    }

    .tape.tl,
    .tape.tr,
    .tape.tc {
      transform: none;
    }
  }
</style>
