// =====================================================
//      Mantenimiento POSTS
// =====================================================

(async () => {

    const lista = query("#listaPosts");
    const filtroTitulo = query("#filtroTitulo");
    const comboCantidad = query("#selectCantidad");
    const pagDiv = query("#paginacion");
    const infoFiltro = query("#infoFiltro");

    let datosOriginales = [];
    let datosFiltrados = [];

    let paginaActual = 1;
    let cantidadPorPagina = leerLS("posts_paginacion") ?? 5;

    comboCantidad.value = cantidadPorPagina;

    const userIdFiltro = leerParametroURL("userId");
    if (userIdFiltro) {
        infoFiltro.textContent = `Filtrado por userId = ${userIdFiltro}`;
    }

    // ===============================================
    //   Cargar datos
    // ===============================================
    async function cargarPosts() {
        try {
            let params = "";

            if (userIdFiltro) {
                params = `?userId=${userIdFiltro}`;
            }

            datosOriginales = await getAll("posts", params);
            datosFiltrados = [...datosOriginales];

            render();

        } catch (e) {
            mostrarError("No se pudieron cargar los posts");
        }
    }

    // ===============================================
    //   Filtro por título
    // ===============================================
    filtroTitulo.addEventListener("input", () => {
        const texto = filtroTitulo.value.toLowerCase();

        datosFiltrados = datosOriginales.filter(p =>
            p.title.toLowerCase().includes(texto)
        );

        paginaActual = 1;
        render();
    });

    // ===============================================
    //   Cambio cantidad por página
    // ===============================================
    comboCantidad.addEventListener("change", () => {
        cantidadPorPagina = comboCantidad.value;
        guardarLS("posts_paginacion", cantidadPorPagina);
        paginaActual = 1;
        render();
    });

    // ===============================================
    //   Render principal
    // ===============================================
    function render() {
        lista.innerHTML = "";

        const datosPagina = paginar(datosFiltrados, paginaActual, cantidadPorPagina);

        datosPagina.items.forEach(p => lista.appendChild(crearTarjeta(p)));

        renderPaginador(datosPagina.totalPaginas);
    }

    // ===============================================
    //   Crear tarjeta post
    // ===============================================
    function crearTarjeta(p) {
        const card = crearElemento("div", "cardPost");

        card.innerHTML = `
            <h3>${p.title}</h3>
            <p>${p.body.substring(0, 120)}...</p>

            <button onclick="navegar('post.html?id=${p.id}')">Ver detalle</button>
            <button onclick="navegar('comments.html?postId=${p.id}')">Ver comentarios</button>
        `;

        return card;
    }

    // ===============================================
    //   PAGINADOR
    // ===============================================
    function renderPaginador(totalPaginas) {
        pagDiv.innerHTML = "";

        if (cantidadPorPagina === "todos") return;

        for (let i = 1; i <= totalPaginas; i++) {
            const btn = crearElemento("button", i === paginaActual ? "pagina-activa" : "", i);
            btn.onclick = () => {
                paginaActual = i;
                render();
            };
            pagDiv.appendChild(btn);
        }
    }

    // ===============================================
    //   Función paginar
    // ===============================================
    function paginar(lista, pagina, cantidad) {
        if (cantidad === "todos") {
            return {
                items: lista,
                totalPaginas: 1
            };
        }

        cantidad = Number(cantidad);
        const inicio = (pagina - 1) * cantidad;
        const items = lista.slice(inicio, inicio + cantidad);
        const totalPaginas = Math.ceil(lista.length / cantidad);

        return { items, totalPaginas };
    }

    // ===============================================
    //   Iniciar
    // ===============================================
    cargarPosts();

})();
