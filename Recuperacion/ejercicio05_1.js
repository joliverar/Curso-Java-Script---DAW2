'use strict';

function romboPerfecto(n) {
    
    let res = [];

    if (n % 2 === 0) {
        alert("debes ingresar un numero impar");
        return res;
    }

    let mitad = (n + 1) / 2;
    for (let i = 1; i <= mitad; i++) {
        let linea = "";

        for (let j = 0; j < mitad-i; j++) {
            linea += " ";
            
        }
        
        for (let k = 0; k < 2*i-1; k++) {
            linea += "*";
            
        }
        res[res.length] = linea;
     
        
    }
        for (let i = mitad-1; i >= 1; i--) {
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

function probarRombo() {
    let r = romboPerfecto(9);
    let texto = "";

    for (let i = 0; i < r.length; i++) {
        texto += r[i]+"\n";
        
    }
    alert(texto);
    console.log(texto);
}

probarRombo();