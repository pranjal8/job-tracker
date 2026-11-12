import { STATUSES, isStatus } from "../constants";
import Column from "./Column";
import { DndContext, PointerSensor, useSensors, useSensor } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useApplications, useApplicationsDispatch } from "../state/ApplicationContext";
import { useState } from "react";
import type { Application } from "../types";
import EditApplicationDialog from "./EditApplicationDialog";

export default function Board() {
  const dispatch = useApplicationsDispatch();
  const applications = useApplications();
  const [editingId, setEditingId] = useState<Application["id"] | null>(null);
  const editing = applications.find((a) => a.id === editingId) ?? null;

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over || !isStatus(over.id)) {
      return;
    }
    const app = applications.find((a) => a.id === active.id);
    if (!app || app.status === over.id) return;

    dispatch({ type: "move", id: app.id, status: over.id });
  }

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  return (
    <>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="board">
          {STATUSES.map((status) => {
            const columnApps = applications.filter((a) => a.status === status);
            return (
              <Column
                key={status}
                status={status}
                applications={columnApps}
                onEdit={setEditingId}
              />
            );
          })}
        </div>
      </DndContext>

      <EditApplicationDialog application={editing} onClose={() => setEditingId(null)} />
    </>
  );
}
