export function crearFiltros() {
    document.querySelector("#filtros").innerHTML = `
        <input id="buscar" placeholder="Buscar por servicio o descripción">

        <select id="ordenar">
            <option value="">Ordenar</option>
            <option value="fecha">Fecha</option>
            <option value="servicio">Servicio</option>
        </select>

        <select id="filtrar">
            <option value="">Filtrar</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Cobrado">Cobrado</option>
            <option value="Cancelado">Cancelado</option>
        </select>
    `;
}
