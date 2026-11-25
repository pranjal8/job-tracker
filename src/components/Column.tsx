import { useDroppable } from "@dnd-kit/core";
import ApplicationCard from "./ApplicationCard";
import type { Status } from "../constants";
import type { Application } from "../types";

interface Props {
  status: Status;
  applications: Application[];
  onEdit: (id: Application["id"]) => void;
  onDelete: (application: Application) => void;
}

const Column = ({ status, applications, onEdit, onDelete }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  console.log("7 Column");
  return (
    <div className={isOver ? "column column-over" : "column"} ref={setNodeRef}>
      <h3 className="column-title">
        {status} ({applications.length})
      </h3>
      {applications.map((app) => (
        <ApplicationCard key={app.id} application={app} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default Column;
