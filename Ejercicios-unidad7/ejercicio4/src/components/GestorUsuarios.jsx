import { useEffect, useState } from "react";
import UsuarioItem from "./UsuarioItem";
import UsuarioForm from "./UsuarioForm";
import { obtenerUsuarios } from "../core/apiUsuarios";
import {
  cargarUsuariosLS,
  guardarUsuariosLS,
} from "../core/storageUsuarios";

function GestorUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("todos");

  // CARGAR DATOS (useEffect = DOMContentLoaded)
  useEffect(() => {
    const cargar = async () => {
      const guardados = await cargarUsuariosLS();

      if (guardados.length > 0) {
        setUsuarios(guardados);
      } else {
        const api = await obtenerUsuarios();
        const adaptados = api.map((u) => ({
          id: u.id,
          nombre: u.name,
          email: u.email,
          activo: true,
        }));
        setUsuarios(adaptados);
      }
    };

    cargar();
  }, []);

  // GUARDAR CADA CAMBIO
  useEffect(() => {
    guardarUsuariosLS(usuarios);
  }, [usuarios]);

  // ALTA
  const crearUsuario = (nuevo) => {
    setUsuarios([...usuarios, nuevo]);
  };

  // BAJA
  const eliminarUsuario = (id) => {
    if (confirm("¿Eliminar usuario?")) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
    }
  };

  // MODIFICAR
  const cambiarEstado = (id) => {
    setUsuarios(
      usuarios.map((u) =>
        u.id === id ? { ...u, activo: !u.activo } : u
      )
    );
  };

  // FILTRO
  const usuariosFiltrados = usuarios.filter((u) => {
    if (filtro === "activos") return u.activo;
    if (filtro === "inactivos") return !u.activo;
    return true;
  });

  return (
    <>
      <h1>Gestor de usuarios</h1>

      <UsuarioForm onCrear={crearUsuario} />

      <div>
        <button onClick={() => setFiltro("todos")}>Todos</button>
        <button onClick={() => setFiltro("activos")}>Activos</button>
        <button onClick={() => setFiltro("inactivos")}>Inactivos</button>
      </div>

      <ul>
        {usuariosFiltrados.map((u) => (
          <UsuarioItem
            key={u.id}
            usuario={u}
            onEliminar={eliminarUsuario}
            onToggle={cambiarEstado}
          />
        ))}
      </ul>
    </>
  );
}

export default GestorUsuarios;

