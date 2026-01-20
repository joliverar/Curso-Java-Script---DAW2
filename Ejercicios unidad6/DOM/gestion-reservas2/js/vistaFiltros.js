'use strict';

export function crearVistaFiltros(){
    document.querySelector("#vista-filtros").innerHTML = `
        <input id="buscarReservas" placeholder="Buscar or cliente y servicio">

        <select id="filtrarEstado">
            <option value="">Todos<option>
            <option value="pendiente">Pendiente<option>
            <option value="confirmado">Confirmado<option>
            <option value="cancelado">Cancelado<option>
        
        </select>

         <select id="ordenarPor">
            <option value="">No ordneado<option>
            <option value="fecha">Fecha<option>
            <option value="cliente">Cliente<option>
            <option value="precio">Precio<option>
        
        </select>


    `;
    console.log("aqui los filtros");
}