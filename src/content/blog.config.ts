// Writing lives here as data, same pattern as projects/skills config —
// not a markdown pipeline, since one or two real posts don't justify one.
// A post is sections: an optional heading, then exactly one of paragraphs,
// a code block, or a bullet list — a section is prose, an artifact, or a
// scannable summary, not a mix.
// Add a post here and it's live at /blog/<slug> with no other wiring.

export type BlogSection =
  | {
      heading?: string;
      paragraphs: string[];
      code?: undefined;
      list?: undefined;
    }
  | { heading?: string; code: string; paragraphs?: undefined; list?: undefined }
  | {
      heading?: string;
      list: string[];
      // Numbered when the items are a sequence or a ranked set of
      // takeaways; bulleted (default) when order doesn't carry meaning.
      ordered?: boolean;
      paragraphs?: undefined;
      code?: undefined;
    };
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
    slug: "dont-fight-the-tools-defaults",
    title: "Don't fight the tool's defaults",
    date: "2026-07-08",
    excerpt:
      "A flag that looked cosmetic — include-component-in-tag: false — was actually emptying a value release-please's node logic depends on internally. No amount of correct configuration fixed that. The fix was a release type whose internal model never needed the value to begin with.",
    sections: [
      {
        paragraphs: [
          "I wanted release tags to read v1.0.0. release-please, the tool doing the tagging, wanted lockerbie-website@0.1.0. I spent most of a day arguing with it before I noticed that wasn't a disagreement — it was a default, and I was the one deviating.",
        ],
      },
      {
        heading: "Every fix bought exactly one more failure",
        paragraphs: [
          "The first errors were plumbing — a shallow checkout, a missing label, a stale tag — each fixed, each revealing the next problem, until: Cannot read properties of undefined (reading 'replace'). release-please's node release type, run with the tag prefix stripped out the way I wanted it, hit a code path that assumes a component name is always there and crashes when it isn't. That's not a config mistake. That's the tool telling you, badly, that the path you're on doesn't exist.",
        ],
      },
      {
        heading: "The flag that wasn't a flag",
        paragraphs: [
          "include-component-in-tag: false reads like a display option — don't show the component in the tag, keep everything else the same. It isn't. node derives its component from package.json's name and uses that value internally, not just when rendering a tag. Turning the display off doesn't hide the value. It empties it, and node's release logic has no path that handles an empty one — hence Cannot read properties of undefined (reading 'replace').",
          "python and simple aren't node with a different default. They never derive a component at all — there's no internal value to empty, because the concept doesn't exist in their release logic. That's not a configuration difference between the release types. It's an architectural one, and no flag on node crosses it.",
        ],
      },
      {
        heading: "The fix was already running, in a repo I hadn't looked at",
        paragraphs: [
          "A sibling repository had release-please working the entire time I was debugging this one — no elaborate config, just python declared inline. Once I understood why that worked, the fix stopped being a config problem. Bare tags were never a node setting away; they needed a release type that had never needed a component to begin with.",
          'A working example earns its keep here in a way documentation can\'t: a reference page answers "what does this option do," but only a running instance answers "what does this actually look like when nothing is fighting it." I had been reading about the tool for a day. I understood it in the time it took to read one file that already worked.',
        ],
      },
      {
        heading: "Read the schema, not your memory of it",
        paragraphs: [
          "The rest of the fix — switching to a component-prefixed tag, lockerbie-website@0.1.0 instead of v0.1.0 — came from release-please's actual JSON schema, not from half-remembered examples of what the config should look like. The final version is small:",
        ],
      },
      {
        code: '{\n  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",\n  "bootstrap-sha": "<main HEAD at reset>",\n  "commit-search-depth": 500,\n  "packages": {\n    ".": {\n      "release-type": "node",\n      "component": "lockerbie-website",\n      "tag-separator": "@",\n      "include-v-in-tag": false\n    }\n  }\n}',
      },
      {
        heading: "What I actually learned",
        ordered: true,
        list: [
          "A flag can look cosmetic while quietly depending on load-bearing internal state. include-component-in-tag reads as formatting; what it actually controls is whether a value node's own logic assumes exists.",
          'Different implementations of a "similar" feature can have different internal models, not just different defaults — node derives a component, python/simple never do. That\'s architecture, not configuration.',
          "No amount of correct configuration fixes an architectural mismatch. Once the crash traced back to node's internal assumption, the fix was picking a release type without that assumption, not tuning node further.",
          "A known-working example answers a different question than documentation does — not what an option means, but what the tool looks like when nobody is fighting it.",
          "When each fix reveals a new failure with no change in kind, that's a signal the current approach is structurally wrong, not almost right.",
        ],
      },
    ],
  },
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
];
