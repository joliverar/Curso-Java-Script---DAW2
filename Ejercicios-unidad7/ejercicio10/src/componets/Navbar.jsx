import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#eee", marginBottom: "2rem" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>
        Inicio
      </Link>
      <Link to="/productos" style={{ marginRight: "1rem" }}>
        Productos
      </Link>
      <Link to="/tareas">Tareas de un proyecto</Link>
    </nav>
  );
}

export default Navbar;
