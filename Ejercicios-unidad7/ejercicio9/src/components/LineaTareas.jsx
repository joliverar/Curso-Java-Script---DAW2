/**
 * TareasProyecto.jsx
 * Muestra las tareas asociadas a un proyecto
 */

import { useEffect, useState } from "react";
import { apiGet } from "../data/Api";

export default function LineaTareas({ idProyecto }) {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idProyecto) return;

    async function cargarTareas() {
      try {
        setLoading(true);
        const data = await apiGet("/tareas");
        if (idProyecto) {
          setTareas(data.filter((t) => t.idProyecto === idProyecto));
        } else {
          setTareas(data);
        }
        setError(null);
      } catch (e) {
        setError("No se pudieron cargar las tareas");
      } finally {
        setLoading(false);
      }
    }

    cargarTareas();
  }, [idProyecto]);

  if (!idProyecto) return null;
  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="tareas-proyecto">
      <h3>Tareas del proyecto</h3>

      {tareas.length === 0 && <p>No hay tareas registradas.</p>}

      <ul>
        {tareas.map((t) => (
          <li key={t.id}>
            {t.titulo} – {t.estado}
          </li>
        ))}
      </ul>
    </div>
  );
}
