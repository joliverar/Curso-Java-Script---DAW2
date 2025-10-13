// ejemplo08.js
// UD1 - Ejercicio 8: Función que recibe n y devuelve la CADENA con el desarrollo del factorial.
// Ej: n=4 → "4x3x2x1=24". Se solicita números hasta que el usuario cancele.
//
// Pasos:
// 1) factorialCadena(n): valida negativos, maneja 0 y 1, itera acumulando y armando la cadena.
// 2) Bucle while solicitando hasta Cancelar.

'use strict';

const toInt = v => Number.parseInt(v, 10);

function factorialCadena(n) {
  n = toInt(n);
  if (!Number.isInteger(n)) return 'Entrada no entera';
  if (n < 0) return 'No definido para negativos';
  if (n === 0 || n === 1) return `${n}=1`;

  let acc = 1;
  const partes = [];
  for (let k = n; k >= 1; k--) {
    acc *= k;
    partes.push(k);
  }
  return `${partes.join('x')}=${acc}`;
}

// Bucle de interacción
while (true) {
  const s = prompt('Número para factorial (Cancelar para salir):', '4');
  if (s === null) break;
  const out = factorialCadena(s);
  alert(out);
}
