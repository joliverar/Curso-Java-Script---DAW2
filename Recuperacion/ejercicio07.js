'use strict';

/*7-Crea una función que reciba un número e imprima la tabla de multiplicar.
Crea una función que solicite dos números entre 0 y 10, y que imprima las tablas de multiplicar
entre los números indicados. Las tablas aparecerán desde el número más pequeño al mayor
(aquí hay validaciones).
Añade el código auxiliar necesario para probar la aplicación.*/

function tabla(n) {
    let texto = "";
    for (let i = 1; i <= 10; i++) {
       
        texto += `${i}*${n} = ${i * n}` + "\n";
        
    }
    return texto;
}

function tabla2(min, max) {

    if (min < 0 || max > 10 || min > 10 || max < 0) {
        alert("los numeros deben ser menores a 10 y mayores a cero");
        return;
    }
   
    if (min > max) {
        let temp = min;
        min = max;
        max = temp;
    }
    let texto = "";
    for (let j = min; j <= max; j++) {
        texto += "tabla del "+j + "\n";
       texto += tabla(j) + "\n";
        
    }
    alert(texto);
    console.log(texto);

}

tabla2(5, 8);