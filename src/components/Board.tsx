import { STATUSES, isStatus } from "../constants";
import Column from "./Column";
import { DndContext, PointerSensor, useSensors, useSensor } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useApplications, useApplicationsDispatch } from "../state/ApplicationContext";

export default function Board() {
  const dispatch = useApplicationsDispatch();
  const applications = useApplications();

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
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="board">
        {STATUSES.map((status) => {
          const columnApps = applications.filter((a) => a.status === status);
          return <Column key={status} status={status} applications={columnApps} />;
        })}
      </div>
    </DndContext>
  );
}
