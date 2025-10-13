// ejemplo12.js
// UD1 - Ejercicio 12: Juego "Adivina el número".
// - El programa genera un secreto aleatorio entre 1 y 100.
// - El usuario dispone de 5 intentos.
// - En cada intento, se informa si su número es "mayor" o "menor" que el secreto.
// - Si acierta, gana. Si agota intentos, muestra el secreto.
//
// Detalles: validación 1..100, manejar Cancelar.

'use strict';

const secreto = Math.floor(Math.random() * 100) + 1; // entero 1..100
let intentos = 5;

while (intentos > 0) {
  const s = prompt(`Adivina el número (1..100). Intentos restantes: ${intentos}`);
  if (s === null) {                            // Cancelar = salida anticipada
    alert(`Juego cancelado. El número era ${secreto}.`);
    break;
  }
  const n = Number.parseInt(s, 10);
  if (!Number.isInteger(n) || n < 1 || n > 100) {
    alert('Valor fuera de rango (1..100).');
    continue;
  }
  if (n === secreto) {
    alert('¡Correcto! 🎉 Has acertado.');
    break;
  }
  alert(n < secreto ? 'Demasiado pequeño' : 'Demasiado grande');
  intentos--;
}

if (intentos === 0) {
  alert(`Has perdido. El número era ${secreto}.`);
}
