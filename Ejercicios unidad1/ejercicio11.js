'use strict';

/********************************************************************
 * 🔢 EJERCICIO 11 — NÚMEROS ESPECIALES
 * Dado un rango, indica si cada número es múltiplo de 3, múltiplo de 5 o primo.
 ********************************************************************/

function esPrimo(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function analizarRango(inicio, fin) {
  for (let n = inicio; n <= fin; n++) {
    let salida = "";
    if (n % 3 === 0) salida += " múltiplo de 3";
    if (n % 5 === 0) salida += " múltiplo de 5";
    if (esPrimo(n)) salida += " primo";

    if (salida) console.log(`${n}:${salida}`);
  }
}

// Bloque de prueba
(function probar() {
  analizarRango(1, 30);
})();
