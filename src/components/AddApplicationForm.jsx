import { useState } from "react";

const AddApplicationForm = ({ onAdd }) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (company.trim() === "" || role.trim() === "") return;

    onAdd({ company, role, link });

    setCompany("");
    setRole("");
    setLink("");
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
        <input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
        <input placeholder="Job link" type="url" value={link} onChange={(e) => setLink(e.target.value)} />
        <button> Submit </button>
      </form>
    </div>
  );
};

export default AddApplicationForm;
