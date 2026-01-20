'use strict';

export function renderizarReservas(reservas, contenedor){
    contenedor.innerHTML = "";
    
    reservas.forEach(reserva => {
        const card = document.createElement("div");
        card.className = "reserva";
        card.dataset.id = reserva.id;

        card.innerHTML = `
            <div class="reserva_info">
                <span>${reserva.cliente} (${reserva.correo})</span>
                <span>${reserva.servicio} </span>
                <span>${reserva.precio} - ${reserva.estado}</span>
            </div>
            <div class="reserva_acciones">
                <button class="btn btn--editar">Editar</button>
                <button class="btn btn--eliminar">Eliminar</button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}