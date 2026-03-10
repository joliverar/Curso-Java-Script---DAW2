'use strict';


function rombo(n) {

  // Validación: el número debe ser impar
  if (n % 2 === 0) {
    console.log("El número debe ser impar.");
    return [];
  }

  let resultado = new Array(n);

  // Calcular la mitad 
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

    // Calcular distancia al centro 
    let distancia = i - mitad;
    if (distancia < 0) {
      distancia = -distancia;
    }


    let numEstrellas = n - 2 * distancia;


    let numEspacios = (n - numEstrellas) / 2;


    for (let e = 0; e < numEspacios; e++) {
      espacios += " ";
    }

    
    for (let s = 0; s < numEstrellas; s++) {
      estrellas += "*";
    }

    resultado[i] = espacios + estrellas;
  }

  return resultado;
}

let tamaño = 7;
let resultado = rombo(tamaño);

for (let i = 0; i < resultado.length; i++) {
  console.log(resultado[i]);
}

