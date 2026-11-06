<!-- The pen's wobble, shared by every mark and doodle. Put it on the page
     once, in the root layout. -->
<svg
  class="pen-defs"
  width="0"
  height="0"
  aria-hidden="true"
>
  <filter
    id="pen-wobble"
    x="-5%"
    y="-20%"
    width="110%"
    height="140%"
  >
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.035"
      numOctaves="2"
      seed="7"
    />
    <feDisplacementMap
      in="SourceGraphic"
      scale="3"
    />
  </filter>
</svg>

<style>
  .pen-defs {
    position: absolute;
  }
</style>
