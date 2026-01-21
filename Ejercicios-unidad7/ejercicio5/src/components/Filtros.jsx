function Filtros({ filtros, onChange }) {
  return (
    <>
      <input
        className="tools__input"
        placeholder="Buscar por servicio o descripción"
        value={filtros.buscar}
        onChange={e => onChange({ ...filtros, buscar: e.target.value })}
      />

      <select
        className="tools__select"
        value={filtros.ordenar}
        onChange={e => onChange({ ...filtros, ordenar: e.target.value })}
      >
        <option value="">Ordenar</option>
        <option value="fecha">Fecha</option>
        <option value="servicio">Servicio</option>
      </select>

      <select
        className="tools__select"
        value={filtros.estado}
        onChange={e => onChange({ ...filtros, estado: e.target.value })}
      >
        <option value="">Filtrar</option>
        <option value="Pendiente">Pendiente</option>
        <option value="Cobrado">Cobrado</option>
        <option value="Cancelado">Cancelado</option>
      </select>
    </>
  );
}

export default Filtros;

