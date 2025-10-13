// ejemplo16.js
// UD1 - Ejercicio 16: MISMA aplicación de gestión de personal (ejemplo15),
// pero ENVUELTA en una FUNCIÓN AUTOINVOCADA (IIFE) para encapsular el ámbito.
// Esto evita contaminar variables globales.
//
// Estructura: exactamente igual a ejemplo15, pero todo va dentro de (function(){ ... })().

'use strict';

(function () {
  const toInt = v => Number.parseInt(v, 10);
  const isInt = Number.isInteger;
  const trabajadores = [];
  const baseCategoria = { 1: 1100, 2: 1400, 3: 1900 };

  const generarCodigo = () => 'E' + String(trabajadores.length + 1).padStart(2, '0');

  const listar = () => {
    if (!trabajadores.length) return alert('No hay trabajadores.');
    console.clear();
    console.table(trabajadores);
    alert('Listado mostrado en consola.');
  };

  const crear = () => {
    const nombre = prompt('Nombre:');
    if (!nombre) return;
    const c = toInt(prompt('Categoría (1,2,3):', '1') ?? '1');
    if (![1, 2, 3].includes(c)) return alert('Categoría inválida');
    const anio = toInt(prompt('Año de contratación (YYYY):', String(new Date().getFullYear())) ?? '2025');
    if (!isInt(anio) || anio < 1970 || anio > 9999) return alert('Año inválido');

    const codigo = generarCodigo();
    trabajadores.push({ codigo, nombre, categoria: c, contratacion: anio });
    alert(`Creado ${codigo}`);
  };

  const buscarIdxPorCodigo = cod => trabajadores.findIndex(t => t.codigo === cod);

  const borrar = () => {
    const cod = prompt('Código a borrar (E01...):');
    if (!cod) return;
    const i = buscarIdxPorCodigo(cod);
    if (i === -1) return alert('No existe');
    if (!confirm(`¿Confirmas borrar ${cod}?`)) return;
    trabajadores.splice(i, 1);
    alert('Borrado.');
  };

  const modificar = () => {
    const cod = prompt('Código a modificar:');
    if (!cod) return;
    const i = buscarIdxPorCodigo(cod);
    if (i === -1) return alert('No existe');
    const t = trabajadores[i];

    const nombre = prompt('Nombre:', t.nombre) ?? t.nombre;
    const c = toInt(prompt('Categoría (1,2,3):', String(t.categoria)) ?? t.categoria);
    const anio = toInt(prompt('Año contratación:', String(t.contratacion)) ?? t.contratacion);

    if (![1, 2, 3].includes(c)) return alert('Categoría inválida');
    if (!isInt(anio) || anio < 1970 || anio > 9999) return alert('Año inválido');

    trabajadores[i] = { ...t, nombre, categoria: c, contratacion: anio };
    alert('Modificado.');
  };

  const nominas = () => {
    if (!trabajadores.length) return alert('Sin trabajadores.');
    const ahora = new Date().getFullYear();
    const lista = trabajadores.map(t => {
      const base = baseCategoria[t.categoria];
      const anios = Math.max(0, ahora - t.contratacion);
      const importe = base * (1 + 0.04 * anios);
      return { ...t, anios, base, importe: Number(importe.toFixed(2)) };
    }).sort((a, b) => a.categoria - b.categoria || a.codigo.localeCompare(b.codigo));

    const resumen = {};
    for (const it of lista) {
      const k = 'cat' + it.categoria;
      resumen[k] = (resumen[k] ?? 0) + it.importe;
    }
    const total = Object.values(resumen).reduce((s, n) => s + n, 0);

    console.clear();
    console.table(lista);
    console.log('Resumen por categoría (€):', Object.fromEntries(
      Object.entries(resumen).map(([k, v]) => [k, Number(v.toFixed(2))])
    ));
    console.log('TOTAL NÓMINAS (€):', Number(total.toFixed(2)));
    alert('Nóminas calculadas. Detalle en consola.');
  };

  // Menú autoejecutable
  (function menu() {
    const texto = `GESTIÓN DE PERSONAL (IIFE)
1) Seed (cargar 3 trabajadores)
2) Listar
3) Crear
4) Borrar
5) Modificar
6) Calcular nóminas
0) Salir`;
    const seed = () => {
      if (trabajadores.length) return alert('Ya hay datos.');
      trabajadores.push(
        { codigo: 'E01', nombre: 'Ana',  categoria: 1, contratacion: 2019 },
        { codigo: 'E02', nombre: 'Luis', categoria: 2, contratacion: 2015 },
        { codigo: 'E03', nombre: 'Marta',categoria: 3, contratacion: 2021 },
      );
      alert('Datos de ejemplo cargados.');
    };

    while (true) {
      const op = prompt(texto, '1');
      if (op === null || op === '0') break;
      if (op === '1') seed();
      else if (op === '2') listar();
      else if (op === '3') crear();
      else if (op === '4') borrar();
      else if (op === '5') modificar();
      else if (op === '6') nominas();
      else alert('Opción inválida');
    }
  })();
})();
