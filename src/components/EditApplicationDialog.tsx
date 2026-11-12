import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { useApplicationsDispatch } from "../state/ApplicationContext";
import type { Application } from "../types";

interface Props {
  application: Application | null;
  onClose: () => void;
}

export default function EditApplicationDialog({ application, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (application && !dialog.open) dialog.showModal();
    if (!application && dialog.open) dialog.close();
  }, [application]);

  return (
    <dialog ref={ref} onClose={onClose}>
      {application && <EditForm key={application.id} application={application} onDone={onClose} />}
    </dialog>
  );
}

function EditForm({ application, onDone }: { application: Application; onDone: () => void }) {
  const dispatch = useApplicationsDispatch();
  const [company, setCompany] = useState(application.company);
  const [role, setRole] = useState(application.role);
  const [link, setLink] = useState(application.link);
  const [notes, setNotes] = useState(application.notes ?? "");
  const [interviewDate, setInterviewDate] = useState(application.interviewDate ?? "");

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (company.trim() === "" || role.trim() === "") return;

    dispatch({
      type: "update",
      id: application.id,
      changes: {
        company: company.trim(),
        role: role.trim(),
        link: link.trim(),
        notes: notes.trim() || undefined,
        interviewDate: interviewDate || undefined,
      },
    });
    onDone();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Company
        <input value={company} onChange={(e) => setCompany(e.target.value)} required />
      </label>
      {/* your task: the same pattern for
          - role (required)
          - link (type="url")
          - notes (a <textarea>, rows={3})
          - interview date (<input type="date">) */}
      <div className="dialog-actions">
        <button type="button" onClick={onDone}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
