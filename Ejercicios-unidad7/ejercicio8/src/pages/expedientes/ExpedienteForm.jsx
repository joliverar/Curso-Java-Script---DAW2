import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function ExpedienteForm() {
  const { id } = useParams();
  const { negocio, setMensaje } = useApp();
  const navigate = useNavigate();

  const [expediente, setExpediente] = useState(null);

  useEffect(() => {
    setExpediente(negocio.obtenerExpediente(Number(id)));
  }, [id]);

  if (!expediente) return <p>Cargando...</p>;

  const guardar = (e) => {
    e.preventDefault();
    negocio.actualizarExpediente(expediente);
    setMensaje("Expediente actualizado");
    navigate("/expedientes");
  };

  return (
    <form onSubmit={guardar}>
      <h3>Expediente médico</h3>

      <textarea
        placeholder="Antecedentes"
        value={expediente.antecedentes || ""}
        onChange={(e) =>
          setExpediente({ ...expediente, antecedentes: e.target.value })
        }
      />

      <textarea
        placeholder="Observaciones"
        value={expediente.observaciones || ""}
        onChange={(e) =>
          setExpediente({ ...expediente, observaciones: e.target.value })
        }
      />

      <button>Guardar</button>
    </form>
  );
}
