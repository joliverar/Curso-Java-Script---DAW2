import { recuperarCarta } from "../utils/sieteYMedio";

function Carta({ id }) {
  const carta = recuperarCarta(id);

  return (
    <div className="carta">
      <strong>{carta.numero}</strong>
      <span>{carta.palo}</span>
    </div>
  );
}

export default Carta;
