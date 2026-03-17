window.addEventListener("load", () => {
  const res = document.getElementById("resultado");

  document.getElementById("btnAgregar").addEventListener("click", () => {
    $negocio.agregarProducto(
      nombreAdd.value,
      cantidadAdd.value,
      precioAdd.value,
      categoriaAdd.value,
    );
  });

  document.getElementById("btnEliminar").addEventListener("click", () => {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      $negocio.eliminarProducto(nombreDel.value);
    }
  });

  document.getElementById("btnBuscar").addEventListener("click", () => {
    const p = $negocio.buscarProducto(nombreBuscar.value);
    res.innerHTML = p ? JSON.stringify(p, null, 2) : "No encontrado";
  });

  document.getElementById("btnActualizar").addEventListener("click", () => {
    $negocio.actualizarInventario(nombreAct.value, cantidadAct.value);
  });

  document.getElementById("btnFiltrar").addEventListener("click", () => {
    const lista = $negocio.filtrarProductosPorCategoria(categoriaFiltrar.value);
    res.innerHTML = JSON.stringify(lista, null, 2);
  });

  document.getElementById("btnOrdenar").addEventListener("click", () => {
    const lista = $negocio.ordenarProductosPorPrecio();
    res.innerHTML = JSON.stringify(lista, null, 2);
  });

  document.getElementById("btnMostrar").addEventListener("click", () => {
    const lista = $negocio.imprimirInventario();
    res.innerHTML = JSON.stringify(lista, null, 2);
  });
});
