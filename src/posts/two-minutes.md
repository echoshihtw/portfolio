---
title: "The two minutes before a client sits down"
date: "2026-09-14"
excerpt: "A salon app that covers the two minutes before a client sits down, and stops."
order: 3
draft: true
---

A friend of mine runs a salon, and she lost years of client records when her hard drive died. She'd tried the products that exist, found them too complicated, and didn't want to pay for features she'd never use. So she asked me for something simple.

## The two minutes

She did not need more features. She needed the two minutes before a client sits down. In those two minutes she checks the client's record: when they last came in, and how much they've spent.

It turned out most of the work was leaving things out.

Clio has no booking, no payments, no inventory, no marketing. It covers those two minutes and stops.

One thing left out was the first thing she asked for. She wanted something that ran on her own computer, because she didn't want anyone else holding her clients' details. I said I'd try. But we live in different cities, and before building it properly I wanted to know whether she'd like it at all, so the first version was online. I told her it would sit on a cloud server. She was fine with that for now, and it has stayed that way.

I've spent a lot of time since on whether it should work offline, on her own machine, the way she first asked. I haven't decided. Right now I'm making it work for more than one salon, on Supabase.

Traditional Chinese first, English second, because it was built for the people using it rather than for a portfolio.

The salon has patchy Wi-Fi. When the connection drops, the app shows the last snapshot and the time it was taken. Working from cache, "is this current?" is the one question she can't answer herself. A write that fails retries a few times, then says so.

## What told me it was right

She sat down and typed a year of her own history into it by hand.

People do not migrate their own history into software they are still evaluating.

It has been in daily use since May 2025: more than 600 clients and 2,600 service records, going back to September 2024.

## What I would do differently

Write the permission model down before building it. I found it as I went instead, which meant a lot of migrations, each one nerve-wracking because a migration changed production the moment it ran, not when I merged. Since then Clio has a local database and a staging one.

None of that shows at the front desk. Before a client sits down, she still checks when they last came in, and how much they've spent.
