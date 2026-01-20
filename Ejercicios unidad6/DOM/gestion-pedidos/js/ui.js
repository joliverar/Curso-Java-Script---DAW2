export function renderizarPedidos(pedidos){
    const listado = document.querySelector("#listaPedidos");

    listado.innerHTML = "";
    pedidos.forEach(pedido => {
        const card = document.createElement("div");

        card.className = "pedido";
        card.dataset.id = pedido.id;
        card.innerHTML = `
            <div class="pedido__info">
                <span class="pedido__titulo">${pedido.cliente}</span>
                <span>${pedido.producto} - ${pedido.cantidad} - ${pedido.estado}</span>
                <span>${pedido.cliente}</span>
                <span>${pedido.fecha}</span>
            </div>
            <div class="pedido__actions">
                <button class="btn btn--editar">Editar</button>
                <button class="btn btn--delete">Eliminar</button>
            </div>
        `;

        listado.appendChild(card);

    });
    

}