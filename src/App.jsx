import "./App.css";
import { useState, useEffect } from "react";
import { applicationList } from "./data/sampleApplications";
import Board from "./components/Board";
import AddApplicationForm from "./components/AddApplicationForm";

const App = () => {
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem("applications");
      return saved ? JSON.parse(saved) : applicationList;
    } catch {
      return applicationList;
    }
  });

  function handleStatusChange(id, newStatus) {
    setApplications((prev) => {
      const updatedStatus = prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a));

      return updatedStatus;
    });
  }

  function handleAdd(data) {
    const newApplication = { id: crypto.randomUUID(), status: "wishlist", ...data };
    setApplications((prev) => [...prev, newApplication]);
  }

  function handleDelete(id) {
    setApplications((prev) => {
      const updatedApplications = prev.filter((item) => item.id !== id);

      return updatedApplications;
    });
  }

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  return (
    <div>
      <AddApplicationForm onAdd={handleAdd} />
      <Board applications={applications} onStatusChange={handleStatusChange} onDelete={handleDelete} />
    </div>
  );
};

export default App;
