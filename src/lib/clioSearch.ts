// The lookup behind the Clio demo: find a client by any part of a name or
// phone number, the way the owner types at the front desk.
import type { DemoClient } from "../content/clioDemo.config";

// Keeps letters, digits and Chinese characters, so "0900 000", "0900-000"
// and "May" all match what is stored.
function normalise(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9一-鿿]/g, "");
}

export function findClient(
  clients: DemoClient[],
  query: string
): DemoClient | null {
  const needle = normalise(query);
  if (!needle) return null;
  return (
    clients.find((c) => normalise(c.name + c.phone).includes(needle)) ?? null
  );
}
