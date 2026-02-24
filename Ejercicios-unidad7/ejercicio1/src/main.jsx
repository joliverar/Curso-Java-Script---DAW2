import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./enrutador/AppRouter";
import "./tabla.css";
import Equipos from "./Equipos";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Equipos />
  </React.StrictMode>,
);
