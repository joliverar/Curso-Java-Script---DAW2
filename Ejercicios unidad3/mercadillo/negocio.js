"use strict";

/* =====================================
   IIFE -> LÓGICA DEL NEGOCIO
===================================== */
const $negocio = (function () {
  // Inventario como objeto asociativo
  const inventario = {};

  /* =====================================
       CREAR LISTA DESDE EL OBJETO (for in)
       🔥 CLAVE DEL EJERCICIO
    ===================================== */
  function crearLista() {
    console.log("Creando lista...");

    let lista = [];

    for (let nombre in inventario) {
      let producto = inventario[nombre];

      lista.push({
        nombre: nombre,
        cantidad: producto.cantidad,
        precio: producto.precio,
        categoria: producto.categoria,
      });
    }

    console.log("Lista:", lista);

    return lista;
  }

  /* =====================================
       AGREGAR PRODUCTO
    ===================================== */
  function agregarProducto(nombre, cantidad, precio, categoria) {
    if (inventario[nombre]) {
      alert("El producto ya existe");
      return;
    }

    inventario[nombre] = {
      cantidad: parseInt(cantidad),
      precio: parseInt(precio),
      categoria: categoria,
    };

    console.log("Inventario:", inventario);
  }

  /* =====================================
       ELIMINAR PRODUCTO
    ===================================== */
  function eliminarProducto(nombre) {
    if (!inventario[nombre]) {
      alert("El producto no existe");
      return;
    }

    delete inventario[nombre];

    console.log("Inventario:", inventario);
  }

  /* =====================================
       BUSCAR PRODUCTO
    ===================================== */
  function buscarProducto(nombre) {
    console.log("Buscando...");

    return inventario[nombre];
  }

  /* =====================================
       ACTUALIZAR INVENTARIO
    ===================================== */
  function actualizarInventario(nombre, cantidad) {
    if (!inventario[nombre]) {
      alert("Producto no existe");
      return;
    }

    inventario[nombre].cantidad += parseInt(cantidad);

    if (inventario[nombre].cantidad <= 0) {
      alert("Stock en 0, reponer");
    }

    console.log("Inventario:", inventario);
  }

  /* =====================================
       ORDENAR POR PRECIO
       (usa lista + sort)
    ===================================== */
  function ordenarProductosPorPrecio() {
    let lista = crearLista();

    lista.sort((a, b) => {
      return a.precio - b.precio;
    });

    console.log("Ordenado:", lista);

    return lista;
  }

  /* =====================================
       IMPRIMIR INVENTARIO (usa map)
    ===================================== */
  function imprimirInventario() {
    let lista = crearLista();

    let resultado = lista.map((p) => {
      return {
        nombre: p.nombre,
        categoria: p.categoria,
        cantidad: p.cantidad,
        precio: p.precio,
        total: p.cantidad * p.precio,
      };
    });

    console.log("Imprimir:", resultado);

    return resultado;
  }

  /* =====================================
       FILTRAR POR CATEGORIA (filter + map)
    ===================================== */
  function filtrarProductosPorCategoria(categoria) {
    let lista = crearLista();

    let resultado = lista
      .filter((p) => {
        return p.categoria === categoria;
      })
      .map((p) => {
        return {
          nombre: p.nombre,
          cantidad: p.cantidad,
          precio: p.precio,
        };
      });

    console.log("Filtrado:", resultado);

    return resultado;
  }

  // Retornar funciones públicas
  return {
    agregarProducto,
    eliminarProducto,
    buscarProducto,
    actualizarInventario,
    ordenarProductosPorPrecio,
    imprimirInventario,
    filtrarProductosPorCategoria,
  };
})();

/* =====================================
   EVENTOS (FUERA DE $negocio)
===================================== */
window.addEventListener("load", function () {
  // Capturar inputs
  const nombre = document.getElementById("nombre");
  const cantidad = document.getElementById("cantidad");
  const precio = document.getElementById("precio");
  const categoria = document.getElementById("categoria");
  const resultado = document.getElementById("resultado");

  /* =====================================
       AGREGAR
    ===================================== */
  document.getElementById("btnAgregar").addEventListener("click", ()=> {
    $negocio.agregarProducto(
      nombre.value,
      cantidad.value,
      precio.value,
      categoria.value,
    );
  });

  /* =====================================
       ELIMINAR (con confirmación)
    ===================================== */
  document.getElementById("btnEliminar").addEventListener("click", function () {
    if (confirm("¿Seguro que deseas eliminar?")) {
      $negocio.eliminarProducto(nombre.value);
    }
  });

  /* =====================================
       BUSCAR
    ===================================== */
  document.getElementById("btnBuscar").addEventListener("click", function () {
    let res = $negocio.buscarProducto(nombre.value);

    resultado.innerHTML = JSON.stringify(res);
  });

  /* =====================================
       ACTUALIZAR
    ===================================== */
  document
    .getElementById("btnActualizar")
    .addEventListener("click", () => {
     $negocio.actualizarInventario(nombre.value, cantidad.value);
     
    });

  /* =====================================
       ORDENAR
    ===================================== */
  document.getElementById("btnOrdenar").addEventListener("click", function () {
    let res = $negocio.ordenarProductosPorPrecio();

    resultado.innerHTML = JSON.stringify(res);
  });

  /* =====================================
       IMPRIMIR
    ===================================== */
  document.getElementById("btnImprimir").addEventListener("click", function () {
    let res = $negocio.imprimirInventario();

    resultado.innerHTML = JSON.stringify(res);
  });

  /* =====================================
       FILTRAR
    ===================================== */
  document.getElementById("btnFiltrar").addEventListener("click", function () {
    let res = $negocio.filtrarProductosPorCategoria(categoria.value);

    resultado.innerHTML = JSON.stringify(res);
  });
});
