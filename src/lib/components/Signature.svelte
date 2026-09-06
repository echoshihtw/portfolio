<script lang="ts">
  import { base } from "$app/paths";

  /**
   * Echo's hand, photographed on paper and keyed to an alpha mask by
   * `scripts/inkmask.swift`.
   *
   * It is a SIGNATURE, not a nameplate: the strokes overlap enough that the
   * E reads as a K and the last letters run together, so it is never used
   * where the name has to be readable. The typeset name stays wherever that
   * job needs doing.
   *
   * Pass label="" where the typeset name sits directly beside it, or a
   * screen reader announces the name twice.
   */
  export let label: string = "Echo Shih";
</script>

<div
  class="signature"
  style="--sig: url('{base}/assets/signature.png')"
  role="img"
  aria-label={label || undefined}
  aria-hidden={label ? undefined : "true"}
/>

<style>
  /* Drawn as a mask rather than an <img>, so the ink takes the page's own
     text colour. One asset works in both themes: dark strokes on a light
     ground would have vanished on the indigo one, and a CSS invert filter
     would have flattened the pencil texture that is the whole character of
     it. */
  .signature {
    width: 11rem;
    /* From the asset's own 900x458, so the box never mis-shapes the ink. */
    aspect-ratio: 900 / 458;
    background-color: var(--muted);
    -webkit-mask-image: var(--sig);
    mask-image: var(--sig);
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    opacity: 0.9;
  }
</style>
