import { createContext, useState } from "react";

/* 1️⃣ Crear el contexto */
const SeguridadContext = createContext();

/* 2️⃣ Crear el provider */
function SeguridadProvider({ children }) {
  const [datos, setDatos] = useState({
    usuario: "",
    tienePermisos: false,
  });

  const logIn = async (nombre) => {
    setDatos({
      usuario: nombre,
      tienePermisos: true,
    });
  };

  const logOut = async () => {
    setDatos({
      usuario: "",
      tienePermisos: false,
    });
  };

  return (
    <SeguridadContext.Provider
      value={{
        datos,
        logIn,
        logOut,
      }}
    >
      {children}
    </SeguridadContext.Provider>
  );
}

export { SeguridadContext, SeguridadProvider };
