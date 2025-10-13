'use strict'; // Activamos modo estricto

/********************************************************************
 * EJERCICIO 2 — Números hasta 0, estadísticas
 ********************************************************************/

function ejercicio2() {
  let max = -Infinity; // Inicializamos máximo muy bajo
  let min = +Infinity; // Inicializamos mínimo muy alto
  let suma = 0;        // Acumulador de la suma
  let total = 0;       // Contador de números válidos

  while (true) {
    const entrada = prompt("Introduce un número (0 para terminar):");
    if (entrada === null) break; // Cancelar → salir

    const n = Number.parseFloat(entrada); // Convertir a número

    if (Number.isNaN(n)) {
      alert("⚠️ Eso no es un número válido.");
      continue; // Volvemos a pedir
    }

    if (n === 0) break; // Si introduce 0 → fin del bucle

    // Actualizamos máximo y mínimo
    if (n > max) max = n;
    if (n < min) min = n;

    // Acumulamos en suma y contamos
    suma += n;
    total++;
  }

  if (total === 0) {
    alert("No se introdujeron números.");
    return;
  }

  // Calculamos media
  const media = suma / total;

  // Mostramos resultados
  alert(
    `📊 Resultados:\n\n` +
    `Máximo: ${max}\n` +
    `Mínimo: ${min}\n` +
    `Suma: ${suma}\n` +
    `Media: ${media}\n` +
    `Total números: ${total}`
  );
}

// --- Ejecutar ejercicio 2 ---
ejercicio2();

