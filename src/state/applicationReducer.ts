import type { Application } from "../types";
import type { Status } from "../constants";

export type Action =
  | { type: "add"; application: Application }
  | { type: "move"; id: Application["id"]; status: Status }
  | { type: "delete"; id: Application["id"] }
  | { type: "update"; id: Application["id"]; changes: Partial<Omit<Application, "id">> }
  | { type: "restore"; application: Application; index: number };

// A reducer must be pure: no randomness, no storage, no setState.
// Ids and dates are created before dispatching (in event handlers).
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

    case "restore": {
      // A second Undo click: the application is already back, so do nothing
      if (state.some((a) => a.id === action.application.id)) return state;

      // The list may have shrunk since the delete, so keep the index in range
      const index = Math.min(Math.max(action.index, 0), state.length);

      return [...state.slice(0, index), action.application, ...state.slice(index)];
    }

    default:
      return assertNever(action);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unhandled action: ${JSON.stringify(value)}`);
}
