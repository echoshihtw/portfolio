import { portraitSilhouette } from "./portrait.silhouette";
// The personal half of the landing page. Home is where people arrive, so
// this is where Echo is introduced: the engineering hero makes the
// professional case above it, and this says who made it.
//
// There is deliberately no sentence here about why she paints. She was asked
// directly, gave an answer in conversation, and then declined to publish it.
// The section shows her and states facts; the reader draws their own
// conclusion. Adding a motive line later means asking her for one, not
// writing one.
//
// Every fact is hers, and the tense is present throughout: she still paints,
// with work from January 2026, so nothing here says "used to".
export const aboutMeConfig = {
  // The eyebrow, in the reference's phrasing. The name itself is in the hero
  // kicker at the top of the page, so it is not repeated here.
  kicker: "Who I am",

  // Her own words, from the moment she corrected an earlier draft: "just my
  // creations". Two words, and deliberately not a claim. It is the
  // counterpart to the hero's "I own it, end to end" directly above: that
  // makes the professional argument, this declines to make any.
  // The accent is the full stop, the way the reference sets "Pangram." and
  // nothing else: a whole name in one weight, then one coloured mark to end
  // it. The glitch that used to ride on "me" is gone with it; a glitching
  // period is a period.
  heading: [{ text: "Just me" }, { text: ".", accent: true }] as {
    text: string;
    accent?: boolean;
  }[],

  // Hers, and only hers.
  //
  // The first line is the story she told on 2026-09-06: she started out in
  // restaurants doing customer relations, and decided she should be doing
  // better with her time and with what she is really good at, which is
  // resolving problems. Her motive, in her framing, not an inference. The
  // wording is close to how she said it; the only words that are mine are
  // the joins.
  //
  // "Resolving problems" was the first answer and is gone, because everyone
  // claims it. Observing, seeing patterns and abstraction are hers too, from
  // the same conversation, and they are the specific version: they say HOW
  // she resolves anything, which is the part nobody else's sentence has.
  //
  // The clause before them earns the whole thing. Customer relations is
  // observation of people, so the sentence says she is doing what she always
  // did against harder material, rather than announcing a trait she wants
  // believed. "Turning them into" is a join; the rest is hers.
  //
  // The degree comes from resume.md:66, and the languages from the line
  // beside it. Not the CV's summary paragraph: that is already the hero's
  // support line almost verbatim.
  //
  // This is also what "self-taught" was reaching for in an earlier draft.
  // A career that starts in customer relations and arrives at Postgres row
  // level security says it without the word, and shows the turn rather than
  // asserting the trait.
  //
  // The remote clause is the one idea worth keeping from an older freelance
  // pitch, which sold the languages as "bridging communication gaps between
  // Asia and the Western world". Same point, stated as something checkable:
  // resume.md lists Independent/Freelance as Remote 2020-2024 and
  // SPIN.FASHION as Singapore, Remote. "Most of my career" was drafted and
  // cut, because Find Recruiter and Lockerbie are both listed as Taipei.
  // Rewritten after a slop audit that these drafts failed. Both had the same
  // shape: a colon followed by a three-part list, twice within four lines,
  // which is the loudest tell there is. Neither used a contraction while her
  // older copy is full of them ("The macOS build couldn't ship", "What I'd
  // do differently"), so the page changed voice halfway down. "At some point
  // I decided" went too: it is a hedge, and either the date is known or it
  // is not worth gesturing at.
  story: [
    // Three beats, not five, after Echo said the paragraphs read as
    // individuals: degree and languages, then the software, then painting.
    // Each reaches back one word instead of being introduced, so the links
    // are inside the sentences rather than in connective tissue.
    //
    // "The software we used" picks up the job named at the end of the
    // paragraph above, so the break becomes the turn. "I paint too" is her own
    // hinge: too, as in as well as all that. A bridge sentence was drafted
    // ("What I kept noticing was the software") and cut on 2026-09-19: the
    // jump from restaurants to software is stronger with nothing in between,
    // because it explains a connection the reader makes in the gap anyway.
    //
    // Languages moved up to sit with the degree. As their own paragraph in the
    // middle they were the one block that is not a step in the sequence, which
    // is what made the section read as a list.
    //
    // Register is hers: casual, short, fragments, "could've". Three composed
    // sentences were written and rejected the same day, "so most of what I
    // build gets explained to someone who wasn't in the room", "ideas into
    // something you can see", and a line interpreting customer relations as
    // "working out what someone means before they've found the words for it".
    // The last one is the clearest case of the rule at the top of this file:
    // it assigned a meaning to her work that she never gave.
    //
    // No timezone line. "Remote since 2020" was drafted and caught by Echo as
    // false: Lockerbie was on-site at a coworking space. "Across time zones
    // since 2020" is the true version and had no home in three beats; the
    // closing section already ends on "Remote, from Taiwan".
    "BA in Italian language and culture. Mandarin and Taiwanese are native, English at work. Then restaurants, customer relations.",
    "The software we used could've been better, and I could see how. So I started writing it. I like software you don't have to be taught.",
    "I paint too, since 2012. At my desk, on trains and planes, a few months in Florence. One part logic, one part emotion.",
  ],

  // The torn-paper edge from Echo's edited version, grafted onto the colour
  // of the untouched photograph (scripts/graft.swift: alpha from one image,
  // RGB from the other, in pixel space). The edited file had the edge she
  // wanted but had been re-rendered, sharper than the original and with
  // detail that was never photographed.
  //
  // Transparent rather than flattened onto a page colour, because it now
  // sits on the home page, which has two themes.
  // A transparent PNG cut to an organic capsule, shown exactly as exported,
  // with a flat cobalt capsule behind it. See Portrait.svelte.
  // Served at the size the page shows it (at most 460 CSS px, so 960 for
  // a 2x screen) as a plain rectangular WebP, 33 KB against the 1.5 MB
  // before; the capsule shape is a clip path, not the file, so the photo
  // carries no alpha and needs no cutting out. The filename names the
  // person, the alt names her again in words, and the width and height
  // reserve the box: what an image on a personal site needs for a search
  // engine to attach it to the right name.
  portrait: {
    src: "assets/echo-shih-portrait.webp",
    alt: "Echo Shih, a studio portrait against a dark background.",
    width: 960,
    height: 960,
    ...portraitSilhouette,
  },

  // One real action, because it is the only thing here that leaves the page.
  cta: { label: "See the paintings", href: "/gallery" },

  // A quiet index for people who skim instead of scrolling. Deliberately not
  // buttons: Work, Projects and Contact are further down this same page, and
  // giving them the same weight as the one link that goes somewhere else
  // would flatten the difference between them.
  jumps: [
    { label: "Experience", href: "#work" },
    { label: "Case studies", href: "#projects" },
  ],
} as const;
