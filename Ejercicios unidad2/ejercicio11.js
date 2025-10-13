'use strict';

/********************************************************************
 * 🔢 EJERCICIO 11 — NÚMEROS PERDIDOS
 ********************************************************************/
function numerosPerdidos(array) {
  if (array.length === 0) return [];

  // 1️⃣ Encontrar el valor mínimo
  let min = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < min) min = array[i];
  }

  // 2️⃣ Encontrar el valor máximo
  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) max = array[i];
  }

  // 3️⃣ Buscar los números que faltan
  let faltan = [];
  for (let n = min; n <= max; n++) {
    let existe = false;
    for (let j = 0; j < array.length; j++) {
      if (array[j] === n) existe = true;
    }
    if (!existe) faltan.push(n);
  }

  return faltan;
}


/********************************************************************
 * 🧱 EJERCICIO 12 — LA ESCALERA
 ********************************************************************/
function escalera(n) {
  if (n === 0) {
    console.log("__");
    return;
  }

  if (n > 0) {
    // Escalera ascendente
    let espacio = n - 1;
    for (let i = 0; i < n; i++) {
      console.log(" ".repeat(espacio) + "_");
      espacio--;
      console.log(" ".repeat(espacio) + "_|");
    }
  } else {
    // Escalera descendente
    n = -n;
    for (let i = 0; i < n; i++) {
      console.log("_");
      console.log("|_");
    }
  }
}
