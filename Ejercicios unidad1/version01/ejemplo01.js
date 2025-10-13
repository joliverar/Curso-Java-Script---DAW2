// ejemplo01.js
// UD1 - Ejercicio 1: 2 cadenas (nombre, apellido) y 2 números (edad, año de nacimiento)
// Requisitos de salida:
//  - Alert con formato clave-valor: cadenas entre "dobles" y números entre 'simples'.
//  - Alert con nombre y apellidos separados por salto de línea.
//  - Alert con la suma de edad + año de nacimiento.
//  - Alert con la "suma de todas las variables" (en JS, esto concatena cadenas con números).

'use strict';

// --- Helpers mínimos (puedes omitir validaciones si tu profe lo da por supuestas) ---
const toInt = (v) => Number.parseInt(v, 10);

// --- Entrada (puedes cambiar los valores por los tuyos o usar prompts) ---
const nombre   = prompt('Tu nombre:', 'Jino') ?? 'Jino';
const apellido = prompt('Tu apellido:', 'Olivera') ?? 'Olivera';
const edad     = toInt(prompt('Tu edad:', '30') ?? '30');
const anioNac  = toInt(prompt('Tu año de nacimiento:', '1995') ?? '1995');

// --- a) Clave-valor con comillas según tipo ---
const kv = [
  `nombre: "${nombre}"`,
  `apellido: "${apellido}"`,
  `edad: '${edad}'`,
  `anioNac: '${anioNac}'`,
].join(', ');
alert(kv);

// --- b) Nombre y apellidos en líneas separadas ---
alert(`${nombre}\n${apellido}`);

// --- c) Suma de edad + año de nacimiento ---
alert(`edad + año = ${edad + anioNac}`);

// --- d) Suma de "todas" las variables (comportamiento natural de JS = concatenación) ---
const sumaTodas = nombre + apellido + edad + anioNac;
alert(`Suma de todas las variables (JS concatena): ${sumaTodas}`);

// Para ver detalles también en consola:
console.clear();
console.log({ nombre, apellido, edad, anioNac, sumaEdadMasAnio: edad + anioNac, sumaTodas });

