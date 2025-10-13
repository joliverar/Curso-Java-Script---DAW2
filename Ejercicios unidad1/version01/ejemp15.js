// ejemplo15.js
// UD1 - Ejercicio 15: Programa de gestión de personal con MENÚ.
// Requisitos del enunciado (resumen):
// - Entidad trabajador: { codigo, nombre, categoria, contratacion }
//   * codigo: "E01", "E02"... único, autogenerado y NO modificable.
//   * nombre: texto.
//   * categoria: 1, 2 o 3 → bases 1100€, 1400€, 1900€.
//   * contratacion: año (YYYY).
// - Nómina: base(categoría) * (1 + 0.04 * años_antigüedad).
// - Funcionalidades: listar, crear, borrar, modificar, calcular nóminas (+resúmenes), menú, validaciones.
// - Se permiten datos "cacheados" (array en memoria).

'use strict'; // Activa el modo estricto: ayuda a detectar errores (variables no declaradas, etc.).

/* ----------------------
   1) CONSTANTES Y HELPERS
   ---------------------- */

// Tabla de base salarial por categoría (1,2,3)
const BASE_CATEGORIA = { 1: 1100, 2: 1400, 3: 1900 }; // Objeto simple clave→valor

// Helper: convierte texto a entero base 10 (prompt devuelve strings)
const toInt = (v) => Number.parseInt(v, 10); // parsea "2020" → 2020; "abc" → NaN

// Helper: año actual (para calcular antigüedad y validar rangos)
const anioActual = () => new Date().getFullYear(); // p.ej., 2025

// Helper: valida categorías permitidas (1..3)
const categoriaValida = (c) => [1, 2, 3].includes(c); // true si c es 1/2/3

// Helper: valida que el año tenga sentido (>=1970 y <= 9999, y no futuro extremo)
const anioValido = (y) => Number.isInteger(y) && y >= 1970 && y <= 9999; // rango razonable

/* ---------------------------------
   2) ALMACÉN EN MEMORIA (CACHÉ SIMPLE)
   --------------------------------- */

// Array donde guardaremos los trabajadores (datos "cacheados" en memoria)
const trabajadores = []; // Comienza vacío; se puede "sembrar" con seed()

/* ---------------------------------------------------
   3) GENERACIÓN DE CÓDIGOS ÚNICOS: E01, E02, E03, ...
   --------------------------------------------------- */

// Genera un código nuevo buscando el MAYOR existente y sumando 1.
// Así garantizamos UNICIDAD incluso si se borran registros intermedios.
function generarCodigo() {
  // Extrae el número de cada código ("E07" → 7) y obtiene el máximo encontrado
  const maxNum = trabajadores.reduce((max, t) => {
    const num = Number(t.codigo.slice(1)); // "E12" → "12" → 12
    return Number.isFinite(num) ? Math.max(max, num) : max;
  }, 0);
  // El siguiente código es max+1, con 2 dígitos (padStart)
  const siguiente = String(maxNum + 1).padStart(2, '0'); // 1 → "01"
  return 'E' + siguiente; // "E01", "E02", ...
}

/* -----------------------------------
   4) CRUD (CREAR, LEER, ACTUALIZAR, BORRAR)
   ----------------------------------- */

// LISTAR: muestra los trabajadores en console.table
function listarTrabajadores() {
  if (trabajadores.length === 0) {            // Si no hay datos, avisamos
    alert('No hay trabajadores.');
    return;
  }
  console.clear();                             // Limpia la consola para ver mejor
  console.table(trabajadores);                 // Muestra en tabla (cómodo)
  alert('Listado mostrado en la consola.');   // Mensaje guía para el usuario
}

// CREAR: solicita datos por prompt, valida y añade al array
function crearTrabajador() {
  const nombre = prompt('Nombre del trabajador:'); // Pide nombre
  if (!nombre) return;                              // Canceló o vacío → no hacemos nada

  const cat = toInt(prompt('Categoría (1, 2, 3):', '1') ?? '1'); // Pide categoría con valor por defecto
  if (!categoriaValida(cat)) {                      // Valida categoría
    alert('Categoría inválida. Debe ser 1, 2 o 3.');
    return;
  }

  const anio = toInt(prompt('Año de contratación (YYYY):', String(anioActual())) ?? String(anioActual())); // Pide año
  if (!anioValido(anio)) {                          // Valida año
    alert('Año inválido. Usa un entero tipo 2018.');
    return;
  }

  const codigo = generarCodigo();                   // Código único y autogenerado
  // Insertamos el nuevo objeto trabajador en el array "cache"
  trabajadores.push({ codigo, nombre, categoria: cat, contratacion: anio });
  alert(`Trabajador creado: ${codigo}`);            // Confirmación
}

// Busca el índice (posición en el array) por su código (E01, E02, ...)
function indicePorCodigo(cod) {
  return trabajadores.findIndex(t => t.codigo === cod); // -1 si no existe
}

// BORRAR: pide el código, confirma y elimina del array
function borrarTrabajador() {
  const cod = prompt('Código a borrar (E01, E02, ...):'); // Pide el código a borrar
  if (!cod) return;                                       // Canceló → salir
  const idx = indicePorCodigo(cod);                       // Busca en el array
  if (idx === -1) {                                       // No encontrado
    alert('No existe un trabajador con ese código.');
    return;
  }
  // Confirmación explícita antes de borrar
  if (!confirm(`¿Confirmas borrar el trabajador ${cod}?`)) return;
  trabajadores.splice(idx, 1);                            // Elimina 1 elemento en posición idx
  alert('Trabajador borrado.');                           // Confirmación
}

