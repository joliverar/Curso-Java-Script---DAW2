'use strict';


function dibujarTrianguloCompleto(n) {
  let res = [];

  for (let i = 1; i <= n; i++){
    let linea = "";

    for (let j = 0; j < n-i; j++){
      linea += " ";
    }

    for (let k = 0; k < 2 * i - 1; k++){
      linea += "*";
    }

    res[i - 1] = linea;


  }
  return res;
}

function probarTriangulo() {
  let r = dibujarTrianguloCompleto(6);
  let texto = "";

  for (let i = 0; i < r.length; i++) {
    texto += r[i] + "\n";
    
  }
  alert(texto);
  console.log(texto);
}

probarTriangulo();
