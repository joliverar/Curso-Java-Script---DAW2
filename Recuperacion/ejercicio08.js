'use strict';

/*8-Crea una función que reciba un número y calcule su factorial, la función devolverá una
cadena con el desarrollo del factorial. Por ejemplo, para una entrada de 4 devolverá la cadena
“4x3x2x1=24”.
Añade el código auxiliar necesario para probar la aplicación. El script solicitará números al
usuario hasta que no desee continuar*/

function factorial(n) {
    
    let res = 1;
    let texto = "";

    for (let i = n; i >= 1; i--) {
        res *= i;
        texto += i;
        if (i > 1) {
            texto += "X";
        }
        
    }
    return res + " = " + texto;


}

function probarFactorial() {
    let continuar = true;
    while (continuar) {
      let n = parseInt(prompt("ingrese un numero"));
      if (isNaN(n) || n < 0) {
        alert("ingrese un numero correcto");
      } else {
        alert(factorial(n));
      }

     continuar = confirm("desea calcular otro factoria");
    }
    

}

probarFactorial();


function factorial2(n) {
    let res = 1;
    let texto = "";

    for (let i = n; i >=1; i--) {
        res *= i;
        texto += i;

        if (i > 1) {
            texto += "X";
        }
        
    }
    return res + " = " + texto;
}

function probarFactorial2() {
    let continuar = true;

    while (continuar) {
        n = parseInt(prompt("Ingrese un numero"));

        if (NaN(n) || n < 0) {
            alert("ingrese un numero correcto");

        } else {
            factorial2(n);
        }
        continuar = confirm("desea calcular factorial de otro nuemro");
    }

}

probarFactorial2();