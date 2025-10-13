'use strict';

function escalera(n) {
  if (n === 0) {
    console.log("__");
    return;
  }

  // Escalera ascendente
  if (n > 0) {
    for (let i = 0; i <= n; i++) {
      let linea = "";

      // Añadir espacios
      for (let j = 0; j < n - i; j++) {
        linea += " ";
      }

      // Añadir peldaño
      linea += "_";
      if (i > 0) linea += "|";

      console.log(linea);
    }
  }

  // Escalera descendente
  if (n < 0) {
    n = -n;
    for (let i = 0; i <= n; i++) {
      let linea = "";

      // En este caso no hay espacios delante
      if (i === 0) linea += "_";
      else linea += "|_";

      console.log(linea);
    }
  }
}
