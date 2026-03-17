const $negocio = (function () {
  let inventario = {};

  function agregarProducto(nombre, cantidad, precio, categoria) {
    if (inventario[nombre]) {
      alert("El producto ya existe.");
      return;
    }
    inventario[nombre] = {
      cantidad: Number(cantidad),
      precio: Number(precio),
      categoria,
    };
  }

  function eliminarProducto(nombre) {
    if (!inventario[nombre]) {
      alert("El producto no existe.");
      return;
    }
    delete inventario[nombre];
  }

  function buscarProducto(nombre) {
    return inventario[nombre] || null;
  }

  function actualizarInventario(nombre, cantidad) {
    if (!inventario[nombre]) {
      alert("El producto no existe.");
      return;
    }
    inventario[nombre].cantidad += Number(cantidad);

    if (inventario[nombre].cantidad <= 0) {
      inventario[nombre].cantidad = 0;
      alert("Stock agotado. Es necesario reponer.");
    }
  }

  function ordenarProductosPorPrecio() {
    return Object.entries(inventario)
      .map(([nombre, datos]) => ({ nombre, ...datos }))
      .sort((a, b) => a.precio - b.precio);
  }

  function imprimirInventario() {
    return Object.entries(inventario).map(([nombre, datos]) => ({
      nombre,
      categoria: datos.categoria,
      cantidad: datos.cantidad,
      precio: datos.precio,
      total: datos.cantidad * datos.precio,
    }));
  }

  function filtrarProductosPorCategoria(categoria) {
    return Object.entries(inventario)
      .filter(([_, datos]) => datos.categoria === categoria)
      .map(([nombre, datos]) => ({
        nombre,
        cantidad: datos.cantidad,
        precio: datos.precio,
      }));
  }

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
