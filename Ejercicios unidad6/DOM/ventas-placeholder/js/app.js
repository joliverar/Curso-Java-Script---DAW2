import {
    obtenerVentas,
    crearVenta,
    actualizarVenta,
    eliminarVenta
} from "./apiVentas.js";

import { renderizarVentas } from "./ui.js";
import { validarVenta } from "./validaciones.js";

let ventas = [];

/* 1️⃣ Cargar datos */
document.addEventListener("DOMContentLoaded", () => {
    obtenerVentas()
        .then(data => {
            ventas = data.slice(0, 10).map(p => ({
                id: p.id,
                servicio: p.title,
                cliente: "Cliente demo",
                estado: "Pendiente"
            }));

            renderizarVentas(ventas);
        })
        .catch(() => alert("Error al cargar"));
});


/* 2️⃣ Alta y modificación */
const form = document.querySelector("#form");

form.addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(form);
    const venta = Object.fromEntries(data.entries());

    const error = validarVenta(venta);
    if (error) {
        alert(error);
        return;
    }

    if (venta.id) {
        actualizarVenta(venta).then(actualizada => {
            ventas = ventas.map(v => v.id == venta.id ? actualizada : v);
            renderizarVentas(ventas);
            form.reset();
        });
    } else {
        crearVenta(venta).then(nueva => {
            ventas.unshift(nueva);
            renderizarVentas(ventas);
            form.reset();
        });
    }
});

/* 3️⃣ Editar y eliminar (delegación) */
document.querySelector("#lista").addEventListener("click", e => {
    const card = e.target.closest(".venta");
    if (!card) return;

    const id = card.dataset.id;

    if (e.target.classList.contains("editar")) {
    const venta = ventas.find(v => v.id == id);

    Object.entries(venta).forEach(([k, v]) => {
        const campo = form.querySelector(`[name="${k}"]`);
        if (campo) campo.value = v;
    });
}


    if (e.target.classList.contains("eliminar")) {
        if (confirm("¿Eliminar venta?")) {
            eliminarVenta(id).then(() => {
                ventas = ventas.filter(v => v.id != id);
                renderizarVentas(ventas);
            });
        }
    }
});

