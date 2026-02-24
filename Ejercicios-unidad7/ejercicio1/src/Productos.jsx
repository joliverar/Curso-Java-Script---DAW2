import { useEffect, useState } from "react";
import "./tabla.css";

export default function App() {
  const URL = "http://127.0.0.1:8000/api/v1/proyectos";

  const [proyectos, setProyectos] = useState([]);
  const [vista, setVista] = useState("listado");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [proyectoActual, setProyectoActual] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFinPrevista: "",
  });

  // 🔹 GET inicial
  useEffect(() => {
    obtenerProyectos();
  }, []);

  async function obtenerProyectos() {
    try {
      setLoading(true);
      const res = await fetch(URL);
      const data = await res.json();
      setProyectos(data);
    } catch (err) {
      setError("Error al cargar proyectos");
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Crear
  async function crearProyecto() {
    try {
      await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      await obtenerProyectos();
      setVista("listado");
    } catch (err) {
      setError("Error al crear");
    }
  }

  // 🔹 Actualizar
  async function actualizarProyecto() {
    try {
      await fetch(`${URL}/${proyectoActual.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      await obtenerProyectos();
      setVista("listado");
    } catch (err) {
      setError("Error al actualizar");
    }
  }

  // 🔹 Eliminar
  async function eliminarProyecto(id) {
    try {
      await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      await obtenerProyectos();
    } catch (err) {
      setError("Error al eliminar");
    }
  }

  // 🔹 Cálculo extra (le gusta al profe)
  const totalProyectos = proyectos.length;

  // ===============================
  // 🖥 LISTADO
  // ===============================

  if (vista === "listado") {
    return (
      <div className="container">
        <h1>Gestión de Proyectos</h1>

        <button onClick={() => setVista("crear")}>Crear Proyecto</button>

        {loading && <p>Cargando...</p>}
        {error && <p className="error">{error}</p>}

        <div className="tabla">
          <div className="fila encabezado">
            <div>ID</div>
            <div>Nombre</div>
            <div>Fecha Inicio</div>
            <div>Estado</div>
            <div>Acciones</div>
          </div>

          {proyectos.map((p) => (
            <div key={p.id} className="fila">
              <div>{p.id}</div>
              <div>{p.nombre}</div>
              <div>{p.fechaInicio}</div>
              <div>{p.idEstadoProyecto}</div>

              <div className="acciones">
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
        </div>

        <h3>Total proyectos: {totalProyectos}</h3>
      </div>
    );
  }

  // ===============================
  // 📝 CREAR
  // ===============================

  if (vista === "crear") {
    return (
      <div className="formulario">
        <h2>Crear Proyecto</h2>

        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />

        <textarea
          placeholder="Descripción"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />

        <input
          type="date"
          value={form.fechaInicio}
          onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })}
        />

        <input
          type="date"
          value={form.fechaFinPrevista}
          onChange={(e) =>
            setForm({ ...form, fechaFinPrevista: e.target.value })
          }
        />

        <button onClick={crearProyecto}>Guardar</button>
        <button onClick={() => setVista("listado")}>Cancelar</button>
      </div>
    );
  }

  // ===============================
  // ✏ EDITAR
  // ===============================

  if (vista === "editar") {
    return (
      <div className="formulario">
        <h2>Editar Proyecto</h2>

        <input
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />

        <textarea
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />

        <input
          type="date"
          value={form.fechaInicio}
          onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })}
        />

        <input
          type="date"
          value={form.fechaFinPrevista}
          onChange={(e) =>
            setForm({ ...form, fechaFinPrevista: e.target.value })
          }
        />

        <button onClick={actualizarProyecto}>Actualizar</button>
        <button onClick={() => setVista("listado")}>Cancelar</button>
      </div>
    );
  }

  // ===============================
  // 👁 VER
  // ===============================

  if (vista === "ver") {
    return (
      <div className="detalle">
        <h2>Detalle Proyecto</h2>

        <p>
          <strong>ID:</strong> {proyectoActual.id}
        </p>
        <p>
          <strong>Nombre:</strong> {proyectoActual.nombre}
        </p>
        <p>
          <strong>Descripción:</strong> {proyectoActual.descripcion}
        </p>
        <p>
          <strong>Fecha Inicio:</strong> {proyectoActual.fechaInicio}
        </p>
        <p>
          <strong>Fecha Fin:</strong> {proyectoActual.fechaFinPrevista}
        </p>

        <button onClick={() => setVista("listado")}>Volver</button>
      </div>
    );
  }
}
