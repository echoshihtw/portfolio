// Writing lives here as data, same pattern as projects/skills config —
// not a markdown pipeline, since one or two real posts don't justify one.
// A post is sections: an optional heading, then one or more paragraphs.
// Add a post here and it's live at /blog/<slug> with no other wiring.

export type BlogSection = { heading?: string; paragraphs: string[] };
export type BlogPost = {
  slug: string;
  title: string;
  // ISO date, shown formatted on the page.
  date: string;
  // One line for the index list — what the post is actually about, not a
  // teaser that makes you click to find out.
  excerpt: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "four-bugs",
    title: "Four bugs, found by photographing the app",
    date: "2026-08-21",
    excerpt:
      "260 tests were passing. Four screenshots of a demo salon found four bugs anyway — a truncated name, a date in the wrong language, a misplaced currency symbol, a delete button in the wrong row.",
    sections: [
      {
        paragraphs: [
          "260 tests were passing. I took four screenshots of a demo salon anyway, and found four bugs that every one of those tests had missed.",
          'None of them were exotic. A truncated name. A date in the wrong language. A dollar sign in the wrong place. A delete button in the wrong row. The kind of thing a test suite doesn\'t fail on, because nobody wrote an assertion for "does this look right" — only for "does this return the right value." A screenshot doesn\'t know the difference. It shows you both.',
        ],
      },
      {
        heading: "1. The salon's name was chopped in the sidebar",
        paragraphs: [
          "The sidebar has a component for the org name and a component for every nav item below it. They're supposed to share one style. One of them didn't — the org-name component had hand-copied the label style instead of importing the shared one, and copied the wrong number: 120px, where the real value was 160px. So the org name had less room than the words underneath it, and nothing was truncating gracefully — a long name just got cut mid-character.",
          "Any salon with a name longer than about fifteen characters had been seeing this since it shipped. Nothing in the test suite renders a name that long, so nothing caught it.",
          "Fixed by importing the shared style instead of re-guessing it, which came with text-overflow: ellipsis for free, plus a title attribute so the full name is still readable on hover. The untruncated string stays in the DOM either way — the ellipsis is CSS, not a shorter string — so nothing about this touches accessibility.",
        ],
      },
      {
        heading: "2. Visit dates ignored the selected language",
        paragraphs: [
          "Switch the app to English, and the visit history still rendered dates as 西元2026年07月25日 (週六). Two cards above it, a birthday field in the same screen formatted correctly.",
          'Turned out there were two definitions of "format a date" living in the codebase: a shared helper that takes a language argument, and a one-off — a moment call plus a hand-written Chinese-only mapper — that doesn\'t. Nobody had reason to look at the second one, because it worked; it just always produced the same output regardless of what language you asked for.',
          "The fix added a dedicated formatter for visit dates (which need the day of week — a salon reads its history that way), left the general-purpose one alone, and deleted the hand-written mapper along with the last remaining use of moment in the codebase.",
          "The part I'm more interested in than the fix: the existing test for this component had an i18n mock that returned only the translation function, never a language. So there was never a code path in the test suite where the language could have mattered — the test wasn't wrong, it was incomplete in a way that looked like coverage. Fixing it meant changing the mock before I could write an assertion that could actually fail.",
        ],
      },
      {
        heading: "3. The revenue figure read NTD$4,400 NTD",
        paragraphs: [
          'The currency formatter already prefixes amounts with NTD$. The revenue page appended " NTD" on top of that, on what is probably the single number a salon owner looks at most on that screen. One-line fix. I\'m including it because "the flagship number on the page had a typo in its own currency label" is exactly the kind of thing that\'s invisible until you look at a picture of the actual screen, and completely obvious the moment you do.',
        ],
      },
      {
        heading: '4. "Delete client" sat in the filter row',
        paragraphs: [
          "The client list has a filter row: designer, start date, end date. Delete client was the fourth item in that row — same visual weight as three things that narrow a list, except this one doesn't narrow anything, it deletes a person and their entire visit history. It sat in keyboard tab order between two date pickers, and it put a second red destructive button on a screen where the design system calls for one primary action at most.",
          "Moved it to the bottom of the client's own page, as a quiet button below everything else, with its confirmation dialog — which names the client — moving with it. Destructive actions should be findable when you're looking for them, not encountered while you're doing something else.",
          "This one was also a boundary problem, not just a placement problem: the records table component had been given direct knowledge of how to delete a client — a prop for the ID, a prop for the name, a callback for when it's done. A table shouldn't know that. Moving the button out of it meant the table lost three props and a hook it never should have needed.",
        ],
      },
      {
        heading: "What I'd generalize from this",
        paragraphs: [
          'A test suite verifies the assertions someone thought to write. It says nothing about the ones nobody imagined — a locale nobody tested, a name length nobody picked, a screen nobody looked at after the ticket closed. 260 green checkmarks and four visible bugs is not a contradiction; it\'s what happens when "does it work" and "does it look right" are treated as the same question. They aren\'t, and only one of them shows up in npm test.',
          "The fix isn't more tests, exactly — it's an occasional, deliberate walk through the actual product as a person would use it, in the languages and edge cases a person would actually hit. Four screenshots of one demo salon cost about twenty minutes. It found four things a real user would have hit within their first week.",
        ],
      },
    ],
  },
];
