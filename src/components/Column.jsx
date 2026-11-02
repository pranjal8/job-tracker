import ApplicationCard from "./ApplicationCard";

const Column = (props) => {
  const { status, applications, onStatusChange, onDelete } = props;
  return (
    <div className="column">
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
