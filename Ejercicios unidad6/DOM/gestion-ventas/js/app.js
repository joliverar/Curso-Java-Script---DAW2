import { crearLayout } from "./layout.js";
import { crearFiltros } from "./vistaFiltros.js";
import { renderizarVentas } from "./ui.js";
import { crearFormulario } from "./vistaFormulario.js";
import { crearVenta, actualizarVenta, eliminarVenta, obtenerVentas, guardarVentas } from "./bdVentas.js";
import { obtenerVentasApi } from "./apiVentas.js";
import { validarVenta } from "./validaciones.js";


let ventas = [];

document.addEventListener("DOMContentLoaded", () => {

     ventas = obtenerVentas();

    if (ventas.length === 0) {
        ventas = [{
            id: "1",
            servicio: "reforma",
            cliente: "Jino Olivera",
            descripcion: "una casa",
            monto: "100",
            email: "jinooli@gmail.com",
            estado: "Pendiente",
            fecha: "2026-12-12"


        }];
        guardarVentas(ventas);

    }

    crearLayout();
    crearFiltros();
    crearFormulario();
    iniciarFormulario();
    iniciarListado();
    iniciarApi();
    inciarFiltros();
    renderizarVentas(ventas);


})

function iniciarFormulario() {
    const form = document.querySelector("#form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const venta = Object.fromEntries(data.entries());
        let hayError = false;
        validarVenta(venta, error =>{
            if(error){
                alert(error);
                hayError = true;
            }
        });

        if(hayError) return;

        if (venta.id) {
            actualizarVenta(venta);
        } else {
            crearVenta(venta);
        }

        form.reset();
        ventas = obtenerVentas();
        renderizarVentas(ventas);
    })
}

function iniciarListado() {

    const form = document.querySelector("#form");
    const idInput = document.querySelector("#idInput");
    const listadoVentas = document.querySelector("#listadoVentas");

    listadoVentas.addEventListener("click", (e) => {
        const card = e.target.closest(".venta");
        if (!card) return;
        const id = card.dataset.id;
        console.log(id);
        if (e.target.classList.contains("btn--editar")) {
            const venta = ventas.find(v => v.id === id);
            if (!venta) return;
            Object.entries(venta).forEach(([k, v]) => {
                const campo = form.querySelector(`[name="${k}"]`);
                if (campo) campo.value = v;
            })
            idInput.value = venta.id;
        }

        if (e.target.classList.contains("btn--delete")) {
            if (confirm("Desea eliminar")) {
                eliminarVenta(id);
                
                ventas = obtenerVentas();
                renderizarVentas(ventas);
                aplicarfiltros();
            }
        }
    });
}

function iniciarApi() {

    const btnApi = document.querySelector("#btnApi");
    btnApi.addEventListener("click", async () => {
        try {
            const ventasApi = await obtenerVentasApi();

            ventas = ventasApi;
            guardarVentas(ventas)
            aplicarfiltros();

        } catch (error) {
            alert("no se cargaron los datos del api");
            console.log(error);
        }


    });
}



function buscarV(list, text) {
    if (!text) return list;
    return list.filter(v => v.servicio.toLowerCase().includes(text.toLowerCase()) || v.descripcion.toLowerCase().includes(text.toLowerCase()));
}
function ordenarV(list, campo) {
    if (!campo) return list;

    return [...list].sort((a, b) => {
        if (campo === "fecha") {
            return new Date(a.fecha) - new Date(b.fecha);
        }
        return a[campo].localeCompare(String(b[campo]));
    })

}
function filtrarV(list, estado) {
    if (!estado) {
        return list;
    }
    return list.filter(v => v.estado === estado);

}

function aplicarfiltros() {


    const buscar = document.querySelector("#buscar");
    const ordenar = document.querySelector("#ordenar");
    const filtrar = document.querySelector("#filtrar");

    let resultado = [...ventas];
    resultado = buscarV(resultado, buscar.value);
    resultado = ordenarV(resultado, ordenar.value);
    resultado = filtrarV(resultado, filtrar.value);

    renderizarVentas(resultado);

}

function inciarFiltros() {
    const buscar = document.querySelector("#buscar");
    const ordenar = document.querySelector("#ordenar");
    const filtrar = document.querySelector("#filtrar");

    buscar.addEventListener("input", aplicarfiltros);
    ordenar.addEventListener("change", aplicarfiltros);
    filtrar.addEventListener("change", aplicarfiltros);

}