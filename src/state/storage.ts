import { applicationList } from "../data/sampleApplications";
import { isStatus } from "../constants";
import type { Application } from "../types";

// Checks the fields the UI depends on, so bad saved data can never crash the board.
const isApplication = (value: unknown): value is Application => {
  if (typeof value !== "object" || value === null) return false;
  const a = value as Record<string, unknown>;
  return (
    (typeof a.id === "string" || typeof a.id === "number") &&
    typeof a.company === "string" &&
    typeof a.role === "string" &&
    typeof a.link === "string" &&
    isStatus(a.status)
  );
};

export const loadApplications = (): Application[] => {
  console.log("4 loadApplications");
  try {
    const saved = localStorage.getItem("applications");
    const parsed: unknown = saved ? JSON.parse(saved) : null;
    return Array.isArray(parsed) && parsed.every(isApplication) ? parsed : applicationList;
  } catch (error) {
    console.warn("Could not load saved applications, using demo data.", error);
    return applicationList;
  }
};
