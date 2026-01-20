export function  crearFiltros() {

 document.querySelector("#filtros").innerHTML = `
    
    <input id="buscar" placeholder="Buscar por servicio, cliente y descripcion">

    <select id="ordenar">
    <option value="">ordenar</option>
    <option value="fecha">fecha</option>
    <option value="servicio">servicio</option>
    <option value="descripcion">descripcion</option>
    </select>

   <select id="filtrar">
    <option value="">Filtrar</option>
    <option value="pendiente">Pendiente</option>
    <option value="cobrado">Cobrado</option>
    <option value="cancelado">Cancelado</option>
    </select>

 
 
 `;
}