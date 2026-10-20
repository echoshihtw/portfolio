# Design system: the calm studio

A client or a hiring lead should leave feeling they can trust Echo. The page is
an example of her own software style: minimal, intuitive, cognitively friendly,
and clean underneath. Professional means clear and honest, not anonymous.

Her paintings are the foundation, not the content. They set the colours, the
balance of block and space, and the restraint. No painting appears on the home
page; the Gallery holds the work, and Who I am links to it.

The tokens live in `src/app.css`. This file says how to use them.

## The page

- **Paper and ink.** `--canvas` is the off-white paper, `--smoke` the quiet
  alternate ground, `--ink` the green-black text, `--muted` the quiet text.
- **One grid.** Twelve columns, `--content-max` wide. A section's content
  starts at the same left edge in every section.
- **One spacing scale.** `--space-1` to `--space-8`. Nothing in between.
- **One type scale.** Geist for reading, Geist Mono for data, labels and the
  big numbers. No handwriting face.

## Colour

Every colour has a job. Nothing is decoration.

| Token                              | Job                                                                                    |
| ---------------------------------- | -------------------------------------------------------------------------------------- |
| `--canvas`, `--smoke`              | the page, and every other section                                                      |
| `--ink`, `--muted`                 | text                                                                                   |
| `--accent-text`                    | her oxide red, on the one word "learn." only                                           |
| `--runway-indigo`, `--runway-mint` | Runway's band: the page's one strong colour field                                      |
| `--clio-pink`, `--clio-number`     | Clio's touch: its tag, the client in the chair, the mark under 603. Never a background |

Each app brings its own feeling in its own colours. Archived work gets none.
Every text pair clears 4.5:1 in both themes; `src/lib/contrast.test.ts` holds
that.

## Every section

1. **The row.** `SectionHead`: the number and the title together, in mono, at
   most one quiet link on the right.
2. **One lead object.** The thing the section is about.
3. **Notes.** Short text beside or under it. The proof first, and the largest.
4. **At most one link out.**

About four chunks per block. The same layout in every section.

| Layout         | Columns on a wide screen | Used by                                |
| -------------- | ------------------------ | -------------------------------------- |
| Lead and notes | lead 7, notes 5          | Selected work, More projects, Who I am |
| List           | label 3, body 9          | Where I've worked                      |

Contact, the close, is the one centred section, and has words only.

## Phones

Everything stacks; the label comes before the lead object. Anything longer than
a few lines opens in a sheet: the browser's own `<dialog>`, closed by Escape, a
tap outside or its close button, focus returned to the button that opened it.
Runway's story is a strip that scrolls sideways inside itself, with the next
card peeking; the page itself never scrolls sideways. Every card in it is one
visual, one hint or one control under it, a heading and one line.

## Gallery

Paintings hang in even 4:5 frames: one column on a phone, two from a phone held
sideways, three on a computer. A painting opens full screen over the wall, and
the others sit beside it: swipe, the arrow keys or the buttons move between
them, with a counter in a fixed place. Escape, Close or a tap on the background
returns to the same spot on the wall.

## Footer

It links only to the other pages: Blog, Gallery and Résumé. The header returns
on any scroll up, so the home page's own sections need no second list.

## Motion

Nothing moves on its own. The header steps aside while you scroll down and
returns on any scroll up. Things move only when someone taps: a sheet rises, a
card turns. Reduced motion swaps every movement for an instant change.

## Checks for every change

- Does it make her more trustworthy, or less?
- One lead object, about four chunks, the proof the largest?
- Does every colour have a job?
- Light and dark both pass the contrast test?
- Would deleting it lose a fact? If not, delete it.
