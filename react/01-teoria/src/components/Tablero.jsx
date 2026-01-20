// Tablero.jsx
import Celda from "./Celda";

export default function Tablero({ tablero, onJugada }) {
  return (
    <div className="tablero">
      {tablero.map((valor, index) => (
        <Celda
          key={index}
          valor={valor}
          onClick={() => onJugada(index)}
        />
      ))}
    </div>
  );
}
