---
title: The test that passed while the number was wrong
date: 2026-10-19
excerpt: "Two things I got wrong in Financial Runway before it shipped: a setting I had already written the right answer for, and a runway made of borrowed money that a passing test let stand."
order: 3
draft: true
---

Claude Code wrote most of Financial Runway. That's the only reason it got built in the time I had, and it's also where most of the bugs came from. When you're not typing every line, checking is the whole job. Two of the things I checked late are below, with the pull requests, because the repository is public and anyone can look.

## The setting I got wrong twice

Runway encrypts its database with SQLCipher, so the App Store asks about encryption. One key in the iOS build settings decides how. It has three states, and only one works:

- `false` skips the compliance questions, as if there were nothing to ask about. There is.
- `true` claims I have export documentation. I don't, so the upload is refused.
- Leaving the key out marks the build Missing Compliance and asks, which is where the honest answers go.

I worked that out, removed the key on purpose, and wrote the reasoning down in the repo. Four days later I added it back as `false`, to save myself a prompt during upload. The note was right there. I hadn't read it.

My tests didn't catch it, because I had written them to check that the key was present and `false`. They were enforcing the mistake. No build ever shipped with it, but the next one would have. [The fix](https://github.com/echoshihtw/runway/pull/242) reverts my own change and turns the tests around: they now fail if the key comes back in either form.

## A runway made of borrowed money

The runway is your cash divided by your monthly costs. Before you've entered a balance, there's no cash figure, so there shouldn't be a runway either.

There was. You could enter a loan before any balance, and the app answered anyway: summing an empty ledger gives zero, and zero is a number. A 12,000 loan at 1,000 a month showed 11 months, status stable. The loan's money counted as cash, so the card reported a healthy runway built out of borrowed money, and looked confident about it.

A comment in my code said the runway "already says so with the same mark", meaning it showed a dash when it didn't know. It didn't. There was even a test for this. It looked for a dash on the screen, and found one: the dash next to CASH. So it passed while the number stayed wrong.

[The fix](https://github.com/echoshihtw/runway/pull/263) is one line. The runway now needs both a cost and a stated balance before it shows a number, and until then it shows the same dash and grey it already used for missing costs. The new tests were proven by reverting that line and watching them fail.

## What I took from it

Both bugs had the same shape. Something told me the problem was handled: a note, a comment, a green test. I believed it instead of looking.

Writing the Devpost submission did the same thing again. Every claim in it points at code you can open, so I checked them all. Nine were wrong. The worst was the setup I'd written for judges, which told them to tap a button that can't do what I said it did.

So now I read the note before I change the setting, and I don't trust a test I haven't watched fail.
