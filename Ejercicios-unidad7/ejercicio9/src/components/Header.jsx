import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="menu">
      <Link to="/">Home</Link>
      <Link to="/productos">Productos</Link>
      <Link to="/tareas">Tareas</Link>
      <Link to="/testapi">Proebar apis</Link>
    </nav>
  );
}
