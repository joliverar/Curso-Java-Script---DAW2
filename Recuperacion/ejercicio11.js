'use strict';

/*11- Crea una función que reciba un rango, para cada valor en el rango se informará de si el
número es múltiplo de 3, si es múltiplo de 5 y si es número primo. Sólo mostrar información de
los números que cumplan alguna de las condiciones.
Añade el código auxiliar necesario para probar la aplicación.*/

function esPrimo(n) {
    if (n < 2) {
        return false;
    }

    for (let i = 0; i < n; i++) {
        if (n % 2 === 0) {
            return false;
       }
        
    }
    return true;
}

function analizarRango(min, max) {
    let info = "";
    for (let i = min; i < max; i++) {
        
        if (i % 2 === 0) {
            info += "multiplo de 2";
        }

        if (i % 3 === 0) {
            info += "multiplo de 3";
        }

        if (i % 5 === 0) {
            info += "multiplo de 5";
        }

        if (esPrimo(i)) {
             info += "es primo";
        }

        if (info !== "") {
            console.log(i + ":" + info);
        }
    }
}


let inicio = parseInt(prompt("ingrese el inicio"));
let fin = arseInt(prompt("ingrese el fin"));

analizarRango(inicio, fin);