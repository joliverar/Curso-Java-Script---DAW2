import { useEffect, useState } from "react";
import negocio from "../core/negocio";

function HomePage() {
  const [pacientes, setPacientes] = useState([]);
  const [usuarios, seUsuarios] = useState([]);

  useEffect(() => {
    negocio.obtenerPacientes("", 0, 6).then(setPacientes);
  }, []);

  return (
    <>
      <h1>Inicio – Clinica</h1>

      <ul>
        {pacientes.map((paciente) => (
          <li key={paciente.id}>
            {paciente.nombre} {paciente.dni} - {paciente.telefono} 
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomePage;