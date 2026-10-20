// Selected work: Financial Runway, plainly, then a strip of how it thinks.
// The copy is hers.
const APP_STORE = "https://apps.apple.com/app/id6778675088";

export const selectedWorkConfig = {
  appStore: APP_STORE,
  banner: {
    src: "assets/runway/banner.webp",
    width: 1200,
    height: 675,
    alt: "Financial Runway on an iPhone: how long will your money last? 12 months of runway.",
  },
  meta: "Financial Runway · iOS · 2026 · built solo",
  question: "How long will your money last? One number, counted from today.",
  price: "US$3.99",
  priceFacts: ["no subscription", "no account, no bank login"],
  // The headline runway uses the store screenshot's numbers. The calculator
  // starts elsewhere, so it shows another state, not the same 12.
  lead: { cash: "34,336", cost: "2,803" },
  // The spending card: committed costs, what is left of the living budget,
  // and a lunch to log. Six lunches fit; the seventh goes over.
  spend: {
    cash: 8400,
    rent: 1500,
    subscriptions: 100,
    living: 1200,
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
