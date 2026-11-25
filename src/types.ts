import type { Status } from "./constants";

export interface Application {
  id: number | string;
  company: string;
  role: string;
  status: Status;
  link: string;
  notes?: string;
  createdAt?: string;
  interviewDate?: string;
}

export type NewApplication = Pick<Application, "company" | "role" | "link">;
