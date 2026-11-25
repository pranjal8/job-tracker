import { STATUSES, isStatus } from "../constants";
import type { SortOrder, StatusFilter } from "../utils/getVisibleApplications";

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  sort: SortOrder;
  onSortChange: (value: SortOrder) => void;
}

export default function Toolbar({
  query,
  onQueryChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
}: Props) {
  return (
    <div className="toolbar">
      <input
        type="search"
        aria-label="Search applications"
        placeholder="Search company, role or notes"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />

      <select
        aria-label="Filter by status"
        value={status}
        onChange={(e) => {
          const next = e.target.value;
          onStatusChange(isStatus(next) ? next : "all");
        }}
      >
        <option value="all">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        aria-label="Sort by date added"
        value={sort}
        onChange={(e) => onSortChange(e.target.value === "oldest" ? "oldest" : "newest")}
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
}
