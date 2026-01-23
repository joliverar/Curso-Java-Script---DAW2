import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import negocio from "../core/Negocio";

function DetallesStatePage() {
  const location = useLocation();
  const navegar = useNavigate();

  const id = location.state?.id;
  const [modulo, setModulo] = useState(null);

  useEffect(() => {
    if (id) {
      cargarModulo(id);
    }
  }, [id]);

  const cargarModulo = async (id) => {
    try {
      const respuesta = await negocio.obtenerModulo(id);
      setModulo(respuesta);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setModulo({
      ...modulo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    guardarModulo();
  };

  const guardarModulo = async () => {
    try {
      await negocio.actualizarModulo(modulo);
      navegar("/lista");
    } catch (e) {
      console.log(e);
    }
  };

  if (!id) {
    return <h2>Error: no se recibió el ID</h2>;
  }

  return (
    <>
      <h1>Editar módulo (STATE)</h1>

      {modulo && (
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={modulo.nombre}
            onChange={handleChange}
          />

          <br />

          <label>Horas:</label>
          <input
            type="number"
            name="horas"
            value={modulo.horas}
            onChange={handleChange}
          />

          <br />
          <button type="submit">Guardar</button>
        </form>
      )}
    </>
  );
}

export default DetallesStatePage;
