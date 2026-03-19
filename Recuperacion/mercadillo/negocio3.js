"use strict";

const negocio = (function () {
  let inventario = {};

  //  TRANSFORMACIÓN
  function inventarioALista() {
    return Object.entries(inventario).map(([nombre, datos]) => ({
      nombre,
      ...datos,
      total: datos.cantidad * datos.precio,
    }));
  }

  // CREATE
  function agregarProducto(nombre, cantidad, precio, categoria) {
    if (!nombre) {
      alert("Nombre obligatorio");
      return;
    }

    if (inventario[nombre]) {
      alert("El producto ya existe");
      return;
    }

    inventario[nombre] = {
      cantidad: Number(cantidad) || 0,
      precio: Number(precio) || 0,
      categoria: categoria || "General",
    };
  }

  //  READ
  function buscarProducto(nombre) {
    return inventario[nombre] || null;
  }

  //  UPDATE
  function actualizarProducto(nombre, cantidad) {
    if (!inventario[nombre]) {
      alert("No existe");
      return;
    }

    inventario[nombre].cantidad += Number(cantidad);

    if (inventario[nombre].cantidad <= 0) {
      inventario[nombre].cantidad = 0;
      alert("Stock agotado");
    }
  }

  //  DELETE
  function eliminarProducto(nombre) {
    delete inventario[nombre];
  }

  // SORT
  function ordenarPorPrecio() {
    return inventarioALista().sort((a, b) => a.precio - b.precio);
  }

  // FILTER
  function filtrarCategoria(cat) {
    return inventarioALista().filter((p) => p.categoria === cat);
  }

  return {
    agregarProducto,
    buscarProducto,
    actualizarProducto,
    eliminarProducto,
    inventarioALista,
    ordenarPorPrecio,
    filtrarCategoria,
  };
})();

negocio.agregarProducto("Manzanas", 10, 0.5, "Frutas");
negocio.agregarProducto("Leche", 20, 1.2, "Lácteos");
negocio.agregarProducto("Pan", 15, 0.8, "Panadería");
console.log("Inventario completo:");
console.log(negocio.inventarioALista());
console.log("Productos ordenados por precio:");
console.log(negocio.ordenarPorPrecio());
console.log("Productos en categoría 'Frutas':");
console.log(negocio.filtrarCategoria("Frutas"));

function obtenerDatos() {
  return {
    nombre: document.getElementById("nombre").value.trim(),
    cantidad: document.getElementById("cantidad").value,
    precio: document.getElementById("precio").value,
    categoria: document.getElementById("categoria").value.trim(),
  };
}

function limpiarInputs() {
  document.getElementById("nombre").value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("categoria").value = "";
}


function pintar(lista) {
  const tabla = document.getElementById("tabla");
  tabla.innerHTML = "";

  lista.forEach((p) => {
    tabla.innerHTML += `
            <tr>
                <td>${p.nombre}</td>
                <td>${p.cantidad}</td>
                <td>${p.precio}</td>
                <td>${p.categoria}</td>
                <td>${p.total}</td>
                <td>
                    <button onclick="eliminar('${p.nombre}')">❌</button>
                    <button onclick="sumar('${p.nombre}')">➕</button>
                </td>
            </tr>
        `;
  });
}

function mostrar() {
  const lista = negocio.inventarioALista();
  pintar(lista);
}

function agregar() {
  const d = obtenerDatos();
  negocio.agregarProducto(d.nombre, d.cantidad, d.precio, d.categoria);
  limpiarInputs();
  mostrar();
}

function eliminar(nombre) {
  negocio.eliminarProducto(nombre);
  mostrar();
}

function sumar(nombre) {
  const cantidad = prompt("Cantidad a agregar:");
  negocio.actualizarProducto(nombre, cantidad);
  mostrar();
}

function buscar() {
  const nombre = document.getElementById("nombre").value;
  const p = negocio.buscarProducto(nombre);

  if (p) {
    alert(`Stock: ${p.cantidad} | Precio: ${p.precio}`);
  } else {
    alert("No encontrado");
  }
}

function ordenarPrecio() {
  pintar(negocio.ordenarPorPrecio());
}

function filtrar() {
  const categoria = document.getElementById("categoria").value;
  pintar(negocio.filtrarCategoria(categoria));
}
