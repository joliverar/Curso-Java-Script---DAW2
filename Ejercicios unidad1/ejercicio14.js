'use strict';

/********************************************************************
 * 🎓 EJERCICIO 14 — GESTIÓN ACADÉMICA (VERSIÓN ALGORÍTMICA)
 * Sin usar métodos del lenguaje.
 * Calcula media y promoción de alumnos con bucles básicos.
 ********************************************************************/

// Array de alumnos inicial
let alumnos = [
  {
    nombre: "Jino",
    asignaturas: [
      { modulo: "DWEC", nota: 8 },
      { modulo: "DIW", nota: 7 },
      { modulo: "DWES", nota: 9 },
      { modulo: "DAW", nota: 6 }
    ]
  },
  {
    nombre: "Gloria",
    asignaturas: [
      { modulo: "DWEC", nota: 4 },
      { modulo: "DIW", nota: 7 },
      { modulo: "DWES", nota: 5 },
      { modulo: "DAW", nota: 3 }
    ]
  },
  {
    nombre: "Mila",
    asignaturas: [
      { modulo: "DWEC", nota: 9 },
      { modulo: "DIW", nota: 10 },
      { modulo: "DWES", nota: 8 },
      { modulo: "DAW", nota: 9 }
    ]
  }
];

function evaluarAlumnos(lista) {
  // Recorremos manualmente
  for (let i = 0; i < lista.length; i++) {
    let alumno = lista[i];
    let suma = 0;
    let pendientes = [];
    let totalAsignaturas = 0;

    // Recorremos asignaturas
    for (let j = 0; j < alumno.asignaturas.length; j++) {
      let asig = alumno.asignaturas[j];
      suma += asig.nota;
      totalAsignaturas++;
      if (asig.nota < 5) {
        pendientes[pendientes.length] = asig.modulo; // añadir sin push()
      }
    }

    alumno.media = (suma / totalAsignaturas);
    alumno.promociona = pendientes.length === 0;
    alumno.pendientes = pendientes;
  }
}

function mostrarPromocionados(lista) {
  console.log("✅ Alumnos que promocionan:");
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].promociona === true) {
      console.log((i + 1) + " - " + lista[i].nombre + " - Media: " + lista[i].media.toFixed(2));
    }
  }
}

function mostrarNoPromocionados(lista) {
  console.log("❌ Alumnos con pendientes:");
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].promociona === false) {
      let textoPend = "[";
      for (let j = 0; j < lista[i].pendientes.length; j++) {
        textoPend += lista[i].pendientes[j];
        if (j < lista[i].pendientes.length - 1) textoPend += ", ";
      }
      textoPend += "]";
      console.log((i + 1) + " - " + lista[i].nombre + " - Pendientes: " + textoPend);
    }
  }
}

// Bloque de prueba
(function probar() {
  evaluarAlumnos(alumnos);
  mostrarPromocionados(alumnos);
  mostrarNoPromocionados(alumnos);
})();

