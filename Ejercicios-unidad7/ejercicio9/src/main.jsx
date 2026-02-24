import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/estilo.css";
import AppRouter from "./Routers/AppRouter";

createRoot(document.getElementById("root")).render(<AppRouter />);
console.log("hola");
