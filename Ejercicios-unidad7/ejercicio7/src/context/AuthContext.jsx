import { createContext, useContext, useState } from "react";
import negocio from "../core/negocio";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  });

  const login = async (username, password) => {
    const user = await negocio.validarUsuario(username, password);
    if (user) {
      setUsuario(user);
      localStorage.setItem("usuario", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
