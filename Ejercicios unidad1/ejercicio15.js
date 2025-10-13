'use strict';

/********************************************************************
 * 👨‍💼 EJERCICIO 15 — GESTIÓN DE PERSONAL (VERSIÓN ALGORÍTMICA)
 * Sin usar métodos de Array. Solo bucles y estructuras básicas.
 ********************************************************************/

let trabajadores = [];
let contadorCodigo = 1;

function generarCodigo() {
  // "E01", "E02"...
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
  console.log("📋 Lista de trabajadores:");
  for (let i = 0; i < trabajadores.length; i++) {
    let t = trabajadores[i];
    console.log(t.codigo + " - " + t.nombre + " - Cat." + t.categoria + " - Año " + t.contratacion);
  }
}

function buscarIndice(codigo) {
  for (let i = 0; i < trabajadores.length; i++) {
    if (trabajadores[i].codigo === codigo) return i;
  }
  return -1;
}

function borrarTrabajador(codigo) {
  let pos = buscarIndice(codigo);
  if (pos >= 0) {
    let confirmar = confirm("¿Eliminar trabajador " + codigo + "?");
    if (confirmar) {
      // desplazamos los elementos manualmente
      for (let i = pos; i < trabajadores.length - 1; i++) {
        trabajadores[i] = trabajadores[i + 1];
      }
      trabajadores.length--; // quitamos el último
    }
  } else {
    alert("No encontrado.");
  }
}

function modificarTrabajador(codigo) {
  let pos = buscarIndice(codigo);
  if (pos === -1) {
    alert("No encontrado.");
    return;
  }
  let t = trabajadores[pos];
  let nuevoNombre = prompt("Nuevo nombre:", t.nombre);
  let nuevaCat = parseInt(prompt("Nueva categoría (1-3):", t.categoria));
  let nuevoAño = parseInt(prompt("Nuevo año contratación:", t.contratacion));

  if (nuevoNombre !== null && nuevoNombre !== "") t.nombre = nuevoNombre;
  if (!isNaN(nuevaCat)) t.categoria = nuevaCat;
  if (!isNaN(nuevoAño)) t.contratacion = nuevoAño;
}

function calcularNominas() {
  let añoActual = new Date().getFullYear();
  let salarios = [0, 1100, 1400, 1900]; // índice 1,2,3
  let totalEmpresa = 0;

  // categorías 1–3
  for (let cat = 1; cat <= 3; cat++) {
    let totalCat = 0;
    for (let i = 0; i < trabajadores.length; i++) {
      let t = trabajadores[i];
      if (t.categoria === cat) {
        let antig = añoActual - t.contratacion;
        let nomina = salarios[cat] + salarios[cat] * 0.04 * antig;
        totalCat += nomina;
      }
    }
    console.log("Categoría " + cat + ": " + totalCat.toFixed(2) + " €");
    totalEmpresa += totalCat;
  }

  console.log("TOTAL EMPRESA: " + totalEmpresa.toFixed(2) + " €");
}

function menu() {
  while (true) {
    let op = prompt("Menú:\n1.Crear\n2.Listar\n3.Borrar\n4.Modificar\n5.Nóminas\n0.Salir");
    if (op === null || op === "0") break;

    if (op === "1") {
      let nombre = prompt("Nombre:");
      let cat = parseInt(prompt("Categoría (1-3):"));
      let año = parseInt(prompt("Año contratación:"));
      crearTrabajador(nombre, cat, año);
    } else if (op === "2") {
      listarTrabajadores();
    } else if (op === "3") {
      borrarTrabajador(prompt("Código:"));
    } else if (op === "4") {
      modificarTrabajador(prompt("Código:"));
    } else if (op === "5") {
      calcularNominas();
    } else {
      alert("Opción no válida");
    }
  }
}

// Bloque de prueba
(function probar() {
  crearTrabajador("Gloria", 2, 2018);
  crearTrabajador("Jino", 3, 2015);
  menu();
})();
