import { useEffect } from "react";
import { useState } from "react";
import { apiDelete, apiGet } from "../data/Api";
import ProductosForm from "../components/ProductosForm";
import ProyectoDetalle from "../components/ProyectoDetalle";
import LineaProyecto from "../components/LineaProyecto";

export default function ProductoPage() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modo, setModo] = useState("lista");
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarProyectos();
  }, []);

  async function cargarProyectos() {
    try {
      setLoading(true);
      const data = await apiGet("/proyectos");
      setProyectos(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    await cargarProyectos();
    setModo("lista");
    setProyectoSeleccionado(null);
  }

  async function handleEliminar(id) {
    if (window.confirm("Elimnar este proyecto")) {
      try {
        await apiDelete(`/proyectos/${id}`);
        setProyectos(proyectos.filter((p) => p.id !== id));
        setModo("lista");
      } catch (error) {
        alert(error.message);
      }
    }
  }
  async function buscarProyectos(e) {
    e.preventDefault();

    try {
      setLoading(true);

      // Si no hay texto, cargamos todo
      const url = busqueda.trim()
        ? `/proyectos?q=${encodeURIComponent(busqueda)}`
        : "/proyectos";

      const data = await apiGet(url);
      setProyectos(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="principal">
        <h2>Proyectos</h2>
        <form onSubmit={buscarProyectos} style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
        {modo === "lista" && (
          <>
            <button onClick={() => setModo("crear")}>Crear Proyecto</button>
            {loading && <p>Cargando</p>}
            {!loading && (
              <div className="tabla">
                <div className="fila  cabecera">
                  <div className="celda">Nombre</div>
                  <div className="celda">Descripcion</div>
                  <div className="celda">Equipo</div>
                  <div className="celda">Creacion</div>
                  <div className="celda">Inicio</div>
                  <div className="celda">Fin</div>
                  <div className="celda">Estado</div>
                  <div className="celda">Acciones</div>
                </div>

                {proyectos.map((p) => (
                  <LineaProyecto
                    key={p.id}
                    proyecto={p}
                    onVer={() => {
                      setProyectoSeleccionado(p.id);
                      setModo("ver");
                    }}
                    onEditar={() => {
                      setProyectoSeleccionado(p.id);
                      setModo("editar");
                    }}
                    onEliminar={() => {
                      // aquí luego llamas a apiDelete
                      handleEliminar(p.id);
                      console.log("Eliminar", p.id);
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {modo === "ver" && proyectoSeleccionado && (
          <>
            <button onClick={() => setModo("lista")}>Volver</button>
            <ProyectoDetalle id={proyectoSeleccionado} />
          </>
        )}
        {(modo === "crear" || modo === "editar") && (
          <>
            <button onClick={() => setModo("lista")}>Volver</button>
            <ProductosForm
              id={modo === "editar" ? proyectoSeleccionado : undefined}
              onSave={handleSave}
            />
          </>
        )}
      </div>
    </>
  );
}
