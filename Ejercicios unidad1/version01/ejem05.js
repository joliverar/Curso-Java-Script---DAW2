'use strict';

/********************************************************************
 * EJERCICIO 5 — Dibujar un rombo (SIN ARRAYS)
 ********************************************************************/

/**
 * Genera un rombo de diagonal n como un string único.
 * @param {number} n - Tamaño de la diagonal (si es par se convierte a impar)
 * @returns {string} - Rombo completo con saltos de línea
 */
function generarRombo(n) {
  let resultado = ''; // Acumulador del rombo

  if (n % 2 === 0) n++; // Si es par → lo hacemos impar para que sea simétrico
  const mitad = Math.floor(n / 2); // Punto medio

  // --- Parte superior + línea central ---
  for (let i = 0; i <= mitad; i++) {
    const espacios = ' '.repeat(mitad - i);   // Espacios a la izquierda
    const estrellas = '*'.repeat(2 * i + 1);  // Asteriscos
    resultado += espacios + estrellas + espacios;
    if (i < n - 1) resultado += '\n';         // Salto de línea
  }

  // --- Parte inferior ---
  for (let i = mitad - 1; i >= 0; i--) {
    const espacios = ' '.repeat(mitad - i);
    const estrellas = '*'.repeat(2 * i + 1);
    resultado += espacios + estrellas + espacios;
    if (i > 0) resultado += '\n';             // Salto de línea
  }

  return resultado;
}

/**
 * Código auxiliar de prueba
 */
function mainRombo() {
  alert('Ejercicio 5 — Rombo (sin arrays).');

  const entrada = prompt('Introduce el tamaño de la diagonal:');
  if (entrada === null) return;

  const n = Number.parseInt(entrada, 10);
  if (isNaN(n) || n <= 0) {
    alert('⚠️ Debes introducir un entero positivo.');
    return;
  }

  const salida = generarRombo(n);
  console.log(salida);
  alert(salida);
}

// --- Ejecutamos el programa ---
mainRombo();

