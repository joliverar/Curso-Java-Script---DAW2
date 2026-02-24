import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut } from "../core/api";

export default function ProductoForm({ id, onSave }) {
  const [proyecto, setProyecto] = useState({
    nombre: "",
    descripcion: "",
    fechaCreacion: "",
    fechaInicio: "",
    fechaFinPrevista: "",
    idEquipo: "",
    idEstadoProyecto: "",
  });

  useEffect(() => {
    async function fetchProyecto() {
      if (id) {
        try {
          const data = await apiGet(`/proyectos/${id}`);
          setProyecto({
            nombre: data.nombre || "",
            descripcion: data.descripcion || "",
            fechaCreacion: data.fechaCreacion || "",
            fechaInicio: data.fechaInicio || "",
            fechaFinPrevista: data.fechaFinPrevista || "",
            idEquipo: data.idEquipo !== undefined ? String(data.idEquipo) : "",
            idEstadoProyecto:
              data.idEstadoProyecto !== undefined
                ? String(data.idEstadoProyecto)
                : "",
          });
        } catch (error) {
          alert(error.message);
        }
      }
    }
    fetchProyecto();
    // eslint-disable-next-line
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setProyecto((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function guardar(e) {
    e.preventDefault();
    const data = {
      ...proyecto,
      idEquipo: proyecto.idEquipo ? Number(proyecto.idEquipo) : null,
      idEstadoProyecto: proyecto.idEstadoProyecto
        ? Number(proyecto.idEstadoProyecto)
        : null,
    };
    try {
      let res;
      if (id) {
        res = await apiPut(`/proyectos/${id}`, data);
      } else {
        res = await apiPost("/proyectos", data);
      }
      onSave && onSave(res?.id);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <form onSubmit={guardar}>
      <input
        name="nombre"
        placeholder="Nombre"
        value={proyecto.nombre}
        onChange={handleChange}
        required
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={proyecto.descripcion}
        onChange={handleChange}
        required
      />
      <input
        name="fechaCreacion"
        type="date"
        value={proyecto.fechaCreacion}
        onChange={handleChange}
        required
      />
      <input
        name="fechaInicio"
        type="date"
        value={proyecto.fechaInicio}
        onChange={handleChange}
        required
      />
      <input
        name="fechaFinPrevista"
        type="date"
        value={proyecto.fechaFinPrevista}
        onChange={handleChange}
        required
      />
      <input
        name="idEquipo"
        type="number"
        placeholder="ID Equipo"
        value={proyecto.idEquipo}
        onChange={handleChange}
        required
      />
      <input
        name="idEstadoProyecto"
        type="number"
        placeholder="ID Estado Proyecto"
        value={proyecto.idEstadoProyecto}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
    </form>
  );
}
