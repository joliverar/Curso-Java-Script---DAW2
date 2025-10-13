'use strict';

/********************************************************************
 * 🧩 EJERCICIO 9 — AGRUPAR PARÁMETROS POR TIPO
 * Recibe un número variable de parámetros y los agrupa por tipo.
 * Devuelve un resumen con cada tipo y sus valores + posición original.
 ********************************************************************/

function agruparPorTipo(...parametros) {
  let grupos = {}; // Objeto para almacenar por tipo

  for (let i = 0; i < parametros.length; i++) {
    let tipo = typeof parametros[i];
    if (!grupos[tipo]) grupos[tipo] = []; // Crear array si no existe
    grupos[tipo].push(`[${i}] = ${parametros[i]}`);
  }

  // Mostrar resultado
  for (let tipo in grupos) {
    console.log(`Tipo: ${tipo}`);
    console.log(`Valores: ${grupos[tipo].join(', ')}`);
    console.log('------------------------');
  }

  return grupos;
}

// Bloque de prueba
(function probar() {
  agruparPorTipo("Jino", 35, true, 8.5, "Hola", { nombre: "Gloria" });
})();
