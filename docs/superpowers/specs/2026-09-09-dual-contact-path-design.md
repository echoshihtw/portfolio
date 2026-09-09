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

## Source and component changes

- `src/content/portfolio.config.ts`: replace the single closing body with structured heading, introduction, and two path definitions. Keep the email and résumé filename in configuration.
- `src/lib/components/sections/AboutMe.svelte`: render the closing heading and two responsive paths after the personal content. Import and track résumé downloads. Remove the local Calendly dependency.
- No new route, component, dependency, or page section.
- Do not modify generated résumé outputs as part of this change.

## Accessibility and behavior

- Use a heading below the section's existing `h2` so the outline remains ordered.
- Use ordinary links for email, résumé, and Clio; do not make the cards themselves clickable.
- Give email links complete `mailto:` URLs with encoded subjects.
- Preserve visible keyboard focus through the existing link/button styles.
- Keep path labels meaningful without relying on color or position.
- On narrow screens, stack the employment path before the project path.

## Verification

- Add a focused component test only if the existing test setup supports Svelte component rendering without introducing new infrastructure. Otherwise, cover the configuration shape with a lightweight unit test and verify rendered behavior through the existing build and browser/a11y checks.
- Run formatting, type checking, unit tests, production build, and the existing accessibility audit.
- Inspect desktop and mobile layouts and verify all four actions point to the intended destinations.

## Out of scope

- Redesigning the hero or other homepage sections.
- Adding separate hiring or services pages.
- Adding a contact form, CRM, scheduling flow, or new analytics service.
- Rewriting the résumé or experience content in this change.
