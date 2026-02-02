import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function UsuarioForm() {
  const { negocio, setMensaje } = useApp();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("gestion");

  const guardar = (e) => {
    e.preventDefault();
    negocio.crearUsuario({ username, password, tipo });
    setMensaje("Usuario creado");
    navigate("/usuarios");
  };

  return (
    <form onSubmit={guardar}>
      <h2>Nuevo usuario</h2>

      <input
        placeholder="Usuario"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <select onChange={(e) => setTipo(e.target.value)}>
        <option value="gestion">Gestión</option>
        <option value="medico">Médico</option>
        <option value="admin">Admin</option>
      </select>

      <button>Guardar</button>
    </form>
  );
}
