import { type SubmitEvent, useState } from "react";
import type { NewApplication } from "../types";

interface Props {
  onAdd: (data : NewApplication) => void;
}

const AddApplicationForm = ({ onAdd }: Props) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [link, setLink] = useState("");

   function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (company.trim() === "" || role.trim() === "") return;

    onAdd({ company: company.trim(), role: role.trim(), link : link.trim() });

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
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default AddApplicationForm;
