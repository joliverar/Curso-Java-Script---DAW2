"use strict";

/* ============================================================
   🔹 MÓDULO DE NEGOCIO (IIFE)
   - Aquí vive la lógica (CRUD)
   - inventario es PRIVADO (encapsulación)
============================================================ */
const negocio = (function () {
  // 📦 Diccionario de datos (array asociativo)
  let inventario = {};

  /* ------------------------------------------------------------
       🔄 TRANSFORMACIÓN
       Convierte el objeto → array de objetos
       Flujo:
       objeto → entries → [clave, valor] → map → objeto nuevo
    ------------------------------------------------------------ */
  function inventarioALista() {
    return Object.entries(inventario).map(([nombre, datos]) => ({
      nombre, // clave
      ...datos, // cantidad, precio, categoria
      total: datos.cantidad * datos.precio, // campo calculado
    }));
  }

  /* ------------------------------------------------------------
       ➕ CREATE (Agregar producto)
    ------------------------------------------------------------ */
  function agregarProducto(nombre, cantidad, precio, categoria) {
    // Validación básica
    if (!nombre) {
      console.warn("Nombre obligatorio");
      return;
    }

    // Evitar duplicados
    if (inventario[nombre]) {
      console.warn("El producto ya existe");
      return;
    }

    // Insertar en el objeto
    inventario[nombre] = {
      cantidad: Number(cantidad) || 0,
      precio: Number(precio) || 0,
      categoria: categoria || "General",
    };
  }

  /* ------------------------------------------------------------
       🔍 READ (Buscar producto)
    ------------------------------------------------------------ */
  function buscarProducto(nombre) {
    return inventario[nombre] || null;
  }

  /* ------------------------------------------------------------
       🔄 UPDATE (Actualizar stock)
    ------------------------------------------------------------ */
  function actualizarProducto(nombre, cantidad) {
    if (!inventario[nombre]) {
      console.warn("Producto no existe");
      return;
    }

    inventario[nombre].cantidad += Number(cantidad);

    // Control de negocio
    if (inventario[nombre].cantidad <= 0) {
      inventario[nombre].cantidad = 0;
      console.warn("Stock agotado");
    }
  }

  /* ------------------------------------------------------------
       ❌ DELETE (Eliminar producto)
    ------------------------------------------------------------ */
  function eliminarProducto(nombre) {
    delete inventario[nombre];
  }

  /* ------------------------------------------------------------
       📊 SORT (Ordenar por precio)
    ------------------------------------------------------------ */
  function ordenarPorPrecio() {
    return inventarioALista().sort((a, b) => a.precio - b.precio);
  }

  /* ------------------------------------------------------------
       🔍 FILTER (Filtrar por categoría)
    ------------------------------------------------------------ */
  function filtrarCategoria(categoria) {
    return inventarioALista().filter((p) => p.categoria === categoria);
  }

  /* ------------------------------------------------------------
       🔁 API pública (lo que se expone fuera)
    ------------------------------------------------------------ */
  return {
    agregarProducto,
    buscarProducto,
    actualizarProducto,
    eliminarProducto,
    inventarioALista,
    ordenarPorPrecio,
    filtrarCategoria,
  };
})(); // ← se ejecuta automáticamente

/* ============================================================
   🔹 CAPA UI (DOM)
   - Maneja inputs, tabla y eventos
============================================================ */

/* ------------------------------------------------------------
   📥 Obtener datos del formulario
------------------------------------------------------------ */
function obtenerDatos() {
  return {
    nombre: document.getElementById("nombre").value.trim(),
    cantidad: document.getElementById("cantidad").value,
    precio: document.getElementById("precio").value,
    categoria: document.getElementById("categoria").value.trim(),
  };
}

/* ------------------------------------------------------------
   🧹 Limpiar inputs
------------------------------------------------------------ */
function limpiarInputs() {
  document.getElementById("nombre").value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("categoria").value = "";
}

/* ------------------------------------------------------------
   🎨 Pintar tabla en HTML
   - Recibe un array (lista)
------------------------------------------------------------ */
function pintar(lista) {
  const tabla = document.getElementById("tabla");
  tabla.innerHTML = ""; // limpiar tabla

  lista.forEach((p) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
            <td>${p.nombre}</td>
            <td>${p.cantidad}</td>
            <td>${p.precio}</td>
            <td>${p.categoria}</td>
            <td>${p.total}</td>
            <td>
                <button class="eliminar" data-id="${p.nombre}">❌</button>
                <button class="sumar" data-id="${p.nombre}">➕</button>
            </td>
        `;

    tabla.appendChild(fila);
  });
}

/* ------------------------------------------------------------
   🧠 EVENT DELEGATION (tabla)
   - Detecta clicks en botones dinámicos
------------------------------------------------------------ */
function manejarTabla(e) {
  const nombre = e.target.dataset.id;

  // Eliminar
  if (e.target.classList.contains("eliminar")) {
    negocio.eliminarProducto(nombre);
    mostrar();
  }

  // Sumar stock
  if (e.target.classList.contains("sumar")) {
    const cantidad = prompt("Cantidad a agregar:");
    negocio.actualizarProducto(nombre, cantidad);
    mostrar();
  }
}

/* ------------------------------------------------------------
   🚀 FUNCIONES PRINCIPALES
------------------------------------------------------------ */

// ➕ Agregar desde UI
function agregar() {
  const d = obtenerDatos();
  negocio.agregarProducto(d.nombre, d.cantidad, d.precio, d.categoria);
  limpiarInputs();
  mostrar();
}

// 📊 Mostrar todo
function mostrar() {
  const lista = negocio.inventarioALista();
  pintar(lista);
}

// 🔄 Ordenar
function ordenar() {
  pintar(negocio.ordenarPorPrecio());
}

// 🔍 Filtrar
function filtrar() {
  const cat = document.getElementById("categoria").value;
  pintar(negocio.filtrarCategoria(cat));
}

/* ============================================================
   ⚡ INICIALIZACIÓN
   - Se ejecuta cuando carga la página
============================================================ */
window.addEventListener("load", () => {
  // Botones principales
  document.getElementById("btnAgregar").addEventListener("click", agregar);

  document.getElementById("btnMostrar").addEventListener("click", mostrar);

  document.getElementById("btnOrdenar").addEventListener("click", ordenar);

  document.getElementById("btnFiltrar").addEventListener("click", filtrar);

  // Evento delegado (tabla)
  document.getElementById("tabla").addEventListener("click", manejarTabla);
});
