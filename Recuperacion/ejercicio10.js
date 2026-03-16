'use strict';

/*10-Crea una función que reciba una cadena de texto y que cuente el número de apariciones de
cada carácter. Debe devolver un objeto de tipo clave-valor con el resultado.
Añade el código auxiliar necesario para probar la aplicación*/

function contaarCaracteres(texto) {
    let res = {};

    for (let i = 0; i < texto.length; i++) {
        // let caracter = texto[i];

        // if (res[caracter] === undefined) {
        //     res[caracter] = 1;
        // } else {
        //     res[caracter] = res[caracter] + 1;
        // }
         let c = texto[i];

         res[c] = (res[c] || 0) + 1;
        
    }
    return res;
}

let cadena = prompt("ingrese un texto");
let conteo = contaarCaracteres(cadena);
console.log(conteo);