<script lang="ts">
  import { base } from "$app/paths";

  /**
   * The portrait: a transparent PNG cut to an organic capsule, shown
   * exactly as exported, with a flat cobalt capsule behind it offset to the
   * bottom right. The backing is an SVG path traced from the PNG's own
   * alpha channel (row extents every 24px, smoothed), in the image's
   * coordinate space, so it scales with the image and never drifts.
   *
   * The PNG is 1200x1435. The explicit aspect ratio reserves its box before
   * the bytes arrive, so nothing shifts. It sits below the fold in the
   * About section, so it loads lazily like the rest of the page's images.
   */
  export let src: string;
  export let alt: string;
  export let width: number;
  export let height: number;
</script>

<figure class="portrait">
  <svg
    class="backing"
    viewBox="0 0 1200 1435"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M547 199 C643 202 971 209 1064 216 C1157 223 1096 232 1107 240 C1118 248 1126 256 1133 264 C1140 272 1145 280 1150 288 C1155 296 1159 304 1162 312 C1165 320 1167 328 1169 336 C1171 344 1173 352 1174 360 C1175 368 1176 376 1177 384 C1178 392 1177 400 1177 408 C1177 416 1177 424 1177 432 C1177 440 1177 448 1177 456 C1177 464 1177 472 1177 480 C1177 488 1177 496 1177 504 C1177 512 1177 520 1177 528 C1177 536 1178 544 1178 552 C1178 560 1178 568 1178 576 C1178 584 1178 592 1178 600 C1178 608 1178 616 1178 624 C1178 632 1178 640 1178 648 C1178 656 1178 664 1178 672 C1178 680 1178 688 1178 696 C1178 704 1178 712 1178 720 C1178 728 1179 736 1179 744 C1179 752 1179 760 1179 768 C1179 776 1179 784 1179 792 C1179 800 1179 808 1179 816 C1179 824 1179 832 1179 840 C1179 848 1179 856 1179 864 C1179 872 1179 880 1179 888 C1179 896 1179 904 1179 912 C1179 920 1180 928 1180 936 C1180 944 1180 952 1180 960 C1180 968 1180 976 1180 984 C1180 992 1180 1000 1180 1008 C1180 1016 1180 1024 1180 1032 C1180 1040 1180 1048 1180 1056 C1180 1064 1180 1072 1180 1080 C1180 1088 1180 1096 1180 1104 C1180 1112 1181 1120 1181 1128 C1181 1136 1181 1144 1181 1152 C1181 1160 1181 1168 1181 1176 C1181 1184 1181 1192 1181 1200 C1181 1208 1180 1216 1179 1224 C1178 1232 1177 1240 1175 1248 C1173 1256 1172 1264 1169 1272 C1166 1280 1163 1288 1159 1296 C1155 1304 1152 1312 1146 1320 C1140 1328 1134 1336 1126 1344 C1118 1352 1111 1360 1095 1368 C1079 1376 1058 1384 1031 1392 C1004 1400 1008 1410 930 1413 C852 1416 626 1416 560 1413 C494 1410 542 1400 531 1392 C520 1384 504 1376 495 1368 C486 1360 484 1352 479 1344 C474 1336 470 1328 465 1320 C460 1312 454 1304 447 1296 C440 1288 434 1280 425 1272 C416 1264 409 1256 396 1248 C383 1240 368 1232 349 1224 C330 1216 300 1208 282 1200 C264 1192 251 1184 239 1176 C227 1168 217 1160 208 1152 C199 1144 192 1136 184 1128 C176 1120 169 1112 163 1104 C157 1096 151 1088 146 1080 C141 1072 136 1064 132 1056 C128 1048 123 1040 119 1032 C115 1024 112 1016 109 1008 C106 1000 103 992 100 984 C97 976 94 968 92 960 C90 952 88 944 86 936 C84 928 82 920 81 912 C80 904 78 896 77 888 C76 880 75 872 74 864 C73 856 73 848 72 840 C71 832 70 824 70 816 C70 808 69 800 69 792 C69 784 69 776 69 768 C69 760 69 752 69 744 C69 736 69 728 69 720 C69 712 70 704 70 696 C70 688 70 680 71 672 C72 664 72 656 73 648 C74 640 74 632 75 624 C76 616 76 608 76 600 C76 592 78 584 78 576 C78 568 79 560 79 552 C79 544 80 536 80 528 C80 520 80 512 80 504 C80 496 80 488 80 480 C80 472 78 464 78 456 C78 448 77 440 77 432 C77 424 78 416 78 408 C78 400 79 392 80 384 C81 376 83 368 85 360 C87 352 88 344 91 336 C94 328 97 320 101 312 C105 304 109 296 114 288 C119 280 125 272 133 264 C141 256 147 248 162 240 C177 232 171 223 225 216 C279 209 432 202 486 199 C540 196 451 196 547 199 Z"
    />
  </svg>
  <img
    src="{base}/{src}"
    {alt}
    {width}
    {height}
    loading="lazy"
    decoding="async"
    draggable="false"
  />
</figure>

<style>
  .portrait {
    position: relative;
    margin: 0;
    width: 100%;
    /* The image's own ratio, so the box exists before the bytes do. */
    aspect-ratio: 1200 / 1435;
  }

  /* Room for the backing's offset, so it is never clipped by a parent. */
  .portrait {
    margin-right: 14px;
    margin-bottom: 14px;
  }

  .portrait img {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    -webkit-user-drag: none;
    user-select: none;
  }

  /* Same box as the image, same coordinate space, nudged. The offset is in
     pixels on purpose: it is a printer's misregistration, and it should
     read as the same 14px whether the image is 300 or 560 wide. */
  .backing {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform: translate(14px, 14px);
    fill: var(--primary);
    pointer-events: none;
  }
</style>
