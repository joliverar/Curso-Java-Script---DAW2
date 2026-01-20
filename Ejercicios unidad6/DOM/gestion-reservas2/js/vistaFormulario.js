'use strict';

export function crearVistaFormulario() {
    document.querySelector("#vista-formulario").innerHTML = `

    <form id="formulario">
        <input type="hidden" id="id" name="id">
        <label>Cliente</label>
        <input name="cliente">
        <label>Correo</label>
        <input name="correo" type="email">
        <label>Servicio</label>
        <textarea rows="6" name="servicio"></textarea>
        <label>Precio</label>
        <input type="number" name="precio">
        <label >Fecha</label>
        <input type="date" name="fecha">
        <label>Estado</label>
        <select name="estado">
        <option>Pendiente</option>
        <option>Confirmado</option>
        <option>Cancelado</option> 
         </select>
    <button type="submit">Guardar</button>
    </form>
    
    
    `;
}