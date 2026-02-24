/**
 * ProyectoDetalle.jsx
 * Muestra el detalle de un proyecto
 */

import { useEffect, useState } from "react";
import { apiGet } from "../core/api";
import TareasPage from "./TareasPage"; // Asume que está en src/pages

// Recibe id como prop
export default function ProyectoDetalle({ id }) {
  const [proyecto, setProyecto] = useState(null);
  const [mostrarTareas, setMostrarTareas] = useState(false);

  useEffect(() => {
    async function fetchProyecto() {
      if (id) {
        try {
          const data = await apiGet(`/proyectos/${id}`);
          setProyecto(data);
        } catch (e) {
          setProyecto(null);
        }
      }
    }
    fetchProyecto();
  }, [id]);

  if (!proyecto) return <p>Cargando...</p>;

  return (
    <div className="detalle-proyecto">
      <h2>{proyecto.nombre}</h2>
      <p>
        <strong>Descripción:</strong> {proyecto.descripcion}
      </p>
      <p>
        <strong>Fecha de creación:</strong> {proyecto.fechaCreacion}
      </p>
      <p>
        <strong>Fecha de inicio:</strong> {proyecto.fechaInicio}
      </p>
      <p>
        <strong>Fecha de fin prevista:</strong> {proyecto.fechaFinPrevista}
      </p>
      <p>
        <strong>Equipo:</strong> {proyecto.idEquipo}
      </p>
      <p>
        <strong>Estado:</strong> {proyecto.idEstadoProyecto}
      </p>
      <p>
        <strong>Estado:</strong> {proyecto.creadoHace}
      </p>
      <button
        onClick={() => setMostrarTareas((prev) => !prev)}
        style={{ marginTop: "1rem" }}
      >
        {mostrarTareas ? "Ocultar tareas" : "Mostrar tareas"}
      </button>
      {mostrarTareas && (
        <div style={{ marginTop: "1rem" }}>
          <TareasPage idProyecto={id} />
        </div>
      )}
    </div>
  );
}
