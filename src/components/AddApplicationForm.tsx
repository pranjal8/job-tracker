import { useState, type SubmitEvent } from "react";
import type { NewApplication } from "../types";
import { useApplicationsDispatch } from "../state/ApplicationContext";

const AddApplicationForm = () => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [link, setLink] = useState("");
  const dispatch = useApplicationsDispatch();

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const data: NewApplication = {
      company: company.trim(),
      role: role.trim(),
      link: link.trim(),
    };

    if (data.company === "" || data.role === "") return;

    dispatch({
      type: "add",
      application: {
        id: crypto.randomUUID(),
        status: "wishlist",
        createdAt: new Date().toISOString(),
        ...data,
      },
    });

    setCompany("");
    setRole("");
    setLink("");
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        aria-label="Company"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        aria-label="Role"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <input
        aria-label="Job link"
        placeholder="Job link"
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button type="submit">Add application</button>
    </form>
  );
};

export default AddApplicationForm;
