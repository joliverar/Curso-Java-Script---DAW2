'use strict';

export function validarReserva(reserva, callback){

    if(!reserva.cliente?.trim()){
        return callback("El cliente es obligatorio");
    }

    if(!reserva.servicio?.trim() || reserva.servicio.trim().length < 10){
        return callback("La descripción debe tener al menos 10 caracteres");
    }

    if(
        !reserva.correo ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reserva.correo)
    ){
        return callback("Correo no válido");
    }

    if(isNaN(reserva.precio) || reserva.precio < 0){
        return callback("Precio incorrecto");
    }

    if(!reserva.fecha){
        return callback("La fecha es obligatoria");
    }

    callback(null);
}
