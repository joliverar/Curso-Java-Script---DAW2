// ejemplo05.js
// UD1 - Ejercicio 5: Función que recibe la diagonal d y genera un ROMBO ASCII.
// Si la diagonal es par, la ajustamos al impar inmediato superior para mantener simetría.
// Devuelve array de líneas.
//
// Construcción: d impar → mitad = floor(d/2).
// Arriba (incluyendo centro): i=0..mitad → espacios=(mitad-i), estrellas=2*i+1.
// Abajo: i=mitad-1..0 → simétrico.
//
// Pasos:
// 1) Helpers y mostrar.
// 2) Función rombo(d).
// 3) Pedir d, validar, mostrar.

'use strict';

const toInt = v => Number.parseInt(v, 10);
const mostrar = (titulo, arr) => {
  console.clear();
  console.log(titulo);
  arr.forEach(l => console.log(l));
  alert(`${titulo}\n\n${arr.join('\n')}`);
};

function rombo(diagonal) {
  let d = toInt(diagonal);
  if (!Number.isInteger(d) || d <= 0) return ['*']; // control mínimo
  if (d % 2 === 0) d++;                             // ajustar a impar

  const res = [];
  const mitad = Math.floor(d / 2);

  // Parte superior (incluye la línea central)
  for (let i = 0; i <= mitad; i++) {
    const espacios = mitad - i;
    const estrellas = 2 * i + 1;
    res.push(' '.repeat(espacios) + '*'.repeat(estrellas) + ' '.repeat(espacios));
  }

  // Parte inferior (excluye la central, por eso mitad-1)
  for (let i = mitad - 1; i >= 0; i--) {
    const espacios = mitad - i;
    const estrellas = 2 * i + 1;
    res.push(' '.repeat(espacios) + '*'.repeat(estrellas) + ' '.repeat(espacios));
  }

  return res;
}

// Entrada + salida
const s = prompt('Diagonal del rombo (entero > 0):', '7');
if (s !== null) {
  const d = toInt(s);
  if (!Number.isInteger(d) || d <= 0) {
    alert('Diagonal inválida');
  } else {
    mostrar(`Rombo (diagonal ${d % 2 ? d : d + 1})`, rombo(d));
  }
}
