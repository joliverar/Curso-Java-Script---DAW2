'use strict'; // Activamos el modo estricto para evitar malas prácticas

/********************************************************************
 * EJERCICIO 7 — Tablas de multiplicar
 ********************************************************************/

/**
 * Función que imprime en consola la tabla de multiplicar de un número.
 * @param {number} n - Número entre 0 y 10
 */
function imprimirTabla(n) {
  console.log(`\n📌 Tabla del ${n}`); // Encabezado para identificar la tabla

  for (let i = 0; i <= 10; i++) { // Recorremos multiplicadores del 0 al 10
    console.log(`${n} x ${i} = ${n * i}`); // Mostramos la operación y resultado
  }
}

/**
 * Función que imprime las tablas de multiplicar entre dos números.
 * Valida que ambos estén entre 0 y 10.
 */
function imprimirTablasEntre(min, max) {
  // Aseguramos que estén en el rango permitido (0..10)
  if (
    !Number.isInteger(min) || !Number.isInteger(max) ||
    min < 0 || max > 10
  ) {
    alert('⚠️ Los números deben ser enteros entre 0 y 10.');
    return;
  }

  // Intercambiamos si min > max para garantizar orden ascendente
  if (min > max) {
    [min, max] = [max, min];
  }

  // Recorremos desde el menor hasta el mayor
  for (let n = min; n <= max; n++) {
    imprimirTabla(n); // Imprime la tabla de ese número
  }
}

/**
 * Programa principal: pide al usuario 2 números entre 0 y 10
 * y muestra las tablas correspondientes.
 */
function main() {
  alert('Ejercicio 7 — Tablas de multiplicar.\nMira la consola para los resultados.');

  // Pedimos el primer número
  const num1 = Number.parseInt(prompt('Introduce el primer número (0–10):'), 10);
  if (Number.isNaN(num1)) {
    alert('⚠️ No es un número válido.');
    return;
  }

  // Pedimos el segundo número
  const num2 = Number.parseInt(prompt('Introduce el segundo número (0–10):'), 10);
  if (Number.isNaN(num2)) {
    alert('⚠️ No es un número válido.');
    return;
  }

  // Llamamos a la función que imprime las tablas entre ambos
  imprimirTablasEntre(num1, num2);

  alert('✅ Tablas generadas. Revisa la consola para verlas.');
}

// Ejecutamos el programa principal
main();
