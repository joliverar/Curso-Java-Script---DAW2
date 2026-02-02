import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function PacientesPage() {
  const { negocio } = useApp();
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    setPacientes(negocio.obtenerPacientes("", 0, 10));
  }, []);

  return (
    <>
      <h2>Pacientes</h2>

      <Link to="/pacientes/nuevo">➕ Nuevo paciente</Link>

      <ul>
        {pacientes.map((p) => (
          <li key={p.id}>
            {p.nombre} — {p.dni}
          </li>
        ))}
      </ul>
    </>
  );
}
