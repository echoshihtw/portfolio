---
title: "Four bugs, found by photographing the app"
date: "2026-08-21"
excerpt: "260 tests were passing. Four screenshots of a demo salon found four bugs anyway — two of them cosmetic, two of them a test that looked like coverage without providing it, and a component that had quietly been handed responsibility for something outside it."
order: 2
---

260 tests were passing. I took four screenshots of a demo salon anyway, and found four bugs that every one of those tests had missed.

Two were small: an org name truncating mid-character because a component had hand-copied a shared label width and gotten the number wrong, and a currency label reading NTD$4,400 NTD because a prefix got added twice. Both were real, both shipped, both were one-line fixes once seen. Neither one taught me anything — carelessness caught late isn't a story, just an apology.

The other two were different. Each looked, from the code, like it was already handled. Each wasn't.

## A test that measured coverage without providing it

Switch the app to English, and the visit history still rendered dates as 西元2026年07月25日 (週六). Two cards above it, a birthday field in the same screen formatted correctly.

There were two definitions of "format a date" in the codebase: a shared helper that takes a language argument, and a one-off — a moment call plus a hand-written Chinese-only mapper — that doesn't. Nobody had reason to look at the second one, because it worked; it just always produced the same output regardless of what language you asked for.

The part worth keeping: the existing test for this component had an i18n mock that returned only the translation function, never a language. There was never a code path in the test suite where the language could have mattered. The test wasn't wrong — it ran, it passed, it looked like i18n coverage sitting right there in the test file. It was incomplete in a way that was indistinguishable from complete, until you asked the one question the mock had quietly made unaskable.

Fixing the bug meant fixing the mock first — giving it a language to lie about — before I could write an assertion that had any chance of failing. Then came a dedicated formatter for visit dates (which keep the weekday, because a salon reads its history by day of week), the general-purpose one left alone, and the hand-written mapper deleted along with the codebase's last use of moment.

## A component that had been handed a responsibility nobody assigned it

The client list has a filter row: designer, start date, end date. "Delete client" was the fourth item in that row — same visual weight as three things that narrow a list, except this one doesn't narrow anything, it deletes a person and their entire visit history. It sat in keyboard tab order between two date pickers, on a screen where the design system calls for one primary destructive action at most.

The placement bug was the visible half. The other half was in the component itself: the records table — a component whose job is to render rows — had been given a client ID, a client name, and a callback for when the client is deleted. Nothing in the table's own responsibility needs any of that. It had accumulated the ability to delete the very thing it was displaying, one prop at a time, because each addition looked small next to the one before it.

Moving the button to the bottom of the client's own page, as a quiet action below everything else, also meant the table lost three props and a hook it never should have needed. The UX fix and the boundary fix turned out to be the same fix, which is usually a sign the placement was wrong for the same reason the ownership was.

## What both of these actually are

A mock that returns a function but not a language. A table that knows how to delete a person. Neither one announces itself as broken — both pass their tests, both render, both look, from a distance, like exactly what they claim to be. The gap wasn't between working and not working. It was between what the interface said it did and what it had quietly been asked to do instead.

Screenshots caught these because a screenshot doesn't consult the interface — it shows the output. That's a narrower fix than it sounds like: it doesn't mean test less carefully, it means occasionally check whether the thing you're trusting to prove correctness is still measuring the dimension you think it is.
