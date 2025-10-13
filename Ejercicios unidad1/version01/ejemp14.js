'use strict'; // Activa el modo estricto para evitar errores silenciosos y malas prácticas

/********************************************************************
 * EJERCICIO 14 — Gestión académica (comentado línea a línea)
 ********************************************************************/

const MODULOS = ['DWEC', 'DIW', 'DWES', 'DAW']; // Lista oficial de módulos que se esperan por alumno

// ---------- Datos de ejemplo (≥ 3 alumnos) ----------
const alumnos = [ // Array principal que contiene objetos alumno
  { // Alumno 0
    nombre: 'Ana García', // Nombre del alumno
    asignaturas: [ // Array de asignaturas de este alumno
      { modulo: 'DWEC', nota: 7.5 }, // Nota en DWEC
      { modulo: 'DIW',  nota: 8.0 }, // Nota en DIW
      { modulo: 'DWES', nota: 6.2 }, // Nota en DWES
      { modulo: 'DAW',  nota: 9.1 }, // Nota en DAW
    ], // Fin asignaturas Ana
  }, // Fin alumno Ana
  { // Alumno 1
    nombre: 'Luis Fernández', // Nombre del alumno
    asignaturas: [ // Asignaturas de Luis
      { modulo: 'DWEC', nota: 4.2 }, // Pendiente (<5)
      { modulo: 'DIW',  nota: 5.5 }, // Aprobado
      { modulo: 'DWES', nota: 3.9 }, // Pendiente (<5)
      { modulo: 'DAW',  nota: 6.0 }, // Aprobado
    ], // Fin asignaturas Luis
  }, // Fin alumno Luis
  { // Alumno 2
    nombre: 'María López', // Nombre del alumno
    asignaturas: [ // Asignaturas de María
      { modulo: 'DWEC', nota: 5.0 }, // Aprobado
      { modulo: 'DIW',  nota: 7.0 }, // Aprobado
      { modulo: 'DWES', nota: 5.5 }, // Aprobado
      { modulo: 'DAW',  nota: 5.0 }, // Aprobado
    ], // Fin asignaturas María
  }, // Fin alumno María
  { // Alumno 3 (ejemplo con módulo ausente)
    nombre: 'Jorge Ruiz', // Nombre del alumno
    asignaturas: [ // Asignaturas de Jorge
      { modulo: 'DWEC', nota: 7.0 }, // Aprobado
      { modulo: 'DIW',  nota: 6.0 }, // Aprobado
      // Falta 'DWES' deliberadamente para mostrar pendiente por ausencia // Ausencia DWES
      { modulo: 'DAW',  nota: 6.0 }, // Aprobado
    ], // Fin asignaturas Jorge
  }, // Fin alumno Jorge
]; // Fin array alumnos

// ---------- Utilidades ----------
function mapaNotas(asignaturas) { // Convierte array de asignaturas en un Map {modulo -> nota}
  const map = new Map(); // Crea un Map vacío
  for (const { modulo, nota } of asignaturas) { // Recorre cada asignatura
    map.set(modulo, nota); // Guarda la nota bajo la clave del módulo
  } // Fin for
  return map; // Devuelve el mapa construido
} // Fin mapaNotas

function pendientesDe(alumno) { // Devuelve array de módulos pendientes o ausentes
  const notas = mapaNotas(alumno.asignaturas); // Mapa de notas del alumno
  const pendientes = []; // Acumulará textos de pendientes

  for (const m of MODULOS) { // Recorre los módulos oficiales
    if (!notas.has(m)) { // Si falta ese módulo en el alumno
      pendientes.push(`${m}(sin nota)`); // Lo consideramos pendiente por ausencia
    } else if (notas.get(m) < 5) { // Si tiene nota pero es < 5
      pendientes.push(m); // Lo añadimos como pendiente
    } // Fin if/else
  } // Fin for

  return pendientes; // Devuelve la lista de pendientes
} // Fin pendientesDe

function mediaDe(alumno) { // Calcula la media de las notas disponibles (de los módulos oficiales)
  const notas = mapaNotas(alumno.asignaturas); // Convierte a mapa para acceder rápido
  let suma = 0; // Acumulará la suma de notas
  let cuenta = 0; // Contará cuántas notas válidas se usan

  for (const m of MODULOS) { // Recorre módulos oficiales
    if (notas.has(m)) { // Si el alumno tiene ese módulo con nota
      suma += Number(notas.get(m)); // Suma la nota
      cuenta++; // Incrementa el contador de notas
    } // Fin if
  } // Fin for

  return cuenta > 0 // Si hay al menos una nota
    ? Math.round((suma / cuenta) * 100) / 100 // Calcula media y redondea a 2 decimales
    : 0; // Si no hay notas, media 0
} // Fin mediaDe

