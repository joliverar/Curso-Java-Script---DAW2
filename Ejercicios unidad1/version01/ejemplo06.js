// ejemplo06.js
// UD1 - Ejercicio 6: Función que "dibuja" (por alert) una figura elegida por MENÚ.
// Primer parámetro = función generadora (rect/tri/rom). Segundo parámetro = tamaño.
// Se ofrece un menú con: cuadrado hueco, triángulo, rombo, y opción salir.
//
// Estructura:
// 1) Pequeñas generadoras (devuelven array<string>).
// 2) Helper dibujarFiguraAlert(fn, tam) que hace alert(join('\n')).
// 3) Menú en bucle: pedir opción y tamaño; validar y dibujar.

'use strict';

// --- 1) Generadoras ---
function rect(n) {
  n = Number.parseInt(n, 10);
  if (!Number.isInteger(n) || n <= 0) return ['*'];
  if (n < 2) return ['*'];
  const res = [];
  const llena = '*'.repeat(n);
  const hueco = '*' + ' '.repeat(n - 2) + '*';
  res.push(llena);
  for (let i = 0; i < n - 2; i++) res.push(hueco);
  res.push(llena);
  return res;
}

function tri(n) {
  n = Number.parseInt(n, 10);
  if (!Number.isInteger(n) || n <= 0) return ['*'];
  const res = [], base = 2 * n - 1;
  for (let i = 1; i <= n; i++) {
    const est = 2 * i - 1;
    const esp = (base - est) / 2;
    res.push(' '.repeat(esp) + '*'.repeat(est) + ' '.repeat(esp));
  }
  return res;
}

function rom(n) {
  let d = Number.parseInt(n, 10);
  if (!Number.isInteger(d) || d <= 0) return ['*'];
  if (d % 2 === 0) d++;
  const res = [], mid = Math.floor(d / 2);
  for (let i = 0; i <= mid; i++) {
    const esp = mid - i, est = 2 * i + 1;
    res.push(' '.repeat(esp) + '*'.repeat(est) + ' '.repeat(esp));
  }
  for (let i = mid - 1; i >= 0; i--) {
    const esp = mid - i, est = 2 * i + 1;
    res.push(' '.repeat(esp) + '*'.repeat(est) + ' '.repeat(esp));
  }
  return res;
}

// --- 2) Dibuja por alert usando la generadora ---
function dibujarFiguraAlert(figFn, tam) {
  const fig = figFn(tam);         // obtenemos array<string>
  alert(fig.join('\n'));          // mostramos “ASCII”
}

// --- 3) Menú principal ---
const menu = `Elige figura:
1) Cuadrado hueco
2) Triángulo
3) Rombo
0) Terminar`;

while (true) {
  const op = prompt(menu, '1');
  if (op === null || op === '0') break;

  const s = prompt('Tamaño (entero > 0):', '5');
  if (s === null) break;
  const n = Number.parseInt(s, 10);
  if (!Number.isInteger(n) || n <= 0) { alert('Tamaño inválido'); continue; }

  if (op === '1') dibujarFiguraAlert(rect, n);
  else if (op === '2') dibujarFiguraAlert(tri, n);
  else if (op === '3') dibujarFiguraAlert(rom, n);
  else alert('Opción inválida');
}
