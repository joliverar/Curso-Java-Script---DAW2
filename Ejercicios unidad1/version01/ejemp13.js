// ejemplo13.js
// UD1 - Ejercicio 13: Juego de mates (+, -, *)
// Reglas:
// - En cada pregunta se generan dos números (1..10) y un operador aleatorio entre +, -, *.
// - El usuario responde; se guarda en un historial: { n, pregunta, respuesta, acierto }.
// - Las preguntas se hacen en LOTES de 4. Al terminar un lote se pregunta si desea continuar.
// - Al salir (cancelar o responder "no"), se muestra un resumen: total, aciertos, fallos, y el detalle en consola.

'use strict'; // Modo estricto: ayuda a detectar errores comunes (variables no declaradas, etc.).

/* -------------------------
   1) HELPERS ALEATORIOS
   ------------------------- */

/**
 * randomInt1to10()
 * Devuelve un entero aleatorio en el rango [1, 10].
 */
function randomInt1to10() {
  // Math.random() → [0,1)
  // * 10 → [0,10)
  // floor → {0..9}
  // +1 → {1..10}
  return Math.floor(Math.random() * 10) + 1;
}

/**
 * generarOperacion()
 * Elige dos operandos (1..10) y un operador de entre ['+','-','*'].
 * Calcula el resultado correcto y devuelve un objeto con la pregunta y el valor correcto.
 */
function generarOperacion() {
  const a = randomInt1to10();                 // primer operando
  const b = randomInt1to10();                 // segundo operando
  const ops = ['+', '-', '*'];                // operadores permitidos
  const op = ops[Math.floor(Math.random() * ops.length)]; // operador aleatorio

  // calcular el resultado correcto según el operador elegido
  const correcto =
    (op === '+') ? a + b :
    (op === '-') ? a - b :
                    a * b;

  // "pregunta" en formato legible, p. ej. "7 * 3"
  return { pregunta: `${a} ${op} ${b}`, correcto };
}

/* -------------------------
   2) ESTADO DEL JUEGO
   ------------------------- */

const historial = []; // aquí guardaremos objetos { n, pregunta, respuesta, acierto }
let n = 1;            // contador global de preguntas (1, 2, 3, ...)
let seguir = true;    // bandera para controlar si seguimos pidiendo lotes

/* -------------------------
   3) BUCLE PRINCIPAL
   ------------------------- */

while (seguir) { // cada iteración es un "lote" de hasta 4 preguntas
  for (let i = 0; i < 4; i++) {               // LOTE de 4
    const { pregunta, correcto } = generarOperacion(); // crear una nueva operación

    // mostramos la consigna; si el usuario cancela (null), salimos del lote y del juego
    const s = prompt(`(${n}) Resuelve: ${pregunta} = ?`, '');
    if (s === null) {                          // Cancelar → terminamos todo
      seguir = false;
      break;
    }

    // convertir la respuesta a número; parseFloat para permitir, por ejemplo, "7.0"
    const r = Number.parseFloat(s);

    // comparar EXACTAMENTE con el correcto (en este juego no hay tolerancias)
    const acierto = (r === correcto);

    // guardar registro en el historial
    historial.push({ n, pregunta, respuesta: r, acierto });

    // informar al usuario si acertó o no
    alert(acierto ? '✅ Correcto' : `❌ Incorrecto. La respuesta era ${correcto}`);

    // incrementar el número de pregunta global
    n++;
  }

  // si salió por cancelar, no seguimos preguntando
  if (!seguir) break;

  // al terminar el lote, preguntar si desea continuar con otro lote de 4
  const cont = confirm('¿Deseas otro lote de 4 preguntas?');
  if (!cont) break; // si responde "Cancelar" o "No", finaliza el juego
}

/* -------------------------
   4) RESUMEN FINAL
   ------------------------- */

const total = historial.length;                        // número total de preguntas realizadas
const aciertos = historial.filter(x => x.acierto).length; // cuántas correctas
const fallos = total - aciertos;                       // cuántas incorrectas

// Limpieza de consola y volcado del detalle ordenado
console.clear();                 // limpia consola para mejorar la lectura
console.table(historial);        // muestra una tabla con columnas: n, pregunta, respuesta, acierto

// Mostrar un resumen en alert para el usuario
alert(
  `Resumen del juego:\n\n` +
  `Total de preguntas: ${total}\n` +
  `Aciertos: ${aciertos}\n` +
  `Fallos: ${fallos}\n\n` +
  `Detalle disponible en la consola (F12 → Console).`
);

/* -------------------------
   5) NOTAS / VARIANTES (opcional)
   ------------------------- */

// - Si quieres evitar negativos en la resta, puedes forzar a >= b:
//   const a = randomInt1to10(); const b = randomInt1to10(); const [x,y] = a>=b ? [a,b] : [b,a];
//   y luego usar x - y cuando el operador sea '-'.

// - Si quieres limitar las multiplicaciones a resultados pequeños (p. ej. <=50),
//   puedes regenerar la operación si se pasa del umbral.

// - Si quieres permitir divisiones enteras, añade '/' a ops y valida que a % b === 0
//   para evitar resultados no enteros, o pregunta con decimales.

// - Para registrar también la marca de tiempo:
//   historial.push({ n, pregunta, respuesta: r, acierto, fecha: new Date().toISOString() });

