import { ReactNode, useReducer, useEffect, createContext, type Dispatch, useContext } from "react";
import { type Action, applicationReducer } from "./applicationReducer";
import { loadApplications } from "./storage";
import type { Application } from "../types";

const ApplicationContext = createContext<Application[] | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, dispatch] = useReducer(applicationReducer, undefined, loadApplications);

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  return (
    <ApplicationContext.Provider value={applications}>
      <DispatchContext value={dispatch}> {children} </DispatchContext>
    </ApplicationContext.Provider>
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
