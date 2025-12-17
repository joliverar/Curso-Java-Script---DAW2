// =====================================================
//      Mantenimiento USERS
// =====================================================

(async () => {

    const lista = query("#listaUsuarios");
    const filtroNombre = query("#filtroNombre");
    const comboCantidad = query("#selectCantidad");
    const pagDiv = query("#paginacion");

    let datosOriginales = [];
    let datosFiltrados = [];

    let paginaActual = 1;
    let cantidadPorPagina = leerLS("users_paginacion") ?? 5;

    comboCantidad.value = cantidadPorPagina;

    // ===============================================
    //   Cargar datos
    // ===============================================
    async function cargarUsuarios() {
        try {
            datosOriginales = await getAll("users");
            datosFiltrados = [...datosOriginales];
            render();
        } catch (e) {
            mostrarError("No se pudieron cargar los usuarios");
        }
    }

    // ===============================================
    //   Filtro por nombre
    // ===============================================
    filtroNombre.addEventListener("input", () => {
        const texto = filtroNombre.value.toLowerCase();

        datosFiltrados = datosOriginales.filter(u =>
            u.name.toLowerCase().includes(texto)
        );

        paginaActual = 1;
        render();
    });

    // ===============================================
    //   Cambio cantidad por página
    // ===============================================
    comboCantidad.addEventListener("change", () => {
        cantidadPorPagina = comboCantidad.value;
        guardarLS("users_paginacion", cantidadPorPagina);
        paginaActual = 1;
        render();
    });

    // ===============================================
    //   Render principal
    // ===============================================
    function render() {
        lista.innerHTML = "";

        let datosPagina = paginar(datosFiltrados, paginaActual, cantidadPorPagina);

        datosPagina.items.forEach(u => lista.appendChild(crearTarjeta(u)));

        renderPaginador(datosPagina.totalPaginas);
    }

    // ===============================================
    //   Crear tarjeta usuario
    // ===============================================
    function crearTarjeta(u) {
        const card = crearElemento("div", "cardUser");

        card.innerHTML = `
            <h3>${u.name}</h3>
            <p><b>Email:</b> ${u.email}</p>
            <p><b>Ciuidad:</b> ${u.address.city}</p>

            <button class="accion" data-id="${u.id}" data-tipo="todo">Ver pendientes</button>
            <button class="accion" data-id="${u.id}" data-tipo="album">Ver álbumes</button>
            <button class="accion" data-id="${u.id}" data-tipo="post">Ver posts</button>

            <button class="detalle" onclick="location.href='user.html?id=${u.id}'">Ver detalle</button>
        `;

        // acciones
        card.querySelectorAll(".accion").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = btn.dataset.id;
                const tipo = btn.dataset.tipo;

                if (tipo === "todo") {
                    navegar(`todos.html?userId=${id}`);
                }
                if (tipo === "album") {
                    navegar(`albums.html?userId=${id}`);
                }
                if (tipo === "post") {
                    navegar(`posts.html?userId=${id}`);
                }
            });
        });

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
    //   Función paginar desde utils.js
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
    cargarUsuarios();

})();
