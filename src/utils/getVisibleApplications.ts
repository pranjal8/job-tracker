import type { Status } from "../constants";
import type { Application } from "../types";

export type SortOrder = "newest" | "oldest";
export type StatusFilter = Status | "all";

export interface ViewOptions {
  query: string;
  status: StatusFilter;
  sort: SortOrder;
}

export function getVisibleApplications(
  applications: Application[],
  { query, status, sort }: ViewOptions,
): Application[] {
  const q = query.trim().toLowerCase();

  const filtered = applications.filter((a) => {
    if (status !== "all" && a.status !== status) return false;
    if (q === "") return true;
    return [a.company, a.role, a.notes ?? ""].some((field) => field.toLowerCase().includes(q));
  });

  // Copy before sorting: Array.prototype.sort mutates the array it is called on.
  // Cards saved before `createdAt` existed have no date; "" sorts as the oldest.
  return [...filtered].sort((a, b) => {
    const byDate = (a.createdAt ?? "").localeCompare(b.createdAt ?? "");
    return sort === "oldest" ? byDate : -byDate;
  });
}
