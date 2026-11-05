History: 16/40 (40%), 51/55 (93%), 55/57 (96%)

# Portfolio scenarios

Each is one situation and what a good site does. Graded against DESIGN.md.

## First visit and cover

1. A first-time visitor opens echoshih.com. Expected: the cover shows her name and the ochre full stop, nothing else competing, and one way in.
2. The visitor presses Enter. Expected: the cover leaves, the ochre dot travels to the full stop of "learn.", and the headline arrives around it.
3. The visitor scrolls the wheel on the cover instead of pressing Enter. Expected: it enters, and the page lands at the top, not partway down.
4. The visitor reloads the home page in the same tab after entering. Expected: no cover again; it shows once per tab.
5. Someone opens a link to echoshih.com/#about. Expected: no cover; it goes straight to Who I am.
6. A visitor arrives on a blog post from a search result. Expected: no cover; the post shows at once.
7. A visitor with Reduce Motion on presses Enter. Expected: the cover goes at once, with no travelling dot and no fade.
8. The visitor does nothing on the cover for a minute. Expected: it waits; nothing moves or leaves on its own.

## Recruiter skim

9. A recruiter gives the home page 20 seconds. Expected: they learn her role, that she ships, and how to contact her, without opening anything.
10. A recruiter looks for the stack. Expected: Runway's section lists Flutter, Dart, Riverpod, Drift and SQLCipher, each name whole on its line.
11. A recruiter wants the résumé. Expected: a "Résumé, PDF" download in the hero and in Contact.
12. A recruiter wants to email about a role. Expected: the main Contact button emails with a role subject already filled in.
13. A recruiter checks whether Runway is real. Expected: "live on the App Store since October 2026" and an App Store link.
14. A recruiter wonders how she uses AI. Expected: one plain answer in Runway's notes and in Who I am, owning the decisions.

## CTO deep read

15. A CTO wants to see how Runway is built. Expected: an architecture diagram of the real packages, a pure core with adapters around it, and the one forbidden import marked as failing CI.
16. A CTO checks that the diagram is honest. Expected: every box and arrow matches the code, with no counts that go out of date.
17. A CTO asks how privacy is enforced. Expected: the database is checked as encrypted at every open, and CI checks the privacy page against what the app sends.
18. A CTO wants the engineering decisions behind Clio. Expected: "Read the decisions" shows the decisions without leaving the page.
19. A CTO opens Clio's decisions, then Echology's. Expected: only one card is turned over at a time.
20. A CTO wants proof of real users. Expected: Clio's 603 clients, entered by hand, in use since May 2025.
21. A CTO asks how she works. Expected: concrete habits they can check, not adjectives.

## Phone and sideways

22. A visitor opens the home page on a 320 px phone. Expected: nothing clipped or overlapping, and no fact split across lines.
23. A visitor holds a phone sideways (568 × 320). Expected: everything reachable; scrolling is fine, nothing clipped.
24. On a phone, a visitor reaches Runway's section. Expected: the name, then the demo, then the notes.
25. On a phone, a visitor taps "Read more" on Clio. Expected: a sheet rises with the rest of the story; the first paragraph was already on screen.
26. On a phone, a visitor reads Runway's diagram. Expected: the tall version, with labels readable.
27. On a phone, the gallery's lead painting. Expected: whole, at its own proportions, never cropped and never taller than the screen.

## Dark theme

28. A visitor switches to the dark theme. Expected: the same warm studio at night, the ochre still the one accent, every text pair at 4.5:1.
29. In the dark theme, a visitor reaches More projects. Expected: Clio's demo and the screenshots don't glare.
30. In the dark theme, a visitor opens the gallery. Expected: the paintings stay on a light wall; the header and footer turn dark.
31. In the dark theme, a visitor tabs to the App Store button in Runway's band. Expected: a visible focus ring.

## Keyboard and screen reader

32. A keyboard user arrives on the cover. Expected: focus starts on Enter, and Enter, Space or the down arrow goes in.
33. A keyboard user tabs through the home page. Expected: every control reachable with a visible focus ring, in reading order.
34. A screen reader user reaches Runway's diagram. Expected: one description of the architecture, not a list of box labels.
35. A screen reader user opens a sheet. Expected: it's announced as a dialog with its title, and closing returns focus to the button that opened it.

## Gallery

36. A visitor opens the gallery. Expected: a painting is the first thing seen, beside "Made by hand."
37. A visitor opens a painting from the wall. Expected: it shows full screen, with the others beside it and a counter; Escape returns to the same spot.
38. A visitor finishes the gallery. Expected: one way back to the software side.

## Contact

39. A visitor wants to talk about a project, not a role. Expected: a quiet link emails with a project subject.
40. A visitor reaches the end of the home page. Expected: one centred close, words only, with the email and the résumé.

## Found in round 1

41. A visitor in the dark theme opens the home page for the first time. Expected: the cover follows the theme, with the ochre full stop on the dark ground.
42. A recruiter on a phone taps "Résumé, PDF". Expected: the PDF downloads, named with her name.
43. A keyboard user turns a project card over on a wide screen. Expected: focus moves to the card's back, and "Turn it back" returns focus to the button.

## Headhunters

44. A headhunter checks location, time zone and how she works. Expected: "Remote from Taiwan" in the hero, and "Taiwan, UTC+8 · APAC hours or async" in the footer.
45. A headhunter checks her experience. Expected: each company with her role, dates and place, and the full history in the résumé.
46. A headhunter forwards the résumé to a client. Expected: the PDF's name carries her name.
47. A headhunter wants a call before writing. Expected: a way to book a call in the footer.

## CTOs

48. A CTO wants to know how she handles bugs in production. Expected: How I work states concrete habits, and the blog shows real bugs and what they turned out to be.
49. A CTO checks that her claims on the home page are backed further down. Expected: each of the hero's three "made true" lines is shown lower on the page.

## Remote-first companies

50. A remote-first company checks hours of overlap. Expected: the footer gives her time zone and "APAC hours or async".
51. A remote-first company checks how she writes. Expected: the blog's working notes show how she writes up what broke and why.
52. A remote-first company checks how she works with a distributed team. Expected: How I work says she shares work early.

## Developer-tools teams (like Vercel)

53. A developer-tools team checks frontend depth. Expected: the hero says frontend first, and the work and projects show Next.js and React in production.
54. A developer-tools team checks whether she cares how code is structured for other developers. Expected: the hero says the structure keeps a team consistent, and Runway shows boundaries that fail CI when broken.
55. A developer-tools team wants to read her code. Expected: the footer links her GitHub and the site's own source.

## Found in round 2

56. A visitor on a blog post presses "Replay intro card" in the footer. Expected: the home page opens with the cover.
57. A visitor holds a phone sideways (568 × 320) on the cover. Expected: the cover fits without scrolling, since a scroll means going in.

## Found in round 3

58. A screen reader user lands on the cover. Expected: it is announced as a dialog named "Portfolio introduction", with focus on Enter.
59. A visitor who prefers dark wants to switch before entering. Expected: the theme switch is on the cover.
