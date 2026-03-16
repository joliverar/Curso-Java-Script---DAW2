'use strict';

function rectangulo(n) {
    let res = [];
    for (let i = 0; i < n; i++) {
        let linea = "";
        for (let j = 0; j < n; j++) {
            if (i === 0 || j === 0 || i === n - 1 || j === n - 1) {
                linea += "*";
            } else {
                linea += " ";
           }
            
        }
        res[res.length] = linea;
    }
    return res;
}
function triangulo(n) {
    let res = [];
    for (let i = 1; i <= n; i++) {
        let linea = "";
        for (let j = 0; j < n-i; j++) {
            
            linea += " ";
        }
        for (let k = 0; k < 2*i-1; k++) {
          
            linea += "*";
        }

        res[res.length] = linea;
        
    }
    return res;
}
function rombon(n) {
    let res = [];

    if (n%2 === 0) {
        alert("debe ingresar un numero impar");
        return res;
    }
    let mitad = (n + 1) / 2;
    
    for (let i = 1; i <= mitad; i++) {
        let linea = "";

        for (let j = 0; j < mitad-i; j++) {
            linea += " ";
            
        }
        for (let k = 0; k < 2*i-1; k++) {
            linea += "*"
            
        }
        res[res.length] = linea;
        
    }

        for (let i = mitad-1; i >=1; i--) {
          let linea = "";

          for (let j = 0; j < mitad - i; j++) {
            linea += " ";
          }
          for (let k = 0; k < 2 * i - 1; k++) {
            linea += "*";
          }
          res[res.length] = linea;
    }
    return res;

}

function dibujarFigura(funcionFigura, n) {
    let figura = funcionFigura(n);
    let texto = "";

    for (let i = 0; i < figura.length; i++) {
        texto += figura[i] + "\n";
        
    }
    alert(texto);
    console.log(texto);
}

function menu() {
    let opcion;

    do {
        opcion = parseInt(prompt(
            "1 Triangulo\n" +
            "2 Rectangulo\n" +
            "3 Rombo\n" +
            "0 Salir"));
        
        if (opcion === 1) {
            let n = parseInt(prompt("Tamaño"));
            dibujarFigura(triangulo, n);
        }
        if (opcion === 2) {
          let n = parseInt(prompt("Tamaño"));
          dibujarFigura(rectangulo, n);
        }
        if (opcion === 3) {
          let n = parseInt(prompt("Tamaño"));
          dibujarFigura(rombon, n);
        }

    } while (opcion !== 0);
}

menu();