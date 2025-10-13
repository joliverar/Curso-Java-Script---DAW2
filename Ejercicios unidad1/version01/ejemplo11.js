// ejemplo11.js
// UD1 - Ejercicio 11: Función que recibe un RANGO [a,b] y para cada número indica:
// - Si es múltiplo de 3
// - Si es múltiplo de 5
// - Si es primo
// Solo se muestran los números que cumplen AL MENOS una condición.
//
// Implementación:
// 1) esPrimo(n): comprobación clásica (O(√n), salta pares).
// 2) analizarRango(a,b): recorre y construye array de líneas informativas.
// 3) Interfaz por prompt y salida por alert + consola.

'use strict';

const toInt = v => Number.parseInt(v, 10);

function esPrimo(n) {
  if (n < 2) return false;
  if (n % 2 === 0) return n === 2;
  for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
  return true;
}

function analizarRango(a, b) {
  const i = Math.min(a, b), f = Math.max(a, b);
  const res = [];
  for (let n = i; n <= f; n++) {
    const m3 = n % 3 === 0;
    const m5 = n % 5 === 0;
    const primo = esPrimo(n);
    if (m3 || m5 || primo) {
      const props = [];
      if (m3) props.push('múltiplo de 3');
      if (m5) props.push('múltiplo de 5');
      if (primo) props.push('primo');
      res.push(`${n}: ${props.join(', ')}`);
    }
  }
  return res;
}

// Entrada + salida
const sa = prompt('Desde:', '1');
const sb = prompt('Hasta:', '50');
if (sa !== null && sb !== null) {
  const a = toInt(sa), b = toInt(sb);
  if (![a, b].every(Number.isInteger)) {
    alert('Valores inválidos');
  } else {
    const out = analizarRango(a, b);
    console.clear();
    out.forEach(l => console.log(l));
    alert(`Análisis ${Math.min(a,b)}..${Math.max(a,b)}\n\n${out.join('\n')}`);
  }
}
