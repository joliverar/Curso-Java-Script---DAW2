import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "http://127.0.0.1:8000/api/v1/tareas";

export default function TareasListado() {
  const navigate = useNavigate();

  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    obtenerTareas();
  }, []);

  async function obtenerTareas(query = "") {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch(`${URL}?q=${query}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error API");
      }

      setTareas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function eliminarTarea(id) {
    if (!window.confirm("¿Está seguro de eliminar?")) return;

    try {
      const res = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al eliminar");
      }

      await obtenerTareas(busqueda);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <h2>Gestión de tareas</h2>

      <button onClick={() => navigate("/tareas/crear")}>Crear tarea</button>

      <input
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <button onClick={() => obtenerTareas(busqueda)}>Buscar</button>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {tareas.length === 0 && !loading && <p>No hay tareas disponibles</p>}

      <div className="tabla">
        {tareas.map((t) => (
          <div key={t.id} className="fila">
            <div>{t.titulo}</div>
            <div>{t.descripcion}</div>
            <div>{t.fecha_creacion}</div>
            <div>{t.orden_kanban}</div>
            <div>
              <button onClick={() => navigate(`/tareas/editar/${t.id}`)}>
                Editar
              </button>
              <button onClick={() => eliminarTarea(t.id)}>Eliminar</button>
              <button onClick={() => navigate(`/tareas/${t.id}`)}>Ver</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
