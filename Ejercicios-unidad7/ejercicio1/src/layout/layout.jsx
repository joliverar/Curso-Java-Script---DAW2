import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "10px" }}>
          Home
        </Link>

        <Link to="/tareas">Tareas</Link>
      </nav>

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
