
export function renderizarLibros(libros){
    const listado = document.querySelector("#listado");
     listado.innerHTML = "";
    
    libros.forEach(libro => {
        const card = document.createElement("div");
        card.className = "libro";
        card.dataset.id = libro.id;
        card.innerHTML = `
            <div class="libro__info">
                <span class="libro__titulo">${libro.titulo}</span>
                <span class="libro__detalles">${libro.autor} - ${libro.isbn} - ${libro.anio} -${libro.estado}-${libro.fecha}</span>
            </div>
            <div class="libro__actions">
                <button class="btn btn--editar">Editar</button>
                <button class="btn btn--delete">Eliminar</button>
            </div>
        `;
        listado.appendChild(card);
    });

    
}