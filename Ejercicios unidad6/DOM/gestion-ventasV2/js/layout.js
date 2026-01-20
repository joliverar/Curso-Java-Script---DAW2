
export function crearLayout() {
    document.querySelector("#app").innerHTML = `
        <header class="header">Gestión de ventas</header>

        <main class="app">
            <section class="panel panel--form" id="formulario"></section>

            <section class="panel panel--list">
                <div class="tools" id="filtros"></div>
                <div class="info" id="listadoVentas"></div>
            </section>
        </main>
    `;
}
