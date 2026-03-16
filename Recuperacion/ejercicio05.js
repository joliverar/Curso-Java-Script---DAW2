'use strict';


function rombo(n) {
  let res = [];
  
  for (let i = 1; i <= n; i++){
    let linea = "";

    for (let j = 0; j < n-i; j++) {
      linea += " ";
      
    }

    for (let k = 0; k < 2*i-1; k++) {
     linea += "*"
      
    }

    res[res.length] = linea;
  
  }
   for (let i = n-1; i >= 1; i--) {
     let linea = "";

     for (let j = 0; j < n - i; j++) {
       linea += " ";
     }

     for (let k = 0; k < 2 * i - 1; k++) {
       linea += "*";
     }

     res[res.length] = linea;
   }
  return res;
}

function probarRonbo() {
  let r = rombo(7);
  let texto = "";
  for (let i = 0; i < r.length; i++) {
    texto += r[i] + "\n";
    
  }
  alert(texto);
  console.log(texto);
}

probarRonbo();

