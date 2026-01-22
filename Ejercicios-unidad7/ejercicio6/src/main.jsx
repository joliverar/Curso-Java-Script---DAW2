import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import './index.css'
// import App from './App.jsx'
import AppEnrutador from "./routers/AppEnrutador.jsx";
createRoot(document.getElementById("root")).render(
<StrictMode>
{/* <App /> */}
<AppEnrutador />
</StrictMode>
);

