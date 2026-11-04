// Selected work: Financial Runway, plainly, then a strip of how it thinks.
// The copy is hers.
const APP_STORE = "https://apps.apple.com/app/id6778675088";

export const selectedWorkConfig = {
  appStore: APP_STORE,
  // A short recording of the real app, played on a tap. The still frame is
  // the app's home, the same 12 months the notes show.
  demo: {
    src: "assets/runway/demo.mp4",
    poster: "assets/runway/demo-poster.webp",
    width: 1200,
    height: 675,
    label:
      "Financial Runway on an iPhone: the app's home, a blue circle reading 12 months until November 2027, with a Check up button.",
  },
  meta: "Financial Runway · iOS · 2026 · built solo",
  question: "Your money, counted in time. One number, from today.",
  price: "Free",
  priceFacts: ["no subscription", "no account, no bank login"],
  // The headline runway uses the store screenshot's numbers. The calculator
  // starts elsewhere, so it shows another state, not the same 12.
  lead: { cash: "34,336", cost: "2,803" },
  // The spending card: the store screenshot's costs (rent and fixed 1,450,
  // subscriptions and loans 253, living budget 1,100: 2,803 a month), late
  // in a tighter month. Cash sits just above three months, so six lunches
  // fit the budget and the seventh, $15 over, drops it to two.
  spend: {
    example: "Example: end of the month",
    cash: 8420,
    rent: 1450,
    subscriptions: 253,
    living: 1100,
    livingLeft: 90,
    lunch: 15,
    title: "Spending what you planned costs you nothing.",
    body: "Your months fall only when you go over.",
  },
  // Her words, cut to the one line a visitor reads.
  quote: "I built something I would use.",
  // The two decisions a visitor can try, with the store screenshot's figures.
  debt: {
    cash: "$34,336",
    owed: "$17,790",
    title: "What you owe sits next to what you have.",
    body: "A loan raises your cash. Without the debt beside it, the number would lie.",
  },
  calm: {
    status: "Critical",
    title: "It stays calm when money is short.",
    body: "Soft pink, never alarm red.",
  },
  madeWith: "I had a picture of how it should be. AI made it happen faster.",
};
