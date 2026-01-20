'use strict';

console.log("cargando app");

const form = document.querySelector("#incidenciaForm");
const formTitle = document.querySelector("#formTitle");
const incidenciaId = document.querySelector("#incidenciaId");
const incidenciasList = document.querySelector("#incidenciasList");

const searchInput = document.querySelector("#searchInput");
const filterPrioridad = document.querySelector("#filterPrioridad");
const filterEstado = document.querySelector("#filterEstado");
const orderBy = document.querySelector("#orderBy");

let incidencias = [];


document.addEventListener("DOMContentLoaded", () =>{
    incidencias = loadIncidencias();
    renderIncidencias();
});
// const testIncidencias = [
//     {
//         id: 1,
//         titulo: "No funciona el correo",
//         descripcion: "El usuario no puede enviar emails",
//         prioridad: "Alta",
//         estado: "Abierta",
//         fecha: "2025-01-10"
//     },
//     {
//         id: 2,
//         titulo: "Pantalla en negro",
//         descripcion: "El monitor no enciende",
//         prioridad: "Media",
//         estado: "En proceso",
//         fecha: "2025-01-12"
//     }
// ];

// document.addEventListener("DOMContentLoaded", ()=>{
//     renderIncidencias(testIncidencias);
// });



form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const incidencia = Object.fromEntries(data.entries());
    console.log("Incidencia capturada:", incidencia);
    
    console.log("ANTES de añadir:", incidencias);
    
    console.log("DESPUÉS de añadir:", incidencias);
    if(incidencia.id){
        updateIncidencia(incidencia);
    } else {
        incidencia.id = Date.now().toString();
        incidencias = [...incidencias, incidencia];
       // createIncidencia(incidencia);
    }

    form.reset();
    // incidenciaId.value = "";
    // formTitle.textContent = "Alta de incidencias";

    
    renderIncidencias(incidencias);
    
    incidenciaId.value = "";
    formTitle.textContent = "Alta de incidencias";
    saveIndicencias();
    applyFilters();
    console.log("nueva incidencia ", incidencias)
});

searchInput.addEventListener("input", applyFilters);
filterEstado.addEventListener("change", applyFilters);
filterPrioridad.addEventListener("change", applyFilters);
orderBy.addEventListener("change", applyFilters);

function loadIncidenciasToForm(id){
    const incidencia = incidencias.find(i => i.id === id);

    Object.entries(incidencia).forEach(([key, value])=>{
        const field = form.querySelector(`[name = "${key}"]`);
        if(field)field.value = value;
    });

    formTitle.textContent = "Editar incidencia";
}

incidenciasList.addEventListener("click", (e) =>{

    const card = e.target.closest(".incidencia");
    if(!card) return;
    const id = card.dataset.id;
    if(e.target.classList.contains("btn--edit")){
        loadIncidenciasToForm(id);
    } 

    if(e.target.classList.contains("btn--delete")){
        if(confirm("Desea eliminar")){
            deleteIncidencia(id);
        }
    }
});

function updateIncidencia(incidencia){
    incidencias = incidencias.map(i=> i.id === incidencia.id?incidencia:i);
}

function deleteIncidencia(id){
    incidencias = incidencias.filter(i=> i.id !== id);
    saveIndicencias();
    applyFilters();
    renderIncidencias(incidencias);
    
}

function buscarIncidencia(list, text){
    if(!text) return list;
    const search = text.toLowerCase();

    return list.filter(i=>
        i.titulo.toLowerCase().includes(search) || 
        i.descripcion.toLowerCase().includes(search)
    );
}

function filtrarPorEstado(list, estado){
    if(!estado) return list;
    return list.filter(i=>i.estado === estado);
}

function filtrarPorPrioridad(list, prioridad){
    if(!prioridad) return list;
    return list.filter(i=> i.prioridad === prioridad);
}

function ordenarIncidencias(list, field){
    if(!field) return list;
    return [...list].sort((a,b)=>{
        if(field === "fecha"){
            return new Date(a.fecha) - new Date(b.fecha);
        }
        return a[field].localeCompare(b[field]);
    });
}


function applyFilters(){
    console.log("Aplicando filtros");

    let result = [...incidencias];

    result = buscarIncidencia(result, searchInput.value);
    result = filtrarPorEstado(result, filterEstado.value);
    result = filtrarPorPrioridad(result, filterPrioridad.value);
    result = ordenarIncidencias(result, orderBy.value);
    console.log({
        search: searchInput.value,
        prioridad: filterPrioridad.value,
        estado: filterEstado.value,
        order: orderBy.value,
        total: incidencias.length,
        resultado: result.length
    });
    renderIncidencias(result);

}


function renderIncidencias(list=incidencias){
    console.log("Renderizando lista:", list);
    incidenciasList.innerHTML = "";

    list.forEach(incidencia => {
            const card =  document.createElement("div");
            card.className = "incidencia";
            card.dataset.id = incidencia.id;

            card.innerHTML = `
                <div class="incidencia__info">
                    <span class="incidencia__name">${incidencia.titulo}</span>
                    <span>${incidencia.descripcion}</span>
                    
                    <span class="incidencia__meta">${incidencia.prioridad}
                    ${incidencia.estado}
                    ${incidencia.fecha}</span>
                </div>
                <div class="incidencia__actions">
                    <button class="btn btn--edit">Editar</button>
                    <button class="btn btn--delete">Eliminar</button>
                </div>
            `;

            incidenciasList.appendChild(card);
    });


}

function saveIndicencias (){
    localStorage.setItem("incidencias", JSON.stringify(incidencias));
}

function loadIncidencias (){
    return JSON.parse(localStorage.getItem("incidencias"))||[];
}