import { useEffect, useState } from "react";
import negocio from "../core/negocio";

function HomePage() {
  const [coches, setCoches] = useState([]);

  useEffect(() => {
    negocio.obtenerCoches("", 0, 6).then(setCoches);
  }, []);

  return (
    <>
      <h1>Inicio – Concesionario</h1>

      <ul>
        {coches.map((coche) => (
          <li key={coche.id}>
            {coche.marca} {coche.modelo} - {coche.precio} €
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomePage;
