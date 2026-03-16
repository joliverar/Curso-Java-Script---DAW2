"use strict";

/*12-Juego acertar número*/

function juego() {
  let secreto = Math.floor(Math.random() * 100) + 1;

  let intentos = 5;
  let acertado = false;

  while (intentos > 0 && !acertado) {
    let num = parseInt(prompt("Introduce un número entre 1 y 100"));

    if (isNaN(num) || num < 1 || num > 100) {
      alert("Número inválido");
      continue;
    }

    if (num === secreto) {
      alert("¡Felicidades! Has acertado el número");
      acertado = true;
    } else if (num < secreto) {
      alert("El número secreto es MAYOR");
    } else {
      alert("El número secreto es MENOR");
    }

    intentos--;
  }

  if (!acertado) {
    alert("Has perdido. El número secreto era: " + secreto);
  }
}

// Ejecutar juego
juego();
