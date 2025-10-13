// ejemplo10.js
// UD1 - Ejercicio 10: Contar caracteres en una cadena
// Reglas:
// - La función recibe un texto (string).
// - Devuelve un objeto con pares clave-valor: {carácter: número de apariciones}.
// - Ejemplo: "Banana" → { B:1, a:3, n:2 }.
// - Se muestra el resultado en consola y en un alert/JSON para el usuario.

'use strict'; // Modo estricto → ayuda a detectar errores de sintaxis y variables no declaradas.

/* --------------------------
   1) FUNCIÓN PRINCIPAL
   -------------------------- */

/**
 * contarCaracteres
 * Recorre cada carácter de la cadena y va acumulando su frecuencia en un objeto.
 * @param {string} texto - La cadena a analizar.
 * @returns {Object} - Objeto con claves=caracteres, valores=número de veces que aparecen.
 */
function contarCaracteres(texto) {
  const resultado = {};             // Objeto vacío para acumular frecuencias

  // for...of recorre cada "carácter" de la cadena
  for (const ch of texto) {
    // Si el carácter ya existe como clave, sumamos 1
    // Si no existe, inicializamos en 1
    resultado[ch] = (resultado[ch] || 0) + 1;
  }

  return resultado;                 // Devolvemos el objeto final
}

/* --------------------------
   2) PROGRAMA AUXILIAR
   -------------------------- */

// Pedimos al usuario una cadena de texto. Proponemos un ejemplo por defecto.
const entrada = prompt('Introduce una cadena de texto para contar caracteres:', 'Banana y manzana');

// Si el usuario pulsa "Cancelar" (null), no hacemos nada.
if (entrada !== null) {
  // Llamamos a la función para obtener el conteo.
  const frecuencias = contarCaracteres(entrada);

  // Limpiamos la consola para que se vea limpio el resultado.
  console.clear();

  // Mostramos el objeto como tabla (columna "key" y "value") en la consola.
  console.table(frecuencias);

  // Mostramos el objeto en formato JSON en un alert para el usuario.
  alert('Frecuencias de caracteres:\n\n' + JSON.stringify(frecuencias, null, 2));
}
