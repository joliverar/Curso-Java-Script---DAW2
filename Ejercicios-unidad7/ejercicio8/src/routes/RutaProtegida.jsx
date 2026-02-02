import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function RutaProtegida({ roles, children }) {
  const { usuario } = useApp();

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(usuario.tipo)) {
    return <Navigate to="/error" />;
  }

  return children;
}
