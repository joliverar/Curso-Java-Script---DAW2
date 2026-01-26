import { memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import negocio from "../core/NegocioApi";

function ListaLinea({ modulo, onBorrado }) {
  const { id, nombre, horas } = modulo;
  const navegar = useNavigate();

  const borrar = async () => {
    if (confirm("¿Borrar módulo?")) {
      await negocio.borrarModulo(id);
      onBorrado(id); // 🔥 estado manda
    }
  };

  return (
    <p>
      <strong>{nombre}</strong> – Horas: {horas}
      <br />
      <button onClick={() => navegar(`/detalles/${id}`)}>Detalles URL</button>
      <button onClick={() => navegar("/detallesstate", { state: { id } })}>
        Detalles STATE
      </button>
      <br />
      <Link to={`/detalles/${id}`}>Link URL</Link>{" "}
      <Link to="/detallesstate" state={{ id }}>
        Link STATE
      </Link>
      <br />
      <button onClick={borrar}>Borrar</button>
    </p>
  );
}

export default memo(ListaLinea);
