import { useEffect, useState } from "react";
import TareaItem from "./TareaItem";
import { cargaTareas, guardarTareas } from "../core/tareasStorage";

function GestorTareas() {
  // Estado con la lista completa de tareas
  const [tareas, setTareas] = useState([]);

  // Estado para el input de texto
  const [texto, setTexto] = useState("");

  // Estado del filtro activo (por defecto abiertas)
  const [filtro, setFiltro] = useState("abiertas");


// 1️⃣ Función ANTES del useEffect
useEffect(() => {
  const cargar = async () => {
    const datos = await cargaTareas();
    setTareas(datos);
  };

  cargar();
}, []);


// 3️⃣ Guardar cada vez que cambian
useEffect(() => {
  guardarTareas(tareas);
}, [tareas]);

  // Crea una nueva tarea
  const crearTarea = () => {
    // Evita crear tareas vacías
    if (texto.trim() === "") return;

    // Creamos el objeto tarea
    const nueva = {
      id: Date.now(), // id único
      texto: texto,
      estado: "abierta",
    };

    // Actualizamos el estado añadiendo la nueva tarea
    setTareas([...tareas, nueva]);

    // Limpiamos el input
    setTexto("");
  };

  // Cambia el estado de una tarea
  const cambiarEstado = (id) => {
    const actualizadas = tareas.map((t) =>
      t.id === id
        ? { ...t, estado: t.estado === "abierta" ? "cerrada" : "abierta" }
        : t
    );
    setTareas(actualizadas);
  };

  // Elimina una tarea
  const eliminarTarea = (id) => {
    const filtradas = tareas.filter((t) => t.id !== id);
    setTareas(filtradas);
  };

  // Aplica el filtro seleccionado
  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === "todas") return true;
    return t.estado === filtro;
  });

  // JSX del componente padre
  return (
    <>
      <h1>Gestor de tareas</h1>

      {/* Campo de texto controlado */}
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      {/* Botón para crear tarea */}
      <button onClick={crearTarea}>Añadir</button>

      {/* Botones de filtro */}
      <div>
        <button onClick={() => setFiltro("todas")}>Todas</button>
        <button onClick={() => setFiltro("abierta")}>Abiertas</button>
        <button onClick={() => setFiltro("cerrada")}>Cerradas</button>
      </div>

      {/* Lista de tareas */}
      <ul>
        {tareasFiltradas.map((tarea) => (
          <TareaItem
            key={tarea.id}
            tarea={tarea}
            onCambiarEstado={cambiarEstado}
            onEliminar={eliminarTarea}
          />
        ))}
      </ul>
    </>
  );
}

export default GestorTareas;
