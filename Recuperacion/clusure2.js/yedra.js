const $yedra = (function () {
  let alumnos = [
    { nombre: "Ana", nota: 8, modulo: "DWEC", convocatorias: 1 },
    { nombre: "Luis", nota: 4, modulo: "DWES", convocatorias: 2 },
    { nombre: "Marta", nota: 6, modulo: "DWEC", convocatorias: 3 },
    { nombre: "Pedro", nota: 3, modulo: "DWES", convocatorias: 1 },
    { nombre: "Sara", nota: 9, modulo: "DWEC", convocatorias: 2 },
  ];

  // 1. Suspensos
  function suspensos() {
    return alumnos
      .filter((a) => a.nota < 5)
      .map((a) => ({
        nombre: a.nombre,
        nota: a.nota,
        modulo: a.modulo,
      }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  // 2. Estadísticas por módulo
  function estadisticas() {
    const modulos = {};

    alumnos.forEach((a) => {
      if (!modulos[a.modulo]) {
        modulos[a.modulo] = { sumaNotas: 0, sumaConv: 0, total: 0 };
      }
      modulos[a.modulo].sumaNotas += a.nota;
      modulos[a.modulo].sumaConv += a.convocatorias;
      modulos[a.modulo].total++;
    });

    const resultado = [];

    for (let modulo in modulos) {
      const m = modulos[modulo];
      resultado.push({
        modulo,
        notaMedia: Number((m.sumaNotas / m.total).toFixed(2)),
        convocatoriasMedia: Number((m.sumaConv / m.total).toFixed(2)),
      });
    }

    return resultado.sort(
      (a, b) => b.convocatoriasMedia - a.convocatoriasMedia,
    );
  }

  // 3. Devolver JSON
  function exportarJSON() {
    return JSON.stringify(alumnos, null, 2);
  }

  // 4. Cargar JSON
  function cargarJSON(cadena) {
    try {
      const datos = JSON.parse(cadena);
      if (!Array.isArray(datos)) {
        alert("El JSON debe ser un array.");
        return;
      }
      alumnos = datos;
    } catch (e) {
      alert("JSON no válido.");
    }
  }

  return {
    suspensos,
    estadisticas,
    exportarJSON,
    cargarJSON,
  };
})();
