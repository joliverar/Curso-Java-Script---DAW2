import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider";

function AdministracionPage() {
  const { datos } = useContext(SeguridadContext);
  const navegar = useNavigate();

  if (!datos.tienePermisos) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>Página de administración</h1>
      <button onClick={() => navegar("/")}>Volver a inicio</button>
    </>
  );
}

export default AdministracionPage;
