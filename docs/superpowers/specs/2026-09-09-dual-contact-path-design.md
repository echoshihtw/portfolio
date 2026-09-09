# Dual contact path design

Date: 2026-09-09

## Goal

Let employers and prospective contract clients act on the same portfolio without splitting Echo into two professional identities. Hiring remains the primary conversion goal, while contracting has an equally credible path.

## Placement and flow

Keep the decision point inside the existing final `Who I am` section. The personal story and portrait remain first. After them, a ruled closing block introduces:

> Available for a role or a project.

The block then presents two paths:

1. `Join your team` for product-engineering employment.
2. `Build your product` for founders and operators with an operational process that existing software does not fit.

This preserves the existing `#contact` anchor and avoids adding a second ending to the homepage. The visitor sees the same professional evidence—experience and case studies—before choosing an action.

The hero routes visitors into that evidence. Replace its generic `Email me` action with `See experience`, linking to `#work`. Keep `Download résumé` as the immediate recruiter shortcut. Remove the separate case-study link from the hero; the page flows from experience into case studies without skipping the professional ownership evidence.

## Content

The shared introduction states the through-line without repeating the hero:

> I work on operational software: defining what it should hold, building it, and establishing the foundations that let it keep shipping.

The employment path describes product-engineering roles involving operational software, frontend architecture, and shared engineering foundations. Its actions are `Discuss a role` and `Download résumé`.

The project path addresses founders and operators with one important process that existing software does not fit. Its actions are `Discuss a project` and `See Clio`.

The two email actions use distinct subject lines so the recipient intent is visible before opening the message:

- `Product engineering role`
- `Product project`

The existing generic `Email me` and `Book a call` row is replaced. Calendly remains available in the global footer and does not need to be repeated here.

## Visual treatment

Use only the current design system in `src/app.css` and established component conventions:

- existing ink, muted, surface, border, and accent tokens;
- current serif heading and sans/mono metadata hierarchy;
- thin rules and flat surfaces, with no shadows or new decorative effects;
- existing `.btn`, `.link-cta`, spacing, focus, and hover behavior;
- one-column mobile layout and two-column desktop layout at the existing 900px breakpoint.

The two paths receive equal visual width. Hiring remains primary through content order: it appears first and carries the résumé action.

Each path is a horizontal image-and-copy card, following the useful structural principle in the Pangram reference without copying its brand language:

- a 44% tonal illustration field on the left;
- a 56% concise copy and action field on the right;
- a blue field for `Join your team` and an orange-red field for `Build your product`, derived with `color-mix()` from the existing theme tokens;
- a restrained halftone texture over the illustration field;
- the existing card radius, with the established large asymmetric corner on the second card.

The role illustration is wordless: three people supported by shared foundation layers. The project illustration is also wordless: a dashed empty circle and arrow becoming one finished product panel, representing zero to one. Both use the same minimal line weight and monochrome treatment. Card text, not diagram labels, explains the meaning.

Light mode uses restrained color mixes so the cards do not compete with the blue-backed portrait. Dark mode uses the same component rules and theme-token substitution, with mixes adjusted only as required for surface separation and contrast.

## Source and component changes

- `src/content/portfolio.config.ts`: replace the single closing body with structured heading, introduction, and two path definitions. Keep the email and résumé filename in configuration. Point the hero’s primary flow at `#work`.
- `src/lib/components/sections/AboutMe.svelte`: render the closing heading and two responsive image-and-copy paths after the personal content. Import and track résumé downloads. Remove the local Calendly dependency.
- `src/lib/components/sections/hero/Hero.svelte`: replace the email-first action group with `See experience` and `Download résumé`; remove unused email tracking from this component.
- No new route, component, dependency, or page section.
- Do not modify generated résumé outputs as part of this change.

## Accessibility and behavior

- Use a heading below the section's existing `h2` so the outline remains ordered.
- Make each card one descriptive email link with its visible action text included in the accessible name. Keep résumé and Clio as separate secondary links below their corresponding cards; do not nest links.
- Give email links complete `mailto:` URLs with encoded subjects.
- Preserve visible keyboard focus through the existing link/button styles.
- Keep path labels meaningful without relying on color, position, or illustration.
- On narrow screens, stack the employment path before the project path.

## Verification

- Add a focused component test only if the existing test setup supports Svelte component rendering without introducing new infrastructure. Otherwise, cover the configuration shape with a lightweight unit test and verify rendered behavior through the existing build and browser/a11y checks.
- Run formatting, type checking, unit tests, production build, and the existing accessibility audit.
- Inspect desktop and mobile layouts and verify all four actions point to the intended destinations.

## Out of scope

- Redesigning the hero beyond its action hierarchy.
- Adding separate hiring or services pages.
- Adding a contact form, CRM, scheduling flow, or new analytics service.
- Rewriting the résumé or experience content in this change.

## Decisions on review, 2026-09-09

Reviewed with Echo before implementation. The sections above are the draft;
where they differ, this list is what was built.

- **Two doors confirmed.** Echo is open to employment, to contract work and
  to a founding-partner seat, so the close has a real second audience rather
  than a hedge.
- **The shared intro line is cut.** "I work on operational software: defining
  what it should hold, building it, and establishing the foundations…" is a
  colon followed by a three-part list, the pattern this page's own slop audit
  named as the loudest tell, and it restated the hero. The heading and the two
  cards carry it instead.
- **Flat cards. No illustrations, no colour fields, no halftone.** The site's
  vocabulary is a hairline, flat surfaces and mono labels; tinted panels would
  have been the only marketing-shaped thing on the page, and the two proposed
  diagrams (three people over shared layers; a zero-to-one arrow) are the kind
  of stock image any consultancy could use. The second card takes the site's
  existing one-big-corner utility, nothing new.
- **The hero keeps its actions.** "Email me", "See the case studies" and
  "Download résumé" all stay. Hiring is the primary goal, and a reader
  convinced at the top should not have to reach the bottom of the page to
  write. The hero's email now carries the role subject, so all three email
  links on the site state their intent.
- **The second door is wider than "Build your product".** Contract work is as
  often a scoped piece on a product that already exists as a product from
  zero. Title "Hire me for a project", kicker "Contract, or founding partner",
  and copy naming all three shapes, with Clio and SPIN.FASHION as the two ends
  of the range.
- **"Book a call" leaves the close**, as the draft said; Calendly stays in the
  global footer.

## Verification performed

`npm run check`, eslint and prettier clean. 37 unit tests pass, including a
new `src/content/closingPaths.test.ts` covering the config shape: two paths,
hiring first, distinct email subjects, and the hero's subject in step with the
role path. Production build succeeds. `npm run audit:a11y` reports no WCAG 2.2
AA violations across 8 page renders. Rendered and measured at 1200px and 390px:
cards equal width side by side, stacked on the phone with employment first, all
four actions resolving to the intended destinations.
