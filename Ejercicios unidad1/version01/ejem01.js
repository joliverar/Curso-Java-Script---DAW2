'use strict'; // Activamos modo estricto

/********************************************************************
 * EJERCICIO 1 — Variables y operaciones básicas
 ********************************************************************/

function ejercicio1() {
  // Variables pedidas
  let nombre = "Jino";        // Cadena
  let apellido = "Olivera";   // Cadena
  let edad = 30;              // Número (ejemplo)
  let nacimiento = 1995;      // Número (ejemplo)

  // 1) Mostrar en formato clave:valor con comillas
  alert(
    `nombre: "${nombre}"\n` +      // cadenas entre comillas dobles
    `apellido: "${apellido}"\n` +
    `edad: '${edad}'\n` +          // números entre comillas simples
    `nacimiento: '${nacimiento}'`
  );

  // 2) Mostrar nombre + apellido con salto de línea
  alert(`${nombre}\n${apellido}`);

  // 3) Mostrar suma de edad + nacimiento
  alert(`edad + nacimiento = ${edad + nacimiento}`);

  // 4) Mostrar la suma de todas las variables
  // Aquí JavaScript convierte strings + números en concatenación de texto
  alert(`Suma de todas: ${nombre + apellido + (edad + nacimiento)}`);
}

// --- Ejecutar ejercicio 1 ---
ejercicio1();


