import { useEffect, useState } from "react";
import "./tabla.css";

export default function Tareas() {
  const URL = "http://127.0.0.1:8000/api/v1/tareas";

  const [tareas, setTareas] = useState([]);
  const [vista, setVista] = useState("listado");
  const [tareaActual, setTareaActual] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    fechaCreacion: "",
    ordenKanban: "",
  });
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    obtenerTareas();
  }, []);

  function limpiar() {
    setTareaActual(null);
    setForm({
      titulo: "",
      descripcion: "",
      fechaCreacion: "",
      ordenKanban: "",
    });
  }

  async function obtenerTareas(query = "") {
    try {
      setLoading(true);
      const endPoint = `${URL}?q=${query}`;

      setError(null);
      const res = await fetch(endPoint);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error de la api");
      }
      setTareas(data);
    } catch (error) {
      setError("Error al obtener los datos");
    } finally {
      setLoading(false);
    }
  }
  async function crearTareas() {
    try {
      setError(null); // limpiar errores anteriores

      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data = null;

      if (res.status !== 204) {
        data = await res.json();
      }

      if (!res.ok) {
        const mensaje = data?.message || "Error en la API";
        throw new Error(mensaje);
      }

      await obtenerTareas();
      setVista("listado");
    } catch (error) {
      setError(error.message);
    }
  }

  async function editarTareas() {
    try {
      const res = await fetch(`${URL}/${tareaActual.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error de la api");
      }
      await obtenerTareas();
      setVista("listado");
    } catch (error) {
      setError("Error al obtener los datos");
    }
  }
  async function eliminarTareas(id) {
    const confirmar = window.confirm("Esta seguro de eleiminar");
    if (!confirmar) return;
    try {
      setError(null);
      const res = await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error de la api");
      }
      await obtenerTareas();
      setVista("listado");
    } catch (error) {
      setError("Error al eliminar");
    }
  }

  if (vista === "listado") {
    return (
      <div className="container">
        <h2>Gestión de tareas</h2>
        <button
          onClick={() => {
            limpiar();
            setVista("crear");
          }}
        >
          Crear proyecto
        </button>
        <input
          placeholder="buscar tareas"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button onClick={() => obtenerTareas(busqueda)}>Buscar</button>
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        <div className="tabla">
          <div className="fila encabezado">
            <div>Titulo</div>
            <div>Descripcion</div>
            <div>Fecha de creación</div>
            <div>Orden</div>
            <div>Acciones</div>
          </div>
          {tareas.map((t) => (
            <div key={t.id} className="fila">
              <div>{t.titulo}</div>
              <div>{t.descripcion}</div>
              <div>{t.fechaCreacion}</div>
              <div>{t.ordenKanban}</div>
              <div className="acciones">
                <button
                  onClick={() => {
                    setVista("editar");
                    setForm(t);
                    setTareaActual(t);
                  }}
                >
                  Editar
                </button>
                <button onClick={() => eliminarTareas(t.id)}>Eliminar</button>
                <button
                  onClick={() => {
                    setVista("ver");
                    setTareaActual(t);
                  }}
                >
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (vista === "crear") {
    return (
      <div className="formulario">
        <h2>Crear tarea</h2>
        <input
          placeholder="titulo"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        />
        <input
          placeholder="descripcion"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
        <input
          type="date"
          value={form.fechaCreacion}
          onChange={(e) => setForm({ ...form, fechaCreacion: e.target.value })}
        />
        <input
          placeholder="ordenKanban"
          value={form.ordenKanban}
          onChange={(e) => setForm({ ...form, ordenKanban: e.target.value })}
        />
        <button onClick={crearTareas}>Crear tarea</button>
        <button onClick={() => setVista("listado")}>Cancelar</button>
      </div>
    );
  }

  if (vista === "editar") {
    return (
      <div className="formulario">
        <h2>Editar tarea</h2>
        <input
          placeholder="titulo"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        />
        <input
          placeholder="descripcion"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
        <input
          type="date"
          value={form.fechaCreacion}
          onChange={(e) => setForm({ ...form, fechaCreacion: e.target.value })}
        />
        <input
          placeholder="ordenKanban"
          value={form.ordenKanban}
          onChange={(e) => setForm({ ...form, ordenKanban: e.target.value })}
        />
        <button onClick={editarTareas}>Editar tarea</button>
        <button onClick={() => setVista("listado")}>Cancelar</button>
      </div>
    );
  }

  if (vista === "ver") {
    return (
      <div className="detalle">
        <h2>ver tarea</h2>
        <p>
          <strong>Titulo</strong>
          {form.titulo}
        </p>
        <p>
          <strong>Descripcion</strong>
          {form.descripcion}
        </p>
        <p>
          <strong>Fecha</strong>
          {form.fechaCreacion}
        </p>
        <p>
          <strong>Orden</strong>
          {form.ordenKanban}
        </p>
        <button onClick={() => setVista("listado")}>Volver</button>
      </div>
    );
  }
}
