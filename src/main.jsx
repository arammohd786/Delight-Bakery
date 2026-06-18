import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AramBakery from "./AramBakery.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AramBakery />
  </StrictMode>
);
