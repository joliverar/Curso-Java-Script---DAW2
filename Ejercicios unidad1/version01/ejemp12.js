// ejemplo12.js
// UD1 - Ejercicio 12: Juego "Adivina el número"
// Reglas:
// - El programa elige un número secreto aleatorio entre 1 y 100 (ambos inclusive).
// - El usuario dispone de 5 intentos para adivinarlo.
// - Tras cada intento, se indica si el número introducido es "demasiado pequeño" o "demasiado grande".
// - Si acierta, gana; si consume los 5 intentos, pierde y se muestra el número secreto.

'use strict'; // Activa el modo estricto para detectar errores comunes (variables no declaradas, etc.).

// Genera un entero aleatorio en el rango [1, 100].
// Math.random() → [0,1)  ;  *100 → [0,100)  ;  floor → {0..99}  ;  +1 → {1..100}
const secreto = Math.floor(Math.random() * 100) + 1;

// Contador de intentos restantes (el enunciado pide 5).
let intentos = 5;

// Bucle principal del juego: itera mientras queden intentos.
while (intentos > 0) {
  // Pedimos un número al usuario. Mostramos los intentos que quedan como ayuda visual.
  // prompt devuelve: string con lo tecleado o null si el usuario pulsa "Cancelar".
  const entrada = prompt(`Adivina el número (1..100).\nIntentos restantes: ${intentos}`);

  // Si el usuario cancela (null), salimos del juego informando el número secreto.
  if (entrada === null) {
    alert(`Juego cancelado. El número secreto era ${secreto}.`);
    // Opcionalmente, podemos "romper" todo el bucle con break.
    break;
  }

  // Convertimos la entrada (string) a entero base 10.
  const intento = Number.parseInt(entrada, 10);

  // Validación: si NO es un entero válido entre 1 y 100, avisamos y REINTENTAMOS
  // sin gastar intento (continue salta al siguiente ciclo del while).
  if (!Number.isInteger(intento) || intento < 1 || intento > 100) {
    alert('Entrada inválida. Debes introducir un ENTERO entre 1 y 100.');
    continue;
  }

  // Caso de acierto: terminamos el juego con un mensaje de éxito.
  if (intento === secreto) {
    alert('¡Correcto! 🎉 Has adivinado el número.');
    break;
  }

  // Si no acertó, damos una pista comparando con el secreto
  // y reducimos el contador de intentos.
  alert(intento < secreto ? 'Demasiado pequeño.' : 'Demasiado grande.');
  intentos--; // Hemos consumido un intento válido (entrada correcta pero no coincidió).
}

// Si se agotaron los intentos (llegamos a 0) y no hubo acierto/cancelación previa,
// mostramos que ha perdido y revelamos el secreto.
if (intentos === 0) {
  alert(`Has perdido. El número secreto era ${secreto}.`);
}

// (Opcional) Mensaje final para el flujo por cancelación o acierto
// (si quieres indicar que el juego terminó y volver al menú de tu index.html).
// alert('Fin del juego. Puedes volver al menú.');

