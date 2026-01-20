'use strict';

import { renderReservas } from "./ui.js";
import { buscarReservas, filtrarEstados, ordenarReservas } from "./filters.js";
import { saveReservas, loadReservas } from "./storage.js";
import { fecthReservas } from "./api.js";
import { validarReserva } from "./validation.js";


const idForm = document.querySelector("#idForm");
const form = document.querySelector("#form");
const reservasList = document.querySelector("#reservasList");

const btnApi = document.querySelector("#btnApi");

const filterEstado = document.querySelector("#filterEstado");
const searhInput = document.querySelector("#searhInput");
const orderBy = document.querySelector("#orderBy"); 

let reservas = [];

document.addEventListener("DOMContentLoaded", ()=>{
    const stored= loadReservas();
    reservas = stored.length
        ? stored
        :[{
            id:"1",
            cliente:"Jino Olivera",
            servicio:"Una cena para 2 personas, con muchos postres y vinos",
            fecha: "2026-12-12",
            estado: "Pendiente"
    }];
      saveReservas(reservas);
      applyFilters();
      
});


form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const data = new FormData(form);
    const reserva = Object.fromEntries(data.entries());

    if(!validarReserva(reserva)) return;
    if(reserva.id){
        reservas = reservas.map(r => r.id === reserva.id? reserva: r);
    } else {
        reserva.id = Date.now().toString();
        reservas.push(reserva);
    }
 
    form.reset();
    saveReservas(reservas);
    applyFilters();

    idForm.value = "";
})

reservasList.addEventListener("click", (e)=>{

    const card = e.target.closest(".reserva");
    if(!card) return;
    const id = card.dataset.id;

    if(e.target.classList.contains("btn--editar")){
        const reserva = reservas.find(r => r.id === id);
        if(!reserva) return;
        Object.entries(reserva).forEach(([key, value])=>{
            const field = form.querySelector(`[name="${key}"]`);
            if(field) field.value = value;
        })
        idForm.value = reserva.id;
    }

    if(e.target.classList.contains("btn--delete")){
        if(confirm("desea eliminar")){
            reservas = reservas.filter(r => r.id !== id);
            saveReservas(reservas);
            applyFilters();
        
        }
    }
});
searhInput.addEventListener("input", applyFilters);
filterEstado.addEventListener("change", applyFilters);
orderBy.addEventListener("change", applyFilters);



function applyFilters(){
    let result = [...reservas];

    result = buscarReservas(result, searhInput.value);
    result = filtrarEstados(result, filterEstado.value);
    result = ordenarReservas(result, orderBy.value);

    renderReservas(result, reservasList);
}

btnApi.addEventListener("click", async () => {
    try {
        
        reservas = await fecthReservas();

        saveReservas(reservas);
       applyFilters();

    } catch (error) {
        alert("No s epdieron cargar las reservas desde la api");
        console.log(error);
    }

});




console.log("cargando");