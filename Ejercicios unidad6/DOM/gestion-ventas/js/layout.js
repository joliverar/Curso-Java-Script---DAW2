
export function crearLayout(){
    document.querySelector("#app").innerHTML= `
        <header class="header">Gestion de ventas</header>
        <main class="app">
        <section class="panel panel--form" id="formulario">
        </section>
        <section class="pannel panel--list" >

        <div class="tools" id="filtros"></div>
        <div class="info" id="listadoVentas"></div>
        <button class="btn btn--api" id="btnApi" >Obtener datos desde la api</button>
        </section>
    
    `;
}