'use strict';

const Form = document.querySelector("#Form");
const idForm = document.querySelector("#idForm");
const avisosList = document.querySelector("#listAvisos");
const btnApi = document.querySelector("#btnApi");

const searchInput = document.querySelector("#searchInput");
const filterPrioridad = document.querySelector("#filterPrioridad");
const orderBy = document.querySelector("#orderBy");

let avisos = [];

function validarAviso(aviso) {
    if (!aviso.titulo.trim()) {
        alert("El titulo es obligatorio");
        return false;
    }

    if (aviso.descripcion.trim().length < 10) {
        alert("La descripción debe tener al menos 10 caracteres");
        return false;
    }

    if (!aviso.fecha.trim()) {
        alert("La fecha es obligatoria");
        return false;
    }
    return true;
}

searchInput.addEventListener("input", applyFilters);
filterPrioridad.addEventListener("change", applyFilters);
orderBy.addEventListener("change", applyFilters);


function ordenarAvisos(list, field){
    if(!field) return list;

    return [...list].sort((a, b) =>{
        if(field === "fecha"){
                return new Date(a.fecha) - new Date(b.fecha);
        }
        return a[field].localeCompare(b[field]);
    });
 
}



function buscarAvisos(list, text){
    if(!text) return list;
    const q = text.toLowerCase();
    return list.filter(a => a.titulo.toLowerCase().includes(q) || a.descripcion.toLowerCase().includes(q));
}



function filtrarAvisos(list, prioridad){
    if(!prioridad) return list;

    return list.filter(a => a.prioridad === prioridad);
}
function applyFilters(){
    let result = [...avisos];

    result = ordenarAvisos(result, orderBy.value);

    result = buscarAvisos(result, searchInput.value);

    result = filtrarAvisos(result, filterPrioridad.value);

    renderAvisos(result);
}




document.addEventListener("DOMContentLoaded", () => {

    const avisosguardados = loadAvisos();
    if (avisosguardados.length > 0) {
        avisos = avisosguardados;
    } else {
        avisos = [{
            id: "1",
            titulo: 'Hola',
            prioridad: 'alta',
            descripcion: 'Como estas',
            fecha: "12-12-2024"
        }];

        saveAvisos();
    }


    renderAvisos(avisos);
});

Form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(Form);
    const aviso = Object.fromEntries(data.entries());

    if (!validarAviso(aviso)) return;


    if (aviso.id) {
        avisos = avisos.map(a => a.id === aviso.id ? aviso : a);
    } else {
        aviso.id = Date.now().toString();
        avisos.push(aviso);
    }
    saveAvisos();
    applyFilters();
    renderAvisos(avisos);
    Form.reset();
    idForm.value = "";
});

function renderAvisos(avisos) {

    avisosList.innerHTML = "";
    avisos.forEach(aviso => {
        const card = document.createElement("div");
        card.className = "aviso";
        card.dataset.id = aviso.id;

        card.innerHTML = `
            <div class="aviso__info">
                <span class="aviso__titulo">${aviso.titulo}</span>
                <span>${aviso.descripcion}</span>
                <span>${aviso.prioridad}</span>
                <span>${aviso.fecha}</span>
            </div>
            <div class="aviso_actions">
                <button class="btn btn--editar">Editar</button>
                <button class="btn btn--delete">Elimina</button>
            </div>
        `;
        avisosList.appendChild(card);
    });
}

avisosList.addEventListener("click", (e) => {
    const card = e.target.closest(".aviso");
    if (!card) return;
    const id = card.dataset.id;

    if (e.target.classList.contains("btn--editar")) {
        const aviso = avisos.find(a => a.id === id);
        if (!aviso) return;
        Object.entries(aviso).forEach(([key, value]) => {
            const field = Form.querySelector(`[name="${key}"]`);
            if (field) field.value = value;
        });
        idForm.value = aviso.id;
    }

    if (e.target.classList.contains("btn--delete")) {
        if (confirm("desea eliminar una aviso")) {
            avisos = avisos.filter(a => a.id !== id);
            saveAvisos();
            applyFilters();
            renderAvisos(avisos);
        }


    }
});

btnApi.addEventListener("click", async () => {
    try {
        const res = await fetch(
            "http://jsonplaceholder.typicode.com/posts?_limit=5"
        );

        if (!res.ok) {
            throw new Error("Error al cargar la data del api");
        }

        const data = await res.json();

        avisos = data.map(post => ({
            id: post.id.toString(),
            titulo: post.title,
            descripcion: post.body,
            prioridad: "Media",
            fecha: new Date().toISOString().split("T")[0]

        }))
        saveAvisos();
        applyFilters();
        renderAvisos(avisos);
    } catch (error) {
        alert("No se pudieron cargar los avisos desde la api")
        console.log(error);
    }


});

function saveAvisos() {
    localStorage.setItem("avisos", JSON.stringify(avisos));
}

function loadAvisos() {
    return JSON.parse(localStorage.getItem("avisos")) || [];
}