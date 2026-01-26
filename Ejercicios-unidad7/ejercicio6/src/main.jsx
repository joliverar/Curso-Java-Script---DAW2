// Envolvemos la aplicación con el provider de seguridad
// para que el contexto esté disponible globalmente

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppEnrutador from "./routers/AppEnrutador";
import { SeguridadProvider } from "./contexts/SeguridadProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SeguridadProvider>
      <AppEnrutador />
    </SeguridadProvider>
  </StrictMode>,
);
