'use strict';

/********************************************************************
 * 🔄 EJERCICIO 16 — FUNCIÓN AUTOINVOCADA (VERSION BÁSICA)
 * Encapsula la gestión de personal del ejercicio 15
 * dentro de una función autoinvocada sin métodos de lenguaje.
 ********************************************************************/

(function() {

  let trabajadores = [];
  let contadorCodigo = 1;

  function generarCodigo() {
    if (contadorCodigo < 10) return "E0" + contadorCodigo++;
    else return "E" + contadorCodigo++;
  }

  function crearTrabajador(nombre, categoria, contratacion) {
    let nuevo = {
      codigo: generarCodigo(),
      nombre: nombre,
      categoria: categoria,
      contratacion: contratacion
    };
    trabajadores[trabajadores.length] = nuevo;
  }

  function listarTrabajadores() {
    console.log("📋 Lista:");
    for (let i = 0; i < trabajadores.length; i++) {
      let t = trabajadores[i];
      console.log(t.codigo + " - " + t.nombre + " - Cat." + t.categoria + " - Año " + t.contratacion);
    }
  }

  function calcularNominas() {
    let añoActual = new Date().getFullYear();
    let salarios = [0, 1100, 1400, 1900];
    let total = 0;

    for (let i = 0; i < trabajadores.length; i++) {
      let t = trabajadores[i];
      let antig = añoActual - t.contratacion;
      let nomina = salarios[t.categoria] + salarios[t.categoria] * 0.04 * antig;
      total += nomina;
    }

    console.log("💰 Total nóminas: " + total.toFixed(2) + " €");
  }

  // Ejecución directa (sin exponer funciones)
  crearTrabajador("Gloria", 2, 2018);
  crearTrabajador("Jino", 3, 2015);
  listarTrabajadores();
  calcularNominas();

})();
