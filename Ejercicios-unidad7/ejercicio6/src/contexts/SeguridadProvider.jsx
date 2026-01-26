import { createContext, useState } from "react";

// Creamos el contexto de seguridad
const SeguridadContext = createContext();

// Provider que envuelve la aplicación
function SeguridadProvider({ children }) {
  // Estado global de seguridad
  const [datos, setDatos] = useState({
    usuario: "",
    tienePermisos: false,
  });

  // Simula el inicio de sesión
  const logIn = async (nombre) => {
    setDatos({
      usuario: nombre,
      tienePermisos: true,
    });
  };

  // Simula el cierre de sesión
  const logOut = async () => {
    setDatos({
      usuario: "",
      tienePermisos: false,
    });
  };

  // Proporcionamos los datos y funciones al resto de la app
  return (
    <SeguridadContext.Provider value={{ datos, logIn, logOut }}>
      {children}
    </SeguridadContext.Provider>
  );
}

export { SeguridadContext, SeguridadProvider };
