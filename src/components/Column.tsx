import { useDroppable } from "@dnd-kit/core";
import ApplicationCard from "./ApplicationCard";
import type { Status } from "../constants";
import type { Application } from "../types";

interface Props {
  status: Status;
  applications: Application[];
  onEdit: (id: Application["id"]) => void;
}
const Column = ({ status, applications, onEdit }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className={isOver ? "column column-over" : "column"} ref={setNodeRef}>
      <h3 className="column-title">
        {status} ({applications.length})
      </h3>
      {applications.map((app) => (
        <ApplicationCard key={app.id} application={app} onEdit={onEdit} />
      ))}
    </div>
  );
};
export default Column;
