'use strict';

/********************************************************************
 * 🧩 EJERCICIO 7 — CONJUNTOS (UNIÓN, INTERSECCIÓN, DIFERENCIA)
 ********************************************************************/
function conjuntos(array1, array2, operacion) {
  let resultado = [];

  // Eliminar duplicados de cada array manualmente
  let limpio1 = [];
  for (let i = 0; i < array1.length; i++) {
    let repetido = false;
    for (let j = 0; j < limpio1.length; j++) {
      if (array1[i] === limpio1[j]) repetido = true;
    }
    if (!repetido) limpio1.push(array1[i]);
  }

  let limpio2 = [];
  for (let i = 0; i < array2.length; i++) {
    let repetido = false;
    for (let j = 0; j < limpio2.length; j++) {
      if (array2[i] === limpio2[j]) repetido = true;
    }
    if (!repetido) limpio2.push(array2[i]);
  }

  // Realizar la operación
  if (operacion === "union") {
    for (let i = 0; i < limpio1.length; i++) resultado.push(limpio1[i]);
    for (let i = 0; i < limpio2.length; i++) {
      let existe = false;
      for (let j = 0; j < resultado.length; j++) {
        if (limpio2[i] === resultado[j]) existe = true;
      }
      if (!existe) resultado.push(limpio2[i]);
    }
  }

  else if (operacion === "interseccion") {
    for (let i = 0; i < limpio1.length; i++) {
      for (let j = 0; j < limpio2.length; j++) {
        if (limpio1[i] === limpio2[j]) resultado.push(limpio1[i]);
      }
    }
  }

  else if (operacion === "diferencia") {
    for (let i = 0; i < limpio1.length; i++) {
      let comun = false;
      for (let j = 0; j < limpio2.length; j++) {
        if (limpio1[i] === limpio2[j]) comun = true;
      }
      if (!comun) resultado.push(limpio1[i]);
    }
  }

  else {
    console.log("Operación no válida. Usa 'union', 'interseccion' o 'diferencia'.");
  }

  return resultado;
}

