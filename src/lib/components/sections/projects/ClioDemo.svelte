<script lang="ts">
  import { demoClients, demoPicks } from "../../../../content/clioDemo.config";
  import { findClient } from "$lib/clioSearch";

  // The front desk, in miniature: type part of a name or phone number and
  // the client's card comes back. It starts on May so there is something to
  // see before anyone types.
  let query = demoPicks[0];
  $: found = findClient(demoClients, query);
</script>

<div class="demo paper">
  <span
    class="tape"
    aria-hidden="true"
  />
  <label
    for="clio-q"
    class="label"
  >
    Who's in the chair?
  </label>
  <input
    id="clio-q"
    class="search"
    type="search"
    autocomplete="off"
    placeholder="Type a name or phone number"
    bind:value={query}
  />
  <div
    class="picks"
    role="group"
    aria-label="Try a client"
  >
    {#each demoPicks as pick}
      <button
        type="button"
        class="pick"
        aria-pressed={query === pick}
        on:click={() => (query = pick)}
      >
        {pick}
      </button>
    {/each}
  </div>

  <div
    class="result"
    aria-live="polite"
  >
    {#if found}
      <div class="card">
        <div class="who">
          <span
            class="avatar"
            aria-hidden="true"
          >
            {found.initial}
          </span>
          <div>
            <p class="name">{found.name}</p>
            <p class="sub">
              <span class="nb">{found.phone}</span>
              <span class="nb">Last visit: {found.lastVisit}</span>
            </p>
          </div>
        </div>
        <dl class="facts">
          <div>
            <dt>Hair type</dt>
            <dd>{found.hair}</dd>
          </div>
          <div>
            <dt>Likes</dt>
            <dd>{found.likes}</dd>
          </div>
        </dl>
        <div class="note">
          <p class="k">Stylist notes</p>
          <p>{found.note}</p>
        </div>
      </div>
    {:else}
      <p class="empty">
        {query.trim()
          ? "No one by that name yet. A new client."
          : "Type a name to bring her back."}
      </p>
    {/if}
  </div>

  <p class="label disclaimer">Made-up clients, for the demo</p>
</div>

<style>
  /* Paper stays paper in both themes. */
  .demo {
    --paper-ink: #1a1a1a;
    --paper-grey: #5f5d57;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: 1.25rem 1.1rem 1.1rem;
    background: #fffdf8;
    color: var(--paper-ink);
    border-radius: 10px;
    box-shadow:
      0 2px 0 rgba(0, 0, 0, 0.04),
      0 12px 28px rgba(60, 40, 10, 0.12);
  }

  .demo .label {
    color: var(--paper-grey);
  }

  .tape {
    position: absolute;
    left: -0.75rem;
    top: -0.6rem;
    width: 4.5rem;
    height: 1.25rem;
    transform: rotate(-24deg);
    background: repeating-linear-gradient(
      45deg,
      rgba(143, 221, 170, 0.9) 0 8px,
      rgba(255, 255, 255, 0.85) 8px 16px
    );
  }

  .search {
    width: 100%;
    min-height: 48px;
    padding: 0 1rem;
    border: 1.5px solid var(--paper-ink);
    border-radius: 12px;
    background: #ffffff;
    color: var(--paper-ink);
    font: inherit;
    font-size: 1rem;
  }

  .search:focus-visible,
  .pick:focus-visible {
    outline: 2px solid #1f6b45;
    outline-offset: 3px;
  }

  .picks {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .pick {
    min-height: 44px;
    padding: 0 1rem;
    border: 1.5px solid #8a867d;
    border-radius: 999px;
    background: #fffdf8;
    color: var(--paper-ink);
    font: inherit;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .pick[aria-pressed="true"] {
    border-color: var(--paper-ink);
  }

  .result {
    min-height: 13.5rem;
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-4);
    border: 1px solid #e3ded3;
    border-radius: 12px;
    background: #ffffff;
  }

  .who {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .avatar {
    display: grid;
    place-items: center;
    flex: none;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: #ece9e1;
    font-weight: 600;
  }

  .name,
  .sub,
  .note p,
  dd {
    margin: 0;
  }

  .name {
    font-weight: 600;
  }

  .sub {
    display: flex;
    flex-wrap: wrap;
    gap: 0 0.6rem;
    font-size: 0.82rem;
    color: var(--paper-grey);
  }

  .facts {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-2);
    margin: 0;
  }

  dt,
  .k {
    font-size: 0.75rem;
    color: var(--paper-grey);
  }

  dd {
    font-size: 0.94rem;
  }

  .note {
    padding: var(--space-2) var(--space-3);
    border-radius: 8px;
    background: #f6f4ee;
    font-size: 0.94rem;
  }

  .empty {
    display: grid;
    place-items: center;
    min-height: 13.5rem;
    margin: 0;
    border: 1.5px dashed #d9d6ce;
    border-radius: 12px;
    color: var(--paper-grey);
    text-align: center;
  }

  .disclaimer {
    margin: 0;
  }

  .nb {
    white-space: nowrap;
  }

  @media (min-width: 900px) {
    .demo {
      padding: 1.75rem 1.75rem 1.5rem;
    }
  }
</style>
