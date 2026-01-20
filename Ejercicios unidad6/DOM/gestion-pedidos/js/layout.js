export function crearLayout(){
    
    
    const app = document.querySelector("#app");

    app.innerHTML = `
        <header class="header">Gestion de pedidos</header>
        <main class="app">
            <section class="panel panel--form" id="formulario">
            
                 
            </section>
            
            <section class="panel panel--list" >
                <div id = "filtros" class="filtros"></div>
                <div id = "listaPedidos"></div>
                <button id="btnApi" class="btn btn--api">Cargar Api</button>
            </section>
            
        </main>
    `;
}