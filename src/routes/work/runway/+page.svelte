<script lang="ts">
  import { base } from "$app/paths";
  import Seo from "$lib/components/Seo.svelte";
  import { Marked } from "$lib/pens";
  import { runwayCaseStudy as c } from "../../../content/runwayCaseStudy.config";
</script>

<Seo
  title="Echo Shih · Runway case study"
  description={c.lede}
  path={c.path}
/>

<main class="study section_padding">
  <a
    class="back"
    href="{base}/#selected-work"
  >
    ← Selected work
  </a>

  <header>
    <p class="label">{c.kicker}</p>
    <h1>{c.title}</h1>
    <p class="lede">
      <Marked
        text={c.lede}
        phrase={c.ledeMark.phrase}
        kind={c.ledeMark.kind}
      />
    </p>
  </header>

  <section aria-labelledby="problem">
    <p class="label">{c.problem.label}</p>
    <h2 id="problem">{c.problem.heading}</h2>
    {#each c.problem.body as paragraph}
      <p>
        <Marked
          text={paragraph}
          phrase={c.problem.mark.phrase}
          kind={c.problem.mark.kind}
        />
      </p>
    {/each}
  </section>

  <section aria-labelledby="model">
    <p class="label">{c.model.label}</p>
    <h2 id="model">{c.model.heading}</h2>
    <dl class="card">
      {#each c.model.rows as row}
        <div class:total={row.total}>
          <dt>{row.name}</dt>
          <dd>{row.value}</dd>
        </div>
      {/each}
    </dl>
    <p class="quiet">{c.model.note}</p>
    <p>
      <Marked
        text={c.model.rule}
        phrase={c.model.mark.phrase}
        kind={c.model.mark.kind}
      />
    </p>
  </section>

  <section aria-labelledby="simpler">
    <p class="label">{c.simpler.label}</p>
    <h2 id="simpler">{c.simpler.heading}</h2>
    <div class="compare">
      {#each c.simpler.rows as { version, side }}
        <p class="label version">{version}</p>
        {#each c.simpler.compare as pair}
          <figure>
            <img
              src="{base}/{pair[side].src}"
              alt={pair[side].alt}
              width={c.simpler.screen.width}
              height={c.simpler.screen.height}
              loading="lazy"
            />
            <figcaption class="label">{pair.label}</figcaption>
          </figure>
        {/each}
      {/each}
    </div>
    <ol class="steps">
      {#each c.simpler.steps as step}
        <li class="experiment">
          <h3>
            <Marked
              text={step.title}
              phrase={c.simpler.mark.phrase}
              kind={c.simpler.mark.kind}
            />
            {#if step.tag}<span class="label">{step.tag}</span>{/if}
          </h3>
          <dl>
            {#each [["Hypothesis", step.hypothesis], ["Test", step.test], ["Result", step.result], ["Next", step.next]] as [name, words]}
              <div>
                <dt class="label">{name}</dt>
                <dd>{words}</dd>
              </div>
            {/each}
          </dl>
        </li>
      {/each}
    </ol>
  </section>

  <section aria-labelledby="redesign">
    <p class="label">{c.redesign.label}</p>
    <h2 id="redesign">{c.redesign.heading}</h2>
    <p>{c.redesign.body}</p>
    <ol class="flow">
      {#each c.redesign.flow as step}<li>{step}</li>{/each}
    </ol>
    <div class="card">
      <table>
        <caption class="sr-only">What one check-up changed</caption>
        <tbody>
          {#each c.redesign.diff as [name, was, now]}
            <tr>
              <th scope="row">{name}</th>
              <td>
                <span class="was">{was}</span>
                <span aria-hidden="true">→</span>
                <span class="sr-only">to</span>
                {now}
              </td>
            </tr>
          {/each}
          <tr class="quiet">
            <th scope="row">{c.redesign.expected[0]}</th>
            <td>{c.redesign.expected[1]}</td>
          </tr>
        </tbody>
      </table>
      <p class="result">{c.redesign.result}</p>
    </div>
    <p class="quiet">{c.redesign.status}</p>
  </section>

  <section aria-labelledby="principles">
    <p class="label">{c.principles.label}</p>
    <h2 id="principles">{c.principles.heading}</h2>
    <dl class="principles">
      {#each c.principles.items as item}
        <div>
          <dt>{item.title}</dt>
          <dd>{item.body}</dd>
        </div>
      {/each}
    </dl>
  </section>

  <section aria-labelledby="learned">
    <p class="label">{c.learned.label}</p>
    <h2 id="learned">{c.learned.heading}</h2>
    {#each c.learned.body as paragraph}
      <p>
        <Marked
          text={paragraph}
          phrase={c.learned.mark.phrase}
          kind={c.learned.mark.kind}
        />
      </p>
    {/each}
  </section>

  <section
    class="rest"
    aria-labelledby="rest"
  >
    <p class="label">{c.rest.label}</p>
    {#each c.rest.body as paragraph, i}
      <p
        class="close"
        id={i === 0 ? "rest" : undefined}
      >
        <Marked
          text={paragraph}
          phrase={c.rest.mark.phrase}
          kind={c.rest.mark.kind}
        />
      </p>
    {/each}
    <p class="quiet">{c.rest.facts}</p>
  </section>
</main>

<style>
  .study {
    max-width: 46rem;
    margin: 0 auto;
  }

  .back {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: var(--muted);
  }

  header {
    margin: var(--space-6) 0 var(--space-7);
  }

  h1 {
    margin: var(--space-2) 0 var(--space-4);
    font-size: var(--text-3xl);
    letter-spacing: -0.04em;
    line-height: 1;
  }

  .lede {
    font-size: var(--text-xl);
    line-height: 1.4;
  }

  section {
    padding: var(--space-6) 0;
    border-top: 1px solid var(--border);
  }

  h2 {
    margin: var(--space-2) 0 var(--space-4);
    font-size: var(--text-2xl);
    letter-spacing: -0.03em;
    line-height: 1.15;
  }

  p {
    margin: 0 0 var(--space-4);
    line-height: 1.65;
  }

  .label {
    margin: 0;
  }

  .quiet {
    color: var(--muted);
  }

  .card {
    margin: 0 0 var(--space-4);
    padding: var(--space-4) var(--space-5);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface);
  }

  /* The diff stays a real table, so a screen reader reads it as one. */
  dl.card div {
    display: flex;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-2) 0;
  }

  dl.card dt,
  dl.card dd,
  th,
  td {
    margin: 0;
    font-weight: 400;
    text-align: left;
  }

  dl.card dd,
  td {
    font-family: var(--font-mono);
    white-space: nowrap;
  }

  dl.card .total {
    border-top: 1px solid var(--border);
    font-weight: 600;
  }

  th,
  td {
    padding: var(--space-2) 0;
    vertical-align: baseline;
  }

  td {
    text-align: right;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  .was {
    color: var(--muted);
  }

  .result {
    margin: var(--space-3) 0 0;
    padding-top: var(--space-3);
    border-top: 1px solid var(--border);
  }

  /* A row of 1.0's screens over a row of the redesign's, the same screen in
     each column. */
  .compare {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
    align-items: start;
    margin-bottom: var(--space-5);
  }

  .compare figure {
    margin: 0;
  }

  .compare img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }

  .compare figcaption {
    margin-top: var(--space-2);
  }

  .compare .version {
    grid-column: 1 / -1;
    margin: var(--space-2) 0 0;
  }

  .steps,
  .flow {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* An experiment card: its four lines as label and words, the result in
     ink because it is what happened. */
  .experiment {
    margin-bottom: var(--space-4);
    padding: var(--space-4) var(--space-5);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }

  .experiment dl {
    margin: 0;
    display: grid;
    gap: var(--space-2);
  }

  .experiment dl div {
    display: grid;
    grid-template-columns: 7rem 1fr;
    gap: var(--space-3);
    align-items: baseline;
  }

  .experiment dd {
    margin: 0;
    color: var(--muted);
    line-height: 1.55;
  }

  .experiment dl div:nth-child(3) dd {
    color: var(--ink);
  }

  @media (max-width: 480px) {
    .experiment dl div {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }

  /* The title stays whole; its tag wraps under it on a narrow screen. */
  h3 {
    display: flex;
    flex-wrap: wrap;
    white-space: nowrap;
    align-items: baseline;
    gap: var(--space-3);
    margin: 0 0 var(--space-1);
    font-size: var(--text-lg);
  }

  .flow {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-3);
    margin-bottom: var(--space-4);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
  }

  .flow li + li::before {
    content: "→ ";
    color: var(--muted);
  }

  /* The close: her own words, larger, then the plain facts. */
  .close {
    font-size: var(--text-xl);
    line-height: 1.45;
  }

  .principles div {
    padding: var(--space-3) 0;
  }

  .principles dt {
    font-weight: 600;
  }

  .principles dd {
    margin: var(--space-1) 0 0;
    color: var(--muted);
    line-height: 1.6;
  }

  /* On a small phone each label stays whole and the amounts step down a
     size, so no fact splits across lines. */
  @media (max-width: 480px) {
    .card {
      padding: var(--space-3) var(--space-4);
    }

    th {
      white-space: nowrap;
      padding-right: var(--space-3);
    }

    td {
      font-size: var(--text-sm);
    }

    .quiet th {
      white-space: normal;
    }
  }
</style>
