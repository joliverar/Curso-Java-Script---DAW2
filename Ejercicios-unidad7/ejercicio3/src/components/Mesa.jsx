import ZonaJugador from "./ZonaJugador";

function Mesa({
  marcador,
  nuevaPartida,
  turnoJugador,
  manoJugador,
  manoBanca,
  dameCarta,
  mePlanto,
}) {
  return (
    <div className="mesa">
      <h2>Jugador {marcador.jugador} - {marcador.banca} Banca</h2>

      <button onClick={nuevaPartida} disabled={turnoJugador}>
        Nueva partida
      </button>

      <ZonaJugador titulo="Crupier" mano={manoBanca} />
      <ZonaJugador
        titulo="Jugador"
        mano={manoJugador}
        acciones={turnoJugador}
        dameCarta={dameCarta}
        mePlanto={mePlanto}
      />
    </div>
  );
}

export default Mesa;
