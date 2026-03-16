'use strict';

/*3-Crea una función reciba un número y que dibuje un rectángulo hueco de lado del tamaño del
número indicado. El valor devuelto será un array con cada una de las cadenas que forman el
rectángulo.
Añade el código auxiliar necesario para probar la aplicación.*/

'use strict';

function rectanguloHueco(n) {
  let res = [];
  for (let i = 0; i < n; i++) {
    let linea = "";

    for (let j = 0; j < n; j++) {
      if (i === 0 || i === n - 1 || j === 0 || j === n - 1) {
        linea += "*";
      } else {
        linea += " ";
      }
      
    }
    res[i] = linea;
    
  }
  return res;
}

function probarRectangulo() {
  let r = rectanguloHueco(5);
  
  let texto = "";

  for (let i = 0; i < r.length; i++) {
    texto = texto + r[i] + "\n";
    
    
  }
  alert(texto);
}

probarRectangulo();