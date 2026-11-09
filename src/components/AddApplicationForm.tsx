import { type SubmitEvent, useState } from "react";
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
      application: { id: crypto.randomUUID(), status: "wishlist", ...data },
    });

    setCompany("");
    setRole("");
    setLink("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
        <input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
        <input
          placeholder="Job link"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default AddApplicationForm;
