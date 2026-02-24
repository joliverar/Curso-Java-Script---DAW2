import { useEffect, useState } from "react";
import "./tabla.css";

export default function Proyectos() {
  const url = "http://127.0.0.1:8000/api/v1/proyectos";

  const [proyectos, setProyectos] = useState([]);
  const [vista, setVista] = useState("lista");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [proyectoActual, setProyectoActual] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    idEstadoProyecto: "",
    idEquipo: "",
    fechaCreacion: "",
    fechaFinPrevista: "",
  });

  useEffect(() => {
    obtenerProyectos();
  }, []);
  function limpiarFormulario() {
    setProyectoActual(null);
    setForm({
      nombre: "",
      descripcion: "",
      fechaInicio: "",
      idEstadoProyecto: "",
      idEquipo: "",
      fechaCreacion: "",
      fechaFinPrevista: "",
    });
  }
  async function obtenerProyectos(query = "") {
    try {
      setLoading(true);

      const endpoint = query ? `${url}?q=${query}` : url;

      const res = await fetch(endpoint);
      const data = await res.json();

      setProyectos(data);
    } catch (error) {
      setError("Error al cargar los proyectos");
    } finally {
      setLoading(false);
    }
  }
  async function crearProyecto() {
    try {
      const playload = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        fecha_inicio: form.fechaInicio,
        id_estado_proyecto: form.idEstadoProyecto,
        id_equipo: form.idEquipo,
        fecha_creacion: form.fechaCreacion,
        fecha_fin_prevista: form.fechaFinPrevista,
      };
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playload),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const mensajes = Object.values(data.errors).flat().join(" - ");
          throw new Error(mensajes);
        }
        throw new Error(data.message);
      }
      alert(data.message || "proyecto creado correctamente");
      await obtenerProyectos();
      limpiarFormulario();
      setVista("lista");
    } catch (error) {
      setError("Error al crear los proyectos");
    }
  }
  async function editarProyecto() {
    try {
      const data = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        fecha_inicio: form.fechaInicio,
        id_estado_proyecto: form.idEstadoProyecto,
        id_equipo: form.idEquipo,
        fecha_creacion: form.fechaCreacion,
        fecha_fin_prevista: form.fechaFinPrevista,
      };
      await fetch(`${url}/${proyectoActual.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      await obtenerProyectos();
      setVista("lista");
    } catch (error) {
      setError("Error al crear los proyectos");
    }
  }
  async function eliminarProyecto(id) {
    try {
      await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      });
      await obtenerProyectos();
      setVista("lista");
    } catch (error) {
      setError("Error al crear los proyectos");
    }
  }

  const totalProyectos = proyectos.length;

  if (vista === "lista") {
    return (
      <div className="container">
        <h1>Gestión de proyectos</h1>
        <input
          placeholder="Buscar proyectos"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button onClick={() => obtenerProyectos(busqueda)}>Buscar</button>

        <button
          onClick={() => {
            limpiarFormulario();
            setVista("crear");
          }}
        >
          Crear proyecto
        </button>

        {loading && <p>Cargando...</p>}
        {error && <p className="error">{error}</p>}

        <div className="tabla">
          <div className="fila cabecera">
            <div>Nombre</div>
            <div>Descripcion</div>
            <div>Fecha de inicio</div>
            <div>Estado</div>
            <div>Accciones</div>
          </div>
          {proyectos.map((p) => (
            <div key={p.id} className="fila">
              <div>{p.nombre}</div>
              <div>{p.descripcion}</div>
              <div>{p.fechaInicio}</div>
              <div>{p.idEstadoProyecto}</div>
              <div>
                <button
                  onClick={() => {
                    setProyectoActual(p);
                    setForm(p);
                    setVista("editar");
                  }}
                >
                  Editar
                </button>
                <button onClick={() => eliminarProyecto(p.id)}>Eliminar</button>
                <button
                  onClick={() => {
                    setProyectoActual(p);
                    setVista("ver");
                  }}
                >
                  Ver
                </button>
              </div>
            </div>
          ))}
          <p>Total de proyectos jino: {totalProyectos}</p>
        </div>
      </div>
    );
  }

  if (vista === "crear") {
    return (
      <div className="formulario">
        <h2>Crear proyecto</h2>
        <input
          placeholder="nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          placeholder="descripcion"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
        <input
          type="date"
          value={form.fechaInicio}
          onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })}
        />
        <input
          placeholder="idEstadoProyecto"
          value={form.idEstadoProyecto}
          onChange={(e) =>
            setForm({ ...form, idEstadoProyecto: e.target.value })
          }
        />
        <input
          placeholder="idEquipo"
          value={form.idEquipo}
          onChange={(e) => setForm({ ...form, idEquipo: e.target.value })}
        />
        <input
          type="date"
          value={form.fechaCreacion}
          onChange={(e) => setForm({ ...form, fechaCreacion: e.target.value })}
        />
        <input
          type="date"
          value={form.fechaFinPrevista}
          onChange={(e) =>
            setForm({ ...form, fechaFinPrevista: e.target.value })
          }
        />
        <button onClick={crearProyecto}>Guardar</button>
        <button onClick={() => setVista("lista")}>Cancelar</button>
      </div>
    );
  }

  if (vista === "editar") {
    return (
      <div className="formulario">
        <h2>Editar formulario</h2>
        <input
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
        <input
          type="date"
          value={form.fechaInicio}
          onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })}
        />
        <input
          value={form.idEstadoProyecto}
          onChange={(e) =>
            setForm({ ...form, idEstadoProyecto: e.target.value })
          }
        />
        <input
          placeholder="idEquipo"
          value={form.idEquipo}
          onChange={(e) => setForm({ ...form, idEquipo: e.target.value })}
        />
        <input
          type="date"
          value={form.fechaCreacion}
          onChange={(e) => setForm({ ...form, fechaCreacion: e.target.value })}
        />
        <input
          type="date"
          value={form.fechaFinPrevista}
          onChange={(e) =>
            setForm({ ...form, fechaFinPrevista: e.target.value })
          }
        />
        <button onClick={editarProyecto}>Editar</button>
        <button onClick={() => setVista("lista")}>Cancelar</button>
      </div>
    );
  }

  if (vista === "ver") {
    return (
      <div className="detalle">
        <h2>Detalle del proyecto</h2>
        <p>
          <strong>Nombre: </strong>
          {proyectoActual.nombre}
        </p>
        <p>
          <strong>Descripcion: </strong>
          {proyectoActual.descripcion}
        </p>
        <p>
          <strong>Fecha de inicio: </strong>
          {proyectoActual.fechaInicio}
        </p>
        <p>
          <strong>Estado: </strong>
          {proyectoActual.idEstadoProyecto}
        </p>
        <button onClick={() => setVista("lista")}>Volver</button>
      </div>
    );
  }
}
