// ejemplo16.js
// UD1 - Ejercicio 16: Gestión de personal IDENTICA al ejercicio 15,
// pero TODO el código queda encapsulado dentro de una IIFE (Immediately Invoked Function Expression).
// Beneficio: no "ensuciamos" el ámbito global con variables/funciones (mejor aislamiento).

'use strict'; // Modo estricto: ayuda a detectar errores comunes.

/* =========================================================================
   IIFE: se define y se EJECUTA inmediatamente. Todo lo que declaremos dentro
   (const, let, function) será PRIVADO al interior de esta función.
   ========================================================================= */
(function () {

  /* ----------------------
     1) CONSTANTES Y HELPERS
     ---------------------- */

  // Tabla de base salarial por categoría.
  const BASE_CATEGORIA = { 1: 1100, 2: 1400, 3: 1900 }; // Sólo visible dentro de la IIFE.

  // Convierte texto a entero base 10 (lo que devuelve prompt es string).
  const toInt = (v) => Number.parseInt(v, 10);

  // Año actual (para calcular antigüedad y predeterminados).
  const anioActual = () => new Date().getFullYear();

  // Validaciones “pequeñas” para reutilizar.
  const categoriaValida = (c) => [1, 2, 3].includes(c);
  const anioValido = (y) => Number.isInteger(y) && y >= 1970 && y <= 9999;

  /* ---------------------------------
     2) ALMACÉN EN MEMORIA (PRIVADO)
     --------------------------------- */

  // Array privado: fuera de la IIFE no es accesible.
  const trabajadores = [];

  /* ---------------------------------------------------
     3) GENERAR CÓDIGOS ÚNICOS (E01, E02, ... robusto)
     --------------------------------------------------- */

  // Busca el máximo número existente y suma 1 → evita colisiones tras borrados.
  function generarCodigo() {
    const maxNum = trabajadores.reduce((max, t) => {
      const num = Number(t.codigo.slice(1)); // "E07" → 7
      return Number.isFinite(num) ? Math.max(max, num) : max;
    }, 0);
    return 'E' + String(maxNum + 1).padStart(2, '0'); // 1 → "E01"
  }

  /* -----------------------------------
     4) CRUD: LISTAR / CREAR / BORRAR / MODIFICAR
     ----------------------------------- */

  function listarTrabajadores() {
    if (trabajadores.length === 0) {
      alert('No hay trabajadores.');
      return;
    }
    console.clear();
    console.table(trabajadores);             // Tabla amigable en consola.
    alert('Listado mostrado en la consola.');
  }

  function crearTrabajador() {
    const nombre = prompt('Nombre del trabajador:');
    if (!nombre) return;                     // Canceló o vacío.

    const cat = toInt(prompt('Categoría (1,2,3):', '1') ?? '1');
    if (!categoriaValida(cat)) {
      alert('Categoría inválida (1, 2 o 3).');
      return;
    }

    const anio = toInt(prompt('Año de contratación (YYYY):', String(anioActual())) ?? String(anioActual()));
    if (!anioValido(anio)) {
      alert('Año inválido (usa un entero tipo 2018).');
      return;
    }

    const codigo = generarCodigo();
    trabajadores.push({ codigo, nombre, categoria: cat, contratacion: anio });
    alert(`Trabajador creado: ${codigo}`);
  }

  // Devuelve índice en el array (o -1 si no existe).
  const indicePorCodigo = (cod) => trabajadores.findIndex(t => t.codigo === cod);

  function borrarTrabajador() {
    const cod = prompt('Código a borrar (E01, E02, ...):');
    if (!cod) return;
    const idx = indicePorCodigo(cod);
    if (idx === -1) {
      alert('No existe un trabajador con ese código.');
      return;
    }
    if (!confirm(`¿Confirmas borrar el trabajador ${cod}?`)) return;
    trabajadores.splice(idx, 1);
    alert('Trabajador borrado.');
  }

  function modificarTrabajador() {
    const cod = prompt('Código a modificar (E01, E02, ...):');
    if (!cod) return;
    const idx = indicePorCodigo(cod);
    if (idx === -1) {
      alert('No existe un trabajador con ese código.');
      return;
    }

    const actual = trabajadores[idx]; // Registro existente para proponer defaults.

    // Nuevos valores con defaults actuales.
    const nuevoNombre = prompt('Nombre:', actual.nombre) ?? actual.nombre;
    const nuevaCat    = toInt(prompt('Categoría (1,2,3):', String(actual.categoria)) ?? String(actual.categoria));
    const nuevoAnio   = toInt(prompt('Año contratación (YYYY):', String(actual.contratacion)) ?? String(actual.contratacion));

    // Validaciones.
    if (!categoriaValida(nuevaCat)) { alert('Categoría inválida.'); return; }
    if (!anioValido(nuevoAnio))      { alert('Año inválido.');      return; }

    // Guardar cambios (código NO se toca).
    trabajadores[idx] = {
      ...actual,
      nombre: nuevoNombre,
      categoria: nuevaCat,
      contratacion: nuevoAnio,
    };

    alert('Trabajador modificado.');
  }

  /* -------------------------------------
     5) NÓMINAS: CÁLCULO + RESÚMENES
     ------------------------------------- */

  function calcularNominas() {
    if (trabajadores.length === 0) {
      alert('No hay trabajadores.');
      return;
    }

    const ahora = anioActual();

    // Enriquecer cada registro con: base, años de antigüedad, importe calculado.
    const lista = trabajadores
      .map(t => {
        const base  = BASE_CATEGORIA[t.categoria];
        const anios = Math.max(0, ahora - t.contratacion);
        const bruto = base * (1 + 0.04 * anios);
        const importe = Number(bruto.toFixed(2)); // 2 decimales
        return { ...t, base, anios, importe };
      })
      .sort((a, b) => a.categoria - b.categoria || a.codigo.localeCompare(b.codigo)); // orden: cat, código

    // Acumulados por categoría (cat1, cat2, cat3) y total.
    const resumen = {};
    for (const it of lista) {
      const k = 'cat' + it.categoria;
      resumen[k] = (resumen[k] ?? 0) + it.importe;
    }
    const total = Object.values(resumen).reduce((s, n) => s + n, 0);

    // Salida
    console.clear();
    console.table(lista);
    console.log('Resumen por categoría (€):',
      Object.fromEntries(
        Object.entries(resumen).map(([k, v]) => [k, Number(v.toFixed(2))])
      )
    );
    console.log('TOTAL NÓMINAS (€):', Number(total.toFixed(2)));
    alert('Nóminas calculadas. Revisa la consola.');
  }

  /* ------------------------
     6) SEED (DATOS DE EJEMPLO)
     ------------------------ */

  function seed() {
    if (trabajadores.length) { alert('Ya hay datos.'); return; }
    trabajadores.push(
      { codigo: 'E01', nombre: 'Ana',   categoria: 1, contratacion: 2019 },
      { codigo: 'E02', nombre: 'Luis',  categoria: 2, contratacion: 2015 },
      { codigo: 'E03', nombre: 'Marta', categoria: 3, contratacion: 2021 },
    );
    alert('Datos de ejemplo cargados (E01..E03).');
  }

  /* --------------
     7) MENÚ (IIFE)
     -------------- */

  // Menú interactivo también vive dentro de la IIFE.
  (function menu() {
    const TEXTO = `GESTIÓN DE PERSONAL (IIFE)
1) Seed (cargar 3 trabajadores)
2) Listar
3) Crear
4) Borrar
5) Modificar
6) Calcular nóminas
0) Salir`;

    // Bucle hasta cancelar o elegir 0.
    while (true) {
      const op = prompt(TEXTO, '1');
      if (op === null || op === '0') break;

      if      (op === '1') seed();
      else if (op === '2') listarTrabajadores();
      else if (op === '3') crearTrabajador();
      else if (op === '4') borrarTrabajador();
      else if (op === '5') modificarTrabajador();
      else if (op === '6') calcularNominas();
      else                 alert('Opción inválida (0..6).');
    }
  })(); // ← esta IIFE interna ejecuta el MENÚ inmediatamente

})(); // ← FIN de la IIFE principal: nada “escapa” al ámbito global
