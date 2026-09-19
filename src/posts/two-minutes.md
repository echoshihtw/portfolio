---
title: "The two minutes before a client sits down"
date: "2026-09-14"
excerpt: "A friend lost years of salon records when a hard drive died. She had tried the products that exist and found all of them too complicated. It turned out most of the work was leaving things out."
order: 3
draft: true
---

<!--
SCAFFOLD, 2026-09-14. Every quoted sentence below is Echo's own, from the
career notes, with its source in brackets. Everything in [Echo: ...] is a
prompt for a paragraph only she can write. Delete this block and every
prompt before publishing.

Guardrails, from the notes:
- No owner's name, no salon's name. "A salon in Tainan" carries it.
  (portfolio-audit-2026-08-10)
- The row-level-security finding and its cause stay unpublished.
  (private-full-detail: "Never publish.")
- 603 clients and 2,694 records: signed off by the owner, 20 Aug.
  (claims-check) Fallback if she withdraws them: "with history entered
  back to September 2024."
- Offline behaviour, as verified against the code on 14 Sep: reads work
  from the last snapshot with the time shown; a failed write says so.
  Writes do NOT wait or queue. Do not write "writes wait".
- Voice: four-bugs.md. First person, dry, short sentences, no hero's
  journey. "Judgement, not mechanism." (interview.md)
-->

A friend of mine runs a salon, and she lost years of client records when her hard drive died. She'd tried the products that exist and found all of them too complicated, so she asked me for something simple. [interview.md, intro script]

[Echo: one or two sentences on what "too complicated" meant to her. What did the existing products make her do before she could see a client's history?]

## The two minutes

She did not need more features. She needed the two minutes before a client sits down: who they are, what was done last time, what it cost. [Clio card; identity §6]

[Echo: what those two minutes look like at the front desk. Where she is standing, what she is holding, what she needs to know before the client is in the chair. This is the only paragraph in the essay that needs a scene.]

## Leaving things out

It turned out most of the work was leaving things out. [interview.md]

So Clio has no booking, no payments, no inventory, no marketing. It covers those two minutes and stops. [linkedin projects entry]

[Echo: one thing you were tempted to add, or that someone suggested, and why it stayed out. One example is worth more than the list.]

## Built for the people using it

Traditional Chinese first, English second, because it was built for the people using it rather than for a portfolio. [linkedin projects entry]

Records live in a hosted database rather than on a machine that can die, so the failure that started this cannot repeat. [linkedin projects entry]

The salon has patchy Wi-Fi. Reads work offline from the last snapshot, stamped with when it was taken, and a failed write says so. [Clio card, corrected 14 Sep]

[Echo: the banner shows the time of the snapshot. Your own code comment says why: the app keeps working from cache, so "is this current?" is the only question the user cannot answer for herself. Say that in your words, and stop. Judgement, not mechanism.]

## What told me it was right

She sat down and typed a year of her own history into it by hand. [interview.md]

People do not migrate their own history into software they are still evaluating. [identity §6]

In daily use at the salon since May 2025: 603 clients and 2,694 service records, with history typed in back to September 2024. [linkedin projects entry; numbers signed off]

## What I would do differently

Write the permission model down before building it, rather than discovering it afterwards. [private-full-detail, the public line]

[Echo: one paragraph. What "discovering it afterwards" cost, in general terms, without the incident. The lesson is the point, not the story behind it.]

[Echo: close on the two minutes. One sentence.]
