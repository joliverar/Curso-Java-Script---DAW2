'use strict';

/********************************************************************
 * 🔠 EJERCICIO 10 — CONTAR CARACTERES
 * Recibe una cadena y devuelve un objeto clave-valor con el conteo.
 ********************************************************************/

function contarCaracteres(cadena) {
  let conteo = {};

  for (let i = 0; i < cadena.length; i++) {
    let c = cadena[i];
    if (conteo[c]) conteo[c]++;
    else conteo[c] = 1;
  }

  return conteo;
}

// Bloque de prueba
(function probar() {
  let texto = prompt("Introduce un texto para contar sus caracteres:");
  let resultado = contarCaracteres(texto);
  console.log(resultado);
})();
