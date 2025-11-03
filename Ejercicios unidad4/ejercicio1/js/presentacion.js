'use strict';

// === PRESENTACIÓN ===

document.getElementById("iniciar").addEventListener("click", function() {
  const lados = parseInt(document.getElementById("lados").value);
  const tiradas = parseInt(document.getElementById("tiradas").value);
  const salida = document.getElementById("resultado");

  if (isNaN(lados) || isNaN(tiradas) || lados <= 0 || tiradas <= 0) {
    salida.textContent = "⚠️ Por favor, ingresa valores válidos.";
    return;
  }

  const juego = partida(lados, tiradas);
  let texto = "";

  for (const tirada of juego.resultados) {
    texto += `Tirada ${tirada.tirada}: Jugador=${tirada.jugador}, Máquina=${tirada.maquina}\n`;
  }

  texto += `\n🏁 Resultado final:\nJugador: ${juego.totalJugador}\nMáquina: ${juego.totalMaquina}`;
  salida.textContent = texto;
});
