'use strict'; // Activamos modo estricto

/********************************************************************
 * EJERCICIO 3 — Dibujar un rectángulo hueco (SIN ARRAYS)
 ********************************************************************/

/**
 * Genera un rectángulo hueco de lado n como un string único.
 * @param {number} n - Tamaño del lado
 * @returns {string} - Rectángulo completo con saltos de línea
 */
function generarRectanguloHueco(n) {
  let resultado = ''; // Aquí acumularemos el rectángulo como string

  for (let i = 0; i < n; i++) { // Recorremos filas
    if (i === 0 || i === n - 1) {
      // Primera o última fila → todo asteriscos
      resultado += '*'.repeat(n);
    } else {
      // Filas intermedias → asterisco + espacios + asterisco
      resultado += '*' + ' '.repeat(n - 2) + '*';
    }

    // Añadimos salto de línea, excepto en la última fila
    if (i < n - 1) resultado += '\n';
  }

  return resultado; // Devolvemos el rectángulo completo como string
}

/**
 * Código auxiliar de prueba
 */
function main() {
  alert('Ejercicio 3 — Rectángulo hueco (sin arrays).\nMira la consola para el resultado.');

  const entrada = prompt('Introduce el tamaño del lado del rectángulo (entero > 1):');
  if (entrada === null) return; // Usuario canceló

  const n = Number.parseInt(entrada, 10); // Convertir a entero
  if (isNaN(n) || n <= 1) {
    alert('⚠️ Debes introducir un entero mayor que 1.');
    return;
  }

  const salida = generarRectanguloHueco(n); // Generamos el rectángulo
  console.log(salida); // Mostrar en consola
  alert(salida); // Mostrar en pantalla
}

// --- Ejecutamos el programa ---
main();



