import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URL = "http://127.0.0.1:8000/api/v1/tareas";

export default function TareaForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const esEdicion = !!id;

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    fecha_creacion: "",
    orden_kanban: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (esEdicion) {
      cargarTarea();
    }
  }, []);

  async function cargarTarea() {
    const res = await fetch(`${URL}/${id}`);
    const data = await res.json();
    setForm(data);
  }

  async function guardar() {
    try {
      setError(null);

      const res = await fetch(esEdicion ? `${URL}/${id}` : URL, {
        method: esEdicion ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error API");
      }

      navigate("/tareas");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="formulario">
      <h2>{esEdicion ? "Editar tarea" : "Crear tarea"}</h2>

      {error && <p>{error}</p>}

      <input
        placeholder="Titulo"
        value={form.titulo}
        onChange={(e) => setForm({ ...form, titulo: e.target.value })}
      />

      <input
        placeholder="Descripcion"
        value={form.descripcion}
        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
      />

      <input
        type="date"
        value={form.fecha_creacion}
        onChange={(e) => setForm({ ...form, fecha_creacion: e.target.value })}
      />

      <input
        placeholder="Orden"
        value={form.orden_kanban}
        onChange={(e) => setForm({ ...form, orden_kanban: e.target.value })}
      />

      <button onClick={guardar}>{esEdicion ? "Actualizar" : "Crear"}</button>

      <button onClick={() => navigate("/tareas")}>Cancelar</button>
    </div>
  );
}
