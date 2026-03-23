'use strict';

const $negocio = (function () {
    const inventario = {};

    function nuevaLista() {
        let lista = [];

        for (const nombre in inventario) {
            let producto = inventario[nombre];
            lista.push({
              nombre: nombre,
              cantidad: producto.cantidad,
              precio: producto.precio,
              categoria: producto.categoria,
            });
        }
        console.log("lista", lista);
        return lista;
    }

    function agregarProducto(nombre, cantidad, precio, categoria) {
        if (inventario[nombre]) {
            alert("El producto ya existe");
            return;
        }
        inventario[nombre] = {
            cantidad: parseInt(cantidad),
            precio: parseInt(precio),
            categoria: categoria,
        }

        console.log("Inventario", inventario)
    }

    function eliminarProducto(nombre) {
        if (!inventario[nombre]) {
            alert("El producto no existe");
            return;
        }
        delete (inventario[nombre]);
    }

    function buscarProducto(nombre) {
        if (!inventario[nombre]) {
            alert("El producto no existe");
            return;
        }
        console.log("Producto encontrado", inventario[nombre])
        return inventario[nombre];
    }

    function actualizarInventario(nombre, cantidad) {
        if (!inventario[nombre]) {
          alert("El producto no existe");
          return;
        }
        inventario[nombre].cantidad += cantidad;
        if (inventario[nombre].cantidad <= 0) {
            alert("debe adicionar stock");
        }

        console.log("nuevo stock", inventario[nombre].cantidad)
    }

    function imprimirInventario() {
       
        let lista = nuevaLista();
        let resultado = lista.map((p) => {
            return {
                nombre: p.nombre,
                categoria: p.categoria,
                cantidad: p.cantidad,
                precio: p.precio,
                total: p.cantidad*p.precio,
            }
        })
        console.log("Resultado ", resultado);
        return resultado;
    }
    function ordenarPorPrecio() {
        let lista = nuevaLista();
        let resultado = lista.sort((a, b) => { return a.precio - b.precio });
        console.log("ordenado", resultado);
        
        return resultado;

        
    }

    function filtrarPorCategoria(categoria) {
        let lista = nuevaLista();

        let resultado = lista.filter((p) => { return p.categoria === categoria })
            .map(p => { return { nombre: p.nombre, cantidad: p.cantidad, precio: p.precio } });
        console.log("Filtrados", resultado);
        return resultado;
    }
    return {
        agregarProducto,
        eliminarProducto,
        buscarProducto,
        actualizarInventario,
        imprimirInventario,
        ordenarPorPrecio,
        filtrarPorCategoria,
    };
})(); 

$negocio.agregarProducto("manzana", 10, 2, "fruta");
$negocio.agregarProducto("pera", 10, 2, "detergente");
$negocio.buscarProducto("manzana");
$negocio.actualizarInventario("manzana", 20);
$negocio.imprimirInventario();
$negocio.ordenarPorPrecio();
$negocio.filtrarPorCategoria("fruta");

window.addEventListener("load", function () {
    const nombre = document.getElementById("nombre");
    const precio = document.getElementById("precio");
    const categoria = document.getElementById("categoria");
    const cantidad = document.getElementById("cantidad");
    const resultado = document.getElementById("resultado");

    document.getElementById("agregarProducto").addEventListener("click", () => {
        $negocio.agregarProducto(
            nombre.value, precio.value, cantidad.value, categoria.value
        );
    });

    document.getElementById("eliminarProducto").addEventListener("click", () => {
      if (confirm("desea elimina el producto")) {
        $negocio.eliminarProducto(nombre.value);
      }
    });

    document.getElementById("buscarProducto").addEventListener("click", () => {
        let res = $negocio.buscarProducto(nombre.value);
        resultado.innerHTML = JSON.stringify(res);
    });
    
    document.getElementById("ordenarProducto").addEventListener("click", () => {
        let res = $negocio.ordenarPorPrecio();
        resultado.innerHTML = JSON.stringify(res);
    });

    document
      .getElementById("actualizarProducto")
      .addEventListener("click", () => {
        $negocio.actualizarInventario(nombre.value, cantidad.value);
      });

    document.getElementById("filtrarProducto").addEventListener("click", () => {
      let res = $negocio.filtrarPorCategoria(categoria.value);
      resultado.innerHTML = JSON.stringify(res);
    });
});

