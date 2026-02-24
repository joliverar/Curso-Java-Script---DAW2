import { useEffect, useState } from "react";

export default function Equipos() {
  const URl = "http://127.0.0.1:8000/api/v1/equipos";
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [equipoActual, setEquipoActual] = useState(null);
  const [vista, setVista] = useState("listado");
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    fechaCreacion: "",
    activo: "",
  });

  useEffect(() => {
    obtenerEquipos();
  }, []);

  async function obtenerEquipos() {
    try {
      setLoading(true);

      const res = await fetch(URl);
      const data = await res.json();
      setEquipos(data);
    } catch (error) {
      setError(error.message || "Erro al trae la data");
    } finally {
      setLoading(false);
    }
  }
  async function crearEquipos() {
    try {
      await fetch(URL, {
        method: "POST",
        headers: { "Contente-Type": "application/json" },
        body: JSON.stringify(form),
      });

      await obtenerEquipos();
      setVista("listado");
    } catch (error) {
      setError(error.message || "Erro al trae la data");
    }
  }
  async function editarEquipos() {
    try {
      await fetch(`${URL}/${equipoActual.id}`, {
        method: "POST",
        headers: { "Contente-Type": "application/json" },
        body: JSON.stringify(form),
      });

      await obtenerEquipos();
      setVista("listado");
    } catch (error) {
      setError(error.message || "Erro al trae la data");
    }
  }
  async function eliminarEquipos(id) {
    try {
      await fetch(`${URL}/${id}`, {
        method: "POST",
        headers: { "Contente-Type": "application/json" },
      });
      await obtenerEquipos();
      setVista("listado");
    } catch (error) {
      setError(error.message || "Erro al trae la data");
    }
  }

  if (vista === "listado") {
    return (
      <div className="container">
        <h2>Gestion de equipos</h2>

        <button onClick={() => setVista("crear")}>Crear Equipo</button>
        <input
          placeholder="buscar"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button onClick={() => obtenerEquipos(busqueda)}>Buscar</button>
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        <div className="tabla">
          <div className="fila encabezado">
            <div>Nombre</div>
            <div>Descripcion</div>
            <div>Fecha de creacion</div>
            <div>Activo</div>
            <div>Acciones</div>
          </div>
          {equipos.map((eq) => (
            <div className="fila" key={eq.id}>
              <div>{eq.nombre}</div>
              <div>{eq.descripcion}</div>
              <div>{eq.fechaCreacion}</div>
              <div>{eq.activo}</div>
              <div className="acciones">
                <button
                  onClick={() => {
                    setVista("editar");
                    setEquipoActual(eq);
                    setForm(eq);
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    eliminarEquipos;
                  }}
                >
                  Eliminar
                </button>
                <button
                  onClick={() => {
                    setVista("listado");
                    setEquipoActual(eq);
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
        <h2>Crear equipo</h2>

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
          value={form.fechaCreacion}
          onChange={(e) => setForm({ ...form, fechaCreacion: e.target.value })}
        />
        <input
          type="checkbox"
          value={form.activo}
          onChange={(e) => setForm({ ...form, activo: e.target.value })}
        />

        <button onClick={() => crearEquipos()}>Crear equipo</button>
        <button onClick={() => setVista("listado")}>Cancelar</button>
      </div>
    );
  }
  if (vista === "editar") {
    return (
      <div className="formulario">
        <h2>Editar equipo</h2>

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
          value={form.fechaCreacion}
          onChange={(e) => setForm({ ...form, fechaCreacion: e.target.value })}
        />
        <input
          checked={form.activo}
          onChange={(e) => setForm({ ...form, activo: e.target.value })}
        />

        <button onClick={() => editarEquipos()}>Editar equipo</button>
        <button onClick={() => setVista("listado")}>Cancelar</button>
      </div>
    );
  }
  if (vista === "ver") {
    return (
      <div className="formulario">
        <h2>ver equipo</h2>

        <p>
          <strong>Nombre</strong>
          {form.nombre}
        </p>
        <p>
          <strong>Descripcion</strong>
          {form.nombre}
        </p>
        <p>
          <strong>Fecha creacion</strong>
          {form.nombre}
        </p>
        <p>
          <strong>Activo</strong>
          {form.nombre ? "si" : "No"}
        </p>
        <button onClick={() => setVista("listado")}>volver</button>
      </div>
    );
  }
}
