'use strict';

/********************************************************************
 * EJERCICIO 6 — Dibujar figura geométrica indicada por parámetro
 * (SIN ARRAYS, usando strings con saltos de línea)
 ********************************************************************/

/**
 * Genera un cuadrado hueco de lado n como string.
 */
function cuadradoHueco(n) {
  let salida = '';
  for (let i = 0; i < n; i++) {
    if (i === 0 || i === n - 1) {
      salida += '*'.repeat(n); // Primera y última fila → todo asteriscos
    } else {
      salida += '*' + ' '.repeat(n - 2) + '*'; // Filas intermedias
    }
    if (i < n - 1) salida += '\n'; // Salto de línea salvo última fila
  }
  return salida;
}

/**
 * Genera un triángulo rectángulo de altura n como string.
 */
function triangulo(n) {
  let salida = '';
  for (let i = 1; i <= n; i++) {
    salida += '*'.repeat(i); // Línea con i asteriscos
    if (i < n) salida += '\n';
  }
  return salida;
}

/**
 * Genera un rombo de diagonal n como string.
 */
function rombo(n) {
  if (n % 2 === 0) n++; // Aseguramos que n sea impar
  const mitad = Math.floor(n / 2);
  let salida = '';

  // Parte superior + línea central
  for (let i = 0; i <= mitad; i++) {
    const espacios = ' '.repeat(mitad - i);
    const estrellas = '*'.repeat(2 * i + 1);
    salida += espacios + estrellas + espacios;
    salida += '\n';
  }

  // Parte inferior
  for (let i = mitad - 1; i >= 0; i--) {
    const espacios = ' '.repeat(mitad - i);
    const estrellas = '*'.repeat(2 * i + 1);
    salida += espacios + estrellas + espacios;
    if (i > 0) salida += '\n';
  }

  return salida;
}

/**
 * Función que recibe un generador y un tamaño, y lo muestra.
 * @param {function} generador - Función que genera la figura
 * @param {number} n - Tamaño de la figura
 */
function dibujarFigura(generador, n) {
  const figura = generador(n); // Generamos la figura como string
  console.log(figura); // Mostramos en consola
  alert(figura); // Mostramos en pantalla
}

/**
 * Menú principal
 */
function menu() {
  while (true) {
    const opcion = prompt(
      '=== MENÚ DE FIGURAS ===\n' +
      '1) Cuadrado hueco\n' +
      '2) Triángulo\n' +
      '3) Rombo\n' +
      '0) Salir\n\n' +
      'Elige una opción:'
    );

    if (opcion === null || opcion === '0') {
      alert('👋 Programa finalizado.');
      break;
    }

    const entrada = prompt('Introduce el tamaño (entero positivo):');
    if (entrada === null) continue;
    const n = Number.parseInt(entrada, 10);
    if (isNaN(n) || n <= 0) {
      alert('⚠️ Tamaño no válido.');
      continue;
    }

    switch (opcion) {
      case '1':
        dibujarFigura(cuadradoHueco, n);
        break;
      case '2':
        dibujarFigura(triangulo, n);
        break;
      case '3':
        dibujarFigura(rombo, n);
        break;
      default:
        alert('⚠️ Opción no válida.');
    }
  }
}

// --- Ejecutar el menú ---
menu();

