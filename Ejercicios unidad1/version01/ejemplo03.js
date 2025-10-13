// ejemplo03.js
// UD1 - Ejercicio 3: Función que recibe un número n y genera un RECTÁNGULO HUECO n×n en ASCII.
// El resultado es un array de strings (cada string = una línea). Luego lo mostramos.
//
// Pasos:
// 1) Helper toInt y función mostrar (alert + consola).
// 2) Función rectanguloHueco(n):
//    - Si n < 2, devolvemos ['*'] para no romper formato.
//    - Primera y última línea: '*' repetido n.
//    - Líneas intermedias: '*' + (n-2 espacios) + '*'.
// 3) Solicitar n por prompt, validar y mostrar.

'use strict';

const toInt = v => Number.parseInt(v, 10);

// Visualizar de forma agradable y también en consola
const mostrar = (titulo, arr) => {
  console.clear();
  console.log(titulo);
  arr.forEach(l => console.log(l));
  alert(`${titulo}\n\n${arr.join('\n')}`);
};

function rectanguloHueco(n) {
  if (n < 2) return ['*'];                     // Caso mínimo
  const res = [];
  const llena = '*'.repeat(n);                 // línea superior/inferior
  const hueco = '*' + ' '.repeat(n - 2) + '*'; // líneas intermedias

  res.push(llena);
  for (let i = 0; i < n - 2; i++) res.push(hueco);
  res.push(llena);

  return res;
}

// Entrada y validación
const s = prompt('Tamaño del lado (entero > 0):', '5');
if (s !== null) {
  const n = toInt(s);
  if (!Number.isInteger(n) || n <= 0) {
    alert('Tamaño inválido');
  } else {
    mostrar(`Rectángulo hueco ${n}×${n}`, rectanguloHueco(n));
  }
}
