export function renderizarVentas(ventas){


    const lista = document.querySelector("#listadoVentas");

    lista.innerHTML = "";

    ventas.forEach(venta => {
        const card = document.createElement("div");
        card.className = "venta";
        card.dataset.id = venta.id;
        card.innerHTML = `
        <div class="venta__info">
        <span class="venta__titulo">${venta.servicio}</span>
        <span> ${venta.cliente}</span>
        <span> ${venta.descripcion}</span>
        <span> ${venta.monto}</span>
        <span> ${venta.email}</span>
        <span> ${venta.estado}</span>
        <span> ${venta.fecha}</span>
        </div>
        <div class="venta__acctions">
        <button class="btn btn--editar">Editar</button>
        <button class="btn btn--delete">Eliminar</button>
        </div>
        `;

        lista.appendChild(card);
        
    });
}