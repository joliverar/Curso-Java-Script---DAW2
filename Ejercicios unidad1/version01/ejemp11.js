// ejemplo11.js
// UD1 - Ejercicio 11: Dado un rango [a,b], para cada número indicar si es
// múltiplo de 3, múltiplo de 5 y/o primo. Solo mostrar números que cumplan algo.

'use strict'; // Modo estricto para detectar errores comunes.

// Función que comprueba si un número es primo
function esPrimo(numero) {
  if (numero < 2) return false; // Los números menores que 2 no son primos
  for (let i = 2; i <= Math.sqrt(numero); i++) {
    if (numero % i === 0) return false; // Si tiene divisores, no es primo
  }
  return true; // Si no tiene divisores, es primo
}

// Función principal que recibe un rango y analiza cada número
function analizarRango(inicio, fin) {
  // Recorremos todos los números desde 'inicio' hasta 'fin'
  for (let i = inicio; i <= fin; i++) {
    let mensaje = ""; // Variable para construir el mensaje

    // Comprobamos si el número es múltiplo de 3
    if (i % 3 === 0) {
      mensaje += `${i} es múltiplo de 3. `;
    }

    // Comprobamos si el número es múltiplo de 5
    if (i % 5 === 0) {
      mensaje += `${i} es múltiplo de 5. `;
    }

    // Comprobamos si el número es primo
    if (esPrimo(i)) {
      mensaje += `${i} es número primo. `;
    }

    // Si el mensaje no está vacío, significa que cumple alguna condición
    if (mensaje !== "") {
      console.log(mensaje); // Mostramos el mensaje en consola
    }
  }
}

// Código auxiliar para probar la aplicación
// Solicita al usuario el rango de números
let inicio = parseInt(prompt("Introduce el número inicial del rango:"));
let fin = parseInt(prompt("Introduce el número final del rango:"));

// Validamos que los valores sean números y que el rango sea correcto
if (isNaN(inicio) || isNaN(fin) || inicio > fin) {
  alert("Rango inválido. Asegúrate de introducir números válidos y que el inicio sea menor o igual al final.");
} else {
  // Ejecutamos la función con el rango proporcionado
  analizarRango(inicio, fin);
}
