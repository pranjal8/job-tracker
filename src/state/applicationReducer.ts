import type { Application } from "../types";
import type { Status } from "../constants";

export type Action =
  | { type: "add"; application: Application }
  | { type: "move"; id: Application["id"]; status: Status }
  | { type: "delete"; id: Application["id"] }
  | { type: "update"; id: Application["id"]; changes: Partial<Omit<Application, "id">> };

export function applicationReducer(state: Application[], action: Action): Application[] {
  switch (action.type) {
    case "add":
      return [...state, action.application];

    case "move":
      return state.map((a) => (a.id === action.id ? { ...a, status: action.status } : a));

    case "delete":
      return state.filter((a) => a.id !== action.id);

    case "update":
      return state.map((a) => (a.id === action.id ? { ...a, ...action.changes } : a));

    default: {
      return assertNever(action);
    }
  }
}

function assertNever(value: never): never {
  throw new Error(`Unhandled action: ${JSON.stringify(value)}`);
}
