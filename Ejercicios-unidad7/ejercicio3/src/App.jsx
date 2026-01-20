import { useState } from "react";
import Mesa from "./components/Mesa";
import {
  barajarCartas,
  sumarCartas,
} from "./utils/sieteYMedio";

function App() {
  const [baraja, setBaraja] = useState([]);
  const [turnoJugador, setTurnoJugador] = useState(false);
  const [manoJugador, setManoJugador] = useState([]);
  const [manoBanca, setManoBanca] = useState([]);
  const [marcador, setMarcador] = useState({ jugador: 0, banca: 0 });

  const nuevaPartida = () => {
    const nuevaBaraja = barajarCartas();
    setBaraja(nuevaBaraja);
    setManoJugador([nuevaBaraja.pop()]);
    setManoBanca([nuevaBaraja.pop()]);
    setTurnoJugador(true);
  };

  const dameCarta = () => {
    const carta = baraja.pop();
    setManoJugador([...manoJugador, carta]);
    setBaraja([...baraja]);
  };

  const mePlanto = () => {
    setTurnoJugador(false);
    juegaBanca();
  };

  const juegaBanca = async () => {
    let mano = [...manoBanca];
    let total = sumarCartas(mano);

    while (total < 6) {
      await new Promise((r) => setTimeout(r, 1000));
      mano.push(baraja.pop());
      total = sumarCartas(mano);
      setManoBanca([...mano]);
    }

    decidirGanador();
  };

  const decidirGanador = () => {
    const pj = sumarCartas(manoJugador);
    const pb = sumarCartas(manoBanca);

    if (pj > 7.5 || (pb <= 7.5 && pb >= pj)) {
      setMarcador({ ...marcador, banca: marcador.banca + 1 });
    } else {
      setMarcador({ ...marcador, jugador: marcador.jugador + 1 });
    }
  };

  return (
    <Mesa
      marcador={marcador}
      nuevaPartida={nuevaPartida}
      turnoJugador={turnoJugador}
      manoJugador={manoJugador}
      manoBanca={manoBanca}
      dameCarta={dameCarta}
      mePlanto={mePlanto}
    />
  );
}

export default App;


