function TareaItem({ tarea, onCambiarEstado, onEliminar }) {
  // Desestructuramos las propiedades del objeto tarea
  const { id, texto, estado } = tarea;

  // Cambia el estado de la tarea (abierta / cerrada)
  const handleCambiar = () => {
    // Avisamos al componente padre
    onCambiarEstado(id);
  };

  // Elimina la tarea con confirmación
  const handleEliminar = () => {
    // confirm() muestra un popup nativo del navegador
    if (confirm("¿Eliminar tarea?")) {
      // Avisamos al padre para que elimine la tarea
      onEliminar(id);
    }
  };

  // JSX que representa una tarea individual
  return (
    <li>
      {/* Texto de la tarea y su estado */}
      <span>
        {texto} — <strong>{estado}</strong>
      </span>

      {/* Botón para cambiar estado */}
      <button onClick={handleCambiar}>
        {estado === "abierta" ? "Cerrar" : "Abrir"}
      </button>

      {/* Botón para eliminar */}
      <button onClick={handleEliminar}>Eliminar</button>
    </li>
  );
}

// Exportamos el componente
export default TareaItem;
