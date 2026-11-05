# Design system: the calm studio

A client or a hiring lead should leave feeling they can trust Echo. The page is
an example of her own software style: minimal, intuitive, cognitively friendly,
and clean underneath. Professional means clear and honest, not anonymous.

Her paintings are the foundation. They set the colours, the balance of block
and space, and the restraint. The Gallery holds the work; the home page shows
only her Jakarta sketch, printed faintly into the paper beside the headline.

The tokens live in `src/app.css`. This file says how to use them.

## The page

- **Paper and ink.** `--canvas` is the warm paper, `--smoke` the quiet
  alternate ground, `--ink` the brown-black text, `--muted` the quiet text.
- **One grid.** Twelve columns, `--content-max` wide. A section's content
  starts at the same left edge in every section.
- **One spacing scale.** `--space-1` to `--space-8`. Nothing in between.
- **One type scale.** Geist for reading, Geist Mono for data, labels and the
  big numbers. No handwriting face.

## Colour

Every colour has a job. Nothing is decoration. Links, focus rings and buttons
are ink, so the ochre is the page's one accent.

| Token                                             | Job                                                                                       |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `--canvas`, `--smoke`                             | the page, and every other section                                                         |
| `--ink`, `--muted`                                | text and controls                                                                         |
| `--accent-text`                                   | her ochre, from the paintings, for words: "learn." and the gallery's "hand."              |
| `--accent-shape`                                  | the brighter ochre, for decoration only: the cover's full stop and the theme switch's sun |
| `--runway-field`, `--runway-blue`, `--runway-act` | Runway's band: the app's own ink, blue and act colours                                    |
| `--clio-pink`, `--clio-number`                    | Clio's touch: the client in the chair, the mark under 603. Never a background             |

Each app brings its own feeling in its own colours, inside its own section.
Archived work gets none. The light set is defined once, in `:root` and
`.stay-light`; the gallery wears `.stay-light`, so it stays light in the dark
theme. Every text pair clears 4.5:1 in both themes; `src/lib/contrast.test.ts`
holds that.

## Every section

1. **The row.** `SectionHead`: the number and the title together, in mono, at
   most one quiet link on the right.
2. **One lead object.** The thing the section is about.
3. **Notes.** Short text beside or under it. The proof first, and the largest.
4. **At most one link out.**

About four chunks per block. The same layout in every section.

| Layout             | Columns on a wide screen | Used by                      |
| ------------------ | ------------------------ | ---------------------------- |
| Lead and notes     | lead 7, notes 5          | Selected work, More projects |
| Portrait and words | portrait 5, words 7      | Who I am                     |
| List               | label 3, body 9          | Where I've worked            |

Contact, the close, is the one centred section, and has words only.

## Selected work

Runway's section is editorial rather than cards: the name large across the top,
then the demo beside the notes. "How it is built" is a hairline, the
architecture diagram, and numbered points beside it, with no boxes. The diagram
is the section's one picture, drawn from the packages' real dependencies and
named without counts, so it stays true between releases. The demo plays only
on a tap.

## More projects

Each project's lead object sits in a hairline frame, not a shadow. "Read the
decisions" turns the card over on a wide screen, and only one card is turned at
a time. In the dark theme, Clio's demo keeps its own paper inside a frame of the
page's surface, and screenshots are dimmed a little.

## Phones

Everything stacks; the label comes before the lead object. A project's first
paragraph says what it is, so it is always on screen; only the rest opens in a
sheet. A sheet is the browser's own `<dialog>`, closed by Escape, a tap outside
or its close button, with focus returned to the button that opened it. In
Runway's section the demo comes straight after the name.

## Gallery

One painting opens the page, whole and unframed at its own proportions, beside
the heading, and never taller than the screen. The wall below leaves it out.

The rest hang in even 4:5 frames: one column on a phone, two from 560 px wide,
three from 860 px. A painting opens full screen over the wall, and the others
sit beside it: swipe, the arrow keys or the buttons move between them, with a
counter in a fixed place. Escape, Close or a tap on the background returns to
the same spot on the wall.

## Header and footer

The header returns on any scroll up, so the home page's sections need no second
list. The footer links to the other pages, email, a call and the site's source,
her social profiles, and a way to replay the cover.

## Motion

Nothing moves on its own. Things move only when someone acts: the header steps
aside on a scroll down, a sheet rises, a card turns. Every duration and curve
comes from one scale in `app.css`, `--motion-short` to `--motion-long` with
`--motion-enter` and `--motion-exit`. Reduced motion swaps every movement for an
instant change.

The cover shows once per tab, on the home page only, and never on a link to a
section. Enter, a scroll, a swipe up or a key down enters it, and the page
behind waits at the top. Its ochre full stop then travels to the full stop of
"learn." while the headline arrives around it.

## Checks for every change

- Does it make her more trustworthy, or less?
- One lead object, about four chunks, the proof the largest?
- Does every colour have a job?
- Light and dark both pass the contrast test?
- Would deleting it lose a fact? If not, delete it.
