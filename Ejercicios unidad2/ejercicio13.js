'use strict';

/********************************************************************
 * ⚔️ EJERCICIO 13 — LOGO DE ZELDA 73
 ********************************************************************/
'use strict';

function logoZelda(filas) {
  const anchoTotal = 4 * filas - 1; // ancho total del logo completo

  // 1️⃣ Triángulo superior centrado
  for (let i = 1; i <= filas; i++) {
    const asteriscos = 2 * i - 1;
    const anchoLinea = asteriscos;
    const espaciosIzq = Math.floor((anchoTotal - anchoLinea) / 2);
    console.log(" ".repeat(espaciosIzq) + "*".repeat(asteriscos));
  }

  // 2️⃣ Dos triángulos inferiores (lado a lado)
  for (let i = 1; i <= filas; i++) {
    const asteriscos = 2 * i - 1;
    const espacioEntre = 2 * (filas - i) + 1;
    const anchoLinea = asteriscos * 2 + espacioEntre;
    const espaciosIzq = Math.floor((anchoTotal - anchoLinea) / 2);
    console.log(
      " ".repeat(espaciosIzq) +
      "*".repeat(asteriscos) +
      " ".repeat(espacioEntre) +
      "*".repeat(asteriscos)
    );
  }
}

function logoZelda(filas) {
  // 1️⃣ Triángulo superior (centrado)
  for (let i = 1; i <= filas; i++) {
    let espacios = filas - i;        // Espacios antes del triángulo
    let asteriscos = 2 * i - 1;      // Cantidad de *
    console.log(" ".repeat(espacios + filas) + "*".repeat(asteriscos));
  }

  // 2️⃣ Dos triángulos inferiores (lado a lado con separación)
  for (let i = 1; i <= filas; i++) {
    let espaciosIzq = filas - i;           // Sangría a la izquierda
    let asteriscos = 2 * i - 1;            // Cantidad de * por triángulo
    let espacioEntre = 2 * (filas - i) + 1; // Separación entre triángulos
    console.log(" ".repeat(espaciosIzq) + "*".repeat(asteriscos) + 
                " ".repeat(espacioEntre) + "*".repeat(asteriscos));
  }
}

/********************************************************************
 * 🔐 EJERCICIO 14 — CIFRADO CÉSAR (Autoinvocado)
 ********************************************************************/
const Cesar = (function() {
  const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // 🧩 Cifrar texto
  function cifrarTexto(texto, clave) {
    let resultado = "";
    texto = texto.toUpperCase();

    for (let i = 0; i < texto.length; i++) {
      let c = texto[i];
      if (c === " ") {
        resultado += " ";
        continue;
      }

      // Buscar posición en el alfabeto
      let pos = -1;
      for (let j = 0; j < alfabeto.length; j++) {
        if (alfabeto[j] === c) pos = j;
      }

      if (pos === -1) {
        resultado += c; // símbolo o número
      } else {
        let nuevaPos = (pos + clave) % 26;
        resultado += alfabeto[nuevaPos];
      }
    }
    return resultado;
  }

  // 🔓 Descifrar texto
  function descifrarTexto(texto, clave) {
    return cifrarTexto(texto, 26 - (clave % 26));
  }

  // Retornar las funciones públicas
  return {
    cifrarTexto,
    descifrarTexto
  };
})();
