'use strict';


function dibujarTrianguloCompleto(n) {
  let triangulo = new Array(n); // Creamos el array con tamaño fijo
  let linea, espacios, estrellas;

  for (let i = 1; i <= n; i++) {
    linea = "";
    espacios = "";
    estrellas = "";

    // Espacios a la izquierda
    for (let e = 0; e < n - i; e++) {
      espacios += " ";
    }

    // Estrellas centradas
    for (let s = 0; s < (2 * i - 1); s++) {
      estrellas += "*";
    }

    linea = espacios + estrellas;
    triangulo[i - 1] = linea; // Guardar sin push
  }

  return triangulo;
}
let tamaño = 5;
let resultado = dibujarTrianguloCompleto(tamaño);

for (let i = 0; i < resultado.length; i++) {
  console.log(resultado[i]);
}
