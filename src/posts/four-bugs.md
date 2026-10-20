---
title: "Screenshots found what 260 tests missed"
date: "2026-08-21"
excerpt: "260 tests passed. Four screenshots of Clio found four bugs."
order: 2
draft: true
---

Clio is a salon app. One salon in Tainan has used it since May 2025, with 603 real clients in it. 260 tests were passing. I took four screenshots of a demo salon anyway, and found four bugs.

Two were small. A salon name was cut off mid-character, because a component had copied a shared width and got the number wrong. A price read NTD$4,400 NTD, because the currency was added twice. One-line fixes, once seen.

Two weren't.

## A test that couldn't fail

Switch Clio to English, and the visit history still showed dates as 西元2026年07月25日 (週六). Two cards above it, a birthday in the same screen was formatted correctly.

There were two ways to format a date in the code: a shared helper that takes a language, and an older one that doesn't. The older one always gave the same Chinese output, whatever language you asked for.

The test for that screen had a mock for translations. It returned the translate function, and never a language. So the language could not matter anywhere in the test. It ran, it passed, and it looked like coverage. It could never fail, so it proved nothing.

I fixed the mock first, giving it a language, so the test could fail. Then I wrote a formatter for visit dates that keeps the weekday, because a salon reads its history by day of the week, and deleted the old one, along with the last use of moment in the codebase.

## A table that knew how to delete a person

The client list has a filter row: designer, start date, end date. "Delete client" was the fourth item in it, looking like a filter. It deletes a person and their whole visit history. It sat in the tab order between two date pickers.

That was the visible half. The other half was the records table. Its job is to show rows, but it had been given the client's ID, the client's name and a callback for deleting them. It had learned to delete the thing it was showing, one prop at a time, each small.

I moved the button to the bottom of the client's own page, as a quiet action below everything else. The table lost three props and a hook it never needed. The UX fix and the code fix were the same fix.

A screenshot doesn't read the code. It shows what the screen does.
