import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function ExpedientesPage() {
  const { negocio } = useApp();
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    setPacientes(negocio.obtenerPacientes("", 0, 10));
  }, []);

  return (
    <>
      <h2>Expedientes</h2>

      <ul>
        {pacientes.map((p) => (
          <li key={p.id}>
            {p.nombre} — {p.seguroMedico || "Sin seguro"} — {p.telefono}{" "}
            <Link to={`/expedientes/${p.id}`}>Ver expediente</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
