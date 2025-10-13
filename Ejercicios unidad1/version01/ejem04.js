'use strict';

/********************************************************************
 * EJERCICIO 4 — Dibujar un triángulo (SIN ARRAYS)
 ********************************************************************/

/**
 * Genera un triángulo rectángulo de altura n como un string único.
 * @param {number} n - Altura del triángulo
 * @returns {string} - Triángulo completo con saltos de línea
 */
function generarTriangulo(n) {
  let resultado = ''; // Acumulador del triángulo

  for (let i = 1; i <= n; i++) { // Desde 1 hasta n
    resultado += '*'.repeat(i);  // Línea con i asteriscos
    if (i < n) resultado += '\n'; // Salto de línea excepto la última
  }

  return resultado;
}

/**
 * Código auxiliar para probar
 */
function mainTriangulo() {
  alert('Ejercicio 4 — Triángulo (sin arrays).');

  const entrada = prompt('Introduce la altura del triángulo:');
  if (entrada === null) return;

  const n = Number.parseInt(entrada, 10);
  if (isNaN(n) || n <= 0) {
    alert('⚠️ Debes introducir un entero positivo.');
    return;
  }

  const salida = generarTriangulo(n);
  console.log(salida);
  alert(salida);
}

// --- Ejecutamos el programa ---
mainTriangulo();
