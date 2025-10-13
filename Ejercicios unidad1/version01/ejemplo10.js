// ejemplo10.js
// UD1 - Ejercicio 10: Función que recibe una cadena de texto y cuenta
// el número de apariciones de CADA carácter. Devuelve un objeto clave→valor.
// Mostramos el resultado con console.table para claridad.
//
// Pasos:
// 1) contarCaracteres(cadena): iterar por cada símbolo y acumular en objeto.
// 2) Pedir cadena por prompt y mostrar en consola.

'use strict';

function contarCaracteres(cadena) {
  const out = {};
  for (const ch of cadena) {
    out[ch] = (out[ch] || 0) + 1;
  }
  return out;
}

const s = prompt('Cadena a analizar:', 'banana');
if (s !== null) {
  const frecuencias = contarCaracteres(s);
  console.clear();
  console.table(frecuencias); // tabla legible
  alert('Frecuencias por carácter en consola (table).');
}
