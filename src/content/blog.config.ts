// Writing lives here as data, same pattern as projects/skills config —
// not a markdown pipeline, since one or two real posts don't justify one.
// A post is sections: an optional heading, then either paragraphs or one
// code block (not both — a section is prose or an artifact, not a mix).
// Add a post here and it's live at /blog/<slug> with no other wiring.

export type BlogSection =
  | { heading?: string; paragraphs: string[]; code?: undefined }
  | { heading?: string; code: string; paragraphs?: undefined };
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
      "260 tests were passing. Four screenshots of a demo salon found four bugs anyway — two of them cosmetic, two of them a test that looked like coverage without providing it, and a component that had quietly been handed responsibility for something outside it.",
    sections: [
      {
        paragraphs: [
          "260 tests were passing. I took four screenshots of a demo salon anyway, and found four bugs that every one of those tests had missed.",
          "Two were small: an org name truncating mid-character because a component had hand-copied a shared label width and gotten the number wrong, and a currency label reading NTD$4,400 NTD because a prefix got added twice. Both were real, both shipped, both were one-line fixes once seen. Neither one taught me anything — carelessness caught late isn't a story, just an apology.",
          "The other two were different. Each looked, from the code, like it was already handled. Each wasn't.",
        ],
      },
      {
        heading: "A test that measured coverage without providing it",
        paragraphs: [
          "Switch the app to English, and the visit history still rendered dates as 西元2026年07月25日 (週六). Two cards above it, a birthday field in the same screen formatted correctly.",
          'There were two definitions of "format a date" in the codebase: a shared helper that takes a language argument, and a one-off — a moment call plus a hand-written Chinese-only mapper — that doesn\'t. Nobody had reason to look at the second one, because it worked; it just always produced the same output regardless of what language you asked for.',
          "The part worth keeping: the existing test for this component had an i18n mock that returned only the translation function, never a language. There was never a code path in the test suite where the language could have mattered. The test wasn't wrong — it ran, it passed, it looked like i18n coverage sitting right there in the test file. It was incomplete in a way that was indistinguishable from complete, until you asked the one question the mock had quietly made unaskable.",
          "Fixing the bug meant fixing the mock first — giving it a language to lie about — before I could write an assertion that had any chance of failing. Then came a dedicated formatter for visit dates (which keep the weekday, because a salon reads its history by day of week), the general-purpose one left alone, and the hand-written mapper deleted along with the codebase's last use of moment.",
        ],
      },
      {
        heading:
          "A component that had been handed a responsibility nobody assigned it",
        paragraphs: [
          'The client list has a filter row: designer, start date, end date. "Delete client" was the fourth item in that row — same visual weight as three things that narrow a list, except this one doesn\'t narrow anything, it deletes a person and their entire visit history. It sat in keyboard tab order between two date pickers, on a screen where the design system calls for one primary destructive action at most.',
          "The placement bug was the visible half. The other half was in the component itself: the records table — a component whose job is to render rows — had been given a client ID, a client name, and a callback for when the client is deleted. Nothing in the table's own responsibility needs any of that. It had accumulated the ability to delete the very thing it was displaying, one prop at a time, because each addition looked small next to the one before it.",
          "Moving the button to the bottom of the client's own page, as a quiet action below everything else, also meant the table lost three props and a hook it never should have needed. The UX fix and the boundary fix turned out to be the same fix, which is usually a sign the placement was wrong for the same reason the ownership was.",
        ],
      },
      {
        heading: "What both of these actually are",
        paragraphs: [
          "A mock that returns a function but not a language. A table that knows how to delete a person. Neither one announces itself as broken — both pass their tests, both render, both look, from a distance, like exactly what they claim to be. The gap wasn't between working and not working. It was between what the interface said it did and what it had quietly been asked to do instead.",
          "Screenshots caught these because a screenshot doesn't consult the interface — it shows the output. That's a narrower fix than it sounds like: it doesn't mean test less carefully, it means occasionally check whether the thing you're trusting to prove correctness is still measuring the dimension you think it is.",
        ],
      },
    ],
  },
  {
    slug: "the-tag-format-that-cost-a-dozen-cycles",
    title: "The tag format that cost a dozen cycles",
    date: "2026-08-21",
    excerpt:
      "release-please kept crashing on a preference I hadn't noticed I'd made. Nine fixes in, the answer wasn't in the docs I was rereading — it was in a sibling repo that had already solved this and never fought the tool to begin with.",
    sections: [
      {
        paragraphs: [
          "I wanted release tags to read v1.0.0. release-please, the tool doing the tagging, wanted lockerbie-website@0.1.0. I spent most of a day arguing with it before I noticed that wasn't a disagreement — it was a default, and I was the one deviating.",
        ],
      },
      {
        heading: "Every fix bought exactly one more failure",
        paragraphs: [
          "The first errors looked like plumbing: a shallow git checkout missing branch refs, a missing label, a stale beta tag left over from an earlier attempt. Each had a specific cause, each got a specific fix, and each fix uncovered the next problem in the chain — a manifest with no version anchor, then a config missing a required packages block, then a changelog setting that only works once a prior tag already exists.",
          "None of that was wrong to fix. It's what happened after: Cannot read properties of undefined (reading 'replace'). release-please's node release type, run with the tag prefix stripped out the way I wanted it, hit a code path that assumes a component name is always there and crashes when it isn't. That's not a config mistake. That's the tool telling you, badly, that the path you're on doesn't exist.",
        ],
      },
      {
        heading: "The fix was already running, in a repo I hadn't looked at",
        paragraphs: [
          "A sibling repository had release-please working the entire time I was debugging this one — no elaborate config, just a release type declared inline. It used python, which (like simple) never derives a component name to begin with, so the crash I'd spent a day chasing simply had no code path to occur on.",
          'That comparison did more than an hour of documentation would have. Not because the docs were wrong, but because a working example answers a different question than a reference page does: not "what does this option mean" but "what does this actually look like when nobody is fighting it." I\'d been reading about the tool. I hadn\'t looked at what the tool wanted to do by default until I had one right next to me already doing it.',
        ],
      },
      {
        heading: "The other half: read the schema, not your memory of it",
        paragraphs: [
          "Fixing it meant switching from a bare tag to a component-prefixed one — lockerbie-website@0.1.0 instead of v0.1.0 — and getting there took reading release-please's actual JSON schema instead of continuing to guess at config shape from half-remembered examples. Two of the nine failures were exactly that: a parameter that only applies under a different setting, a nested block whose required shape I'd assumed rather than checked.",
          "The final config is small:",
        ],
      },
      {
        code: '{\n  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",\n  "bootstrap-sha": "<main HEAD at reset>",\n  "commit-search-depth": 500,\n  "packages": {\n    ".": {\n      "release-type": "node",\n      "component": "lockerbie-website",\n      "tag-separator": "@",\n      "include-v-in-tag": false\n    }\n  }\n}',
      },
      {
        heading: "What generalizes",
        paragraphs: [
          "A tool's default isn't an opinion to negotiate with — it's the path every maintainer, every test, and every edge case in the codebase has already been run against. Deviating from it is allowed, but it isn't free, and the cost doesn't show up as a warning. It shows up nine fixes later as an undefined property crash that reads like a bug in the tool.",
          "The way out of that wasn't trying harder on the same approach. It was two separate moves: find something that already works and look at what it does differently from what you're doing, and when you're still stuck, read the schema instead of your memory of the schema. Neither is exotic. Both were faster than the day I spent doing neither.",
        ],
      },
    ],
  },
];
