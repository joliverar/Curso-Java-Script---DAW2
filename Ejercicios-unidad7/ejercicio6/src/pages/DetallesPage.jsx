import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import negocio from "../core/NegocioApi";

function DetallesPage() {
  const { id } = useParams();
  const navegar = useNavigate();

  const [modulo, setModulo] = useState({
    id: "",
    nombre: "",
    horas: "",
  });

  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    cargarModulo();
  }, []);

  const cargarModulo = async () => {
    const datos = await negocio.obtenerModulo(id);
    setModulo({
      id: datos.id,
      nombre: datos.nombre,
      horas: datos.horas,
    });
    setCargado(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModulo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const guardar = async () => {
    try {
      if (modulo.nombre.trim() === "") {
        alert("Nombre obligatorio");
        return;
      }

      if (modulo.horas === "" || isNaN(modulo.horas)) {
        alert("Horas incorrectas");
        return;
      }

      const resp = await negocio.actualizarModulo({
        id: modulo.id,
        title: modulo.nombre,
        price: Number(modulo.horas),
      });

      alert("Edición realizada correctamente ✔️");
      console.log("RESPUESTA UPDATE:", resp);

      navegar("/lista");
    } catch (e) {
      alert("Error al guardar el módulo");
    }
  };

  if (!cargado) return <p>Cargando...</p>;

  return (
    <>
      <h1>Editar módulo</h1>

      <input name="nombre" value={modulo.nombre} onChange={handleChange} />

      <input
        type="number"
        name="horas"
        value={modulo.horas}
        onChange={handleChange}
      />

      <button onClick={guardar}>Guardar</button>
    </>
  );
}

export default DetallesPage;
