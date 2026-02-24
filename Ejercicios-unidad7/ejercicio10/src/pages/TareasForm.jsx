import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut } from "../core/api";

/**
 * TareasForm.jsx
 * Permite crear y editar Tareas, campos refactorizados con nuevos nombres
 */
export default function TareasForm({ id, onSave }) {
  const [tarea, setTarea] = useState({
    titulo: "",
    descripcion: "",
    idProyecto: "",
    idEstado: "",
    idAsignadoA: "",
    idPrioridad: "",
    fechaCreacion: "",
    fechaLimite: "",
    fechaCierre: "",
    ordenKanban: "",
  });

  useEffect(() => {
    async function fetchTarea() {
      if (id) {
        try {
          const data = await apiGet(`/tareas/${id}`);
          setTarea({
            titulo: data.titulo || "",
            descripcion: data.descripcion || "",
            idProyecto:
              data.idProyecto !== undefined ? String(data.idProyecto) : "",
            idEstado: data.idEstado !== undefined ? String(data.idEstado) : "",
            idAsignadoA:
              data.idAsignadoA !== undefined ? String(data.idAsignadoA) : "",
            idPrioridad:
              data.idPrioridad !== undefined ? String(data.idPrioridad) : "",
            fechaCreacion: data.fechaCreacion
              ? data.fechaCreacion.slice(0, 10)
              : "",
            fechaLimite: data.fechaLimite ? data.fechaLimite.slice(0, 10) : "",
            fechaCierre: data.fechaCierre ? data.fechaCierre.slice(0, 10) : "",
            ordenKanban:
              data.ordenKanban !== undefined ? String(data.ordenKanban) : "",
          });
        } catch (error) {
          alert(error.message);
        }
      } else {
        setTarea({
          titulo: "",
          descripcion: "",
          idProyecto: "",
          idEstado: "",
          idAsignadoA: "",
          idPrioridad: "",
          fechaCreacion: "",
          fechaLimite: "",
          fechaCierre: "",
          ordenKanban: "",
        });
      }
    }
    fetchTarea();
    // eslint-disable-next-line
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setTarea((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function guardar(e) {
    e.preventDefault();
    const data = {
      ...tarea,
      idProyecto: tarea.idProyecto ? Number(tarea.idProyecto) : null,
      idEstado: tarea.idEstado ? Number(tarea.idEstado) : null,
      idAsignadoA: tarea.idAsignadoA ? Number(tarea.idAsignadoA) : null,
      idPrioridad: tarea.idPrioridad ? Number(tarea.idPrioridad) : null,
      ordenKanban: tarea.ordenKanban ? Number(tarea.ordenKanban) : null,
      fechaCreacion: tarea.fechaCreacion || null,
      fechaLimite: tarea.fechaLimite || null,
      fechaCierre: tarea.fechaCierre || null,
    };
    try {
      let res;
      if (id) {
        res = await apiPut(`/tareas/${id}`, data);
      } else {
        res = await apiPost("/tareas", data);
      }
      onSave && onSave(res?.id);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <form onSubmit={guardar}>
      <input
        name="titulo"
        placeholder="Título"
        value={tarea.titulo}
        onChange={handleChange}
        required
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={tarea.descripcion}
        onChange={handleChange}
        required
      />
      <input
        name="idProyecto"
        type="number"
        placeholder="ID Proyecto"
        value={tarea.idProyecto}
        onChange={handleChange}
        required
      />
      <input
        name="idEstado"
        type="number"
        placeholder="ID Estado"
        value={tarea.idEstado}
        onChange={handleChange}
        required
      />
      <input
        name="idAsignadoA"
        type="number"
        placeholder="ID Asignado A"
        value={tarea.idAsignadoA}
        onChange={handleChange}
        required
      />
      <input
        name="idPrioridad"
        type="number"
        placeholder="ID Prioridad"
        value={tarea.idPrioridad}
        onChange={handleChange}
        required
      />
      <input
        name="fechaCreacion"
        type="date"
        placeholder="Fecha de creación"
        value={tarea.fechaCreacion}
        onChange={handleChange}
        required
      />
      <input
        name="fechaLimite"
        type="date"
        placeholder="Fecha límite"
        value={tarea.fechaLimite}
        onChange={handleChange}
        required
      />
      <input
        name="fechaCierre"
        type="date"
        placeholder="Fecha de cierre"
        value={tarea.fechaCierre || ""}
        onChange={handleChange}
      />
      <input
        name="ordenKanban"
        type="number"
        placeholder="Orden Kanban"
        value={tarea.ordenKanban}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
    </form>
  );
}
