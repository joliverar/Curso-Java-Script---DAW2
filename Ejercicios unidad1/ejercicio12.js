'use strict';

/********************************************************************
 * 🎯 EJERCICIO 12 — JUEGO ACERTAR NÚMERO
 * Adivina un número secreto entre 1 y 100 en 5 intentos.
 ********************************************************************/

function jugarAdivinaNumero() {
  let secreto = Math.floor(Math.random() * 100) + 1;
  let intentos = 5;
  let ganado = false;

  while (intentos > 0 && !ganado) {
    let entrada = prompt(`Adivina el número (1-100). Te quedan ${intentos} intentos:`);
    if (entrada === null) break;

    let num = parseInt(entrada);
    if (isNaN(num) || num < 1 || num > 100) {
      alert("Número inválido.");
      continue;
    }

    if (num === secreto) {
      alert(`🎉 ¡Acertaste! El número era ${secreto}`);
      ganado = true;
    } else if (num > secreto) {
      alert("El número secreto es menor.");
    } else {
      alert("El número secreto es mayor.");
    }
    intentos--;
  }

  if (!ganado) alert(`😢 Has perdido. El número era ${secreto}`);
}

// Bloque de prueba
(function probar() {
  jugarAdivinaNumero();
})();
