<script lang="ts">
  type Segment = { text: string; highlighted: boolean };

  // --- static copy (edit here) ---
  const aboutParagraphs = [
    `A *front-end tailor* blending design and engineering. For 5+ years, I’ve helped startups and agencies deliver **durable, user-friendly platforms** in HR tech, e-commerce, and SaaS with **TypeScript, React, and Next.js**.`,
    `Recently I’ve been applying these skills to **Web3** — visualising Bitcoin UTXO logic (BDK), building real-time crypto infrastructure, and prototyping SoulChain.`,
    `I work at the intersection of **clarity, design, and scalability**, translating business needs and blockchain complexity into interfaces people actually *enjoy* using.`,
  ];

  // --- parsing for **...** highlight ---
  function parseText(text: string): Segment[] {
    const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
    return parts.map((part) =>
      part.startsWith("**") && part.endsWith("**")
        ? { text: part.slice(2, -2), highlighted: true }
        : { text: part, highlighted: false }
    );
  }

  const paragraphs: Segment[][] = aboutParagraphs.map(parseText);
</script>

<section
  id="about"
  class="section_padding section_layout min-h-[500px]"
>
  <h3 class="section_title">#About</h3>

  <div
    class="w-full max-w-3xl text-[17px] leading-relaxed text-zinc-700 dark:text-zinc-200 select-text p-4"
  >
    {#each paragraphs as segs}
      <p class="mb-5">
        {#each segs as segment}
          <span
            class={segment.highlighted
              ? [
                  // underline style in both themes
                  "underline underline-offset-4 decoration-zinc-400 dark:decoration-zinc-500",
                  // hover color
                  "transition-colors hover:text-zinc-900 dark:hover:text-white",
                  // optional gradient highlight (dark)
                  "dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-zinc-50 dark:via-zinc-300 dark:to-zinc-50",
                ].join(" ")
              : ""}
          >
            {segment.text}
          </span>
        {/each}
      </p>
    {/each}

    <p class="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
      (p.s. I’m funny 😄 and I love working on cool projects!)
    </p>
  </div>
</section>
