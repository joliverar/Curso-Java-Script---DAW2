export default function LineaProyecto({
  proyecto,
  onVer,
  onEditar,
  onEliminar,
}) {
  return (
    <div className="fila">
      <div className="celda">{proyecto.nombre}</div>
      <div className="celda">{proyecto.descripcion}</div>
      <div className="celda">{proyecto.idEquipo}</div>
      <div className="celda">{proyecto.fechaCreacion}</div>
      <div className="celda">{proyecto.fechaInicio}</div>
      <div className="celda">{proyecto.fechaFinPrevista}</div>
      <div className="celda">{proyecto.idEstadoProyecto}</div>
      <div className="celda">
        <button onClick={onVer}>Ver</button>
        <button onClick={onEditar}>Editar</button>
        <button onClick={onEliminar}>Eliminar</button>
      </div>
    </div>
  );
}
