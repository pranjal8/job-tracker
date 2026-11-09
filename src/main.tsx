import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApplicationsProvider } from "./state/ApplicationContext";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element #root not found in index.html");

createRoot(rootElement).render(
  <StrictMode>
    <ApplicationsProvider>
      <App />
    </ApplicationsProvider>
  </StrictMode>,
);
