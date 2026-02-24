/**
 * TareasPage.jsx
 * Muestra las tareas de un proyecto
 */

import { useEffect, useState } from "react";
import { apiGet } from "../core/api";
import TareasForm from "./TareasForm";

export default function TareasPage({ idProyecto }) {
  const [tareas, setTareas] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editarId, setEditarId] = useState(null);

  // Recarga lista tras guardar
  const cargarTareas = async () => {
    try {
      const data = await apiGet("/tareas");
      if (idProyecto) {
        setTareas(data.filter((t) => t.idProyecto === idProyecto));
      } else {
        setTareas(data);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    cargarTareas();
    // eslint-disable-next-line
  }, [idProyecto]);

  const handleCrear = () => {
    setEditarId(null);
    setMostrarForm(true);
  };

  const handleEditar = (tareaId) => {
    setEditarId(tareaId);
    setMostrarForm(true);
  };

  const handleFormSave = () => {
    setMostrarForm(false);
    setEditarId(null);
    cargarTareas();
  };

  return (
    <div>
      <h2>Tareas del proyecto {idProyecto ? `#${idProyecto}` : ""}</h2>

      <button onClick={handleCrear} style={{ marginBottom: "1rem" }}>
        Crear tarea
      </button>

      {mostrarForm && (
        <div
          style={{
            marginBottom: "1.5rem",
            border: "1px solid #eee",
            padding: "1rem",
          }}
        >
          <TareasForm id={editarId} onSave={handleFormSave} />
          <button
            onClick={() => setMostrarForm(false)}
            style={{ marginTop: 8 }}
          >
            Cancelar
          </button>
        </div>
      )}

      {tareas.length === 0 ? (
        <p>No hay tareas registradas.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "2.5rem 8rem 2fr 1fr 1fr 1fr 1fr 1fr 1fr 6rem",
              fontWeight: "bold",
              background: "#f7f7f7",
              borderBottom: "2px solid #bbb",
              padding: "0.5rem 0",
            }}
          >
            <div>#</div>
            <div>Título</div>
            <div>Descripción</div>
            <div>Estado</div>
            <div>Prioridad</div>
            <div>Asignado a</div>
            <div>Fecha creación</div>
            <div>Fecha límite</div>
            <div>Fecha cierre</div>
            <div>Acción</div>
          </div>
          {tareas.map((t, idx) => (
            <div
              key={t.id}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "2.5rem 8rem 2fr 1fr 1fr 1fr 1fr 1fr 1fr 6rem",
                alignItems: "center",
                borderBottom: "1px solid #eee",
                background: idx % 2 === 0 ? "#fff" : "#fcfcfc",
                fontSize: 15,
                padding: "0.4rem 0",
              }}
            >
              <div style={{ textAlign: "center" }}>{idx + 1}</div>
              <div>{t.titulo}</div>
              <div style={{ whiteSpace: "pre-line" }}>{t.descripcion}</div>
              <div>{t.idEstado}</div>
              <div>{t.idPrioridad}</div>
              <div>{t.idAsignadoA}</div>
              <div style={{ whiteSpace: "nowrap" }}>
                {new Date(t.fechaCreacion).toLocaleDateString()}
              </div>
              <div style={{ whiteSpace: "nowrap" }}>
                {new Date(t.fechaLimite).toLocaleDateString()}
              </div>
              <div style={{ whiteSpace: "nowrap" }}>
                {t.fechaCierre
                  ? new Date(t.fechaCierre).toLocaleDateString()
                  : "Pendiente"}
              </div>
              <div>
                <button
                  onClick={() => handleEditar(t.id)}
                  style={{
                    background: "#ddd",
                    border: "1px solid #bbb",
                    borderRadius: 4,
                    padding: "0.3rem 0.6rem",
                  }}
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
