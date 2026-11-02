import { STATUSES } from "../constants";
import Column from "./Column";

function Board({ applications, onStatusChange, onDelete }) {
  return (
    <div className="board">
      {STATUSES.map((status) => {
        const columnApps = applications.filter((a) => a.status === status);
        return <Column key={status} status={status} applications={columnApps} onStatusChange={onStatusChange} onDelete={onDelete} />;
      })}
    </div>
  );
}

export default Board;
