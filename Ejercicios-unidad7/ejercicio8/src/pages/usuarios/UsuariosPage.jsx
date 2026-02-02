import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function UsuariosPage() {
  const { negocio, setMensaje } = useApp();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    setUsuarios(negocio.obtenerUsuarios());
  }, []);

  const borrar = (id) => {
    if (confirm("¿Eliminar usuario?")) {
      negocio.eliminarUsuario(id);
      setUsuarios(negocio.obtenerUsuarios());
      setMensaje("Usuario eliminado");
    }
  };

  return (
    <>
      <h2>Usuarios</h2>
      <Link to="/usuarios/nuevo">Nuevo usuario</Link>

      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {u.username} ({u.tipo})
            <button onClick={() => borrar(u.id)}>❌</button>
          </li>
        ))}
      </ul>
    </>
  );
}
