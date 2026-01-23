import { memo } from "react";
import { useNavigate, Link } from "react-router-dom";

function ListaLinea({ modulo }) {
  const { id, nombre, horas } = modulo;
  const navegar = useNavigate();

  const navegarConId = () => {
    navegar(`/detalles/${id}`);
  };

  const navegarConState = () => {
    navegar("/detallesstate", { state: { id } });
  };

  return (
    <p>
      <strong>{nombre}</strong> – Horas: {horas}
      <br />
      <button onClick={navegarConId}>Detalles (URL)</button>{" "}
      <button onClick={navegarConState}>Detalles (STATE)</button>
      <br />
      <Link to={`/detalles/${id}`}>Link URL</Link>{" "}
      <Link to="/detallesstate" state={{ id }}>
        Link STATE
      </Link>
    </p>
  );
}

export default memo(ListaLinea);
