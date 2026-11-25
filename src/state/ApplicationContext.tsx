import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { applicationReducer, type Action } from "./applicationReducer";
import { loadApplications } from "./storage";
import type { Application } from "../types";

// Two contexts on purpose: `dispatch` never changes, so components that only
// dispatch (the form, the cards) do not re-render when the list changes.
const ApplicationContext = createContext<Application[] | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, dispatch] = useReducer(applicationReducer, undefined, loadApplications);

  console.log("3 Provider");
  useEffect(() => {
    try {
      localStorage.setItem("applications", JSON.stringify(applications));
    } catch {
      // Storage full or blocked: the app keeps working, it just will not persist.
    }
  }, [applications]);

  return (
    <ApplicationContext value={applications}>
      <DispatchContext value={dispatch}>{children}</DispatchContext>
    </ApplicationContext>
  );
}

export function useApplications() {
  const value = useContext(ApplicationContext);
  if (value === null) throw new Error("useApplications must be used inside ApplicationsProvider");
  return value;
}

export function useApplicationsDispatch() {
  const dispatch = useContext(DispatchContext);
  if (dispatch === null) {
    throw new Error("useApplicationsDispatch must be used inside ApplicationsProvider");
  }
  return dispatch;
}
