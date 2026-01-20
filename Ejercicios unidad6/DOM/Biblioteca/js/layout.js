
export function crearLayout(){

    
document.querySelector("#app").innerHTML = `
    <header class="header"> Gestion de biblioteca</header>
    <main class="app">
    <section class="panel panell--form" id="formulario">

    </section>
    <section class="panel panell--list">
            <div id="filtros" class="tools">
            </div>
            <div id="listado" class="listado">
            </div>

    </section>
    </main>

`;
}
