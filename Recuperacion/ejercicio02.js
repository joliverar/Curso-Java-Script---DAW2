'use strict';

/*2-Realiza un programa que solicite números al usuario hasta que introduzca un 0. Y que
muestre los valores: máximo, mínimo, suma, media y total de números introducidos.*/

function solicitarVariables(){
    let suma = 0;
    let total = 0;
    let max = null;
    let min = null;

    while (true) {
      const entrada = prompt("Ingrese un numero, con cero termina");

      if (entrada === null) break;

      const n = parseInt(entrada);

      if (n === 0) break;

      suma += n;
      total++;

      if (max === null || n > max) max = n;

      if (min === null || n < min) min = n;
    }
 let media = suma/total;
     alert(`Suma: '${suma}'\nTotal: '${total}'\nMaximo: '${max}'\nMinimo: '${min}'\nMedia: '${media}`);
}

solicitarVariables();