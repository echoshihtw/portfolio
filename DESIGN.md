# Design system: the calm studio

A client or a hiring lead should leave feeling they can trust Echo. The page is
an example of her own software style: minimal, intuitive, cognitively friendly,
and clean underneath. Professional means clear and honest, not anonymous.

Her paintings are the foundation. They set the colours, the balance of block
and space, and the restraint. The Gallery holds the work; the home page has no
painting.

The site's tokens live in `src/app.css`, and Clio's in its brand preset. The
cover repeats the light and dark values in `static/boot-gate.css`, because it
paints before the site's styles load, and a test keeps the copy equal. This file says how to use them.

## The page

- **One grid.** Twelve columns, `--content-max` wide. A section's content
  starts at the same left edge in every section.
- **One spacing scale.** `--space-1` to `--space-8`. Nothing in between.
- **One type scale.** Geist for reading, Geist Mono for data, labels and the
  big numbers. No handwriting face.

## Colour

Every colour has a job. Nothing is decoration. Her two pens are the site's own
colours: a blue pen for her remarks and a yellow highlighter for what matters; each app keeps its own colours inside its section. Links, buttons and
focus rings take the text colour of what is directly behind them, so a ring
always stands out. A ring sits just outside a control, on the page; on a panel
that fills its own ground, such as a turned card, it sits inside, on the panel.
On a picture, it takes the picture's ink.

