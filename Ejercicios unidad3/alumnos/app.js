"use strict";

/* =========================================
   IIFE -> $yedra
========================================= */
const $yedra = (function () {
  // Datos de prueba
  let alumnos = [
    { nombre: "Ana", nota: 4, modulo: "DWEC", convocatorias: 2 },
    { nombre: "Luis", nota: 7, modulo: "DWES", convocatorias: 1 },
    { nombre: "Pedro", nota: 3, modulo: "DWEC", convocatorias: 3 },
    { nombre: "Marta", nota: 9, modulo: "DWES", convocatorias: 1 },
    { nombre: "Juan", nota: 5, modulo: "DWEC", convocatorias: 2 },
  ];

  /* =========================================
       1. ALUMNOS SUSPENSOS
    ========================================= */
    function suspensos() {
      

    let filtrados = alumnos.filter((a) => a.nota < 5);
        console.log("Filtrados:", filtrados);
        
    let mapeados = filtrados.map((a) => ({
    nombre: a.nombre,
    nota: a.nota,
    modulo: a.modulo,
    }));
console.log("Mapeados:", mapeados);
     let ordenados = mapeados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        console.log("Ordenados:", ordenados);
     
        
    let resultados =  alumnos
      .filter((a) => a.nota < 5)
      .map((a) => ({
        nombre: a.nombre,
        nota: a.nota,
        modulo: a.modulo,
      }))
            .sort((a, b) => a.nombre.localeCompare(b.nombre));
        
        console.log("Suspensos", resultados);
        return resultados;
        
      
  }

  /* =========================================
       2. ESTADÍSTICAS POR MÓDULO
    ========================================= */
  function estadisticas() {
    let grupos = {};

    // Agrupar
    alumnos.forEach((a) => {
      if (!grupos[a.modulo]) {
        grupos[a.modulo] = {
          sumaNotas: 0,
          sumaConv: 0,
          total: 0,
        };
      }

      grupos[a.modulo].sumaNotas += a.nota;
      grupos[a.modulo].sumaConv += a.convocatorias;
      grupos[a.modulo].total++;
    });

    // Calcular medias
    let resultado = [];

    for (let modulo in grupos) {
      let g = grupos[modulo];

      resultado.push({
        modulo: modulo,
        mediaNota: parseFloat((g.sumaNotas / g.total).toFixed(2)),
        mediaConv: parseFloat((g.sumaConv / g.total).toFixed(2)),
      });
    }

    // Ordenar descendente por convocatorias
    resultado.sort((a, b) => b.mediaConv - a.mediaConv);

      console.log("Estadisticas", resultado);
    return resultado;
  }

  /* =========================================
       3. EXPORTAR JSON
    ========================================= */
  function exportarJSON() {
    return JSON.stringify(alumnos);
  }

  /* =========================================
       4. CARGAR JSON
    ========================================= */
  function cargarJSON(cadena) {
    try {
      let datos = JSON.parse(cadena);

      if (!Array.isArray(datos)) {
        alert("El JSON no es un array");
        return;
      }

      alumnos = datos;
    } catch (error) {
      alert("JSON inválido");
    }
  }

  return {
    suspensos,
    estadisticas,
    exportarJSON,
    cargarJSON,
  };
})();

$yedra.suspensos();
$yedra.estadisticas();

window.addEventListener("load", function () {
  let res = document.getElementById("resultado");

  document.getElementById("suspensos").addEventListener("click", function () {
    res.innerHTML = JSON.stringify($yedra.suspensos());
  });

  document
    .getElementById("estadisticas")
    .addEventListener("click", function () {
      res.innerHTML = JSON.stringify($yedra.estadisticas());
    });

  document.getElementById("exportar").addEventListener("click", function () {
    res.innerHTML = $yedra.exportarJSON();
  });

  document.getElementById("cargar").addEventListener("click", function () {
    let txt = document.getElementById("jsonInput").value;
    $yedra.cargarJSON(txt);
  });
});