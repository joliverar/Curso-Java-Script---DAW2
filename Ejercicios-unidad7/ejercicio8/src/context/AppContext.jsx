import { createContext, useContext, useState } from "react";
import negocio from "../core/negocio";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const login = (username, password) => {
    const u = negocio.validarUsuario(username, password);
    if (!u) {
      setMensaje("Credenciales incorrectas");
      return false;
    }
    setUsuario(u);
    setMensaje(`Bienvenido ${u.username}`);
    return true;
  };

  const logout = () => {
    setUsuario(null);
    setMensaje("Sesión cerrada");
  };

  const value = {
    usuario,
    login,
    logout,
    negocio,
    mensaje,
    setMensaje,
    preferencias: {
      limitePorPagina: 5,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
