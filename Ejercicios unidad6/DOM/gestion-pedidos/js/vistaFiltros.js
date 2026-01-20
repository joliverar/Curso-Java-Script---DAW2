export function crearFiltros() {
    document.querySelector("#filtros").innerHTML = `
    <input placeholder="buscar por cliente y producto" id ="buscar">
    <select id="filtrar">
        <option value="">Seleccionar todas</option>
        <option value="pendiente">Pendiente</option>
        <option value="enviado">Enviado</option>
        <option value="cancelado">Cancelado</option>
    </select>
    <select id="ordenar">
        <option value="">Ordenar</option>
        <option value="cliente">Cliente</option>
        <option value="producto">Producto</option>
        <option value="fecha">Fecha</option>

    </select>

`;
}


