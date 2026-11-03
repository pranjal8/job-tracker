import { STATUSES } from "../constants";
import Column from "./Column";
import { DndContext, PointerSensor, useSensors, useSensor } from "@dnd-kit/core";

function Board({ applications, onStatusChange, onDelete }) {
  function handleDragEnd(e) {
    const { active, over } = e;
    if (!over) {
      return;
    }

    const applicationID = active.id;
    const newStatus = over.id;

    const app = applications.find((a) => a.id === applicationID);
    if (!app || app.status === newStatus) return;

    console.log(app, applicationID, newStatus);
    onStatusChange(applicationID, newStatus);
  }

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="board">
        {STATUSES.map((status) => {
          const columnApps = applications.filter((a) => a.status === status);
          return <Column key={status} status={status} applications={columnApps} onStatusChange={onStatusChange} onDelete={onDelete} />;
        })}
      </div>
    </DndContext>
  );
}

export default Board;