| Token                                                                               | Job                                                                                                                                                                                                                                                                |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--canvas`, `--smoke`, `--surface`                                                  | the page, every other section, and raised panels                                                                                                                                                                                                                   |
| `--ink`, `--muted`, `--primary`, `--border`                                         | text, controls, which follow the ink, and hairlines                                                                                                                                                                                                                |
| `--accent-text`                                                                     | her blue pen, for words: the header link's underline on hover and on the current page. A lighter blue in the ink theme                                                                                                                                             |
| `--accent-shape`                                                                    | the brighter blue, for pen marks and doodles, the available dot, the caret, the cover's full stop and the theme switch's sun, through `--highlight`                                                                                                                |
| `--mark`, `--mark-ink`, `--mark-solid`                                              | the highlighter, always with ink on it. Yellow on paper. On a dark ground it is see-through mint (yellow on the Runway band) and the word keeps its light ink, so a letter the stroke misses still reads. The hero's one word keeps a solid stroke, `--mark-solid` |
| `--runway-field`, `--runway-ink`, `--runway-paper`, `--runway-blue`, `--runway-act` | Runway's band: the app's own ink, paper, blue and act colours                                                                                                                                                                                                      |
| `--clio-pink`, `--clio-paper`, `--clio-ink`, `--clio-number`                        | Clio's touch: pink, paper and ink from `@echoshihtw/clio-brand`, and its number in `app.css`. Pink for small marks and tints only: the chosen client and the demo's soft fills. Paper and ink for the demo and Clio's card back. Never a section's ground          |

Archived work gets no colour. A component's own tokens, such as `--hairline`,
are mixes of these, never new colours. Shadows and the sheet's backdrop are mixes
of `--shade`, the one dark that stays the same in both themes. The light set is `:root` and `.stay-light`, defined once in `app.css`. The gallery's content wears `.stay-light`, so its paintings stay
on a light wall in the dark theme while the header and footer follow the theme.
The cover follows the theme too. A first visit opens in the dark theme, where the
hero is at its best, until the visitor flips the switch; the site remembers that choice. Every text pair clears 4.5:1 in both themes; `src/lib/contrast.test.ts`
holds that.

## What each section must carry

The words live in the files named below; this list says what each part has to prove,
so a rewrite keeps the fact.

- **Cover** (`src/app.html`): a named dialog holding the masthead and the theme
  switch along the top, her name with the blue full stop, her role with her city
  and country, and one Enter button. Nothing else, and it fits any
  screen without scrolling.
- **Hero** (`portfolio.config.ts`, `heroConfig`): one screen. Her facts on one
  line: her role, remote, her time zone, and that she is available now, marked
  with a blue dot. Then the claim, large, with "don't" under the highlighter and
  a wavy blue pen line under "learn"; the full stop is ink. Then "Email me" (a
  role subject) and "Résumé, PDF" as text links with a highlighter line under
  each, and under them, small and quiet, one line on what she does (frontend
  first, and the structure under it that keeps a team consistent) and her
  slogan, Verify, Distill, Simplify. No picture, no button, no rule, no
  seniority word or count of years: the work shows the level, and the résumé
  holds the timeline.
- **Selected work** (`selectedWork.config.ts`): what Runway is, that she built
  and shipped it alone, live on the App Store since October 2026 with its link,
  the stack (read from `projects.config.ts`), one line on how she uses AI, the
  architecture diagram in `RunwayArchitecture.svelte` (the pure core, its
  adapters, and the one import that fails CI), and the privacy checks: the database checked as
  encrypted at every open, and CI checking the privacy page against what the app
  sends.
- **Where I've worked** (`resumeData.ts`, built from `resume.md`, and
  `portfolio.config.ts`): each company with her role, the dates and where, the problem and the result in one paragraph, the stack, and
  the details on request. The full history is in the résumé.
- **More projects** (`projects.config.ts`): each project's name, its status in
  words, its proof first (Clio: 603 clients typed in by hand, in use since May
  2025), what it is, the stack, its link if it has one, and its decisions on the back.
- **Who I am** (`aboutMe.config.ts`): her portrait, her line on why she builds,
  and five parts in story order: Background, What changed, How I work, With AI,
  Outside work. How I work holds habits a reader can check, not adjectives.
- **Contact** (`portfolio.config.ts`, `closingConfig`): that she is available for
  work now, one line on what she takes on, a main button
  that emails with a role subject, the résumé, and quiet links that email with a
  contract subject and a project subject, then how a project starts.
- **Gallery** (`galleryPage.config.ts`): its heading, one line of provenance,
  the lead painting, and one way back to the software.
- **Blog** (`src/posts/`): working notes, each on what broke, what it turned out
  to be, and what she took from it.
- **Footer** (`Footer.svelte`): that she is available remote, her country and
  time zone, and her hours,
  email, a call, the site's source, GitHub, LinkedIn and Instagram, and a way to
  replay the cover.

The résumé downloads as a PDF named with her name, so it stays hers in any
downloads folder.

## Her two pens

The page reads like her own notebook, marked up with two pens. The highlighter
marks what matters, the fact a reader should take away. The blue pen is her
remark: a circle, a line, or the hero's wavy line under "learn". Every pen and doodle
is defined once in `src/lib/pens/pens.ts`, drawn by the components beside it,
and shown together on the unlisted `/pens` page. The phrase each one marks sits
beside its copy in the config. A phrase longer than a word runs as one stroke
along the text, breaking only where the line does.

- **One mark on the proof,** at most, in a card or a part, and only where there
  is a result to mark. No mark is better than a mark on a summary.
- **Doodles are rare:** a blue pen star by How I work, a light bulb by With AI,
  and an arrow to the full history in the résumé, in `pens.ts`. Each means
  something; none decorates.
- **Link icons:** ↗ means another site or a new tab; her pen arrow means a
  page on this site.
- **Hand-drawn marks on clean type,** never a handwriting face.
- **Runway and Clio keep their own colours** inside their demos; her pen underlines Clio's 603, as it marks every other proof.
- **Each mark draws once,** as its section scrolls into view: the highlighter is
  uncovered behind a moving pen tip, and a pen line is drawn along its path.
  Marks that come into view together draw one after another in reading
  order, a beat (`--motion-short`) apart.
  With Reduce Motion, or without JavaScript, it is simply there.

## Every section

1. **The row.** `SectionHead`: the number and the title together, in mono, at
   most one quiet link on the right.
2. **One lead object.** The thing the section is about.
3. **Notes.** Short text beside or under it. The proof first, and the largest.
4. **At most one link to another site.**

About four chunks per block.

| Layout             | Columns on a wide screen | Used by                      |
| ------------------ | ------------------------ | ---------------------------- |
| Lead and notes     | lead 7, notes 5          | Selected work, More projects |
| Portrait and words | portrait 5, words 7      | Who I am                     |
| List               | label 3, body 9          | Where I've worked            |

Contact, the close, is the one centred section, and has no picture.

## Selected work

Runway's section is editorial rather than cards: the name large across the top,
then the demo beside the notes. "How it is built" is a hairline, the
architecture diagram, and numbered points beside it, with no boxes. The diagram
is the section's one picture, drawn from the packages' real dependencies and
named without counts, so it stays true between releases. A screen reader hears it
described once as a whole, not box by box. The demo plays only
on a tap.

## More projects

Each project's lead object sits in a hairline frame, not a shadow. "Read the
decisions" turns the card over on a wide screen, and only one card is turned at
a time. Focus moves to the card's back, and "Turn it back" returns it to the
button that turned it. In the dark theme, Clio's demo keeps its own paper inside a frame of the
page's surface, and the demo and the screenshots are dimmed a little so they
don't glare.

## Phones

Everything stacks; the label comes before the lead object. No fact splits
across lines, and nothing is clipped or overlaps, upright or sideways. Held
sideways, the page scrolls, and no picture is taller than the screen. A project's first
paragraph says what it is, so it is always on screen; only the rest opens in a
sheet. A sheet is the browser's own `<dialog>`, named by its title, closed by
Escape, a tap outside
or its close button, with focus returned to the button that opened it. In
Runway's section the demo comes straight after the name, and the diagram turns
to its tall version so its labels stay readable.

## Gallery

One painting opens the page, whole and unframed at its own proportions, beside
the heading, and never taller than the screen. The wall below leaves it out.

The rest hang in even 4:5 frames: one column on a phone, two from 560 px wide,
three from 860 px. A painting opens full screen over the wall, in the browser's own modal dialog,
so focus stays inside it, and the others
sit beside it: swipe, the arrow keys or the buttons move between them, with a
counter in a fixed place that a screen reader hears as it changes. Escape, Close or a tap on the background returns to
the same spot on the wall. The page ends with one way back to the software.

## Header and footer

The header returns on any scroll up, so the home page's sections need no second
list. The footer carries what the list above names, on every page.

## Motion

Nothing moves on its own. Things move only when someone acts: the header steps
aside on a scroll down, a sheet rises, a card turns. Every duration and curve
comes from one scale in `app.css`, `--motion-short` to `--motion-long` with
`--motion-enter` and `--motion-exit`. Reduced motion swaps every movement for an
instant change.

The cover shows once per tab, on the home page only. A link to a section skips
it. Replaying it from the footer, on any page, opens the home page with the
cover.

While the cover is up, the page behind is out of reach and waits at the top.
Focus starts on Enter. Enter, Space, the down arrow, a scroll or a swipe up goes
in. Its blue full stop then travels to the full stop of "learn." while the
headline arrives around it.

The hero has one move of its own, once, after the cover has gone: a still
beat, a caret blinks after "you", "don't" arrives as the words after it slide
to their new places, the highlighter sweeps behind it, and the blue pen draws
its wavy line under "learn". About two seconds, from the motion scale, and never again. Without the cover, or with
Reduce Motion, the sentence is simply there, and a screen reader hears it
whole.

## Checks for every change

- Does it make her more trustworthy, or less?
- One lead object, about four chunks, the proof the largest?
- Does every colour have a job?
- Does the contrast test still pass?
- Is every control reachable in reading order, with a visible focus ring?
- Would deleting it lose a fact? If not, delete it.
