import { useState, useEffect } from "react";
import { DndContext, PointerSensor, useSensors, useSensor } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { STATUSES, isStatus, type Status } from "../constants";
import { useApplications, useApplicationsDispatch } from "../state/ApplicationContext";
import type { Application } from "../types";
import {
  getVisibleApplications,
  type SortOrder,
  type StatusFilter,
} from "../utils/getVisibleApplications";
import Column from "./Column";
import EditApplicationDialog from "./EditApplicationDialog";
import Toolbar from "./Toolbar";

export default function Board() {
  console.log("6 Board");
  const dispatch = useApplicationsDispatch();
  const applications = useApplications();

  const [editingId, setEditingId] = useState<Application["id"] | null>(null);
  const editing = applications.find((a) => a.id === editingId) ?? null;

  // View settings: they change what is shown, not the data, so they are plain state here.
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortOrder>("newest");

  const visible = getVisibleApplications(applications, { query, status: statusFilter, sort });
  const shownStatuses: readonly Status[] =
    statusFilter === "all" ? STATUSES : STATUSES.filter((s) => s === statusFilter);

  const [undo, setUndo] = useState<{ application: Application; index: number } | null>(null);

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over || !isStatus(over.id)) return;

    // Look in the full list, not `visible`, so dragging works whatever the filter is.
    const app = applications.find((a) => a.id === active.id);
    if (!app || app.status === over.id) return;

    dispatch({ type: "move", id: app.id, status: over.id });
  }

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDelete(application: Application) {
    // Position in the FULL list, so Undo can put the card back where it was
    const index = applications.findIndex((a) => a.id === application.id);
    dispatch({ type: "delete", id: application.id });
    setUndo({ application, index });
  }

  function handleUndo() {
    if (!undo) return;
    dispatch({ type: "restore", application: undo.application, index: undo.index });
    setUndo(null);
  }

  // Hide the toast after 5 seconds. The cleanup cancels the old timer whenever a new
  // delete replaces `undo`, so an earlier timer can never close a newer toast.
  useEffect(() => {
    if (!undo) return;
    const timer = setTimeout(() => setUndo(null), 5000);
    return () => clearTimeout(timer);
  }, [undo]);

  function clearFilters() {
    setQuery("");
    setStatusFilter("all");
    setSort("newest");
  }

  return (
    <>
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        status={statusFilter}
        onStatusChange={setStatusFilter}
        sort={sort}
        onSortChange={setSort}
      />

      {visible.length === 0 ? (
        <div className="empty">
          <p>
            {applications.length === 0
              ? "No applications yet. Add your first one above."
              : "No applications match your search."}
          </p>
          {applications.length > 0 && <button onClick={clearFilters}>Clear filters</button>}
        </div>
      ) : (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="board">
            {shownStatuses.map((status) => (
              <Column
                key={status}
                status={status}
                applications={visible.filter((a) => a.status === status)}
                onEdit={setEditingId}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </DndContext>
      )}

      <EditApplicationDialog application={editing} onClose={() => setEditingId(null)} />

      {/* Outside the ternary above, so it stays visible even if the board just became empty */}
      {undo && (
        <div className="toast" role="status">
          <span>{undo.application.company} deleted</span>
          <button onClick={handleUndo}>Undo</button>
        </div>
      )}
    </>
  );
}
