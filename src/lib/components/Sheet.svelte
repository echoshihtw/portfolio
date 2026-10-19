<script lang="ts">
  import { tick } from "svelte";

  /**
   * A sheet that rises from the bottom of a phone screen: the browser's own
   * modal <dialog>, so focus stays inside it, Escape closes it and the page
   * behind is inert. A tap outside or the close button also closes it, and
   * focus goes back to whatever opened it.
   */
  export let open = false;
  export let title: string;

  let dialog: HTMLDialogElement;
  let opener: Element | null = null;

  $: if (dialog) sync(open);

  async function sync(isOpen: boolean) {
    if (isOpen && !dialog.open) {
      opener = document.activeElement;
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }

  async function onClose() {
    open = false;
    await tick();
    if (opener instanceof HTMLElement) opener.focus();
  }

  // A click on the backdrop lands on the dialog itself, not its content.
  function onClick(e: MouseEvent) {
    if (e.target === dialog) open = false;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  aria-label={title}
  on:close={onClose}
  on:click={onClick}
>
  <div class="sheet">
    <span
      class="grab"
      aria-hidden="true"
    />
    <div class="top">
      <p class="title">{title}</p>
      <button
        type="button"
        class="close"
        aria-label="Close {title}"
        on:click={() => (open = false)}
      >
        ×
      </button>
    </div>
    <slot />
  </div>
</dialog>

<style>
  dialog {
    width: 100%;
    max-width: 100%;
    max-height: 82vh;
    margin: auto 0 0;
    padding: 0;
    border: 0;
    border-radius: 18px 18px 0 0;
    background: var(--surface);
    color: var(--ink);
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.18);
  }

  dialog::backdrop {
    background: rgba(26, 26, 26, 0.32);
  }

  dialog[open] {
    animation: rise 0.28s var(--ease-out);
  }

  @keyframes rise {
    from {
      transform: translateY(24px);
      opacity: 0;
    }
  }

  .sheet {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: 0.6rem var(--space-4) var(--space-6);
  }

  .grab {
    align-self: center;
    width: 40px;
    height: 4px;
    border-radius: 2px;
    background: var(--border);
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-3);
  }

  .title {
    margin: 0;
    font-size: var(--text-lg);
    font-weight: 600;
  }

  .close {
    width: 44px;
    height: 44px;
    border: var(--border-w) solid var(--ink);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--ink);
    font-size: 1.2rem;
    cursor: pointer;
  }

  @media (prefers-reduced-motion: reduce) {
    dialog[open] {
      animation: none;
    }
  }
</style>
