import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { usuario, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>

      {usuario && <Link to="/coches">Coches</Link>}

      {!usuario && <Link to="/login">Login</Link>}

      {usuario && (
        <>
          <span style={{ marginLeft: "1rem" }}>{usuario.nombre}</span>
          <button onClick={logout} style={{ marginLeft: "1rem" }}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
