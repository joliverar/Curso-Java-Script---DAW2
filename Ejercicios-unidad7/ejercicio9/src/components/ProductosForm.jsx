import { useEffect } from "react";
import { useState } from "react";
import { apiGet, apiPost, apiPut } from "../data/Api";

export default function ProductoForm({ id, onSave }) {
  const [proyecto, setProyecto] = useState({
    nombre: "",
    descripcion: "",
    idEquipo: "",
    fechaCreacion: "",
    fechaInicio: "",
    fechaFinPrevista: "",
    idEstadoProyecto: "",
  });
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (!id) return;
    async function cargarProyecto() {
      try {
        setloading(true);
        const data = await apiGet(`/proyectos/${id}`);
        setProyecto({
          nombre: data.nombre ?? "",
          descripcion: data.descripcion ?? "",
          idEquipo: data.idEquipo ?? "",
          fechaCreacion: data.fechaCreacion ?? "",
          fechaInicio: data.fechaInicio ?? "",
          fechaFinPrevista: data.fechaFinPrevista ?? "",
          idEstadoProyecto: data.idEstadoProyecto ?? "",
        });
      } catch (error) {
        setError(error);
      } finally {
        setloading(false);
      }
    }
    cargarProyecto();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setProyecto((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const playload = {
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      id_equipo: proyecto.idEquipo,
      fecha_creacion: proyecto.fechaCreacion,
      fecha_inicio: proyecto.fechaInicio,
      fecha_fin_prevista: proyecto.fechaFinPrevista,
      id_estado_proyecto: proyecto.idEstadoProyecto,
    };
    try {
      setloading(true);
      if (id) {
        await apiPut(`/proyectos/${id}`, playload);
      } else {
        await apiPost(`/proyectos`, playload);
      }
      onSave && onSave();
    } catch (error) {
      setError(error.message);
    } finally {
      setloading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <p className="error">{error}</p>}

      <input
        name="nombre"
        placeholder="Nombre"
        value={proyecto.nombre}
        onChange={handleChange}
        required
      />
      <input
        name="descripcion"
        placeholder="descripcion"
        value={proyecto.descripcion}
        onChange={handleChange}
        required
      />
      <input
        name="idEquipo"
        placeholder="idEquipo"
        value={proyecto.idEquipo}
        onChange={handleChange}
        required
      />
      <input
        name="fechaCreacion"
        type="date"
        placeholder="fechaCreacion"
        value={proyecto.fechaCreacion}
        onChange={handleChange}
        required
      />
      <input
        name="fechaInicio"
        type="date"
        placeholder="fechaInicio"
        value={proyecto.fechaInicio}
        onChange={handleChange}
        required
      />
      <input
        name="fechaFinPrevista"
        type="date"
        placeholder="fechaFinPrevista"
        value={proyecto.fechaFinPrevista}
        onChange={handleChange}
        required
      />
      <input
        name="idEstadoProyecto"
        placeholder="idEstadoProyecto"
        value={proyecto.idEstadoProyecto}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
