'use strict';

export function validarReserva(reserva) {

    if (!reserva.cliente || reserva.cliente.trim() === "") {
        alert("El cliente es obligatorio");
        return false;
    }

    if (!reserva.servicio || reserva.servicio.trim().length < 10) {
        alert("El servicio debe tener al menos 10 caracteres");
        return false;
    }

    if (!reserva.fecha || reserva.fecha.trim() === "") {
        alert("La fecha es obligatoria");
        return false;
    }

    if (!reserva.estado) {
        alert("El estado es obligatorio");
        return false;
    }

    return true;
}
