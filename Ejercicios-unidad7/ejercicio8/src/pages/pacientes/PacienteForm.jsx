import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function PacienteForm() {
  const { negocio, setMensaje } = useApp();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");

  const guardar = (e) => {
    e.preventDefault();

    if (!nombre || !dni) {
      setMensaje("Nombre y DNI obligatorios");
      return;
    }

    negocio.crearPaciente({ nombre, dni });
    setMensaje("Paciente creado correctamente");
    navigate("/pacientes");
  };

  return (
    <form onSubmit={guardar}>
      <h2>Nuevo paciente</h2>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        placeholder="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
      />

      <button>Guardar</button>
    </form>
  );
}
