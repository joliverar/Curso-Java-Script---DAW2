// ejemplo09.js
// UD1 - Ejercicio 9: Recibe un número variable de parámetros y los agrupa por tipo,
// incluyendo para cada elemento su posición original entre los parámetros.

// Activamos el modo estricto para mejorar la detección de errores comunes.
'use strict';

/**
 * agruparPorTipo(...args)
 * - Usa parámetro rest para aceptar cualquier cantidad de argumentos.
 * - Devuelve un objeto cuyas claves son tipos ('string','number','array','null',...)
 *   y cuyos valores son arrays con objetos { index, value }.
 */
function agruparPorTipo(...args) {               // ...args captura todos los argumentos en un array
  const res = {};                                 // Objeto resultado: { tipo: [ {index, value}, ... ], ... }

  // Recorremos cada argumento junto con su posición original (idx)
  args.forEach((valor, idx) => {                  // forEach nos da (valor, índice)

    // Detectamos el "tipo real":
    // - typeof null === 'object' (peculiaridad de JS), así que lo separamos como 'null'
    // - Array.isArray(...) para detectar arrays
    // - typeof para el resto (string, number, boolean, object, function, symbol, undefined, bigint)
    const tipo =
      (valor === null) ? 'null'                   // caso especial null
      : Array.isArray(valor) ? 'array'            // detecta arrays
      : typeof valor;                             // tipos nativos

    // Si aún no existe un array para este tipo, lo creamos.
    if (!res[tipo]) res[tipo] = [];               // inicializamos la clave si es la primera vez

    // Insertamos la entrada manteniendo la posición original y el valor tal cual.
    res[tipo].push({ index: idx, value: valor }); // guardamos { index, value } en el array del tipo
  });

  return res;                                     // Devolvemos el objeto agrupado
}

/* =========================
   CÓDIGO AUXILIAR DE PRUEBA
   ========================= */

// Preparamos un conjunto variado de parámetros para probar la función.
const resultado = agruparPorTipo(
  'hola',                // string
  23,                    // number (entero)
  true,                  // boolean
  null,                  // null (NO es 'object' a efectos lógicos)
  undefined,             // undefined
  { x: 1, y: 2 },        // object
  [1, 2, 3],             // array
  4.5,                   // number (coma flotante)
  () => 'hi',            // function
  Symbol('s'),           // symbol
  9007199254740991n      // bigint (nota la 'n' final)
);

// Limpiamos consola para ver el resultado ordenado.
console.clear();                                   // limpia la consola
console.log('Agrupación por tipo:', resultado);    // mostramos el objeto resultante

// Indicamos por alert que el resultado está en la consola.
alert('Agrupación generada. Revisa la consola (F12 → Console).');

/*
Salida esperada (forma aproximada):
{
  string:   [ { index: 0, value: 'hola' } ],
  number:   [ { index: 1, value: 23 }, { index: 7, value: 4.5 } ],
  boolean:  [ { index: 2, value: true } ],
  null:     [ { index: 3, value: null } ],
  undefined:[ { index: 4, value: undefined } ],
  object:   [ { index: 5, value: { x:1, y:2 } } ],
  array:    [ { index: 6, value: [1,2,3] } ],
  function: [ { index: 8, value: ƒ } ],
  symbol:   [ { index: 9, value: Symbol(s) } ],
  bigint:   [ { index:10, value: 9007199254740991n } ],
}
*/
