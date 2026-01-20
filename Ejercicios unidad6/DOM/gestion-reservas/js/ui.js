
export function renderReservas(reservas, container){
    container.innerHTML="";

    reservas.forEach(reserva =>{
        const card = document.createElement("div");
        card.className = "reserva";

        card.dataset.id  = reserva.id;

        card.innerHTML = `
            <div class="reserva__info">
                <span class="reserva__title">${reserva.cliente}</span>
                <span>${reserva.servicio}</span>
                <span>${reserva.fecha}</span>
                <span>${reserva.estado}</span>
            </div>
            <div class="reserva__actions">
                <button class="btn btn--editar">Editar</button>
                <button class="btn btn--delete">Eliminar</button>

            </div>
        `;

        reservasList.appendChild(card);
    });

}