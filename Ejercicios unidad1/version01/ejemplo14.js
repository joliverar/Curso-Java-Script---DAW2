// ejemplo13.js
// UD1 - Ejercicio 13: Juego de mates (+, -, *).
// - En cada pregunta se generan dos números aleatorios (1..10) y un operador aleatorio.
// - El usuario responde; se registra si acierta o falla.
// - Las preguntas se hacen en LOTES de 4. Tras cada lote, se pregunta si desea continuar.
// - Al terminar, se muestra un resumen: total, aciertos, fallos, y tabla en la consola.
//
// Estructura:
// 1) generarOperacion(): devuelve { pregunta: "a op b", correcto: número }.
// 2) Bucle de lotes: 4 preguntas, registrar { n, pregunta, respuesta, acierto }.
// 3) Resumen en consola + alert de totales.

'use strict';

function generarOperacion() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const ops = ['+', '-', '*'];
  const op = ops[Math.floor(Math.random() * ops.length)];

  const correcto = (op === '+') ? a + b
                  : (op === '-') ? a - b
                  : a * b;

  return { pregunta: `${a} ${op} ${b}`, correcto };
}

const historial = []; // almacenará objetos { n, pregunta, respuesta, acierto }
let seguir = true;
let n = 1;

while (seguir) {
  for (let i = 0; i < 4; i++) {
    const { pregunta, correcto } = generarOperacion();
    const s = prompt(`(${n}) Resuelve: ${pregunta} = ?`);
    if (s === null) { seguir = false; break; } // salir del juego
    const r = Number.parseFloat(s);
    const acierto = (r === correcto);
    historial.push({ n, pregunta, respuesta: r, acierto });
    alert(acierto ? '✅ Correcto' : `❌ Incorrecto. Era ${correcto}`);
    n++;
  }
  if (!seguir) break;
  if (!confirm('¿Deseas otro lote de 4 preguntas?')) break;
}

// Resumen final
const aciertos = historial.filter(x => x.acierto).length;
const fallos   = historial.length - aciertos;

console.clear();
console.table(historial);
alert(`Resumen:
Total: ${historial.length}
Aciertos: ${aciertos}
Fallos: ${fallos}

Detalle en consola (tabla).`);
