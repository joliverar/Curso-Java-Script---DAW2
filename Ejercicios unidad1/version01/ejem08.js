'use strict'; // Activamos modo estricto para mejores prácticas

/********************************************************************
 * EJERCICIO 8 — Factorial con desarrollo
 ********************************************************************/

/**
 * Calcula el factorial de un número y devuelve la cadena con el desarrollo.
 * @param {number} n - número entero no negativo
 * @returns {string} - Ejemplo: "4x3x2x1=24"
 */
function factorialConDesarrollo(n) {
  if (n < 0) return 'No existe factorial para negativos'; // Validación básica

  if (n === 0 || n === 1) return `${n}=1`; // Caso especial: 0! y 1! son 1

  let producto = 1; // Acumulará el resultado del factorial
  const pasos = []; // Guardará cada número del desarrollo (ej: [4,3,2,1])

  for (let i = n; i >= 1; i--) { // Desde n hasta 1
    producto *= i; // Multiplicamos por el acumulador
    pasos.push(i); // Guardamos el número en el desarrollo
  }

  // Unimos los pasos en cadena "n x ... x 1"
  const desarrollo = pasos.join('x');

  // Devolvemos la cadena con el desarrollo + resultado final
  return `${desarrollo}=${producto}`;
}

/**
 * Función principal: solicita números al usuario en un bucle
 * hasta que decida no continuar.
 */
function main() {
  alert('Ejercicio 8 — Factorial con desarrollo.\nMira la consola para los resultados.');

  while (true) { // Bucle infinito hasta que rompamos con "continuar = false"
    const entrada = prompt('Introduce un número entero (o Cancelar para salir):');

    if (entrada === null) break; // Si pulsa Cancelar, salir del programa

    const n = Number.parseInt(entrada, 10); // Convertir a entero

    if (Number.isNaN(n)) { // Validar que sea número
      alert('⚠️ Eso no es un número válido.');
      continue; // Vuelve a pedir
    }

    const resultado = factorialConDesarrollo(n); // Llamamos a la función factorial
    console.log(`Factorial de ${n}: ${resultado}`); // Mostramos en consola
    alert(resultado); // También en pantalla

    // Preguntamos si desea continuar
    const seguir = confirm('¿Quieres calcular otro factorial?');
    if (!seguir) break; // Si responde NO, salimos
  }

  alert('👋 Programa finalizado. Revisa la consola para ver el historial.');
}

// Ejecutamos el programa principal
main();