// ---------- Núcleo: evaluar (añadir propiedades) ----------
function evaluarAlumnos(arrAlumnos) { // Añade `promociona` y `media` a cada alumno
  arrAlumnos.forEach(alumno => { // Recorre el array recibido
    const pendientes = pendientesDe(alumno); // Calcula pendientes del alumno
    const tieneTodos = MODULOS.every(m => // Verifica si tiene los 4 módulos oficiales
      alumno.asignaturas.some(a => a.modulo === m) // true si existe al menos una asignatura con ese módulo
    ); // Fin every

    alumno.promociona = tieneTodos && pendientes.length === 0; // Promociona si tiene todos y sin pendientes
    alumno.media = mediaDe(alumno); // Guarda la media calculada
  }); // Fin forEach

  return arrAlumnos; // Devuelve el mismo array (mutado) para posible encadenamiento
} // Fin evaluarAlumnos

// ---------- Salidas pedidas ----------
function imprimirPromocionan(arrAlumnos) { // Imprime "Índice-Nombre-Media" de quienes promocionan
  const filtrados = arrAlumnos // Prepara colección con índice
    .map((a, i) => ({ i, ...a })) // Inyecta el índice original junto con las propiedades del alumno
    .filter(a => a.promociona); // Filtra solo los que promocionan

  if (filtrados.length === 0) { // Si no hay ninguno
    console.log('No hay alumnos que promocionen.'); // Mensaje informativo
    return; // Sale de la función
  } // Fin if

  console.table( // Muestra tabla legible en consola
    filtrados.map(a => ({ // Mapea a objeto con columnas deseadas
      Índice: a.i, // Índice del alumno
      Nombre: a.nombre, // Nombre del alumno
      Media: a.media, // Media del alumno
    })) // Fin map
  ); // Fin console.table

  console.log('--- Formato requerido (promocionan) ---'); // Cabecera del bloque de salida formateada
  for (const a of filtrados) { // Recorre los que promocionan
    console.log(`${a.i}-${a.nombre}-${a.media}`); // Imprime en formato "Índice-Nombre-Media"
  } // Fin for
} // Fin imprimirPromocionan

function imprimirNoPromocionan(arrAlumnos) { // Imprime "Índice-Nombre-Pendientes:[...]"
  const anotados = arrAlumnos.map((a, i) => ({ // Añade índice y calcula pendientes
    i, // Índice del alumno
    nombre: a.nombre, // Nombre
    pendientes: pendientesDe(a), // Lista de pendientes calculada al vuelo
    promociona: a.promociona, // Flag para filtrar
  })); // Fin map

  const filtrados = anotados.filter(a => !a.promociona); // Selecciona los que NO promocionan

  if (filtrados.length === 0) { // Si todos promocionan
    console.log('Todos los alumnos promocionan.'); // Mensaje informativo
    return; // Sale de la función
  } // Fin if

  console.table( // Tabla legible de no promocionan
    filtrados.map(a => ({ // Cada fila con columnas útiles
      Índice: a.i, // Índice
      Nombre: a.nombre, // Nombre
      Pendientes: a.pendientes.join(', '), // Pendientes unidos por coma
    })) // Fin map
  ); // Fin console.table

  console.log('--- Formato requerido (NO promocionan) ---'); // Cabecera bloque formateado
  for (const a of filtrados) { // Recorre los no promocionan
    console.log(`${a.i}-${a.nombre}-Pendientes:[${a.pendientes.join(', ')}]`); // Imprime en formato solicitado
  } // Fin for
} // Fin imprimirNoPromocionan

// ---------- Demo / Código auxiliar ----------
evaluarAlumnos(alumnos); // Calcula y añade `promociona` y `media` a todos

console.table( // Vista general de todos con notas por módulo, media y promoción
  alumnos.map((a, i) => ({ // Mapea cada alumno a un objeto "fila"
    Índice: i, // Índice del alumno
    Nombre: a.nombre, // Nombre del alumno
    DWEC: a.asignaturas.find(s => s.modulo === 'DWEC')?.nota ?? '—', // Nota DWEC o '—' si no existe
    DIW:  a.asignaturas.find(s => s.modulo === 'DIW')?.nota ?? '—',  // Nota DIW o '—'
    DWES: a.asignaturas.find(s => s.modulo === 'DWES')?.nota ?? '—', // Nota DWES o '—'
    DAW:  a.asignaturas.find(s => s.modulo === 'DAW')?.nota ?? '—',  // Nota DAW o '—'
    Media: a.media, // Media calculada
    Promociona: a.promociona ? 'Sí' : 'No', // Texto legible de promoción
  })) // Fin map
); // Fin console.table

imprimirPromocionan(alumnos); // Muestra listado en formato requerido de los que promocionan
imprimirNoPromocionan(alumnos); // Muestra listado en formato requerido de los que no promocionan

if (typeof alert === 'function') { // Si estamos en navegador y existe alert
  alert('Ejercicio 14 (comentado) listo. Abre la consola para ver tablas y listados.'); // Mensaje emergente de ayuda
} // Fin if

