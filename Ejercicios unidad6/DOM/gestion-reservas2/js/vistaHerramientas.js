'use strict';

export function crearVistaHerramientas(){
    document.querySelector("#vista-herramientas").innerHTML = `
    
        <button id="exportar">Exportar JOSN</button>

        <input type="file" id = "importar" accept="aplication/json"S>
    
    `;
}