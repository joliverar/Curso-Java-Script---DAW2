import Carta from "./Carta";
import { sumarCartas } from "../utils/sieteYMedio";

function ZonaJugador({ titulo, mano, acciones, dameCarta, mePlanto }) {
  return (
    <div className="zona">
      <h3>{titulo} ({sumarCartas(mano)})</h3>

      <div className="cartas">
        {mano.map((id) => (
          <Carta key={id} id={id} />
        ))}
      </div>

      {acciones && (
        <>
          <button onClick={dameCarta}>Dame carta</button>
          <button onClick={mePlanto}>Me planto</button>
        </>
      )}
    </div>
  );
}

export default ZonaJugador;
