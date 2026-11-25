// Builds the date from its parts: new Date("2026-11-20") is parsed as UTC midnight
// and can show the previous day in some time zones.
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