// MODIFICAR: NO permite cambiar el código, solo nombre/categoría/año
function modificarTrabajador() {
  const cod = prompt('Código a modificar (E01, E02, ...):'); // Pide el código a editar
  if (!cod) return;                                           // Canceló
  const idx = indicePorCodigo(cod);                           // Busca el índice
  if (idx === -1) {                                           // No existe
    alert('No existe un trabajador con ese código.');
    return;
  }

  const actual = trabajadores[idx];                           // Objeto actual para mostrar valores por defecto

  // Pide NUEVOS valores proponiendo los actuales como "default" en el prompt
  const nuevoNombre = prompt('Nombre:', actual.nombre) ?? actual.nombre;
  const nuevaCat    = toInt(prompt('Categoría (1,2,3):', String(actual.categoria)) ?? String(actual.categoria));
  const nuevoAnio   = toInt(prompt('Año contratación (YYYY):', String(actual.contratacion)) ?? String(actual.contratacion));

  // Validaciones habituales
  if (!categoriaValida(nuevaCat)) {
    alert('Categoría inválida (1, 2 o 3).');
    return;
  }
  if (!anioValido(nuevoAnio)) {
    alert('Año inválido.');
    return;
  }

  // Sobrescribe el registro manteniendo el código intacto (NO modificable)
  trabajadores[idx] = {
    ...actual,                 // Copia resto de propiedades (incluye "codigo")
    nombre: nuevoNombre,       // Actualiza nombre
    categoria: nuevaCat,       // Actualiza categoría
    contratacion: nuevoAnio,   // Actualiza año de contratación
  };

  alert('Trabajador modificado.'); // Confirmación
}

/* -------------------------------------
   5) NÓMINAS: CÁLCULOS Y RESÚMENES
   ------------------------------------- */

// Calcula nóminas, ordena por categoría y muestra resúmenes por categoría y total
function calcularNominas() {
  if (trabajadores.length === 0) {                 // Sin datos → nada que calcular
    alert('No hay trabajadores.');
    return;
  }

  const ahora = anioActual();                      // Año actual para antigüedad

  // "lista" incluye datos derivados: años de antigüedad, base y total de nómina
  const lista = trabajadores
    .map(t => {
      const base = BASE_CATEGORIA[t.categoria];          // Base según categoría
      const anios = Math.max(0, ahora - t.contratacion); // Antigüedad en años (no negativa)
      const bruto = base * (1 + 0.04 * anios);           // Fórmula 4% por año
      const importe = Number(bruto.toFixed(2));          // Redondeo a 2 decimales → number
      return { ...t, base, anios, importe };             // Devolvemos objeto extendido
    })
    .sort((a, b) =>                                   // Ordenar por categoría y luego por código
      a.categoria - b.categoria || a.codigo.localeCompare(b.codigo)
    );

  // Resumen por categoría (acumula importes por cat1, cat2, cat3)
  const resumen = {};                                   // Objeto acumulador
  for (const it of lista) {                             // Recorremos cada nómina
    const key = 'cat' + it.categoria;                   // "cat1", "cat2", "cat3"
    resumen[key] = (resumen[key] ?? 0) + it.importe;    // Suma el importe en su categoría
  }

  // Total global de todas las nóminas
  const total = Object.values(resumen).reduce((s, n) => s + n, 0); // Suma de todas las categorías

  // Salida en consola con buen formato
  console.clear();                                      // Limpia consola
  console.table(lista);                                 // Tabla detallada por trabajador
  // Imprime el resumen por categoría, redondeando a 2 decimales de forma estética
  console.log('Resumen por categoría (€):',
    Object.fromEntries(
      Object.entries(resumen).map(([k, v]) => [k, Number(v.toFixed(2))])
    )
  );
  console.log('TOTAL NÓMINAS (€):', Number(total.toFixed(2))); // Total con 2 decimales

  alert('Nóminas calculadas. Revisa la consola para detalles.'); // Mensaje guía
}

/* ------------------------
   6) SEED (DATOS DE EJEMPLO)
   ------------------------ */

// Carga 3 trabajadores de muestra si aún no hay datos
function seed() {
  if (trabajadores.length > 0) {                 // Evita duplicar la siembra
    alert('Ya hay datos cargados.');
    return;
  }
  // Insertamos tres registros con códigos consecutivos
  trabajadores.push(
    { codigo: 'E01', nombre: 'Ana',   categoria: 1, contratacion: 2019 },
    { codigo: 'E02', nombre: 'Luis',  categoria: 2, contratacion: 2015 },
    { codigo: 'E03', nombre: 'Marta', categoria: 3, contratacion: 2021 },
  );
  alert('Datos de ejemplo cargados (E01..E03).');
}

/* --------------
   7) MENÚ (BUCLE)
   -------------- */

// Menú de interacción básico con prompt/alert/confirm
(function menu() {
  // Texto que verá el usuario al elegir opciones
  const TEXTO_MENU = `GESTIÓN DE PERSONAL
1) Seed (cargar 3 trabajadores)
2) Listar trabajadores
3) Crear trabajador
4) Borrar trabajador
5) Modificar trabajador
6) Calcular nóminas
0) Salir`;

  // Bucle "infinito" que se rompe con 0 o Cancelar
  while (true) {
    const op = prompt(TEXTO_MENU, '1'); // Pide opción; propone "1" por defecto
    if (op === null || op === '0') break; // Cancelar o "0" → salir del menú

    // Despacha la opción elegida
    if (op === '1')       seed();
    else if (op === '2')  listarTrabajadores();
    else if (op === '3')  crearTrabajador();
    else if (op === '4')  borrarTrabajador();
    else if (op === '5')  modificarTrabajador();
    else if (op === '6')  calcularNominas();
    else                  alert('Opción inválida. Elige 0..6.');
  }
})(); // IIFE del menú: se ejecuta al cargar el archivo (si prefieres, puedes llamar a menu() manualmente)

