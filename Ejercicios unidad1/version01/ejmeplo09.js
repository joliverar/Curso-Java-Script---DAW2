// ejemplo09.js
// UD1 - Ejercicio 9: Función que recibe un número variable de parámetros
// y los agrupa por TIPO. Para cada tipo mostramos: nombre del tipo y la colección
// { index, value } con la posición original.
//
// Detalles:
// - typeof null === 'object', pero lo distinguimos manualmente como 'null'.
// - Array se detecta con Array.isArray(...).
// - Mostramos resultado en consola (objeto de objetos/arrays).
//
// Uso de ejemplo provisto al final.

'use strict';

function agruparPorTipo(...args) {
  const res = {};
  args.forEach((valor, idx) => {
    // Detectamos tipo "real"
    const tipo = (valor === null)
      ? 'null'
      : Array.isArray(valor) ? 'array' : typeof valor;

    // Creamos array si no existe
    if (!res[tipo]) res[tipo] = [];

    // Insertamos con índice original
    res[tipo].push({ index: idx, value: valor });
  });
  return res;
}

// Demostración (puedes reemplazar por tus parámetros)
const resultado = agruparPorTipo(
  'hola', 23, true, null, undefined, { x: 1 }, [1, 2, 3], 4.5, () => {}, Symbol('s')
);

console.clear();
console.log('Agrupación por tipo:', resultado);
alert('Resultado mostrado en consola (Agrupación por tipo).');
