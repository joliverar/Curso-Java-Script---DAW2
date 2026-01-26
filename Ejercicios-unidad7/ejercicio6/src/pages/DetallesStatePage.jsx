import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import negocio from "../core/NegocioApi";

function DetallesStatePage() {
  const location = useLocation();
  const navegar = useNavigate();

  const id = location.state?.id;

  const [nombre, setNombre] = useState("");
  const [horas, setHoras] = useState("");
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    if (id) cargarModulo();
  }, [id]);

  const cargarModulo = async () => {
    const datos = await negocio.obtenerModulo(id);
    setNombre(datos.nombre);
    setHoras(datos.horas);
    setCargado(true);
  };

  const guardar = async () => {
    if (nombre.trim() === "") {
      alert("Nombre obligatorio");
      return;
    }

    if (horas === "" || isNaN(horas) || Number(horas) <= 0) {
      alert("Horas incorrectas");
      return;
    }

    await negocio.actualizarModulo({
      id,
      title: nombre,
      price: Number(horas),
    });

    navegar("/lista");
  };

  if (!id) return <h2>Error: no se recibió el ID</h2>;
  if (!cargado) return <p>Cargando...</p>;

  return (
    <>
      <h1>Editar módulo (STATE)</h1>

      <input value={nombre} onChange={(e) => setNombre(e.target.value)} />

      <input
        type="number"
        value={horas}
        onChange={(e) => setHoras(e.target.value)}
      />

      <button onClick={guardar}>Guardar</button>
    </>
  );
}

export default DetallesStatePage;
