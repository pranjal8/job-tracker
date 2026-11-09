import { useDraggable } from "@dnd-kit/core";
import { type Status, STATUSES } from "../constants";
import { CSS } from "@dnd-kit/utilities";
import type { Application } from "../types";
import { useApplicationsDispatch } from "../state/ApplicationContext";

interface Props {
  application: Application;
}

function ApplicationCard({ application }: Props) {
  const dispatch = useApplicationsDispatch();

  const { setNodeRef, listeners, attributes, transform } = useDraggable({ id: application.id });

  const style = transform
    ? { transform: CSS.Translate.toString(transform), zIndex: 10 }
    : undefined;

  return (
    <div className="card" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className="card-select">
        <select
          value={application.status}
          onChange={(e) =>
            dispatch({ type: "move", id: application.id, status: e.target.value as Status })
          }
        >
          {STATUSES.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

        <button onClick={() => dispatch({ type: "delete", id: application.id })}>Delete</button>
      </div>
      <p className="card-company"> {application.company} </p>
      <p className="card-role"> {application.role} </p>
      <a href={application.link} target="_blank" rel="noreferrer">
        View posting
      </a>
    </div>
  );
}

export default ApplicationCard;
