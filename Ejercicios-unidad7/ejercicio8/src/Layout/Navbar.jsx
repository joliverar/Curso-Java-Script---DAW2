import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { usuario, logout } = useApp();

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Inicio</Link>
      {" | "}

      {!usuario && <Link to="/login">Login</Link>}

      {usuario?.tipo === "gestion" && <Link to="/pacientes">Pacientes</Link>}

      {usuario?.tipo === "medico" && <Link to="/expedientes">Expedientes</Link>}

      {usuario?.tipo === "admin" && (
        <>
          <Link to="/pacientes">Pacientes</Link>
          {" | "}
          <Link to="/expedientes">Expedientes</Link>
          {" | "}
          <Link to="/usuarios">Usuarios</Link>
        </>
      )}

      {usuario && (
        <>
          {" | "}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}
