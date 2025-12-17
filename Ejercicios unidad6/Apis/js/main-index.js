window.onload = () => {

    const cont = query("#contenedorTarjetas");

    // Las 6 entidades a consultar
    const entidades = [
        { nombre: "users", archivo: "users.html" },
        { nombre: "todos", archivo: "todos.html" },
        { nombre: "posts", archivo: "posts.html" },
        { nombre: "comments", archivo: "comments.html" },
        { nombre: "albums", archivo: "albums.html" },
        { nombre: "photos", archivo: "photos.html" }
    ];

   
    const peticiones = entidades.map(ent =>
        getAll(ent.nombre)
            .then(data => ({ ok: true, entidad: ent, data }))
            .catch(err => ({ ok: false, entidad: ent, error: err }))
    );


    setTimeout(async () => {

        try {
            // Ejecutar 6 fetch simultáneamente
            const resultados = await Promise.all(peticiones);

            resultados.forEach(r => {
                const card = crearElemento("div", "card");

                if (r.ok) {
                    card.innerHTML = `
                        <h3>${r.entidad.nombre.toUpperCase()}</h3>
                        <p>Total: ${r.data.length}</p>
                    `;
                    card.onclick = () => navegar(r.entidad.archivo);
                } else {
                    // Errores por entidad ↓↓↓
                    card.classList.add("errorCard");
                    card.innerHTML = `
                        <h3>${r.entidad.nombre.toUpperCase()}</h3>
                        <p style="color:red;">Error al cargar datos</p>
                    `;
                }

                cont.appendChild(card);
            });

        } catch (e) {
            mostrarError("Fallo global en las peticiones.");
        }

    }, 800); 
if(Math.random() < 0.2) throw new Error("Error simulado");

};

