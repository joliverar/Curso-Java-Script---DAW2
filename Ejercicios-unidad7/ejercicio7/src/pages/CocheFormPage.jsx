import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import negocio from "../core/negocio";
import { useAuth } from "../context/AuthContext";

function CocheFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [coche, setCoche] = useState({
    marca: "",
    modelo: "",
    anno: "",
    km: "",
    color: "",
    precio: "",
    combustible: "",
    transmision: "",
    potencia: "",
    puertas: "",
    estado: "Disponible",
  });

  const soloLectura = !usuario;

  useEffect(() => {
    if (id) {
      negocio.obtenerCoche(id).then((data) => {
        if (data) setCoche(data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoche({ ...coche, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) return;

    if (id) {
      await negocio.actualizarCoche(coche);
    } else {
      await negocio.crearCoche(coche);
    }

    navigate("/coches");
  };

  return (
    <div className="coche-form-page">
      <h1>{id ? "Ficha del coche" : "Nuevo coche"}</h1>

      <form onSubmit={handleSubmit} className="coche-form">
        <input
          name="marca"
          value={coche.marca}
          onChange={handleChange}
          disabled={soloLectura}
          placeholder="Marca"
        />
        <input
          name="modelo"
          value={coche.modelo}
          onChange={handleChange}
          disabled={soloLectura}
          placeholder="Modelo"
        />
        <input
          name="anno"
          value={coche.anno}
          onChange={handleChange}
          disabled={soloLectura}
          placeholder="Año"
        />
        <input
          name="km"
          value={coche.km}
          onChange={handleChange}
          disabled={soloLectura}
          placeholder="Kilómetros"
        />
        <input
          name="color"
          value={coche.color}
          onChange={handleChange}
          disabled={soloLectura}
          placeholder="Color"
        />
        <input
          name="precio"
          value={coche.precio}
          onChange={handleChange}
          disabled={soloLectura}
          placeholder="Precio €"
        />
        <input
          name="combustible"
          value={coche.combustible}
          onChange={handleChange}
          disabled={soloLectura}
          placeholder="Combustible"
        />
        <input
          name="transmision"
          value={coche.transmision}
          onChange={handleChange}
          disabled={soloLectura}
          placeholder="Transmisión"
        />
        <input
          name="potencia"
          value={coche.potencia}
          onChange={handleChange}
          disabled={soloLectura}
          placeholder="Potencia (HP)"
        />
        <input
          name="puertas"
          value={coche.puertas}
          onChange={handleChange}
          disabled={soloLectura}
          placeholder="Puertas"
        />
        <input
          name="estado"
          value={coche.estado}
          onChange={handleChange}
          disabled={soloLectura}
          placeholder="Estado"
        />

        {usuario && (
          <button type="submit">
            {id ? "Guardar cambios" : "Crear coche"}
          </button>
        )}
      </form>

      {!usuario && <p>Modo consulta (solo lectura)</p>}
    </div>
  );
}

export default CocheFormPage;
