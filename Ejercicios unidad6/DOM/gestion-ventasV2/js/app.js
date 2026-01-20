import { crearLayout } from "./layout.js";
import { crearFiltros } from "./vistaFiltros.js";
import { renderizarVentas } from "./ui.js";
import { crearFormulario } from "./vistaFormulario.js";
import {
    crearVenta,
    actualizarVenta,
    eliminarVenta,
    obtenerVentas
} from "./apiVentas.js";
import { validarVenta } from "./validaciones.js";

let ventas = [];

document.addEventListener("DOMContentLoaded", async () => {
    try {
        ventas = await obtenerVentas();
    } catch (e) {
        alert(e.message);
        ventas = [];
    }

    crearLayout();
    crearFiltros();
    crearFormulario();
    iniciarFormulario();
    iniciarListado();
    iniciarFiltros();
    renderizarVentas(ventas);
});

function iniciarFormulario() {
    const form = document.querySelector("#form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const venta = Object.fromEntries(data.entries());

        let hayError = false;
        validarVenta(venta, error => {
            if (error) {
                alert(error);
                hayError = true;
            }
        });
        if (hayError) return;

        try {
            if (venta.id) {
                await actualizarVenta(venta);
                ventas = ventas.map(v =>
                    v.id === venta.id ? venta : v
                );
            } else {
                const nueva = await crearVenta(venta);
                ventas.push(nueva);
            }

            form.reset();
            renderizarVentas(ventas);

        } catch (e) {
            alert(e.message);
        }
    });
}

function iniciarListado() {
    const form = document.querySelector("#form");
    const idInput = document.querySelector("#idInput");
    const listadoVentas = document.querySelector("#listadoVentas");

    listadoVentas.addEventListener("click", async (e) => {
        const card = e.target.closest(".venta");
        if (!card) return;

        const id = card.dataset.id;

        if (e.target.classList.contains("btn--editar")) {
            const venta = ventas.find(v => v.id === id);
            if (!venta) return;

            Object.entries(venta).forEach(([k, v]) => {
                const campo = form.querySelector(`[name="${k}"]`);
                if (campo) campo.value = v;
            });

            idInput.value = venta.id;
        }

        if (e.target.classList.contains("btn--delete")) {
            if (confirm("¿Desea eliminar?")) {
                try {
                    await eliminarVenta(id);
                    ventas = ventas.filter(v => v.id !== id);
                    renderizarVentas(ventas);
                } catch (e) {
                    alert(e.message);
                }
            }
        }
    });
}

function iniciarFiltros() {
    const buscar = document.querySelector("#buscar");
    const ordenar = document.querySelector("#ordenar");
    const filtrar = document.querySelector("#filtrar");

    buscar.addEventListener("input", aplicarFiltros);
    ordenar.addEventListener("change", aplicarFiltros);
    filtrar.addEventListener("change", aplicarFiltros);
}

function aplicarFiltros() {
    const buscar = document.querySelector("#buscar").value.toLowerCase();
    const ordenar = document.querySelector("#ordenar").value;
    const filtrar = document.querySelector("#filtrar").value;

    let resultado = [...ventas];

    if (buscar) {
        resultado = resultado.filter(v =>
            v.servicio.toLowerCase().includes(buscar) ||
            v.descripcion.toLowerCase().includes(buscar)
        );
    }

    if (filtrar) {
        resultado = resultado.filter(v => v.estado === filtrar);
    }

    if (ordenar === "fecha") {
        resultado.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    }

    renderizarVentas(resultado);
}
