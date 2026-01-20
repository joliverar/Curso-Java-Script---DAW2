'use strict';

const CLAVE_RESERVAS = "reservas";
const CLAVE_NEXT_ID = "nextId";

export function obtenerReservas(){
    const data = localStorage.getItem(CLAVE_RESERVAS);
    if(!data) return [];
    return JSON.parse(data);
}

export function crearReservas(reserva){
    const reservas = obtenerReservas();
    reserva.id = crearNextId();
    reservas.push(reserva);
    guardarReservas(reservas);
}
export function actualizarReservas(reserva){

    const reservas = obtenerReservas().map(r=> r.id === reserva.id?reserva:r);
    guardarReservas(reservas);

}
export function eliminarReservas(id){
    const reservas = obtenerReservas().filter(r=> r.id !== id);
    guardarReservas(reservas);
}
export function crearNextId(){
    const nextId = Number(localStorage.getItem(CLAVE_NEXT_ID))|| 1;
    localStorage.setItem(CLAVE_NEXT_ID, nextId+1);
    return nextId;

}
export function guardarReservas(reservas){
    localStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas));
}