// ejemplo04.js
// UD1 - Ejercicio 4: Función que recibe n y genera un TRIÁNGULO isósceles de altura n (ASCII).
// Devuelve array de líneas. Lo mostramos por alert + consola.
//
// Idea: base = 2*n - 1; en la fila i (1..n) hay (2*i - 1) estrellas, centradas con espacios.
//
// Pasos:
// 1) Helpers (toInt, mostrar).
// 2) Función triangulo(n).
// 3) Pedir n, validar, mostrar.

'use strict';

const toInt = v => Number.parseInt(v, 10);
const mostrar = (titulo, arr) => {
  console.clear();
  console.log(titulo);
  arr.forEach(l => console.log(l));
  alert(`${titulo}\n\n${arr.join('\n')}`);
};

function triangulo(n) {
  const res = [];
  const base = 2 * n - 1;               // ancho de la última línea
  for (let i = 1; i <= n; i++) {
    const estrellas = 2 * i - 1;        // estrellas en la fila i
    const espacios = (base - estrellas) / 2; // espacios a cada lado
    res.push(' '.repeat(espacios) + '*'.repeat(estrellas) + ' '.repeat(espacios));
  }
  return res;
}

const s = prompt('Altura del triángulo (entero > 0):', '5');
if (s !== null) {
  const n = toInt(s);
  if (!Number.isInteger(n) || n <= 0) {
    alert('Altura inválida');
  } else {
    mostrar(`Triángulo altura ${n}`, triangulo(n));
  }
}
