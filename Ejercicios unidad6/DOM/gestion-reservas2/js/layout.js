'use strict';

export function crearlayout(){
    document.querySelector("#app").innerHTML = `
    <nav class="menu">
        <button data-vista = "formulario" class="menu__activo">Formulario</button>
         <button data-vista = "lista" >Lista</button>
         <button data-vista = "filtros" >Filtros</button>
         <button data-vista = "herramientas" >Herramientas</button>
         <button id="btnApi" >Cargar Api</button>
    </nav>

    <section id = "vista-formulario" class="vista"></section>
    <section id = "vista-lista" class="vista"></section>
    <section id = "vista-filtros" class="vista"></section>
    <section id = "vista-herramientas" class="vista"></section>

`;
}
