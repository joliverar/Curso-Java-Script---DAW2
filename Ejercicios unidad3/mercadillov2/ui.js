"use strict"

window.addEventListener("load", () => {
    const id = (x) => document.getElementById(x);
    const $resultados = id("resultados")

    const COLS_INVENTARIO = [ // Arreglo de especificaciones de columnas
        { key: "nombre",    header: "Nombre" }, // Muestra product.nombre
        { key: "categoria", header: "Categoría" }, // Muestra product.categoria
        { key: "cantidad",  header: "Cantidad",   num: true }, // Numérica, alineada a la derecha
        { key: "precio",    header: "Precio (€)", num: true, format: v => Number(v).toFixed(2) }, // 2 decimales
        { key: "total",     header: "Total (€)",  num: true, format: v => Number(v).toFixed(2) }  // 2 decimales
    ]; // Fin definición de columnas


    const renderTabla = (coleccion, columnas) => { // Abre función de renderizado
    if (!Array.isArray(coleccion) || coleccion.length === 0) { // Si no hay datos o no es array
      $resultados.innerHTML = `<p class="hint">(Sin datos para mostrar)</p>`; // Mensaje vacío
      return; // Salimos porque no hay nada que pintar
    } // Fin if sin datos

    // Construye la cabecera de la tabla usando los headers de las columnas
    const thead = `<thead><tr>${columnas.map(c => `<th>${c.header}</th>`).join("")}</tr></thead>`; // HTML de <thead>

    // Construye el cuerpo iterando cada fila y cada columna, aplicando formato si procede
    const tbody = `<tbody>${coleccion.map(row => { // Abre filas
      return `<tr>${columnas.map(c => { // Itera columnas para una fila
        const val = row[c.key]; // Extrae el valor de la propiedad según key
        const cls = c.num ? " class=\"num\"" : ""; // Clase opcional para alinear números
        return `<td${cls}>${c.format ? c.format(val) : val}</td>`; // Celda formateada o cruda
      }).join("")}</tr>`; // Cierra la fila
    }).join("")}</tbody>`; // Cierra el cuerpo de la tabla

    // Inserta la tabla completa en el contenedor de resultados
    $resultados.innerHTML = `<table>${thead}${tbody}</table>`; // Pinta la tabla
  }; // Fin renderTabla


    const $agregarNombre    = id("idAgregarNombre");    // Input: nombre del producto
  const $agregarCantidad  = id("idAgregarCantidad");  // Input: cantidad (entero/real)
  const $agregarPrecio    = id("idAgregarPrecio");    // Input: precio unitario
  const $agregarCategoria = id("idAgregarCategoria"); // Input: categoría del producto
  const $botonAgregar     = id("id_boton");           // Botón principal para agregar (ID solicitado)

  $botonAgregar.addEventListener("click", () => { // Listener del botón Agregar
    const datos = window.$negocio.agregarProducto( // Invoca a la capa de negocio
      $agregarNombre.value,     // Nombre ingresado por el usuario
      $agregarCantidad.value,   // Cantidad solicitada
      $agregarPrecio.value,     // Precio ingresado
      $agregarCategoria.value   // Categoría ingresada
    ); // Fin llamada agregarProducto
    if (datos) renderTabla(datos, COLS_INVENTARIO); // Si retorna datos, renderizamos el inventario
  }); // Fin listener Agregar
});