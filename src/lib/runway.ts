// The sum behind the "your turn" card in Selected work: months of cash at a
// monthly cost, and the month it runs out. The app does far more; the card
// only has to show the one number the app is built around.

export type RunwayStatus = "stable" | "caution" | "critical";

export type Runway = {
  /** Whole months covered, or null when nothing costs anything yet. */
  months: number | null;
  status: RunwayStatus;
  /** The sentence under the number. */
  runsOut: string;
};

/** Reads what someone typed, commas and currency signs included. */
export function parseAmount(text: string): number {
  const n = Number(text.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

// The same thresholds as the app's badge.
function statusFor(months: number): RunwayStatus {
  if (months < 3) return "critical";
  if (months < 6) return "caution";
  return "stable";
}

export function runway(cash: number, cost: number, today: Date): Runway {
  if (cost <= 0) {
    return {
      months: null,
      status: "stable",
      runsOut: "Nothing costs anything yet, so it never runs out.",
    };
  }
  const months = Math.floor(cash / cost);
  if (months === 0) {
    return { months, status: "critical", runsOut: "It runs out this month." };
  }
  // Past a hundred years a month name means nothing, and far enough out
  // Date has no answer at all.
  if (months > 1200) {
    return {
      months,
      status: "stable",
      runsOut: "It lasts over a hundred years.",
    };
  }
  const end = new Date(today.getFullYear(), today.getMonth() + months, 1);
  const label = end.toLocaleString("en", { month: "long", year: "numeric" });
  return { months, status: statusFor(months), runsOut: `Runs out ${label}.` };
}

export type Plan = {
  cash: number;
  /** Fixed costs, subscriptions and the living budget, per month. */
  monthly: number;
  /** What is left of this month's living budget. */
  livingLeft: number;
};

/**
 * Runway's rule for logged spending: it uses up the living budget instead
 * of adding to costs, so only what goes over the budget takes months.
 */
export function spend(plan: Plan, spent: number) {
  const over = Math.max(0, spent - plan.livingLeft);
  return {
    over,
    livingLeft: Math.max(0, plan.livingLeft - spent),
    months: Math.floor((plan.cash - over) / plan.monthly),
  };
}
