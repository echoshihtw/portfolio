<script lang="ts">
  import { base } from "$app/paths";
  import type { Projects } from "$lib/types/types";

  type Project = Projects[number];

  export let project: Project | null = null;
  export let onClose: () => void;

  let dialog: HTMLDialogElement;

  // Native <dialog> gives focus trapping, Esc, inert background and the
  // ::backdrop for free. Anything hand-rolled would reimplement those badly.
  $: if (dialog && project) dialog.showModal();
  $: if (dialog && !project && dialog.open) dialog.close();
</script>

<!-- Clicking the backdrop closes, which is the idiomatic dialog pattern:
     |self means only the dialog element itself, never its contents. Keyboard
     users already have Esc (native) and the close button, so this adds a mouse
     affordance rather than being the only way out. -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={onClose}
  on:click|self={() => dialog.close()}
  aria-labelledby="project-dialog-title"
>
  {#if project}
    <article>
      <header>
        <h4 id="project-dialog-title">{project.name}</h4>
        <button
          class="close mono"
          on:click={() => dialog.close()}
          aria-label="Close">✕</button
        >
      </header>

      <p class="hook">{project.subtitle}</p>

      {#if project.shots?.length}
        <!-- Height-capped, width auto: a phone portrait and a browser
             landscape sit in the same strip without either being cropped. -->
        <div class="shots">
          {#each project.shots as shot}
            <img
              src="{base}/{shot.src}"
              alt={shot.alt}
              loading="lazy"
            />
          {/each}
        </div>
      {:else if project.file}
        <img
          class="single"
          src="{base}/{project.file}"
          alt="{project.name} preview"
          loading="lazy"
        />
      {/if}

      <!-- Why it exists, what I decided, what happened. Labelled, because a
           visitor should not have to infer the structure from a paragraph. -->
      <section>
        <h5 class="mono">Why</h5>
        <p>{project.why}</p>
      </section>

      {#if project.highlights?.length}
        <section>
          <h5 class="mono">How</h5>
          <ul>
            {#each project.highlights as highlight}
              <li>{highlight}</li>
            {/each}
          </ul>
        </section>
      {/if}

      <section>
        <h5 class="mono">Result</h5>
        <p>{project.result}</p>
      </section>

      <p class="tech mono">{project.stack.join("  ·  ")}</p>

      <a
        class="link mono"
        href={project.href}
        target="_blank"
        rel="noreferrer noopener">{project.linkLabel || "View"}</a
      >
    </article>
  {/if}
</dialog>

<style>
  dialog {
    width: min(46rem, calc(100vw - 2rem));
    padding: 0;
    border: 1px solid var(--section-border);
    border-radius: 6px;
    background: var(--surface-bg);
    color: var(--text-color);
  }

  dialog::backdrop {
    background: rgba(10, 10, 9, 0.55);
    backdrop-filter: blur(2px);
  }

  article {
    padding: 1.6rem 1.7rem 1.7rem;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  header {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 1rem;
  }

  h4 {
    margin: 0;
    font-family: "DM Serif Display", serif;
    font-size: 1.7rem;
    line-height: 1.1;
  }

  .close {
    flex: none;
    padding: 0.2rem 0.45rem;
    font-size: 0.85rem;
    color: var(--text-muted);
    background: none;
    border: 1px solid var(--section-border);
    border-radius: 4px;
    cursor: pointer;
  }

  .close:hover {
    color: var(--text-color);
    border-color: var(--color-accent);
  }

  .hook {
    margin: 0;
    font-size: 1rem;
    color: var(--color-accent);
  }

  .shots {
    display: flex;
    gap: 0.7rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 0.4rem;
  }

  .shots img {
    height: min(58vh, 30rem);
    width: auto;
    flex: none;
    scroll-snap-align: start;
    border-radius: 4px;
    border: 1px solid var(--section-border);
    background: #0b0f16;
  }

  .single {
    width: 100%;
    border-radius: 4px;
    border: 1px solid var(--section-border);
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  h5 {
    margin: 0;
    font-size: 0.66rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  section p {
    margin: 0;
    line-height: 1.65;
    color: var(--text-muted);
  }

  ul {
    margin: 0;
    padding-left: 1.05rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    color: var(--text-color);
    font-size: 0.93rem;
    line-height: 1.5;
  }

  .tech {
    margin: 0;
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    color: var(--text-muted);
  }

  .link {
    align-self: start;
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-accent);
    text-decoration: none;
    border-bottom: 1px solid currentColor;
  }

  @media (max-width: 640px) {
    /* Bottom sheet on phones: closer to the thumb, and the card it came from
       stays visible above it. */
    dialog {
      width: 100vw;
      max-width: 100vw;
      margin: auto 0 0;
      border-radius: 10px 10px 0 0;
    }
  }
</style>
