'use strict';

/*3-Crea una función reciba un número y que dibuje un rectángulo hueco de lado del tamaño del
número indicado. El valor devuelto será un array con cada una de las cadenas que forman el
rectángulo.
Añade el código auxiliar necesario para probar la aplicación.*/

'use strict';

function rombo(n) {

  // Validación: el número debe ser impar
  if (n % 2 === 0) {
    console.log("El número debe ser impar.");
    return [];
  }

  let resultado = new Array(n);

  // Calcular la mitad sin Math.floor
  let mitad = 0;
  for (let i = 0; i < n; i++) {
    if (i * 2 + 1 >= n) {
      mitad = i;
      break;
    }
  }

  for (let i = 0; i < n; i++) {
    let espacios = "";
    let estrellas = "";

    // Calcular distancia al centro sin Math.abs
    let distancia = i - mitad;
    if (distancia < 0) {
      distancia = -distancia;
    }

    // Número de estrellas
    let numEstrellas = n - 2 * distancia;

    // Número de espacios
    let numEspacios = (n - numEstrellas) / 2;

    // Construir espacios
    for (let e = 0; e < numEspacios; e++) {
      espacios += " ";
    }

    // Construir estrellas
    for (let s = 0; s < numEstrellas; s++) {
      estrellas += "*";
    }

    resultado[i] = espacios + estrellas;
  }

  return resultado;
}

let tamaño = 4;
let resultado = rombo(tamaño);

for (let i = 0; i < resultado.length; i++) {
  console.log(resultado[i]);
}
