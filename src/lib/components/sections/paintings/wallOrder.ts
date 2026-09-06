/** Where a visitor's arrangement lives. Versioned, so a later change to the
 *  shape can start clean rather than trying to read the old one. */
export const WALL_ORDER_KEY = "echo-wall-order-v1";

/** Which pieces a visitor has hearted. Theirs alone: never sent anywhere. */
export const WALL_HEARTS_KEY = "echo-wall-hearts-v1";

/**
 * Merge a stored arrangement with the works that actually exist now.
 *
 * Stored ids that no longer exist are dropped, and works the stored order has
 * never seen are appended in source order rather than lost. That second rule
 * is the point: paintings get added, and a visitor who arranged the wall last
 * year must still be shown the new ones.
 */
export function restoreOrder(stored: string[], present: string[]): string[] {
  const remaining = new Set(present);
  const ordered: string[] = [];

  for (const id of stored) {
    if (remaining.delete(id)) ordered.push(id);
  }
  for (const id of present) {
    if (remaining.has(id)) ordered.push(id);
  }
  return ordered;
}

/** Read a stored array of ids, tolerating every way this can go wrong.
 *  localStorage throws outright in a private window or with site data
 *  blocked, and the value is whatever was there last, not necessarily ours. */
export function readIds(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

/** Write ids back. An arrangement not being remembered is not worth an error. */
export function writeIds(key: string, ids: string[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    /* private window, or site data blocked */
  }
}
