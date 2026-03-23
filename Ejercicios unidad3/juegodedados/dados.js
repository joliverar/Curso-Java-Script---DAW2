"use strict";

/* =========================================
   CLOSURE jugarDados
========================================= */
function jugarDados(numeroLados) {
  // función interna → genera número aleatorio
  function generarNumero() {
    return Math.floor(Math.random() * numeroLados) + 1;
  }

  // closure → devuelve función anónima
  return function () {
    return [generarNumero(), generarNumero()];
  };
}

/* =========================================
   PRUEBA CON PROMPT
========================================= */
(function () {
  let lados = parseInt(prompt("Número de lados del dado:"));
  let tiradas = parseInt(prompt("Número de tiradas:"));

  let tirarDados = jugarDados(lados);

  let victoriasJugador = 0;
  let victoriasMaquina = 0;
  let empates = 0;
  for (let i = 0; i < tiradas; i++) {
    let jugador = tirarDados();
    let maquina = tirarDados();

    let sumaJugador = jugador[0] + jugador[1];
    let sumaMaquina = maquina[0] + maquina[1];

    alert(
      "Tirada " +
        (i + 1) +
        "\nJugador: " +
        sumaJugador +
        "\nMáquina: " +
        sumaMaquina,
    );

    if (sumaJugador > sumaMaquina) {
      victoriasJugador++;
    } else if (sumaMaquina > sumaJugador) {
      victoriasMaquina++;
    } else {
      empates++; // ← Contar empates
    }
  }

  alert(
    "RESULTADO FINAL\n" +
      "Jugador: " +
      victoriasJugador +
      "\n" +
      "Máquina: " +
      victoriasMaquina +
      "\n" +
      "Empates: " +
      empates, // ← Mostrar empates
  );
})();

window.addEventListener("load", () =>{
  let tirarDados;
  let totalJugador = 0;
  let totalMaquina = 0;
  let contador = 0;
  let maxTiradas = 0;

  document.getElementById("iniciar").addEventListener("click", function () {
    let lados = parseInt(document.getElementById("lados").value);
    maxTiradas = parseInt(document.getElementById("tiradas").value);

    tirarDados = jugarDados(lados);

    totalJugador = 0;
    totalMaquina = 0;
    contador = 0;

    document.getElementById("resultado").textContent = "Juego iniciado";
  });

  document.getElementById("tirar").addEventListener("click", function () {
    if (contador >= maxTiradas) {
      alert("Juego terminado");
      return;
    }

    let jugador = tirarDados();
    let maquina = tirarDados();

    let sumaJugador = jugador[0] + jugador[1];
    let sumaMaquina = maquina[0] + maquina[1];

    totalJugador += sumaJugador;
    totalMaquina += sumaMaquina;

    contador++;

    document.getElementById("resultado").textContent =
      "Jugador: " + sumaJugador + " | Máquina: " + sumaMaquina;

    document.getElementById("total").textContent =
      "Total Jugador: " + totalJugador + " | Total Máquina: " + totalMaquina;
  });
});
