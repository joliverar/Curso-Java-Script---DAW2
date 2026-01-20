export function crearFiltros(){
    document.querySelector("#filtros").innerHTML = `
           <input id="buscar" placeholder="buscar por titulo y autor">
                <select id="filtrar">
                <option value="">Filtrar</option>
                <option value="">Fecha</option>
                <option value="titulo">Titulo</option>
                <option value="autor">Autor</option>
                </select>
                <select id="ordenar">
                <option value="">Ordenar</option>
                <option value="disponible">Disponible</option>
                <option value="prestado">Prestado</option>
                </select>
`;
}

