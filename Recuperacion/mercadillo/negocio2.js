const $negocio = (function () {

    let inventario = {};

    // -------------------------
    // 📌 PLANTILLAS REUTILIZABLES
    // -------------------------

    // Convierte inventario en lista de objetos completos
    function inventarioALista() {
        const lista = [];
        for (let nombre in inventario) {
            const datos = inventario[nombre];
            lista.push({
                nombre,
                cantidad: datos.cantidad,
                precio: datos.precio,
                categoria: datos.categoria
            });
        }
        return lista;
    }

    // Plantilla para informe completo
    function plantillaInforme(item) {
        return {
            nombre: item.nombre,
            categoria: item.categoria,
            cantidad: item.cantidad,
            precio: item.precio,
            total: item.cantidad * item.precio
        };
    }

    // Plantilla para vista simple
    function plantillaSimple(item) {
        return {
            nombre: item.nombre,
            cantidad: item.cantidad,
            precio: item.precio
        };
    }

    // -------------------------
    // 📌 FUNCIONES PRINCIPALES
    // -------------------------

    function agregarProducto(nombre, cantidad, precio, categoria) {
        if (inventario[nombre]) {
            alert("El producto ya existe.");
            return;
        }
        inventario[nombre] = {
            cantidad: Number(cantidad),
            precio: Number(precio),
            categoria
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
        const lista = inventarioALista();
        return lista.sort((a, b) => a.precio - b.precio);
    }

    function imprimirInventario() {
        return inventarioALista().map(plantillaInforme);
    }

    function filtrarProductosPorCategoria(categoria) {
        const lista = inventarioALista();
        const filtrados = [];

        for (let item of lista) {
            if (item.categoria === categoria) {
                filtrados.push(plantillaSimple(item));
            }
        }

        return filtrados;
    }

    return {
        agregarProducto,
        eliminarProducto,
        buscarProducto,
        actualizarInventario,
        ordenarProductosPorPrecio,
        imprimirInventario,
        filtrarProductosPorCategoria
    };

})();
