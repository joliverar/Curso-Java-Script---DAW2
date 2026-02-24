/**
 * HomePage.jsx
 * Menú principal para navegar a productos y pedidos.
 */

import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Inicio</h1>
      <p style={{ fontSize: "1.25rem", marginTop: "1rem" }}>
        ¡Bienvenido/a al sistema de gestión del concesionario!
        <br />
        Selecciona una opción para administrar los productos o los pedidos.
      </p>
    </div>
  );
}
