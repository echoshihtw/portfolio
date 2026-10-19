<script lang="ts">
  import { base } from "$app/paths";

  // Her real Find Recruiter business card, taped in. It turns over to her
  // name and title. The phone number and work email are painted out of the
  // image itself, and tape sits over the patch.
  let flipped = false;
</script>

<div class="keepsake">
  <button
    type="button"
    class="card"
    class:flipped
    aria-pressed={flipped}
    aria-label="Flip the Find Recruiter card"
    on:click={() => (flipped = !flipped)}
  >
    <span class="inner">
      <span class="face">
        <img
          src="{base}/assets/experience/find-recruiter-front.webp"
          alt=""
          width="480"
          height="274"
        />
      </span>
      <span class="face back">
        <img
          src="{base}/assets/experience/find-recruiter-back.webp"
          alt=""
          width="480"
          height="274"
        />
        <span
          class="patch"
          aria-hidden="true"
        />
      </span>
    </span>
  </button>
  <span
    class="tape"
    aria-hidden="true"
  />
  <span
    class="hint"
    aria-hidden="true"
  >
    flip me ↻
  </span>
</div>

<style>
  .keepsake {
    position: relative;
    width: 7rem;
    margin: 0.4rem 0 1.6rem;
    transform: rotate(-2deg);
  }

  .card {
    all: unset;
    display: block;
    width: 100%;
    aspect-ratio: 480 / 274;
    perspective: 1400px;
    cursor: pointer;
  }

  .card:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 6px;
    border-radius: 4px;
  }

  .inner {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.3, 0.7, 0.2, 1);
  }

  .flipped .inner {
    transform: rotateY(180deg);
  }

  .face {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: 4px;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    box-shadow:
      0 2px 0 rgba(0, 0, 0, 0.05),
      0 12px 24px rgba(60, 40, 10, 0.16);
  }

  .face img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .back {
    transform: rotateY(180deg);
  }

  .patch,
  .tape {
    position: absolute;
    background: repeating-linear-gradient(
      45deg,
      rgba(240, 139, 114, 0.92) 0 8px,
      rgba(255, 236, 226, 0.92) 8px 16px
    );
  }

  .patch {
    left: 58%;
    top: 42%;
    width: 46%;
    height: 24%;
    transform: rotate(-3deg);
  }

  .tape {
    left: -0.6rem;
    top: -0.5rem;
    width: 3.2rem;
    height: 0.9rem;
    transform: rotate(-38deg);
    background: repeating-linear-gradient(
      45deg,
      rgba(143, 221, 170, 0.9) 0 8px,
      rgba(255, 255, 255, 0.85) 8px 16px
    );
  }

  .hint {
    position: absolute;
    right: 0.4rem;
    bottom: -1.4rem;
    font-family: var(--font-hand);
    font-size: 0.82rem;
    color: var(--brush);
    transform: rotate(-4deg);
    pointer-events: none;
  }

  @media (min-width: 900px) {
    .keepsake {
      width: 10.5rem;
      margin: 1.4rem 0 1.8rem;
    }

    .hint {
      font-size: 0.94rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .inner {
      transition: none;
    }
  }
</style>
