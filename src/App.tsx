import "./App.css";
import { useState, useEffect } from "react";
import { applicationList } from "./data/sampleApplications";
import Board from "./components/Board";
import AddApplicationForm from "./components/AddApplicationForm";
import type { Application, DeleteHandler, NewApplication, StatusChangeHandler } from "./types";

const loadApplications = (): Application[] => {
  try {
    const saved = localStorage.getItem("applications");
    const parsed: unknown = saved ? JSON.parse(saved) : null;
    return Array.isArray(parsed) ? (parsed as Application[]) : applicationList;
  } catch {
    return applicationList;
  }
};

const App = () => {
  const [applications, setApplications] = useState<Application[]>(loadApplications);

  const handleStatusChange: StatusChangeHandler = (id, newStatus) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
  };

  const handleAdd = (data: NewApplication) => {
    const newApplication: Application = { id: crypto.randomUUID(), status: "wishlist", ...data };
    setApplications((prev) => [...prev, newApplication]);
  };

  const handleDelete: DeleteHandler = (id) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  return (
    <div>
      <AddApplicationForm onAdd={handleAdd} />
      <Board
        applications={applications}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
