'use strict';

// ============================
// CAPA DE PRESENTACIÓN
// ============================

const salida = document.getElementById("salida");
const inputJSON = document.getElementById("inputJSON");

// Botón: suspensos
document.getElementById("btnSuspensos").addEventListener("click", () => {
  const resultado = $yedra.listarSuspensos();
  salida.textContent = "📋 Lista de alumnos suspensos:\n\n" + JSON.stringify(resultado, null, 2);
});

// Botón: estadísticas
document.getElementById("btnEstadisticas").addEventListener("click", () => {
  const resultado = $yedra.estadisticasPorModulo();
  salida.textContent = "📊 Estadísticas por módulo:\n\n" + JSON.stringify(resultado, null, 2);
});

// Botón: ver JSON actual
document.getElementById("btnVerJSON").addEventListener("click", () => {
  salida.textContent = "📦 Datos actuales (JSON):\n\n" + $yedra.devolverJSON();
});

// Botón: cargar nuevo JSON
document.getElementById("btnCargarJSON").addEventListener("click", () => {
  const cadena = inputJSON.value.trim();
  if (cadena === "") {
    salida.textContent = "⚠️ No se ha introducido ningún texto JSON.";
    return;
  }

  const mensaje = $yedra.cargarJSON(cadena);
  salida.textContent = mensaje;
});
