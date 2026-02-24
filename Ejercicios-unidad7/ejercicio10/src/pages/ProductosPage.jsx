import { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../core/api";
import ProyectoDetalle from "./ProductoDetalle";
import ProyectoForm from "./ProductoForm";
import "../style/tabla.css";

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState([]);
  const [modo, setModo] = useState("lista");
  const [proyectoSeleccionadoId, setProyectoSeleccionadoId] = useState(null);

  useEffect(() => {
    async function fetchProyectos() {
      try {
        const data = await apiGet("/proyectos");
        setProyectos(data);
      } catch (e) {
        alert(e.message);
      }
    }
    fetchProyectos();
  }, [modo]);

  async function handleEliminar(id) {
    if (window.confirm("¿Eliminar este proyecto?")) {
      try {
        await apiDelete(`/proyectos/${id}`);
        setProyectos(proyectos.filter((p) => p.id !== id));
        setModo("lista");
      } catch (e) {
        alert(e.message);
      }
    }
  }

  function handleSave() {
    setModo("lista");
  }

  return (
    <div>
      <h2>Proyectos</h2>
      {modo === "lista" && (
        <>
          <button onClick={() => setModo("crear")}>Crear proyecto</button>
          <div className="tabla">
            <div className="fila cabecera">
              <div className="celda">Nombre</div>
              <div className="celda">Fecha inicio</div>
              <div className="celda">ID Equipo</div>
              <div className="celda">Acciones</div>
            </div>
            {proyectos.map((p) => (
              <div className="fila" key={p.id}>
                <div className="celda">{p.nombre}</div>
                <div className="celda">{p.fechaInicio}</div>
                <div className="celda">{p.idEquipo}</div>
                <div className="celda acciones">
                  <button
                    onClick={() => {
                      setProyectoSeleccionadoId(p.id);
                      setModo("ver");
                    }}
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => {
                      setProyectoSeleccionadoId(p.id);
                      setModo("editar");
                    }}
                  >
                    Editar
                  </button>
                  <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {modo === "ver" && proyectoSeleccionadoId && (
        <>
          <button onClick={() => setModo("lista")}>Volver</button>
          <ProyectoDetalle id={proyectoSeleccionadoId} />
        </>
      )}

      {(modo === "crear" || (modo === "editar" && proyectoSeleccionadoId)) && (
        <>
          <button onClick={() => setModo("lista")}>Volver</button>
          <ProyectoForm
            id={modo === "editar" ? proyectoSeleccionadoId : undefined}
            onSave={handleSave}
          />
        </>
      )}
    </div>
  );
}
