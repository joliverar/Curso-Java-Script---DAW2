import { useState } from "react";
import "./App.css";

const COMBINACIONES = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

export default function App() {
  const [tablero, setTablero] = useState(Array(9).fill(null));
  const [turno, setTurno] = useState("X");
  const [ganador, setGanador] = useState(null);
  const [empate, setEmpate] = useState(false);
  const [inicia, setInicia] = useState("X");

  const [marcador, setMarcador] = useState({ X: 0, O: 0 });

  function comprobarGanador(tableroNuevo) {
    for (let combo of COMBINACIONES) {
      const [a,b,c] = combo;
      if (
        tableroNuevo[a] &&
        tableroNuevo[a] === tableroNuevo[b] &&
        tableroNuevo[a] === tableroNuevo[c]
      ) {
        return tableroNuevo[a];
      }
    }
    return null;
  }

  function handleClick(index) {
    if (tablero[index] || ganador) return;

    const nuevoTablero = [...tablero];
    nuevoTablero[index] = turno;
    setTablero(nuevoTablero);

    const win = comprobarGanador(nuevoTablero);
    if (win) {
      setGanador(win);
      setMarcador({
        ...marcador,
        [win]: marcador[win] + 1
      });
    } else if (!nuevoTablero.includes(null)) {
      setEmpate(true);
    } else {
      setTurno(turno === "X" ? "O" : "X");
    }
  }

  function reiniciar() {
    const siguiente = inicia === "X" ? "O" : "X";
    setInicia(siguiente);
    setTurno(siguiente);
    setTablero(Array(9).fill(null));
    setGanador(null);
    setEmpate(false);
  }

  return (
    <div className="app">
      <h1>🎮 Tres en Raya</h1>

      <div className="marcador">
        <span>❌ X: {marcador.X}</span>
        <span>⭕ O: {marcador.O}</span>
      </div>

      <p className="estado">
        {ganador && `🏆 Ganador: ${ganador}`}
        {empate && "🤝 Empate"}
        {!ganador && !empate && `Turno de: ${turno}`}
      </p>

      <div className="tablero">
        {tablero.map((celda, i) => (
          <button
            key={i}
            className="celda"
            onClick={() => handleClick(i)}
          >
            {celda}
          </button>
        ))}
      </div>

      <button className="reiniciar" onClick={reiniciar}>
        🔄 Reiniciar partida
      </button>
    </div>
  );
}

