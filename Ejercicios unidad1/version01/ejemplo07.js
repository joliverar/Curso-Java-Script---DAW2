// ejemplo07.js
// UD1 - Ejercicio 7:
// a) Función que recibe un número e imprime la tabla de multiplicar (0..10).
// b) Función que pide dos números (0..10) y muestra TODAS las tablas entre ellos (ordenadas de menor a mayor).
//
// Diseño:
// - tablaDe(n) → array<string> con "n x i = res" para i=0..10.
// - Para el rango, pedimos "desde" y "hasta", validamos 0..10, y volcamos en consola para claridad.

'use strict';

const toInt = v => Number.parseInt(v, 10);

// Devuelve una tabla “lineal” como array de cadenas
function tablaDe(n) {
  const out = [];
  for (let i = 0; i <= 10; i++) out.push(`${n} x ${i} = ${n * i}`);
  return out;
}

// Interfaz simple: 1) una tabla; 2) rango de tablas
const modo = prompt('1) Una tabla\n2) Varias (rango 0..10)', '1');
if (modo === '1') {
  const s = prompt('Número (0..10):', '7');
  if (s !== null) {
    const n = toInt(s);
    if (!Number.isInteger(n) || n < 0 || n > 10) {
      alert('Fuera de rango');
    } else {
      const t = tablaDe(n);
      console.clear();
      console.log(`Tabla del ${n}`);
      t.forEach(l => console.log(l));
      alert(`Tabla del ${n} en consola.`);
    }
  }
} else if (modo === '2') {
  const a = toInt(prompt('Desde (0..10):', '3') ?? '');
  const b = toInt(prompt('Hasta (0..10):', '6') ?? '');
  if (![a, b].every(x => Number.isInteger(x) && x >= 0 && x <= 10)) {
    alert('Rango inválido');
  } else {
    const i = Math.min(a, b), f = Math.max(a, b);
    console.clear();
    for (let n = i; n <= f; n++) {
      console.log(`Tabla del ${n}`);
      tablaDe(n).forEach(l => console.log('  ' + l));
    }
    alert('Tablas mostradas en consola.');
  }
}
