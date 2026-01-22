function ListaLinea({ ventas, onEditar, onEliminar }) {
  return (
    <div className="users">
      {ventas.map(v => (
        <div className="user" key={v.id}>
          <div className="user__info">
            <span className="user__name">{v.servicio}</span>
            <span>{v.descripcion}</span>
            <span>{v.cliente}</span>
            <span>{v.email}</span>
            <span>{v.monto} €</span>
            <span>{v.estado}</span>
            <span>{v.fecha}</span>
          </div>

          <div className="user__actions">
            <button className="btn btn--edit" onClick={() => onEditar(v)}>
              Editar
            </button>
            <button className="btn btn--delete" onClick={() => onEliminar(v.id)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TablaVentas;


