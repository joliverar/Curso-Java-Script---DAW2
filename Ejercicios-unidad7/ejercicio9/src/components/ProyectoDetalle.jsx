import { useEffect } from "react";
import { useState } from "react";
import LineaTareas from "./LineaTareas";
import { apiGet } from "../data/Api";

export default function ProyectoDetalle({ id }) {
  const [proyecto, setProyecto] = useState(null);
  const [mostrarTarea, setMostrarTarea] = useState(false);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function cargarProyecto() {
      try {
        setloading(true);
        const data = await apiGet(`/proyectos/${id}`);
        setProyecto(data);
        setError(null);
      } catch (e) {
        setError(e);
        setProyecto(null);
      } finally {
        setloading(false);
      }
    }
    cargarProyecto();
  }, [id]);

  if (loading) return <p>Cargando proyecto</p>;
  if (error) return <p className="error">{error}</p>;
  if (!proyecto) return null;

  return (
    <div className="detalle_prpyecto">
      <h2>{proyecto.nombre}</h2>
      <p>
        <strong>Descripcion:</strong>
        {proyecto.descripcion}
      </p>
      <p>
        <strong>Equipo:</strong>
        {proyecto.idEquipo}
      </p>
      <p>
        <strong>Fecha creacion:</strong>
        {proyecto.fechaCreacion}
      </p>
      <p>
        <strong>Fecha inicio:</strong>
        {proyecto.fechaInicio}
      </p>
      <p>
        <strong>Fecha fin:</strong>
        {proyecto.fechaFinPrevista}
      </p>
      <p>
        <strong>Estado:</strong>
        {proyecto.idEstadoProyecto}
      </p>

      <button onClick={() => setMostrarTarea((prev) => !prev)}>
        {mostrarTarea ? "Ocultar Tareas" : "Mostrar Tarea"}
      </button>
      {mostrarTarea && <LineaTareas idProyecto={id} />}
    </div>
  );
}
