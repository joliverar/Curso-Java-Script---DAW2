import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const URL = "http://127.0.0.1:8000/api/v1/tareas";

export default function TareaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tarea, setTarea] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    const res = await fetch(`${URL}/${id}`);
    const data = await res.json();
    setTarea(data);
  }

  if (!tarea) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Detalle de tarea</h2>
      <p>
        <strong>Titulo:</strong> {tarea.titulo}
      </p>
      <p>
        <strong>Descripcion:</strong> {tarea.descripcion}
      </p>
      <p>
        <strong>Fecha:</strong> {tarea.fecha_creacion}
      </p>
      <p>
        <strong>Orden:</strong> {tarea.orden_kanban}
      </p>

      <button onClick={() => navigate("/tareas")}>Volver</button>
    </div>
  );
}
