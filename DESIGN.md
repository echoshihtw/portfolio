# Design system: the calm studio

A client or a hiring lead should leave feeling they can trust Echo. The page is
an example of her own software style: minimal, intuitive, cognitively friendly,
and clean underneath. Professional means clear and honest, not anonymous.

Her paintings are the foundation. They set the colours, the balance of block
and space, and the restraint. The Gallery holds the work; the only painting on
the home page is her Jakarta sketch, printed faintly into the paper beside the
headline.

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

Every colour has a job. Nothing is decoration. The ochre is the site's own
accent; each app keeps its own colours inside its section. Links, buttons and
focus rings take the text colour of what is directly behind them, so a ring
always stands out. A ring sits just outside a control, on the page; on a panel
that fills its own ground, such as a turned card, it sits inside, on the panel.
On a picture, it takes the picture's ink.

| Token                                                                               | Job                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--canvas`, `--smoke`, `--surface`                                                  | the page, every other section, and raised panels                                                                                                                                                                                                                               |
| `--ink`, `--muted`, `--primary`, `--border`                                         | text, controls, which follow the ink, and hairlines                                                                                                                                                                                                                            |
| `--accent-text`                                                                     | her ochre, from the paintings, for words and the line under them: "learn.", the gallery's "hand.", and the header link's underline on hover and on the current page                                                                                                            |
| `--accent-shape`                                                                    | the brighter ochre, for shapes only: the cover's full stop and the theme switch's sun, through `--highlight`                                                                                                                                                                   |
| `--runway-field`, `--runway-ink`, `--runway-paper`, `--runway-blue`, `--runway-act` | Runway's band: the app's own ink, paper, blue and act colours                                                                                                                                                                                                                  |
| `--clio-pink`, `--clio-paper`, `--clio-ink`, `--clio-number`                        | Clio's touch: pink, paper and ink from `@echoshihtw/clio-brand`, and its number in `app.css`. Pink for small marks and tints only: the chosen client, the mark under 603, and the demo's soft fills. Paper and ink for the demo and Clio's card back. Never a section's ground |

Archived work gets no colour. A component's own tokens, such as `--hairline`,
are mixes of these, never new colours. Shadows and the sheet's backdrop are mixes
of `--shade`, the one dark that stays the same in both themes. The light set is `:root` and `.stay-light`, defined once in `app.css`. The gallery's content wears `.stay-light`, so its paintings stay
on a light wall in the dark theme while the header and footer follow the theme.
The cover follows the theme too. A first visit starts on light, whatever the
device is set to; the switch remembers the visitor's choice after that. Every text pair clears 4.5:1 in both themes; `src/lib/contrast.test.ts`
holds that.

## What each section must carry

The words live in the files named below; this list says what each part has to prove,
so a rewrite keeps the fact.

- **Cover** (`src/app.html`): a named dialog holding the masthead and the theme
  switch along the top, her name with the ochre full stop, her role with her city
  and country, and one Enter button. Nothing else, and it fits any
  screen without scrolling.
- **Hero** (`portfolio.config.ts`, `heroConfig`): her role, that she works
  remote, and her time zone,
  the claim, one line on what she does (frontend first, and the structure under
  it that keeps a team consistent), three things she made true that the
  page shows lower down, then "Email me" with a role subject and "Résumé, PDF".
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
- **Contact** (`portfolio.config.ts`, `closingConfig`): that she is available,
  one line on what she takes on, a main button that emails with a role subject,
  the résumé, and a quiet link that emails with a project subject.
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
page's surface, and screenshots are dimmed a little.

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
in. Its ochre full stop then travels to the full stop of "learn." while the
headline arrives around it.

## Checks for every change

- Does it make her more trustworthy, or less?
- One lead object, about four chunks, the proof the largest?
- Does every colour have a job?
- Does the contrast test still pass?
- Is every control reachable in reading order, with a visible focus ring?
- Would deleting it lose a fact? If not, delete it.
