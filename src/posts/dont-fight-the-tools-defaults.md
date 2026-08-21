---
title: Don't fight the tool's defaults
seoTitle: "release-please: Cannot read properties of undefined (reading 'replace')"
date: 2026-07-08
excerpt: "A flag that looked cosmetic — include-component-in-tag: false — was actually emptying a value release-please's node logic depends on internally. No amount of correct configuration fixed that. The fix was a release type whose internal model never needed the value to begin with."
order: 1
---

The repo was already cutting releases, tagged `web-app@0.1.0`. I wanted them to read `v1.0.0` instead, so I changed the config. I spent most of a day discovering why that wasn't a setting I had got wrong — it was the default, working as designed, and I was the one deviating from it.

## Every fix bought exactly one more failure

The first errors were plumbing, most of them side effects of changing a scheme that already had history behind it — a shallow checkout, a missing label, a leftover tag in the old format. Each fixed, each revealing the next problem, until: `Cannot read properties of undefined (reading 'replace')`. release-please's `node` release type, run with the tag prefix stripped out the way I wanted it, hit a code path that assumes a component name is always there and crashes when it isn't. That's not a config mistake. That's the tool telling you, badly, that the path you're on doesn't exist.

## The flag that wasn't a flag

`include-component-in-tag: false` reads like a display option — don't show the component in the tag, keep everything else the same. It isn't. `node` derives its component from `package.json`'s name and uses that value internally, not just when rendering a tag. Turning the display off doesn't hide the value. It empties it, and `node`'s release logic has no path that handles an empty one — hence `Cannot read properties of undefined (reading 'replace')`.

`python` and `simple` aren't `node` with a different default. They never derive a component at all — there's no internal value to empty, because the concept doesn't exist in their release logic. That's not a configuration difference between the release types. It's an architectural one, and no flag on `node` crosses it.

## The fix was already running, in a repo I hadn't looked at

A sibling repository had release-please working the entire time I was debugging this one — no elaborate config, just `python` declared inline. Once I understood why that worked, the fix stopped being a config problem. Bare tags were never a `node` setting away; they needed a release type that had never needed a component to begin with.

A working example earns its keep here in a way documentation can't: a reference page answers "what does this option do," but only a running instance answers "what does this actually look like when nothing is fighting it." I had been reading about the tool for a day. I understood it in the time it took to read one file that already worked.

## Read the schema, not your memory of it

The rest of the fix — switching to a component-prefixed tag, `web-app@0.1.0` instead of `v0.1.0` — came from release-please's actual JSON schema, not from half-remembered examples of what the config should look like. The final version is small:

```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "bootstrap-sha": "<main HEAD at reset>",
  "commit-search-depth": 500,
  "packages": {
    ".": {
      "release-type": "node",
      "component": "web-app",
      "tag-separator": "@",
      "include-v-in-tag": false
    }
  }
}
```

## What I actually learned

1. A flag can look cosmetic while quietly depending on load-bearing internal state. `include-component-in-tag` reads as formatting; what it actually controls is whether a value `node`'s own logic assumes exists.
2. Different implementations of a "similar" feature can have different internal models, not just different defaults — `node` derives a component, `python`/`simple` never do. That's architecture, not configuration.
3. No amount of correct configuration fixes an architectural mismatch. Once the crash traced back to `node`'s internal assumption, the fix was picking a release type without that assumption, not tuning `node` further.
4. A known-working example answers a different question than documentation does — not what an option means, but what the tool looks like when nobody is fighting it.
5. When each fix reveals a new failure with no change in kind, that's a signal the current approach is structurally wrong, not almost right.
