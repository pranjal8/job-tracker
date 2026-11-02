import { STATUSES } from "../constants";

function ApplicationCard({ application, onStatusChange, onDelete }) {
  return (
    <div className="card">
      <div className="card-select">
        <select value={application.status} onChange={(e) => onStatusChange(application.id, e.target.value)}>
          {STATUSES.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

        <button onClick={() => onDelete(application.id)}>Delete</button>
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
