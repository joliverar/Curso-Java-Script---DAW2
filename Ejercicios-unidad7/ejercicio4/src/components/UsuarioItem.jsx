function UsuarioItem({ usuario, onEliminar, onToggle }) {
  return (
    <li>
      {usuario.nombre} ({usuario.email}) —
      <strong>{usuario.activo ? " Activo" : " Inactivo"}</strong>

      <button onClick={() => onToggle(usuario.id)}>
        Cambiar estado
      </button>

      <button onClick={() => onEliminar(usuario.id)}>
        Eliminar
      </button>
    </li>
  );
}

export default UsuarioItem;
