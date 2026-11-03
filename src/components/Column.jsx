import { useDroppable } from "@dnd-kit/core";
import ApplicationCard from "./ApplicationCard";

const Column = (props) => {
  const { status, applications, onStatusChange, onDelete } = props;

  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className={isOver ? "column column-over" : "column"} ref={setNodeRef}>
      <h3 className="column-title">
        {status} ({applications.length})
      </h3>
      {applications.map((app) => (
        <ApplicationCard key={app.id} application={app} onStatusChange={onStatusChange} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default Column;
