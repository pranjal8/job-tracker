import { applicationList } from "../data/sampleApplications";
import type { Application } from "../types";

export const loadApplications = (): Application[] => {
  try {
    const saved = localStorage.get("applications");
    const parsed: unknown = saved ? JSON.parse(saved) : null;
    return Array.isArray(parsed) ? (parsed as Application[]) : applicationList;
  } catch {
    return applicationList;
  }
};
