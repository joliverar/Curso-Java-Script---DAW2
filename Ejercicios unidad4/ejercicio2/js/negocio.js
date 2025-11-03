'use strict';

// ============================
// MÓDULO DE NEGOCIO ($yedra)
// ============================

const $yedra = (function() {

  // --- Datos iniciales ---
  let alumnos = [
    { nombre: "Ana", nota: 8, modulo: "DWEC", convocatorias: 1 },
    { nombre: "Luis", nota: 4, modulo: "DWES", convocatorias: 2 },
    { nombre: "Marta", nota: 6, modulo: "DWEC", convocatorias: 1 },
    { nombre: "Jino", nota: 3, modulo: "DWES", convocatorias: 3 },
    { nombre: "Gloria", nota: 9, modulo: "DWEC", convocatorias: 1 },
    { nombre: "Milan", nota: 5, modulo: "DWES", convocatorias: 2 }
  ];

  // 1️⃣ Lista de suspensos
  function listarSuspensos() {
    const suspensos = [];

    for (let i = 0; i < alumnos.length; i++) {
      const alum = alumnos[i];
      if (alum.nota < 5) {
        suspensos.push({
          nombre: alum.nombre,
          nota: alum.nota,
          modulo: alum.modulo
        });
      }
    }

    suspensos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    return suspensos;
  }

  // 2️⃣ Estadísticas por módulo
  function estadisticasPorModulo() {
    const acumulado = {};

    // Agrupar por módulo
    for (let i = 0; i < alumnos.length; i++) {
      const alum = alumnos[i];
      const mod = alum.modulo;

      if (!acumulado[mod]) {
        acumulado[mod] = { totalNota: 0, totalConv: 0, count: 0 };
      }

      acumulado[mod].totalNota += alum.nota;
      acumulado[mod].totalConv += alum.convocatorias;
      acumulado[mod].count++;
    }

    // Calcular promedios
    const resultado = [];
    for (const modulo in acumulado) {
      const datos = acumulado[modulo];
      resultado.push({
        modulo: modulo,
        notaMedia: parseFloat((datos.totalNota / datos.count).toFixed(2)),
        convocatoriasMedia: parseFloat((datos.totalConv / datos.count).toFixed(2))
      });
    }

    // Ordenar descendente por convocatorias
    resultado.sort((a, b) => b.convocatoriasMedia - a.convocatoriasMedia);

    return resultado;
  }

  // 3️⃣ Devolver todos los datos como JSON
  function devolverJSON() {
    return JSON.stringify(alumnos, null, 2);
  }

  // 4️⃣ Cargar nuevos datos desde cadena JSON
  function cargarJSON(cadena) {
    try {
      const datos = JSON.parse(cadena);
      if (!Array.isArray(datos)) throw new Error("El JSON no es un array.");
      alumnos = datos;
      return "✅ Datos cargados correctamente (" + alumnos.length + " alumnos)";
    } catch (error) {
      return "❌ Error al cargar JSON: " + error.message;
    }
  }

  // --- Exposición pública ---
  return {
    listarSuspensos,
    estadisticasPorModulo,
    devolverJSON,
    cargarJSON
  };

})();
