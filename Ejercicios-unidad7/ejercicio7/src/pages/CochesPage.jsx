import { useEffect, useState } from "react";
import negocio from "../core/negocio";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/coches.css";

function CochesPage() {
  const [coches, setCoches] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [inicio, setInicio] = useState(0);
  const { usuario } = useAuth();

  const borrarCoche = async (id) => {
    const ok = window.confirm("¿Seguro que deseas eliminar este coche?");
    if (!ok) return;

    await negocio.eliminarCoche(id);
    cargarCoches();
  };

  {
    usuario && (
      <div className="coches-acciones">
        <Link to="/coches/nuevo">
          <button>+ Nuevo coche</button>
        </Link>
      </div>
    );
  }

  const LIMITE = 10;

  useEffect(() => {
    cargarCoches();
  }, [buscar, inicio]);

  const cargarCoches = () => {
    negocio.obtenerCoches(buscar, inicio, LIMITE).then(setCoches);
  };

  return (
    <div className="coches-page">
      <h1>Mantenimiento de coches</h1>

      {/* 🔍 Buscador */}
      <div className="coches-tools">
        <input
          type="text"
          className="coches-buscador"
          placeholder="Buscar coche..."
          value={buscar}
          onChange={(e) => {
            setBuscar(e.target.value);
            setInicio(0);
          }}
        />
      </div>

      {/* 📋 Cabecera */}
      <div className="coches-header">
        <div>ID</div>
        <div>Marca</div>
        <div>Modelo</div>
        <div>Año</div>
        <div>KM</div>
        <div>Precio</div>
        <div>Estado</div>
      </div>

      {/* 📦 Filas */}
      <div className="coches-list">
        {coches.map((coche) => (
          <div className="coches-row" key={coche.id}>
            <div>{coche.id}</div>
            <div>{coche.marca}</div>
            <div>
              <Link to={`/coches/${coche.id}`}>{coche.modelo}</Link>
            </div>
            <div>{coche.anno}</div>
            <div>{coche.km}</div>
            <div>{coche.precio} €</div>
            <div>{coche.estado}</div>

            {usuario && (
              <div className="coches-row-actions">
                <Link to={`/coches/${coche.id}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => borrarCoche(coche.id)}>Eliminar</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ⏮ ⏭ Paginación */}
      <div className="coches-paginacion">
        <button
          onClick={() => setInicio(Math.max(0, inicio - LIMITE))}
          disabled={inicio === 0}
        >
          Anterior
        </button>

        <button onClick={() => setInicio(inicio + LIMITE)}>Siguiente</button>
      </div>
    </div>
  );
}

export default CochesPage;
