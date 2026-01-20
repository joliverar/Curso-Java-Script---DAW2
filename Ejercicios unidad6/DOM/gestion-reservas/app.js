'use strict';


const idForm = document.querySelector("#idForm");
const form = document.querySelector("#form");
const reservasList = document.querySelector("#reservasList");

const btnApi = document.querySelector("#btnApi");

const filterEstado = document.querySelector("#filterEstado");
const searhInput = document.querySelector("#searhInput");
const orderBy = document.querySelector("#orderBy"); 

let reservas = [];

document.addEventListener("DOMContentLoaded", ()=>{
    const reservasApi = loadReservas();

    if(reservasApi.length > 0){
        reservas = reservasApi;
    } else {
        reservas = [{
            id:"1",
            cliente:"Jino Olivera",
            servicio:"Una cena para 2 personas, con muchos postres y vinos",
            fecha: "2026-12-12",
            estado: "Pendiente"
    }];
      saveReservas();
    }
    
  
    renderReservas(reservas);
});

function renderReservas(reservas){
    reservasList.innerHTML="";

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

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const data = new FormData(form);
    const reserva = Object.fromEntries(data.entries());

  
    if(reserva.id){
        reservas = reservas.map(r => r.id === reserva.id? reserva: r);
    } else {
        reserva.id = Date.now().toString();
        reservas.push(reserva);
    }
 
    form.reset();
    saveReservas();
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
            const field = form.querySelector(`[name = "${key}"]`);
            if(field) field.value = value;
        })
        idForm.value = reserva.id;
    }

    if(e.target.classList.contains("btn--delete")){
        if(confirm("desea eliminar")){
            reservas = reservas.filter(r => r.id !== id);
            saveReservas();
            applyFilters();
        
        }
    }
});
searhInput.addEventListener("input", applyFilters);
filterEstado.addEventListener("change", applyFilters);
orderBy.addEventListener("change", applyFilters);

function buscarReservas(list, text){
    if(!text) return list;
    const q = text.toLowerCase();
    return list.filter(r => r.cliente.toLowerCase().includes(q) || r.servicio.toLowerCase().includes(q));
}
function filtrarEstados(list, estado){
    if(!estado) return list;
    return list.filter(r => r.estado === estado);
}
function ordenarReservas(list, field){
    if(!field) return list;
    return [...list].sort((a,b)=>{
        if(field ==="fecha"){
            return new Date(a.fecha) - new Date(b.fecha);
        }
        return a[field].localeCompare(b[field]);
    })

}

function applyFilters(){
    let result = [...reservas];

    result = buscarReservas(result, searhInput.value);
    result = filtrarEstados(result, filterEstado.value);
    result = ordenarReservas(result, orderBy.value);

    renderReservas(result);
}

btnApi.addEventListener("click", async () => {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
        if(!res.ok){
            throw new Error("no se cargo la data del api");
        }

        const data = await res.json();


       reservas = data.map(post =>({
        id : post.id.toString(),
        cliente: post.title,
        servicio: post.body,
        estado: "Pendiente",
        fecha: new Date().toISOString().split("T")[0]
       }));
       saveReservas();
       applyFilters();

       

    } catch (error) {
        alert("No s epdieron cargar las reservas desde la api");
        console.log(error);
    }

});

function saveReservas(){
    localStorage.setItem("reservas", JSON.stringify(reservas));

}

function loadReservas(){
    return JSON.parse(localStorage.getItem("reservas"))||[];
}



console.log("cargando");