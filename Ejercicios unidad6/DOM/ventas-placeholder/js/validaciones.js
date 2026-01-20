export function validarVenta(venta) {

    if (!venta.servicio || venta.servicio.trim() === "") {
        return "El servicio es obligatorio";
    }

    if (!venta.cliente || venta.cliente.trim() === "") {
        return "El cliente es obligatorio";
    }

    if (!venta.estado) {
        return "Debe seleccionar un estado";
    }

    return null; // todo OK
}
