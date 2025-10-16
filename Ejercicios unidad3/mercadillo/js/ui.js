"use strict"; // Modo estricto para evitar errores silenciosos en la capa de presentación

// Registramos el manejador cuando el documento haya cargado (árbol DOM listo)
window.addEventListener("load", () => { // Inicio del callback del evento load
  // Helper para acortar document.getElementById
  const id = (x) => document.getElementById(x); // Devuelve el elemento con el ID dado

  // Referencia a la zona común de resultados (donde se pintan tablas y mensajes)
  const $resultados = id("idResultados"); // Contenedor de salida

  // Función reutilizable para renderizar tablas a partir de un array de objetos
  // "coleccion": Array de filas (objetos)
  // "columnas": Definición [{ key, header, num?, format? }]
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

  // =====================
  // Formulario: Agregar
  // =====================
  const $agregarNombre    = id("idAgregarNombre");    // Input: nombre del producto
  const $agregarCantidad  = id("idAgregarCantidad");  // Input: cantidad (entero/real)
  const $agregarPrecio    = id("idAgregarPrecio");    // Input: precio unitario
  const $agregarCategoria = id("idAgregarCategoria"); // Input: categoría del producto
  const $botonAgregar     = id("id_boton");           // Botón principal para agregar (ID solicitado)
  const $btnDemo          = id("btnDemo");            // Botón para cargar datos de ejemplo

  // Al hacer clic en Agregar, leemos los valores y llamamos al módulo de negocio
  $botonAgregar.addEventListener("click", () => { // Listener del botón Agregar
    const datos = window.$negocio.agregarProducto( // Invoca a la capa de negocio
      $agregarNombre.value,     // Nombre ingresado por el usuario
      $agregarCantidad.value,   // Cantidad solicitada
      $agregarPrecio.value,     // Precio ingresado
      $agregarCategoria.value   // Categoría ingresada
    ); // Fin llamada agregarProducto
    if (datos) renderTabla(datos, COLS_INVENTARIO); // Si retorna datos, renderizamos el inventario
  }); // Fin listener Agregar

  // Carga un conjunto de productos de muestra y luego pinta el inventario completo
  $btnDemo.addEventListener("click", () => { // Listener del botón Demo
    const demo = [ // Arreglo de productos de ejemplo
      ["Manzanas Golden", 12, 1.5, "Fruta"], // [nombre, cantidad, precio, categoría]
      ["Leche Entera 1L", 24, 0.95, "Lácteos"],
      ["Pan Barra", 30, 0.75, "Panadería"],
      ["Huevos XL (12u)", 10, 2.80, "Huevos"]
    ]; // Fin arreglo demo
    demo.forEach(([n,c,p,cat]) => { // Recorremos el arreglo
      window.$negocio.agregarProducto(n,c,p,cat); // Agregamos cada producto al inventario
    }); // Fin forEach demo
    const datos = window.$negocio.imprimirInventario(); // Obtenemos el listado completo
    renderTabla(datos, COLS_INVENTARIO); // Pintamos el inventario
  }); // Fin listener Demo

  // =====================
  // Formulario: Buscar
  // =====================
  const $buscarNombre = id("idBuscar"); // Input de texto para buscar por nombre (ID solicitado)
  const $btnBuscar    = id("btnBuscar"); // Botón Buscar

  // Al hacer clic en Buscar, obtenemos el producto (si existe) y lo pintamos
  $btnBuscar.addEventListener("click", () => { // Listener del botón Buscar
    const datos = window.$negocio.buscarProducto($buscarNombre.value); // Invocamos negocio
    if (datos) renderTabla(datos, COLS_INVENTARIO); // Pintamos la fila encontrada
  }); // Fin listener Buscar

  // =====================
  // Formulario: Eliminar
  // =====================
  const $eliminarNombre = id("idEliminarNombre"); // Input con el nombre a eliminar
  const $btnEliminar    = id("btnEliminar");      // Botón Eliminar

  // Al hacer clic en Eliminar, confirmamos y, si acepta, eliminamos del inventario
  $btnEliminar.addEventListener("click", () => { // Listener del botón Eliminar
    const nombre = ($eliminarNombre.value || "").trim(); // Leemos y saneamos el nombre
    if (!nombre) { alert("Indica un nombre para eliminar."); return; } // Validación de campo vacío
    const ok = confirm(`¿Seguro que deseas eliminar "${nombre}"?`); // Confirmación de seguridad
    if (!ok) return; // Si cancela, no hacemos nada
    const datos = window.$negocio.eliminarProducto(nombre); // Borramos en negocio
    if (datos) renderTabla(datos, COLS_INVENTARIO); // Renderizamos lista resultante
  }); // Fin listener Eliminar

  // =====================
  // Formulario: Actualizar (stock ±)
  // =====================
  const $actualizarNombre   = id("idActualizarNombre");   // Input: nombre del producto
  const $actualizarCantidad = id("idActualizarCantidad"); // Input: delta (positivo/negativo)
  const $btnActualizar      = id("btnActualizar");        // Botón Aplicar cambios

  // Al hacer clic en Aplicar, enviamos el delta para actualizar el stock
  $btnActualizar.addEventListener("click", () => { // Listener del botón Actualizar
    const datos = window.$negocio.actualizarInventario( // Llamada a negocio
      $actualizarNombre.value,   // Nombre del producto objetivo
      $actualizarCantidad.value  // Delta de cantidad (puede ser negativo)
    ); // Fin llamada actualizarInventario
    if (datos) renderTabla(datos, COLS_INVENTARIO); // Pintamos inventario actualizado
  }); // Fin listener Actualizar

  // =====================
  // Listados: filtrar / ordenar / imprimir
  // =====================
  const $filtroCategoria = id("id_filtro"); // Input para escribir la categoría a filtrar (ID solicitado)

  // Filtrar por categoría: muestra nombre, cantidad y precio según enunciado
  id("btnFiltrar").addEventListener("click", () => { // Listener del botón Filtrar
    const datos = window.$negocio.filtrarProductosPorCategoria($filtroCategoria.value); // Filtra
    renderTabla(datos, [ // Definición de columnas para esta vista
      { key: "nombre",   header: "Nombre" }, // Columna nombre
      { key: "cantidad", header: "Cantidad",    num: true }, // Columna cantidad (numérica)
      { key: "precio",   header: "Precio (€)",  num: true, format: v => v.toFixed ? v.toFixed(2) : v } // Precio con 2 decimales
    ]); // Fin render filtrado
  }); // Fin listener Filtrar

  // Ordenar por precio (ascendente) y pintar inventario completo
  id("btnOrdenarPrecio").addEventListener("click", () => { // Listener del botón Ordenar
    const datos = window.$negocio.ordenarProductosPorPrecio(); // Obtiene lista ordenada
    renderTabla(datos, COLS_INVENTARIO); // Render estándar del inventario completo
  }); // Fin listener Ordenar

  // Imprimir inventario completo tal cual está
  id("btnImprimir").addEventListener("click", () => { // Listener del botón Imprimir
    const datos = window.$negocio.imprimirInventario(); // Obtiene lista completa
    renderTabla(datos, COLS_INVENTARIO); // Pinta inventario completo
  }); // Fin listener Imprimir

  // Definición reutilizable de columnas para la vista estándar del inventario
  const COLS_INVENTARIO = [ // Arreglo de especificaciones de columnas
    { key: "nombre",    header: "Nombre" }, // Muestra product.nombre
    { key: "categoria", header: "Categoría" }, // Muestra product.categoria
    { key: "cantidad",  header: "Cantidad",   num: true }, // Numérica, alineada a la derecha
    { key: "precio",    header: "Precio (€)", num: true, format: v => Number(v).toFixed(2) }, // 2 decimales
    { key: "total",     header: "Total (€)",  num: true, format: v => Number(v).toFixed(2) }  // 2 decimales
  ]; // Fin definición de columnas
}); // Fin del callback del evento load
