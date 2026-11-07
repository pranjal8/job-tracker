import { Application, DeleteHandler, StatusChangeHandler } from "../types";
import { STATUSES, isStatus } from "../constants";
import Column from "./Column";
import { DndContext, PointerSensor, useSensors, useSensor } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

interface Props {
  applications: Application[];
  onStatusChange: StatusChangeHandler;
  onDelete: DeleteHandler;
}
export default function Board({ applications, onStatusChange, onDelete }: Props) {
  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over || !isStatus(over.id)) {
      return;
    }
    const app = applications.find((a) => a.id === active.id);
    if (!app || app.status === over.id) return;

    onStatusChange(app.id, over.id);
  }

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="board">
        {STATUSES.map((status) => {
          const columnApps = applications.filter((a) => a.status === status);
          return (
            <Column
              key={status}
              status={status}
              applications={columnApps}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </DndContext>
  );
}
