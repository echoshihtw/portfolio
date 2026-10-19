# Design system: calm, with scrapbook touches

The site is a calm page of paper and ink. A few things on it are made by hand:
her notes, her tape, her prints. The calm part carries the facts. The touches
carry the person. Every section uses the same few parts, so the page reads as
one thing.

The tokens live in `src/app.css`. This file says how to use them.

## The page

- **Paper and ink.** `--canvas` is the paper, `--ink` the text, `--muted` the
  quiet text. New visitors start on paper. In the dark theme only the page goes
  dark: paper objects stay paper.
- **One grid.** Twelve columns, `--content-max` wide. A section's content
  starts at the same left edge in every section.
- **One spacing scale.** `--space-1` to `--space-8`. Nothing in between.
- **One type scale.** Geist for reading, Geist Mono for data and labels,
  Permanent Marker for her handwriting only.

## Every section

Each section is the same four parts, in this order.

1. **The row.** `SectionHead`: a hairline, the number, the title in mono, and
   at most one quiet link on the right. No large headings.
2. **One lead object.** The thing the section is about: the Runway print, the
   Clio demo, the portrait, the list of jobs.
3. **Notes.** Short text beside or under the lead object. Facts first.
4. **At most one link out,** quiet, at the end.

Two layouts, so sections line up:

| Layout         | Columns on a wide screen | Used by                                |
| -------------- | ------------------------ | -------------------------------------- |
| Lead and notes | lead 7, notes 5          | Selected work, More projects, Who I am |
| List           | label 3, body 9          | Where I've worked, What I work with    |

On a phone both stack. The name or label comes first, then the lead object,
so the lead never appears without context.

## Scrapbook touches

Each medium has one job.

| Medium                   | Its job                                   |
| ------------------------ | ----------------------------------------- |
| Sharpie (`--font-hand`)  | her own words: one note, or one link      |
| Washi tape               | holds one paper object to the page        |
| Coloured-pencil hatching | shades one key phrase                     |
| The oil stroke           | once on the site, under "learn"           |
| Ink prints               | behind a lead object, faded on every edge |
| Doodles and stickers     | one per section, never on text            |

**The budget per section:** one handwritten note, one piece of tape and one
doodle or sticker. Selected work is the one exception, because unfolding it
is the show.

**Never:** rows of identical boxes, grey cards around text, a stamp, more
than one tilt per section, or decoration that repeats what a word already
says.

## Colour

- **Ink and paper** for everything that informs.
- **Brush orange** (`--brush`) for her hand: notes, Sharpie links, ticks.
- **Blue** (`--primary`) for the one full stop in a headline, and focus rings.
- **Mint and white tape**, the same everywhere.
- **Runway's palette** belongs inside the Runway world only.

## Checks for every change

- Does the section still have one lead object?
- Is it inside the touch budget?
- Does it use the two layouts and the spacing scale?
- Does it read without the touches? Remove them in your head; the facts
  should still be all there.
