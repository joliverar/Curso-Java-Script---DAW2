// ejemplo02.js
// UD1 - Ejercicio 2: Pedir números al usuario hasta introducir 0.
// Al finalizar, mostrar: máximo, mínimo, suma, media y total de números introducidos.
//
// Estructura del script:
// 1) Helpers (toNum) y variables acumuladoras.
// 2) Bucle principal con prompt (gestionando Cancelar y valores no numéricos).
// 3) Cálculo de media y salida por alert + apoyo en consola.

'use strict';

// --- 1) Helpers y acumuladores ---
const toNum = v => Number.parseFloat(v); // convierte a Number (admite decimales)
let max = -Infinity;  // valor inicial muy bajo para que el primer número sea > max
let min = +Infinity;  // valor inicial muy alto para que el primer número sea < min
let suma = 0;         // acumulador de suma
let total = 0;        // contador de valores válidos (excluye el 0 final)

// --- 2) Bucle de entrada ---
while (true) {
  const s = prompt('Introduce un número (0 para terminar):');
  if (s === null) break;                 // Usuario pulsó "Cancelar" → salimos sin resultados
  const n = toNum(s);                    // Convertimos a número
  if (Number.isNaN(n)) {                 // Comprobamos que realmente sea número
    alert('No es un número válido');
    continue;                            // Repetimos iteración
  }
  if (n === 0) break;                    // Condición de corte: 0
  // Actualizamos estadísticos
  if (n > max) max = n;
  if (n < min) min = n;
  suma += n;
  total++;
}

// --- 3) Salida ---
if (total === 0) {                       // Si no se introdujeron números (o solo 0)
  alert('No se introdujeron números.');
} else {
  const media = suma / total;            // Media aritmética
  console.clear();
  console.log({ max, min, suma, media, total });
  alert(`Máximo: ${max}
Mínimo: ${min}
Suma: ${suma}
Media: ${media}
Total: ${total}`);
}
