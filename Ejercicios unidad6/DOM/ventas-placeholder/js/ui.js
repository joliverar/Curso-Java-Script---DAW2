export function renderizarVentas(ventas) {
    const lista = document.querySelector("#lista");
    lista.innerHTML = "";

    ventas.forEach(v => {
        const div = document.createElement("div");
        div.classList.add("venta");
        div.dataset.id = v.id;

        div.innerHTML = `
            <strong>${v.servicio || v.title}</strong>
            - ${v.cliente || "Cliente demo"}
            (${v.estado || "Pendiente"})
            <button class="editar">Editar</button>
            <button class="eliminar">Eliminar</button>
        `;

        lista.appendChild(div);
    });
}


